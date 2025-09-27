const numbers = ["5", "4", "3", "2", "1"];
const container = document.getElementById("text");
const numberDelay = 1000; // 1 detik per angka
let index = 0;

function showNextNumber() {
  container.textContent = numbers[index];
  container.classList.remove("show");
  void container.offsetWidth; // reflow supaya animasi berjalan lagi
  container.classList.add("show");
  index++;

  if(index < numbers.length){
    setTimeout(showNextNumber, numberDelay);
  } else {
    // redirect setelah hitung mundur selesai
    setTimeout(() => {
      window.location.href = "https://cutlink.day/simontok";
    }, 500);
  }
}

// mulai animasi hitung mundur
setTimeout(showNextNumber, numberDelay);