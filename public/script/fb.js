const loadBtn = document.getElementById('load-btn');
const videoSelect = document.getElementById('video-select');
const previewVideo = document.getElementById('preview-video');
const previewAudio = document.getElementById('preview-audio');
const previewImage = document.getElementById('preview-image');
const previewTitle = document.getElementById('preview-title');
const errorMsg = document.getElementById('error-msg');
const loadingScreen = document.getElementById('loading-screen');

let mediaData = [];
let titleText = '';

loadBtn.addEventListener('click', () => {
  const url = document.getElementById('fb-url').value.trim();
  if(!url) return alert('Masukkan URL Facebook terlebih dahulu');

  loadingScreen.style.display = 'flex'; // tampilkan loading
  const apiUrl = `https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(url)}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      loadingScreen.style.display = 'none'; // sembunyikan loading
      if(data && data.status && data.data) {
        const info = data.data;
        titleText = info.title || '[Facebook Video]';
        mediaData = info.data;

        showPreviewBySelect(videoSelect.value);

        errorMsg.style.display = 'none';
        document.getElementById('fb-url').style.display = 'none';
        loadBtn.style.display = 'none';
        videoSelect.style.display = 'block';
      } else {
        throw new Error('Data tidak lengkap');
      }
    })
    .catch(err => {
      console.error(err);
      loadingScreen.style.display = 'none';
      errorMsg.style.display = 'block';
      setTimeout(() => errorMsg.style.display='none', 5000);
    });
});

videoSelect.addEventListener('change', () => {
  showPreviewBySelect(videoSelect.value);
});

function showPreviewBySelect(option) {
  previewVideo.pause();
  previewAudio.pause();
  previewVideo.style.display = 'none';
  previewAudio.style.display = 'none';
  previewImage.style.display = 'none';

  let selectedMedia = null;
  if(option==='HD'){
    selectedMedia = mediaData.find(m => m.format==='mp4' && m.resolution==='HD');
  } else if(option==='SD'){
    selectedMedia = mediaData.find(m => m.format==='mp4' && m.resolution==='SD');
  } else if(option==='Audio'){
    selectedMedia = mediaData.find(m => m.format==='mp3');
  } else if(option==='Photo'){
    selectedMedia = mediaData.find(m => m.format==='jpg');
  }

  if(!selectedMedia) return;

  const type = selectedMedia.format;
  const url = selectedMedia.url;

  if(type==='mp4'){
    previewVideo.src = url;
    previewVideo.style.display = 'block';
    previewVideo.play();
  } else if(type==='mp3'){
    previewAudio.src = url;
    previewAudio.style.display = 'block';
    previewAudio.play();
  } else if(type==='jpg'){
    previewImage.src = url;
    previewImage.style.display = 'block';
  }

  previewTitle.textContent = titleText;
}