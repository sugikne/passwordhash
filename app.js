// Utility: MD5 Implementation for browser preview
function md5(string) {
  function rotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function addUnsigned(lX, lY) {
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    }
    return lResult ^ lX8 ^ lY8;
  }
  function F(x, y, z) { return (x & y) | (~x & z); }
  function G(x, y, z) { return (x & z) | (y & ~z); }
  function H(x, y, z) { return x ^ y ^ z; }
  function I(x, y, z) { return y ^ (x | ~z); }
  function FF(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function GG(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function HH(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function II(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function convertToWordArray(string) {
    let lWordCount;
    const lMessageLength = string.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    const lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function wordToHex(lValue) {
    let WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  const x = convertToWordArray(string);
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
    a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }
  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

// Subtle Crypto SHA helpers
async function shaDigest(message, algorithm) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Bcrypt resolver
function getBcryptInstance() {
  if (typeof window.bcrypt !== 'undefined') return window.bcrypt;
  if (typeof dcodeIO !== 'undefined' && dcodeIO.bcrypt) return dcodeIO.bcrypt;
  return null;
}

// DOM References & State
const state = {
  theme: localStorage.getItem('hashkit_theme') || 'dark',
  history: JSON.parse(localStorage.getItem('hashkit_history') || '[]'),
  costFactor: 10,
  isGenerating: false,
};

// UI Elements
const themeToggleBtn = document.getElementById('themeToggleBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');
const toastEl = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

// Generator Elements
const genInput = document.getElementById('genInput');
const toggleGenVisibility = document.getElementById('toggleGenVisibility');
const costSlider = document.getElementById('costSlider');
const costDisplay = document.getElementById('costDisplay');
const costPresets = document.querySelectorAll('.preset-btn');
const genSubmitBtn = document.getElementById('genSubmitBtn');
const genOutput = document.getElementById('genOutput');
const genTime = document.getElementById('genTime');
const copyHashBtn = document.getElementById('copyHashBtn');
const sendToVerifierBtn = document.getElementById('sendToVerifierBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const anatomyCard = document.getElementById('anatomyCard');
const anatomyPrefix = document.getElementById('anatomyPrefix');
const anatomyCost = document.getElementById('anatomyCost');
const anatomySalt = document.getElementById('anatomySalt');
const anatomyHash = document.getElementById('anatomyHash');
const sha256Output = document.getElementById('sha256Output');
const sha512Output = document.getElementById('sha512Output');
const md5Output = document.getElementById('md5Output');

// Verifier Elements
const verifyPassInput = document.getElementById('verifyPassInput');
const verifyHashInput = document.getElementById('verifyHashInput');
const toggleVerifyVisibility = document.getElementById('toggleVerifyVisibility');
const verifySubmitBtn = document.getElementById('verifySubmitBtn');
const verifyResultBanner = document.getElementById('verifyResultBanner');
const verifyTitle = document.getElementById('verifyTitle');
const verifyDesc = document.getElementById('verifyDesc');
const pasteHashBtn = document.getElementById('pasteHashBtn');

// Inspector Elements
const inspectInput = document.getElementById('inspectInput');
const inspectBtn = document.getElementById('inspectBtn');
const inspectResult = document.getElementById('inspectResult');
const inspectVer = document.getElementById('inspectVer');
const inspectCost = document.getElementById('inspectCost');
const inspectRoundsCount = document.getElementById('inspectRoundsCount');
const inspectSalt = document.getElementById('inspectSalt');
const inspectChecksum = document.getElementById('inspectChecksum');
const inspectValid = document.getElementById('inspectValid');

// Password Generator Elements
const pwGenLength = document.getElementById('pwGenLength');
const pwGenLengthVal = document.getElementById('pwGenLengthVal');
const pwGenUpper = document.getElementById('pwGenUpper');
const pwGenLower = document.getElementById('pwGenLower');
const pwGenNums = document.getElementById('pwGenNums');
const pwGenSyms = document.getElementById('pwGenSyms');
const pwGenExclude = document.getElementById('pwGenExclude');
const pwGenOutput = document.getElementById('pwGenOutput');
const pwGenRegenBtn = document.getElementById('pwGenRegenBtn');
const pwGenCopyBtn = document.getElementById('pwGenCopyBtn');
const pwGenUseBtn = document.getElementById('pwGenUseBtn');

// History Elements
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Toast notification helper
function showToast(message) {
  if (!toastEl) return;
  toastMsg.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2200);
}

// Copy to clipboard helper
async function copyToClipboard(text, message = 'Copied to clipboard') {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch (err) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(message);
  }
}

// Theme handling
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('hashkit_theme', theme);
}

themeToggleBtn.addEventListener('click', () => {
  const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});
applyTheme(state.theme);

// Tab switching
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    tabButtons.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const targetPanel = document.getElementById(`panel-${tabName}`);
    if (targetPanel) targetPanel.classList.add('active');
  });
});

