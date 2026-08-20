const DEFAULT_BASEURL = "/portfolio";
const localhostHosts = new Set(["localhost", "127.0.0.1"]);

function getBaseurl() {
    if (location.pathname === DEFAULT_BASEURL || location.pathname.startsWith(`${DEFAULT_BASEURL}/`)) {
        return DEFAULT_BASEURL;
    }

    return "";
}

function getLocalApiPreference() {
    const params = new URLSearchParams(location.search);
    const override = params.get("localApi");

    try {
        if (override === "1") {
            localStorage.setItem("useLocalApi", "true");
        } else if (override === "0") {
            localStorage.setItem("useLocalApi", "false");
        }

        if (!localhostHosts.has(location.hostname)) {
            return false;
        }

        const storedPreference = localStorage.getItem("useLocalApi");

        // On local development hosts, default to local APIs unless explicitly disabled.
        if (storedPreference === null) {
            return true;
        }

        return storedPreference === "true";
    } catch {
        return localhostHosts.has(location.hostname);
    }
}

export const baseurl = getBaseurl();
const useLocalApi = getLocalApiPreference();
const isLocalhost = localhostHosts.has(location.hostname);
const isSecureOrigin = location.protocol === 'https:';

// Identity fetch requires cross-site cookies and CORS, so only do it on HTTPS
// (or when explicitly using local API on localhost).
export const shouldFetchIdentity = (isLocalhost && useLocalApi) || (!isLocalhost && isSecureOrigin);

export const pythonURI = useLocalApi
    ? "http://localhost:8587"
    : "https://flask.opencodingsociety.com";

export const javaURI = useLocalApi
    ? "http://localhost:8585"
    : "https://spring.opencodingsociety.com";

window.baseurl = baseurl;
window.pythonURI = pythonURI;
window.javaURI = javaURI;
window.shouldFetchIdentity = shouldFetchIdentity;

export const fetchOptions = {
    method: 'GET',  // Default method is GET
    mode: 'cors', // Enable CORS (Cross-Origin Resource Sharing)
    cache: 'default', // Default caching behavior
    credentials: 'include', // Include credentials (cookies, etc.)
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': 'client' // Custom header to identify source
    },
};

window.fetchOptions = fetchOptions;

// User Login Function (allows both GET and POST)
export function login(options) {
    // Modify the options to use the correct method and include the request body
    const requestOptions  = {
        ...fetchOptions,  // Spread the existing fetchOptions object
        method: options.method || 'POST',  // Dynamically set the method (default to POST)
        body: options.method === 'POST' ? JSON.stringify(options.body) : undefined  // Only add body for POST requests
    };

    // Clear the message area
    document.getElementById(options.message).textContent = "";

    // Fetch JWT from the server
    fetch(options.URL, requestOptions)
    .then(response => {
        // Trap error response from the Web API
        if (!response.ok) {
            const errorMsg = 'Login error: ' + response.status;
            console.log(errorMsg);
            document.getElementById(options.message).textContent = errorMsg;
            return response;  // Exit early if response is not OK
        }
        // Success: Proceed with callback
        options.callback();
    })
    .catch(error => {
        // Handle network errors
        console.log('Possible CORS or Service Down error: ' + error);
        document.getElementById(options.message).textContent = 'Possible CORS or service down error: ' + error;
    });
}
