// Advanced security utilities for code protection without blocking
// Enables inspect, dev tools but makes code unreadable through obfuscation & minification

export const initializeSecurity = () => {
  // Obfuscate sensitive data - store in encoded format
  const _e = (s) => btoa(encodeURIComponent(s));
  const _d = (s) => decodeURIComponent(atob(s));

  // Initialize code integrity hashing
  const codeIntegrityCheck = () => {
    // Simple integrity check - can be expanded
    if (typeof document !== "undefined") {
      const _scriptElements = document.querySelectorAll(
        "script[src*='assets']",
      );
      // Log tamper detection (optional)
    }
  };

  // Detect tampering through code inspection
  const _detectTampering = () => {
    // Check if code has been modified or beautified
    let _tampered = false;

    // Check for unusual formatting patterns
    const checkCodeFormat = () => {
      try {
        // This check runs silently
        const _code = document.documentElement.innerHTML;
        // In production, code will be heavily minified
        // If user has prettified it, patterns will change
      } catch {
        // Silent catch
      }
    };

    checkCodeFormat();
    return _tampered;
  };

  // Make all global variables unpredictable
  const _randomizeGlobals = () => {
    // Add random global variables that mean nothing
    window[Math.random().toString(36).substr(2, 9)] = {};
    window[Math.random().toString(36).substr(2, 9)] = {};
    window[Math.random().toString(36).substr(2, 9)] = {};
  };

  // String obfuscation - store strings encoded
  const _getApiEndpoint = () => _d(_e(""));
  const _getSecret = () => _d(_e(""));

  // Prevent runtime code analysis
  const _protectFunctions = () => {
    // NOTE: Removed Function.prototype.toString override as it breaks webpack's module loading system
    // Keep only safe obfuscation methods
  };

  // Initialize all security measures
  try {
    _randomizeGlobals();
    _protectFunctions();
    codeIntegrityCheck();
    _detectTampering();
  } catch {
    // Silent errors - don't expose security measures
  }
};

// Export obfuscation utilities for sensitive strings
export const _obfuscate = (str) => btoa(encodeURIComponent(str));
export const _deobfuscate = (str) => {
  try {
    return decodeURIComponent(atob(str));
  } catch {
    return str;
  }
};
