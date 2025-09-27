/* === BACKGROUND OTOMATIS === */
const bgGif = document.getElementById('bg-gif');
const bgVideo = document.getElementById('bg-video');
const backgroundURL = "https://c.top4top.io/p_35367lynf0.gif";

if(backgroundURL.toLowerCase().endsWith(".gif")) {
  bgGif.src = backgroundURL;
  bgGif.style.display = "block";
  bgVideo.style.display = "none";
} else {
  bgVideo.querySelector("source").src = backgroundURL;
  bgVideo.style.display = "block";
  bgGif.style.display = "none";
  bgVideo.load();
}

/* === API FETCH === */
const loadBtn = document.getElementById('load-btn');
const videoInfo = document.getElementById('video-info');
const errorMsg = document.getElementById('error-msg');
const thumbnail = document.getElementById('thumbnail');
const title = document.getElementById('title');
const videoSelect = document.getElementById('video-select');
const downloadLink = document.getElementById('download-link');

function updateDownloadLink() {
  downloadLink.href = videoSelect.value;
}

videoSelect.addEventListener('change', updateDownloadLink);

loadBtn.addEventListener('click', () => {
  const url = document.getElementById('capcut-url').value.trim();
  if(!url) return alert('Masukkan URL CapCut terlebih dahulu');

  const apiUrl = `https://api.siputzx.my.id/api/d/capcutv2?url=${encodeURIComponent(url)}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      if(data && data.status && data.data) {
        const info = data.data;
        thumbnail.src = info.thumbnail;
        title.textContent = info.title;

        videoSelect.innerHTML = '';
        info.medias.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m.url;
          opt.textContent = `${m.quality} (${m.formattedSize})`;
          videoSelect.appendChild(opt);
        });

        videoSelect.selectedIndex = 0;
        updateDownloadLink();

        videoInfo.style.display = 'block';
        errorMsg.style.display = 'none';
      } else {
        throw new Error('Data tidak lengkap');
      }
    })
    .catch(err => {
      console.error(err);
      videoInfo.style.display = 'none';
      errorMsg.style.display = 'block';
      setTimeout(() => errorMsg.style.display='none', 5000);
    });
});