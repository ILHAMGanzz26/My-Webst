// Video autoplay dan tap untuk suara
const video = document.querySelector('.video-bg');
const tapAudio = document.querySelector('.tap-audio');
video.play().catch(()=>console.log('Autoplay gagal'));
document.body.addEventListener('click',()=>{
    video.muted=false; video.play(); tapAudio.style.display='none';
},{once:true});

// Modal QRIS
const qris = document.querySelector('.qris');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.modal-close');
qris.addEventListener('click',()=>{ modal.style.display='flex'; modalImg.src=qris.src; });
closeBtn.addEventListener('click',()=>modal.style.display='none');
modal.addEventListener('click',e=>{ if(e.target===modal) modal.style.display='none'; });

// Salin nomor
const buttonsNumber=document.querySelectorAll('button[data-number]');
const toast=document.getElementById('toast');
buttonsNumber.forEach(btn=>{
    btn.addEventListener('click',()=>{
        navigator.clipboard.writeText(btn.dataset.number).then(()=>{
            toast.classList.add('show');
            setTimeout(()=>toast.classList.remove('show'),1500);
        });
    });
});

// Buka link
const buttonsLink = document.querySelectorAll('button[data-link]');
buttonsLink.forEach(btn=>{
    btn.addEventListener('click',()=>{ window.open(btn.dataset.link,'_blank'); });
});