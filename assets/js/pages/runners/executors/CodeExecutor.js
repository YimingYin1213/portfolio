export class CodeExecutor {
  constructor({ editor, outputElement, execTimeElement, languageSelect, pythonURI, javaURI, fetchOptions = {} } = {}) {
    this.editor = editor;
    this.outputElement = outputElement;
    this.execTimeElement = execTimeElement;
    this.languageSelect = languageSelect;
    this.pythonURI = pythonURI;
    this.javaURI = javaURI;
    this.fetchOptions = fetchOptions;
  }

  async run() {
    const code = this.editor?.getValue?.() || '';
    const lang = this.languageSelect?.value || 'python';
    const outputDiv = this.outputElement;
    const execTimeSpan = this.execTimeElement;

    if (!outputDiv) {
      throw new Error('CodeExecutor requires an output element');
    }

    outputDiv.textContent = '⏳ Running...';
    if (execTimeSpan) execTimeSpan.textContent = '';

    const startTime = Date.now();
    const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

    if (lang === 'javascript' && isLocalhost) {
      this.runJavaScriptFallback(code, startTime);
      return;
    }

    let runURL;
    if (lang === 'python') runURL = `${this.pythonURI}/run/python`;
    else if (lang === 'java') runURL = `${this.javaURI}/run/java`;
    else if (lang === 'javascript') runURL = `${this.pythonURI}/run/javascript`;
    else throw new Error(`Unsupported language: ${lang}`);

    const body = JSON.stringify({ code });
    const options = { ...this.fetchOptions, method: 'POST', body };

    try {
      const res = await this.fetchWithFallback(runURL, options);
      const result = await res.json();
      const output = result.output || '[no output]';

      if (lang === 'javascript' && output.includes("No such file or directory: 'node'")) {
        throw new Error('Node.js not available on backend');
      }

      outputDiv.textContent = output;
      if (execTimeSpan) {
        execTimeSpan.textContent = `⏱Execution time: ${Date.now() - startTime}ms`;
      }
    } catch (err) {
      if (lang === 'python' && isLocalhost) {
        await this.runPythonFallback(code, startTime);
        return;
      }

      if (lang === 'javascript') {
        this.runJavaScriptFallback(code, startTime);
        return;
      } else {
        outputDiv.textContent = 'Error: ' + err.message;
        if (execTimeSpan) execTimeSpan.textContent = '';
      }
    }
  }

  async fetchWithFallback(url, options) {
    try {
      return await fetch(url, options);
    } catch (primaryErr) {
      // Retry without credentialed requests when cross-origin cookie policies block fetch.
      const fallbackOptions = {
        ...options,
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'X-Origin': 'client'
        }
      };
      return await fetch(url, fallbackOptions);
    }
  }

  async ensurePyodide() {
    if (window.loadPyodide && window.pyodide) {
      return window.pyodide;
    }

    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Pyodide runtime'));
        document.head.appendChild(script);
      });
    }

    if (!window.pyodide) {
      window.pyodide = await window.loadPyodide();
    }

    return window.pyodide;
  }

  async runPythonFallback(code, startTime) {
    const outputDiv = this.outputElement;
    const execTimeSpan = this.execTimeElement;

    try {
      outputDiv.textContent = '⏳ Loading local Python runtime...';
      const pyodide = await this.ensurePyodide();

      await pyodide.runPythonAsync(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `);

      await pyodide.runPythonAsync(code);

      const capturedOutput = await pyodide.runPythonAsync(`
stdout_value = sys.stdout.getvalue()
stderr_value = sys.stderr.getvalue()
stdout_value + stderr_value
      `);

      await pyodide.runPythonAsync(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
      `);

      outputDiv.textContent = (capturedOutput && String(capturedOutput).trim().length > 0)
        ? String(capturedOutput)
        : '[no output]';

      if (execTimeSpan) {
        execTimeSpan.textContent = `⏱Execution time: ${Date.now() - startTime}ms (local Python fallback)`;
      }
    } catch (fallbackErr) {
      outputDiv.textContent = 'Error: ' + fallbackErr.message;
      if (execTimeSpan) execTimeSpan.textContent = '';
    }
  }

  runJavaScriptFallback(code, startTime) {
    const outputDiv = this.outputElement;
    const execTimeSpan = this.execTimeElement;

    try {
      const logs = [];
      const originalLog = console.log;
      console.log = function(...args) {
        logs.push(args.map(arg => String(arg)).join(' '));
        originalLog.apply(console, args);
      };

      eval(code);
      console.log = originalLog;

      outputDiv.textContent = logs.length > 0 ? logs.join('\n') : '[no output]';
      if (execTimeSpan) {
        execTimeSpan.textContent = `⏱Execution time: ${Date.now() - startTime}ms (local fallback)`;
      }
    } catch (evalErr) {
      outputDiv.textContent = 'Error: ' + evalErr.message;
      if (execTimeSpan) execTimeSpan.textContent = '';
    }
  }

  bindCopyOutput(button) {
    if (!button || !this.outputElement) return;

    button.addEventListener('click', () => {
      const output = this.outputElement.textContent;
      const original = button.textContent;
      navigator.clipboard.writeText(output).then(() => {
        button.textContent = '✔';
        setTimeout(() => {
          button.textContent = original;
        }, 1200);
      });
    });
  }
}

export default CodeExecutor;
