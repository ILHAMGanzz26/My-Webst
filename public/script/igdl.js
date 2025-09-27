const bgGif = document.getElementById('bg-gif');
const bgVideo = document.getElementById('bg-video');
const backgroundURL = "https://c.top4top.io/p_35367lynf0.gif";

if(backgroundURL.endsWith(".gif")) {
  bgGif.src = backgroundURL;
  bgGif.style.display = "block";
} else {
  bgVideo.querySelector("source").src = backgroundURL;
  bgVideo.style.display = "block";
  bgGif.style.display = "none";
  bgVideo.load();
}

const loadBtn = document.getElementById('load-btn');
const videoInfo = document.getElementById('video-info');
const errorMsg = document.getElementById('error-msg');
const videoPreview = document.getElementById('video-preview');
const caption = document.getElementById('caption');

loadBtn.addEventListener('click', () => {
  const url = document.getElementById('capcut-url').value.trim();
  if(!url) return alert('Masukkan URL Instagram Reels terlebih dahulu');

  const apiUrl = `https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(url)}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      if(data && data.status && data.data && data.data.length > 0) {
        const info = data.data[0];
        videoPreview.src = info.url || '';
        videoPreview.load();

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
    });
});