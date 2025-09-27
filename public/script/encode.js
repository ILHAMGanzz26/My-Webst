// Encode modern
function encodeByMethod(method, text) {
  let encoded='', wrapper='';
  if(method==='base64'){
    encoded = btoa(new TextEncoder().encode(text).reduce((data,byte)=>data+String.fromCharCode(byte),''));
    wrapper=`<!DOCTYPE html><html><body><script>
      const encoded="${encoded}";
      const decoded=new TextDecoder().decode(Uint8Array.from(atob(encoded).split("").map(c=>c.charCodeAt(0))));
      document.open();
      document.write(decoded);
      document.close();
    <\/script></body></html>`;
  }
  else if(method==='entities'){
    encoded = text.replace(/`/g,'\\`'); // escape backtick
    let temp=document.createElement('textarea');
    temp.textContent=encoded;
    encoded=temp.innerHTML;
    wrapper=`<!DOCTYPE html><html><body><script>
      const encodedEntities=\`${encoded}\`;
      const textarea=document.createElement('textarea');
      textarea.innerHTML=encodedEntities;
      const decoded=textarea.value;
      document.open();
      document.write(decoded);
      document.close();
    <\/script></body></html>`;
  }
  else if(method==='hex'){
    encoded=Array.from(text).map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join('');
    wrapper=`<!DOCTYPE html><html><body><script>
      const hex="${encoded}";
      const decoded=new TextDecoder().decode(Uint8Array.from(hex.match(/.{1,2}/g).map(byte=>parseInt(byte,16))));
      document.open();
      document.write(decoded);
      document.close();
    <\/script></body></html>`;
  }
  return wrapper;
}

// Animasi melt
function meltButton(btn){
  if(btn.classList.contains('melt')) return;
  btn.classList.add('melt');
  setTimeout(()=>btn.classList.remove('melt'),800);
}

// Tombol utama
const encodeBtn=document.getElementById('encodeBtn');
const downloadBtn=document.getElementById('downloadBtn');
const clearBtn=document.getElementById('clearBtn');
const copyBtn=document.getElementById('copyBtn');

encodeBtn.addEventListener('click',()=>{
  meltButton(encodeBtn);
  const method=document.getElementById('method').value;
  const input=document.getElementById('input').value;
  document.getElementById('output').value=encodeByMethod(method,input);
});

clearBtn.addEventListener('click',()=>{
  meltButton(clearBtn);
  document.getElementById('input').value='';
  document.getElementById('output').value='';
});

downloadBtn.addEventListener('click',()=>{
  meltButton(downloadBtn);
  const method=document.getElementById('method').value;
  const content=document.getElementById('output').value;
  if(!content.trim()){ alert("Tidak ada teks untuk diunduh!"); return; }
  const blob=new Blob([content],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`hasil_${method}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

copyBtn.addEventListener('click',()=>{
  meltButton(copyBtn);
  const output=document.getElementById('output');
  if(!output.value.trim()){ alert("Tidak ada teks untuk disalin!"); return; }
  output.select();
  output.setSelectionRange(0,99999);
  navigator.clipboard.writeText(output.value)
    .then(()=>alert("Teks berhasil disalin!"))
    .catch(()=>alert("Gagal menyalin teks."));
});