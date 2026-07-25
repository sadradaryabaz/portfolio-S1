function copyText(el){
  const value = el.querySelector(".info-value").innerText;
  const icon = el.querySelector(".info-icon");

  navigator.clipboard.writeText(value);

  const oldIcon = icon.innerHTML;

  icon.innerHTML = `
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z"/>
  </svg>`;

  setTimeout(()=>{
    icon.innerHTML = oldIcon;
  },1200);
}