// Password strength & entropy calculation
function calculateEntropy(pwd) {
  if (!pwd) return { entropy: 0, label: 'Empty', color: '#64748b', percent: 0 };
  let pool = 0;
  if (/[a-z]/.test(pwd)) pool += 26;
  if (/[A-Z]/.test(pwd)) pool += 26;
  if (/[0-9]/.test(pwd)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pwd)) pool += 33;
  
  const entropy = Math.round(pwd.length * (Math.log2(pool || 1)));
  if (entropy < 28) return { entropy, label: 'Very Weak', color: '#f43f5e', percent: 20 };
  if (entropy < 40) return { entropy, label: 'Weak', color: '#f97316', percent: 40 };
  if (entropy < 60) return { entropy, label: 'Fair', color: '#eab308', percent: 65 };
  if (entropy < 80) return { entropy, label: 'Strong', color: '#10b981', percent: 85 };
  return { entropy, label: 'Very Strong', color: '#059669', percent: 100 };
}

function updatePasswordStrength() {
  const pwd = genInput.value;
  const analysis = calculateEntropy(pwd);
  strengthBar.style.width = `${analysis.percent}%`;
  strengthBar.style.backgroundColor = analysis.color;
  strengthText.textContent = pwd ? `${analysis.label} (${analysis.entropy} bits)` : 'Ready';
  strengthText.style.color = analysis.color;
}

genInput.addEventListener('input', () => {
  updatePasswordStrength();
  updateOtherHashes(genInput.value);
});

// Calculate non-bcrypt hashes instantly
async function updateOtherHashes(pwd) {
  if (!pwd) {
    sha256Output.textContent = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    sha512Output.textContent = 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e';
    md5Output.textContent = 'd41d8cd98f00b204e9800998ecf8427e';
    return;
  }
  try {
    const [sha256, sha512] = await Promise.all([
      shaDigest(pwd, 'SHA-256'),
      shaDigest(pwd, 'SHA-512')
    ]);
    sha256Output.textContent = sha256;
    sha512Output.textContent = sha512;
    md5Output.textContent = md5(pwd);
  } catch (err) {
    console.error('Error computing crypto hashes', err);
  }
}

// Cost / Rounds selector
function setCost(rounds) {
  state.costFactor = parseInt(rounds, 10);
  costSlider.value = state.costFactor;
  costDisplay.textContent = state.costFactor;
  costPresets.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.cost, 10) === state.costFactor);
  });
}

costSlider.addEventListener('input', (e) => {
  setCost(e.target.value);
});

costPresets.forEach(btn => {
  btn.addEventListener('click', () => {
    setCost(btn.dataset.cost);
  });
});

// Bcrypt decomposition parser
function parseBcryptHash(hashStr) {
  const match = hashStr.match(/^(\$2[abyx]\$)(\d{2})\$([./A-Za-z0-9]{22})([./A-Za-z0-9]{31})$/);
  if (!match) return null;
  return {
    prefix: match[1],
    cost: parseInt(match[2], 10),
    salt: match[3],
    hash: match[4]
  };
}

// History Handling
function addHistoryItem(item) {
  state.history.unshift({
    id: Date.now(),
    date: new Date().toLocaleTimeString(),
    ...item
  });
  if (state.history.length > 20) state.history.pop();
  localStorage.setItem('hashkit_history', JSON.stringify(state.history));
  renderHistory();
}

function renderHistory() {
  if (!historyList) return;
  if (state.history.length === 0) {
    historyList.innerHTML = `<div style="color:var(--text-muted);font-size:0.8125rem;padding:8px 0;">No recent actions logged.</div>`;
    return;
  }
  historyList.innerHTML = state.history.map(item => `
    <div class="history-item">
      <span class="history-text" title="${item.hash || item.plain}">
        <strong style="color:var(--accent-primary)">[${item.type}]</strong> ${item.hash || item.plain}
      </span>
      <div class="history-actions">
        <button class="icon-btn" onclick="copyToClipboard('${item.hash || item.plain}')" title="Copy to clipboard">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
        <button class="icon-btn" onclick="sendHistoryToVerifier('${item.hash || ''}')" title="Send to Verifier">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
        </button>
      </div>
    </div>
  `).join('');
}

