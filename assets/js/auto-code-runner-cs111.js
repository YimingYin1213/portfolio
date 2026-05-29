(function () {
  const createSafeNode = () => {
    const fn = function () {};
    return new Proxy(fn, {
      get(target, prop) {
        if (prop === Symbol.toPrimitive) return () => 0;
        if (prop === 'toString') return () => '';
        if (prop === 'valueOf') return () => 0;
        if (prop === 'then') return undefined;
        return createSafeNode();
      },
      set() {
        return true;
      },
      apply() {
        return createSafeNode();
      },
      construct() {
        return createSafeNode();
      },
      has() {
        return true;
      }
    });
  };

  const createSandbox = (consoleBridge) => {
    const root = {
      console: consoleBridge,
      Date,
      Math,
      JSON,
      Number,
      String,
      Boolean,
      Array,
      Object,
      RegExp,
      parseInt,
      parseFloat,
      isNaN,
      Infinity,
      NaN,
      undefined,
      setTimeout: () => 0,
      clearTimeout: () => {},
      setInterval: () => 0,
      clearInterval: () => {},
      fetch: () => Promise.resolve({ ok: true, json: async () => ({}) }),
      localStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      },
      sessionStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      },
      window: createSafeNode(),
      document: createSafeNode(),
      GameControl: createSafeNode(),
      GameLevelAquaticGameLevel: createSafeNode(),
      Npc: function MockNpc(data) {
        this.data = data || {};
      },
      this: {
        bossState: {
          hp: 100,
          maxHp: 100,
          active: false,
          introPlayed: false,
          summonThresholdsTriggered: []
        },
        mermaidBossState: {
          hp: 100,
          maxHp: 100,
          active: false,
          combatReady: false
        },
        gameEnv: {
          gameObjects: []
        }
      }
    };

    return new Proxy(root, {
      get(target, prop) {
        if (prop in target) return target[prop];
        const safe = createSafeNode();
        target[prop] = safe;
        return safe;
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      },
      has() {
        return true;
      }
    });
  };

  const initAutoCodeRunners = () => {
    const codeNodes = Array.from(document.querySelectorAll('pre code'));

    codeNodes.forEach((codeNode, index) => {
      const className = (codeNode.className || '').toLowerCase();
      const looksLikeJsClass = className.includes('language-js') || className.includes('language-javascript');
      const snippet = (codeNode.textContent || '').trim();
      const looksLikeJsText = /\b(const|let|var|function|class|=>|console\.log|if\s*\()/.test(snippet);

      if (!looksLikeJsClass && !looksLikeJsText) return;

      const pre = codeNode.closest('pre');
      if (!pre) return;
      if (pre.dataset.autoRunnerApplied === 'true') return;

      const existingRunnerAncestor = pre.closest('[id^="runner-"], .runner, .code-runner, .code-runner-wrapper, .code-runner-container');
      if (existingRunnerAncestor) return;

      pre.dataset.autoRunnerApplied = 'true';

      const wrapper = document.createElement('div');
      wrapper.className = 'auto-code-runner-wrap';

      const toolbar = document.createElement('div');
      toolbar.className = 'auto-code-runner-toolbar';

      const runBtn = document.createElement('button');
      runBtn.type = 'button';
      runBtn.className = 'auto-code-runner-btn run';
      runBtn.textContent = 'Run Code';

      const clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'auto-code-runner-btn clear';
      clearBtn.textContent = 'Clear Output';

      const output = document.createElement('pre');
      output.className = 'auto-code-runner-output';
      output.id = `auto-code-runner-output-${index}`;

      toolbar.appendChild(runBtn);
      toolbar.appendChild(clearBtn);

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(toolbar);
      wrapper.appendChild(pre);
      wrapper.appendChild(output);

      const executeSnippet = () => {
        const logs = [];

        const pushLine = (kind, args) => {
          const text = args.map((arg) => {
            if (typeof arg === 'string') return arg;
            try {
              return JSON.stringify(arg);
            } catch (err) {
              return String(arg);
            }
          }).join(' ');
          logs.push(kind ? `[${kind}] ${text}` : text);
        };

        const consoleBridge = {
          log: (...args) => pushLine('', args),
          warn: (...args) => pushLine('warn', args),
          error: (...args) => pushLine('error', args)
        };

        try {
          const code = codeNode.textContent || '';
          const sandbox = createSandbox(consoleBridge);
          const runner = new Function(
            'sandbox',
            `with (sandbox) {\n${code}\n}`
          );
          const result = runner.call(sandbox.this, sandbox);
          if (typeof result !== 'undefined') {
            pushLine('return', [result]);
          }
        } catch (err) {
          pushLine('error', [err && err.message ? err.message : String(err)]);
        }

        output.textContent = logs.length ? logs.join('\n') : 'Code executed. No output.';
      };

      runBtn.addEventListener('click', executeSnippet);
      clearBtn.addEventListener('click', () => {
        output.textContent = '';
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoCodeRunners);
  } else {
    initAutoCodeRunners();
  }
})();
