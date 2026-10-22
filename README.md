# HashKit — Bcrypt & Password Security Studio

A fast, client-side Bcrypt password hash generator, verifier, and inspector with a clean, utilitarian interface.

## ✨ Features
- **Bcrypt Hash Generator**: Configurable cost factor (salt rounds 4–14), password entropy strength meter, calculation benchmark (ms).
- **Hash Anatomy Inspector**: Visual breakdown of Bcrypt hash prefix, cost, 128-bit salt, and 184-bit checksum.
- **Reference Checksums**: Instant calculation of SHA-256, SHA-512, and MD5.
- **Hash Verifier**: Test plain password matching against existing Bcrypt hash strings.
- **Secure Password Generator**: Cryptographically strong random password generator.
- **Theme**: Dark and Light mode support.
- **Local History**: Stored in `localStorage`.
- **100% Offline / Client-Side**: No sensitive passwords leave your browser.

## 🚀 Usage

### 1. Open in Browser Directly
Double click `index.html` to open it in any browser (fully offline-ready).

### 2. Run Local Server
```bash
npm start
```
Then visit `http://localhost:3000`.

## 🌐 Deploy to GitHub Pages
1. Go to repository **Settings** -> **Pages**.
2. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
3. Your site will be live immediately!
