# Security & Privacy Documentation

This document outlines the security measures implemented in the Sarves Portfolio to protect source code and user data.

## 🔒 Source Code Protection

### 1. **Source Maps Disabled** ✅
- **File**: `vite.config.js`
- **What it does**: Removes `.map` files in production builds
- **Impact**: Prevents browser DevTools from displaying original source code
- **Implementation**: `sourcemap: false`

### 2. **Code Minification & Obfuscation** ✅
- **File**: `vite.config.js`
- **What it does**: Minifies and mangles JavaScript variable names
- **Tools**: Terser (Vite's default minifier)
- **Configuration**:
  - Variable name mangling enabled (`mangle: true`)
  - Comments removed
  - Console logs stripped (`drop_console: true`)
  - Debugger statements removed (`drop_debugger: true`)

### 3. **Build Artifacts** ✅
- **Files**: `.gitignore`, `vercel.json`, `netlify.toml`
- **What it does**: Prevents source maps and build artifacts from being exposed
- **Blocked extensions**: `.map`, `.js.map`, `.css.map`

## 🛡️ HTTP Security Headers

### Content Security Policy (CSP)
- **Value**: Strict CSP prevents inline scripts and restricts resource loading
- **Prevents**: XSS attacks, code injection, unauthorized script execution

### X-Content-Type-Options
- **Value**: `nosniff`
- **Prevents**: MIME type sniffing attacks

### X-Frame-Options
- **Value**: `DENY`
- **Prevents**: Clickjacking attacks by preventing page embedding in iframes

### X-XSS-Protection
- **Value**: `1; mode=block`
- **Prevents**: Cross-Site Scripting (XSS) attacks

### Referrer-Policy
- **Value**: `strict-origin-when-cross-origin`
- **Prevents**: Sensitive URL information leakage

### Permissions-Policy
- **Disabled**: Geolocation, Microphone, Camera, Payment APIs
- **Prevents**: Unauthorized access to device features

## 🚫 Developer Tools Protection

### Browser DevTools Detection
- **Location**: `index.html`
- **What it does**: Detects when DevTools are opened
- **Implementation**: Monitors window size differences

### Context Menu Blocking
- **Location**: `index.html`
- **Condition**: Only on production (not localhost)
- **What it does**: Disables right-click context menu (Inspect option)
- **Bypass**: Users can still use keyboard shortcuts (F12, Ctrl+Shift+I)

## 📦 Production Build Process

### Build Command
```bash
npm run build
```

### What Happens:
1. Source maps are NOT generated
2. Code is minified with Terser
3. Variable names are mangled
4. Console logs are removed
5. Build output placed in `/dist` folder

## 🚀 Deployment Security

### Netlify (`netlify.toml`)
- Auto-applies security headers on deployment
- Caches immutable assets for 1 year
- Prevents HTML caching (cache-busting)

### Vercel (`vercel.json`)
- Applies same security headers during build
- Optimized caching strategies
- Framework auto-detection enabled

## 🔍 What's Still Visible

The following information may still be accessible (normal for web apps):
- **Public assets**: Images, fonts, CSS (minified)
- **HTML structure**: DOM tree (frontend only)
- **Network requests**: Network tab shows API calls and responses
- **Cookies & Local Storage**: Browser storage

## ⚠️ Important Notes

### Limitations
- **Source code obfuscation** is NOT the same as encryption
- **Determined attackers** can still reverse-engineer minified code with tools
- **Sensitive data** should NEVER be stored in frontend code

### Best Practices
1. **Never hardcode secrets** (API keys, tokens) in frontend code
2. **Use backend for sensitive operations** (authentication, payments)
3. **Implement proper CORS** policies on your server
4. **Regular security audits** for your API endpoints
5. **Keep dependencies updated** (run `npm audit` regularly)

## 🔄 Updating Security

After making changes to security settings:
1. Rebuild the project: `npm run build`
2. Verify dist folder has NO `.map` files
3. Deploy to test environment first
4. Check browser DevTools (should show minified code only)

## 📋 Security Checklist

- [x] Source maps disabled
- [x] Code minification enabled
- [x] Console logs removed in production
- [x] Security headers configured
- [x] DevTools detection implemented
- [x] Right-click context menu disabled (prod only)
- [x] .gitignore configured
- [x] Build artifacts ignored
- [x] CSP headers set
- [x] MIME type sniffing prevented
- [x] Clickjacking protection enabled
- [x] XSS protection enabled
- [x] Referrer policy set
- [x] Permissions policy restricted

## 📞 Questions?

For security concerns or vulnerabilities, please follow responsible disclosure practices and report privately before public disclosure.
