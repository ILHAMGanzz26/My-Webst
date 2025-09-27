const text = "Halo Atmin, Ganteng Bet Hari Ini, Kok Buka Halaman Ini Sihh Pasti Mau Nganu Ya??";
    const container = document.getElementById("text");

    let delay = 0;
    const letterDelay = 150; // waktu antar huruf
    const wordPause = 400;   // jeda antar kata

    text.split(" ").forEach((word, wIndex, wordsArray) => {
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

    // Setelah semua animasi selesai → redirect
    setTimeout(() => {
      window.location.href = "../html/intro2.html"; // Ganti alamat tujuan di sini
    }, delay + 1000); // +1000ms untuk jeda akhir