window.sendHistoryToVerifier = function(hash) {
  if (!hash) return;
  verifyHashInput.value = hash;
  document.querySelector('[data-tab="verifier"]').click();
  showToast('Hash loaded into verifier');
};

clearHistoryBtn?.addEventListener('click', () => {
  state.history = [];
  localStorage.removeItem('hashkit_history');
  renderHistory();
  showToast('History cleared');
});

// Toggle visibility buttons
toggleGenVisibility?.addEventListener('click', () => {
  const isPass = genInput.type === 'password';
  genInput.type = isPass ? 'text' : 'password';
  toggleGenVisibility.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password');
});

toggleVerifyVisibility?.addEventListener('click', () => {
  const isPass = verifyPassInput.type === 'password';
  verifyPassInput.type = isPass ? 'text' : 'password';
});

// Generate Hash Execution
async function executeGenerateHash() {
  const bcrypt = getBcryptInstance();
  if (!bcrypt) {
    showToast('Error: Bcrypt library not loaded yet.');
    return;
  }
  const password = genInput.value;
  if (!password) {
    showToast('Please enter a password');
    genInput.focus();
    return;
  }

  state.isGenerating = true;
  genSubmitBtn.disabled = true;
  genSubmitBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
    <span>Generating...</span>
  `;

  const startTime = performance.now();

  setTimeout(() => {
    try {
      bcrypt.genSalt(state.costFactor, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
          const elapsed = Math.round(performance.now() - startTime);
          state.isGenerating = false;
          genSubmitBtn.disabled = false;
          genSubmitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span>Generate Hash</span>
          `;

          if (err) {
            showToast('Hashing failed: ' + err.message);
            return;
          }

          genOutput.textContent = hash;
          genTime.textContent = `Generated in ${elapsed} ms (Cost ${state.costFactor})`;

          // Anatomy card update
          const parsed = parseBcryptHash(hash);
          if (parsed) {
            anatomyPrefix.textContent = parsed.prefix;
            anatomyCost.textContent = parsed.cost;
            anatomySalt.textContent = parsed.salt;
            anatomyHash.textContent = parsed.hash;
            anatomyCard.style.display = 'block';
          }

          addHistoryItem({
            type: 'Bcrypt',
            hash: hash,
            plain: password.length > 20 ? password.substring(0, 17) + '...' : password,
            cost: state.costFactor
          });

          showToast('Bcrypt hash generated successfully');
        });
      });
    } catch (err) {
      state.isGenerating = false;
      genSubmitBtn.disabled = false;
      genSubmitBtn.textContent = 'Generate Hash';
      showToast('Error: ' + err.message);
    }
  }, 10);
}

genSubmitBtn.addEventListener('click', executeGenerateHash);
genInput.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') executeGenerateHash();
});

copyHashBtn?.addEventListener('click', () => {
  copyToClipboard(genOutput.textContent, 'Hash copied to clipboard');
});

sendToVerifierBtn?.addEventListener('click', () => {
  const hash = genOutput.textContent;
  if (!hash || hash.includes('Click generate')) return;
  verifyPassInput.value = genInput.value;
  verifyHashInput.value = hash;
  document.querySelector('[data-tab="verifier"]').click();
  showToast('Sent to Verifier');
});

