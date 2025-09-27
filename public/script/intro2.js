const text = "Selamat Menikmati";
const container = document.getElementById("text");

let delay = 0;
const letterDelay = 150; // waktu antar huruf
const wordPause = 400;   // jeda antar kata

text.split(" ").forEach((word) => {
  const wordSpan = document.createElement("span");
  wordSpan.classList.add("word");

  word.split("").forEach(char => {
    const letterSpan = document.createElement("span");
    letterSpan.textContent = char;
    letterSpan.classList.add("letter");
    wordSpan.appendChild(letterSpan);
  });

  container.appendChild(wordSpan);

  wordSpan.querySelectorAll(".letter").forEach((letter, i) => {
    setTimeout(() => {
      letter.classList.add("show");
    }, delay + i * letterDelay);
  });

  delay += word.length * letterDelay + wordPause;
});

// Redirect setelah semua animasi selesai
setTimeout(() => {
  window.location.href = "../html/itung.html"; // Ganti alamat tujuan
}, delay + 1000);