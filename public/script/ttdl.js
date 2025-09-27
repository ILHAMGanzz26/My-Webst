const loadBtn = document.getElementById('load-btn');
const formatSelect = document.getElementById('format-select');
const previewVideo = document.getElementById('preview-video');
const previewAudio = document.getElementById('preview-audio');
const previewImage = document.getElementById('preview-image');
const previewTitle = document.getElementById('preview-title');
const errorMsg = document.getElementById('error-msg');
const loadingScreen = document.getElementById('loading-screen');

let mediaData = {};
let titleText = '';

loadBtn.addEventListener('click', () => {
  const url = document.getElementById('tk-url').value.trim();
  if(!url) return alert('Masukkan URL TikTok terlebih dahulu');

  loadingScreen.style.display = 'flex';
  const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      loadingScreen.style.display = 'none';
      if(data.code===0 && data.data){
        titleText = data.data.title;
        mediaData = {
          video: data.data.play,
          audio: data.data.music,
          cover: data.data.cover
        };

        showPreview(formatSelect.value);
        errorMsg.style.display='none';
        document.getElementById('tk-url').style.display='none';
        loadBtn.style.display='none';
        formatSelect.style.display='block';
      } else throw new Error('Data tidak lengkap');
    })
    .catch(err => {
      console.error(err);
      loadingScreen.style.display='none';
      errorMsg.style.display='block';
      setTimeout(()=>errorMsg.style.display='none',5000);
    });
});

formatSelect.addEventListener('change', ()=>showPreview(formatSelect.value));

function showPreview(option){
  previewVideo.pause(); previewAudio.pause();
  previewVideo.style.display='none'; previewAudio.style.display='none'; previewImage.style.display='none';

  const url = mediaData[option];
  if(!url) return;

  if(option==='video'){ previewVideo.src=url; previewVideo.style.display='block'; previewVideo.play(); }
  else if(option==='audio'){ previewAudio.src=url; previewAudio.style.display='block'; previewAudio.play(); }
  else if(option==='cover'){ previewImage.src=url; previewImage.style.display='block'; }

  previewTitle.textContent = titleText;
}