// Verifier Execution
async function executeVerifyHash() {
  const bcrypt = getBcryptInstance();
  if (!bcrypt) {
    showToast('Error: Bcrypt library not loaded');
    return;
  }
  const password = verifyPassInput.value;
  const hash = verifyHashInput.value.trim();

  if (!hash) {
    showToast('Please enter a hash to verify');
    verifyHashInput.focus();
    return;
  }

  // Validate format
  const parsed = parseBcryptHash(hash);
  if (!parsed) {
    verifyResultBanner.className = 'verification-banner mismatch';
    verifyResultBanner.style.display = 'flex';
    verifyTitle.textContent = 'Invalid Bcrypt Format';
    verifyDesc.textContent = 'The string provided does not follow standard modular crypt format ($2a$, $2b$, or $2y$ + 2-digit cost + 53 char base64 string).';
    return;
  }

  verifySubmitBtn.disabled = true;
  verifySubmitBtn.textContent = 'Checking...';
  const startTime = performance.now();

  setTimeout(() => {
    bcrypt.compare(password, hash, (err, isMatch) => {
      const elapsed = Math.round(performance.now() - startTime);
      verifySubmitBtn.disabled = false;
      verifySubmitBtn.textContent = 'Verify Hash';

      verifyResultBanner.style.display = 'flex';
      if (err) {
        verifyResultBanner.className = 'verification-banner mismatch';
        verifyTitle.textContent = 'Verification Error';
        verifyDesc.textContent = err.message;
        return;
      }

      if (isMatch) {
        verifyResultBanner.className = 'verification-banner match';
        verifyTitle.textContent = 'Valid Match: Passwords Match';
        verifyDesc.textContent = `Plaintext password matches this hash perfectly. Verified in ${elapsed} ms.`;
      } else {
        verifyResultBanner.className = 'verification-banner mismatch';
        verifyTitle.textContent = 'Mismatch: Incorrect Password';
        verifyDesc.textContent = `The plaintext password does NOT match this hash. Comparison finished in ${elapsed} ms.`;
      }

      addHistoryItem({
        type: isMatch ? 'Verify ✓' : 'Verify ✕',
        hash: hash.substring(0, 29) + '...',
        plain: isMatch ? 'Match' : 'Mismatch'
      });
    });
  }, 10);
}

verifySubmitBtn.addEventListener('click', executeVerifyHash);
verifyPassInput.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') executeVerifyHash();
});
verifyHashInput.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') executeVerifyHash();
});

pasteHashBtn?.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      verifyHashInput.value = text.trim();
      showToast('Pasted from clipboard');
    }
  } catch (err) {
    showToast('Clipboard access denied, paste manually');
  }
});

// Inspector Execution
function executeInspect() {
  const hash = inspectInput.value.trim();
  if (!hash) {
    showToast('Please enter a hash to inspect');
    return;
  }
  const parsed = parseBcryptHash(hash);
  inspectResult.style.display = 'block';
  if (!parsed) {
    inspectValid.textContent = 'Invalid Bcrypt Hash';
    inspectValid.style.color = 'var(--danger)';
    inspectVer.textContent = 'Unknown';
    inspectCost.textContent = '-';
    inspectRoundsCount.textContent = '-';
    inspectSalt.textContent = '-';
    inspectChecksum.textContent = '-';
    return;
  }

  inspectValid.textContent = 'Valid Standard Bcrypt ($2x)';
  inspectValid.style.color = 'var(--success)';
  inspectVer.textContent = parsed.prefix;
  inspectCost.textContent = parsed.cost;
  inspectRoundsCount.textContent = `${Math.pow(2, parsed.cost).toLocaleString()} iterations`;
  inspectSalt.textContent = parsed.salt;
  inspectChecksum.textContent = parsed.hash;
}

inspectBtn?.addEventListener('click', executeInspect);
inspectInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') executeInspect();
});

// Random Password Generator logic
function generateRandomPassword() {
  const length = parseInt(pwGenLength.value, 10);
  let charset = '';
  if (pwGenLower.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (pwGenUpper.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (pwGenNums.checked) charset += '0123456789';
  if (pwGenSyms.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (pwGenExclude.checked) {
    charset = charset.replace(/[1lIO0]/g, '');
  }

  if (!charset) {
    showToast('Select at least one character type');
    return;
  }

  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  pwGenOutput.value = result;
}

pwGenLength?.addEventListener('input', (e) => {
  pwGenLengthVal.textContent = e.target.value;
  generateRandomPassword();
});

[pwGenLower, pwGenUpper, pwGenNums, pwGenSyms, pwGenExclude].forEach(checkbox => {
  checkbox?.addEventListener('change', generateRandomPassword);
});

pwGenRegenBtn?.addEventListener('click', generateRandomPassword);

pwGenCopyBtn?.addEventListener('click', () => {
  copyToClipboard(pwGenOutput.value, 'Generated password copied');
});

pwGenUseBtn?.addEventListener('click', () => {
  genInput.value = pwGenOutput.value;
  updatePasswordStrength();
  updateOtherHashes(genInput.value);
  document.querySelector('[data-tab="generator"]').click();
  showToast('Password sent to Hash Generator');
});

// Keyframe animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  renderHistory();
  generateRandomPassword();
  updatePasswordStrength();
  updateOtherHashes(genInput.value);
  
  // Prefill generator with initial demo password if empty
  if (!genInput.value) {
    genInput.value = 'staffblue123';
    updatePasswordStrength();
    updateOtherHashes('staffblue123');
  }
});
