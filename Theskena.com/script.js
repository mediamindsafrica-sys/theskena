// Skena video lightbox — click a video card, it plays right on the page (no leaving the site)
(function(){
  // Floating "Get in touch" WhatsApp widget — appears on every page that loads this script
  const waFloatHTML =
    '<a href="https://wa.me/254727128689?text=' + encodeURIComponent("Hi Skena! I'd like to know more about your services.") + '" ' +
    'target="_blank" class="wa-float" aria-label="Message us on WhatsApp">' +
    '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.001 2.667C8.65 2.667 2.667 8.65 2.667 16c0 2.578.717 4.99 1.964 7.05L2.667 29.333l6.45-1.925A13.28 13.28 0 0 0 16.001 29.333c7.35 0 13.333-5.983 13.333-13.333S23.351 2.667 16.001 2.667zm0 24.333a10.94 10.94 0 0 1-5.583-1.525l-.4-.238-4.15 1.238 1.246-4.05-.26-.417a10.93 10.93 0 0 1-1.686-5.841c0-6.05 4.925-10.975 10.975-10.975S26.976 9.95 26.976 16 21.667 26.976 16 26.976l.001.024zm6.017-8.217c-.33-.166-1.95-.962-2.25-1.075-.302-.108-.522-.166-.742.166-.22.33-.85 1.075-1.042 1.296-.192.22-.384.246-.714.083-.33-.166-1.394-.512-2.655-1.637-.982-.875-1.645-1.958-1.837-2.288-.192-.33-.02-.508.145-.673.15-.15.33-.384.495-.575.166-.192.22-.33.33-.55.11-.222.055-.412-.028-.578-.083-.166-.742-1.788-1.017-2.45-.267-.642-.54-.554-.742-.564l-.632-.01c-.22 0-.578.083-.88.412-.303.33-1.155 1.129-1.155 2.752 0 1.623 1.183 3.192 1.347 3.412.166.22 2.328 3.554 5.638 4.984.788.34 1.402.543 1.882.696.79.251 1.51.216 2.078.13.634-.094 1.95-.796 2.225-1.566.276-.77.276-1.428.193-1.566-.083-.138-.303-.22-.634-.386z"/></svg>' +
    '<span class="wa-label">Get in touch</span>' +
    '</a>';

  const modalHTML =
    '<div class="lightbox-overlay" id="lightboxOverlay" onclick="if(event.target===this) closeLightbox()">' +
      '<button class="lightbox-close" onclick="closeLightbox()">Close ✕</button>' +
      '<div class="lightbox-content" id="lightboxContent"></div>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', function(){
    if(!document.querySelector('.wa-float')){
      document.body.insertAdjacentHTML('beforeend', waFloatHTML);
    }
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // wire up every element with data-lightbox-type + data-lightbox-id
    document.querySelectorAll('[data-lightbox]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        openLightbox(el.getAttribute('data-lightbox-type'), el.getAttribute('data-lightbox-id'));
      });
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.addEventListener('keypress', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          openLightbox(el.getAttribute('data-lightbox-type'), el.getAttribute('data-lightbox-id'));
        }
      });
    });
  });

  window.openLightbox = function(type, id){
    const overlay = document.getElementById('lightboxOverlay');
    const content = document.getElementById('lightboxContent');
    if(type === 'youtube'){
      content.className = 'lightbox-content lightbox-16x9';
      content.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" ' +
        'title="Video" referrerpolicy="strict-origin-when-cross-origin" ' +
        'allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    } else if(type === 'instagram'){
      content.className = 'lightbox-content lightbox-9x16';
      content.innerHTML = '<iframe src="https://www.instagram.com/reel/' + id + '/embed" ' +
        'title="Video" allowfullscreen></iframe>';
    }
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function(){
    const overlay = document.getElementById('lightboxOverlay');
    const content = document.getElementById('lightboxContent');
    if(!overlay) return;
    overlay.classList.remove('active');
    content.innerHTML = ''; // stops playback
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLightbox();
  });
})();
