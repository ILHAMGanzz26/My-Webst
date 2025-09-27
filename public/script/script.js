 const btn = document.getElementById('toggleTheme');
  const menuBtn = document.getElementById('menuBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const clickSound = document.getElementById('clickSound');

  btn.addEventListener('click', () => {
    clickSound.play();
    const root = document.documentElement;
    if(root.classList.contains('dark')){
      root.classList.remove('dark');
      root.classList.add('light');
      btn.textContent = '🌙';
    } else if(root.classList.contains('light')){
      root.classList.remove('light');
      root.classList.add('dark');
      btn.textContent = '☀';
    } else {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        root.classList.remove('dark');
        root.classList.add('light');
        btn.textContent = '🌙';
      } else {
        root.classList.add('dark');
        btn.textContent = '☀';
      }
    }
  });

  menuBtn.addEventListener('click', () => {
    clickSound.play();
    dropdownMenu.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('show');
    }
  });

  function setFlip(id, newValue) {
    const el = document.getElementById(id);
    const span = el.querySelector('span');
    if (span.textContent !== newValue) {
      el.classList.add('flip-animate');
      setTimeout(() => {
        span.textContent = newValue;
        el.classList.remove('flip-animate');
      }, 200);
    }
  }
  function updateFlipClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    setFlip('hours', hours);
    setFlip('minutes', minutes);
    setFlip('seconds', seconds);

    const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    document.getElementById('flip-date').textContent = dateStr;
  }
  setInterval(updateFlipClock, 1000);
  updateFlipClock();