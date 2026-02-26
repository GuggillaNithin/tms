(function () {

  // Inject CSS automatically
  const style = document.createElement("style");
  style.innerHTML = `
  :root { --primary: hsl(18 77% 52%); }

  .cookie-banner {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    max-width: 600px;
    background: #fff;
    color: #333;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    z-index: 9999;
    display: none;
  }

  .cookie-actions { display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; }

  .cookie-btn {
    padding:10px 18px;
    border-radius:4px;
    border:none;
    cursor:pointer;
  }

  .cookie-btn.primary { background: var(--primary); color:#fff; }
  .cookie-btn.secondary { background:#eaeaea; }

  @media(max-width:480px){
    .cookie-banner{ bottom:90px; }
    .cookie-actions{ flex-direction:column; }
    .cookie-btn{ width:100%; }
  }

  .cookie-modal {
    position:fixed; inset:0;
    background:rgba(0,0,0,0.5);
    display:none;
    justify-content:center;
    align-items:center;
    z-index:10000;
  }

  .cookie-modal-content{
    background:#fff;
    padding:25px;
    border-radius:10px;
    width:95%;
    max-width:500px;
  }

  .cookie-option{
    display:flex;
    justify-content:space-between;
    margin:15px 0;
  }
  `;
  document.head.appendChild(style);

  // Inject HTML automatically
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.innerHTML = `
    <p>We use cookies to improve your experience.</p>
    <div class="cookie-actions">
      <button class="cookie-btn secondary" id="reject">Reject</button>
      <button class="cookie-btn secondary" id="prefs">Preferences</button>
      <button class="cookie-btn primary" id="accept">Accept All</button>
    </div>
  `;
  document.body.appendChild(banner);

  const modal = document.createElement("div");
  modal.className = "cookie-modal";
  modal.innerHTML = `
    <div class="cookie-modal-content">
      <h3>Cookie Preferences</h3>
      <div class="cookie-option">
        <span>Necessary</span>
        <input type="checkbox" checked disabled>
      </div>
      <div class="cookie-option">
        <span>Analytics</span>
        <input type="checkbox" id="analytics">
      </div>
      <div style="margin-top:20px; text-align:right;">
        <button class="cookie-btn secondary" id="close">Cancel</button>
        <button class="cookie-btn primary" id="save">Save</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const consent = JSON.parse(localStorage.getItem("cookieConsent"));
  if (!consent) banner.style.display = "block";
  else if (consent.analytics) loadGA();

  document.getElementById("accept").onclick = () =>
    saveConsent({necessary:true, analytics:true});

  document.getElementById("reject").onclick = () =>
    saveConsent({necessary:true, analytics:false});

  document.getElementById("prefs").onclick = () =>
    modal.style.display = "flex";

  document.getElementById("close").onclick = () =>
    modal.style.display = "none";

  document.getElementById("save").onclick = () => {
    const analytics = document.getElementById("analytics").checked;
    saveConsent({necessary:true, analytics});
  };

  function saveConsent(data){
    localStorage.setItem("cookieConsent", JSON.stringify(data));
    banner.style.display = "none";
    modal.style.display = "none";
    if(data.analytics) loadGA();
  }

  function loadGA(){
    if(window.gaLoaded) return;
    window.gaLoaded = true;

    const s = document.createElement("script");
    s.src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
    s.async=true;
    document.head.appendChild(s);

    s.onload=function(){
      window.dataLayer=window.dataLayer||[];
      function gtag(){dataLayer.push(arguments);}
      gtag("js",new Date());
      gtag("config","G-XXXXXXXXXX");
    }
  }

})();