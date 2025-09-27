const TARGET_FILE = "intro.html";
const MODE = "base64";
const ENCRYPTED_PASSWORD = "bWVnYXJkZWdha2E="; 

function checkPassword(input) {
  if (MODE === "base64") {
    const decoded = atob(ENCRYPTED_PASSWORD);
    return input === decoded;
  }
  return false;
}

const form = document.getElementById('pwForm');
const pw = document.getElementById('pw');
const err = document.getElementById('err');
const wrap = document.getElementById('wrap');
const successIcon = document.getElementById('successIcon');
const checkmark = document.getElementById('checkmark');
const successSound = document.getElementById('successSound');
const errorSound = document.getElementById('errorSound');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  err.textContent = '';
  const val = pw.value.trim();
  
  if (!val) {
    err.textContent = 'Masukkan kata sandi.';
    errorSound.play();
    bodyFlashRed();
    pw.value = '';
    pw.focus();
    return;
  }
  
  if (checkPassword(val)) {
    wrap.classList.add("fade-out");
    document.body.style.background = "#000";
    setTimeout(() => {
      wrap.style.display = "none";
      successIcon.style.display = "block";
      checkmark.classList.add("show");
      successSound.play();
      setTimeout(() => {
        window.location.href = TARGET_FILE; 
      }, 1200);
    }, 400);
  } else {
    err.textContent = 'Kata sandi salah.';
    errorSound.play();
    pw.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
      { duration: 220, easing: 'ease-out' }
    );
    bodyFlashRed();
    pw.value = '';
    pw.focus();
  }
});

function bodyFlashRed() {
  document.body.style.animation = 'flashRed 0.4s ease';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 400);
}