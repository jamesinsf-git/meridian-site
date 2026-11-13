/* Everglen: runtime wiring.
   - Assembles the contact email so Cloudflare Email Obfuscation
     can't rewrite a literal mailto: into a /cdn-cgi/l/email-protection link.
   - Wires store badges to the live listings (index.html also carries the
     URLs directly, so the badges work without JavaScript). */

(function () {
  var STORE_URLS = {
    appstore: 'https://apps.apple.com/us/app/everglen-retirement-planner/id6815006947',
    googleplay: 'https://play.google.com/store/apps/details?id=com.wallyapps.meridian'
  };

  var addr = 'admin' + '@' + 'wallyapps' + '.' + 'com';

  document.querySelectorAll('[data-mail]').forEach(function (a) {
    a.setAttribute('href', 'mailto:' + addr);
  });
  document.querySelectorAll('[data-mail-show]').forEach(function (el) {
    el.textContent = addr;
  });
  document.querySelectorAll('[data-store]').forEach(function (a) {
    var url = STORE_URLS[a.getAttribute('data-store')];
    if (url) a.setAttribute('href', url);
  });

  // Hero promo video: a pause/play button, and no autoplay for reduced motion
  // (load() puts the poster, the video's closing card, back on screen).
  var promo = document.querySelector('.promo-video');
  var toggle = document.querySelector('[data-promo-toggle]');
  if (promo && toggle) {
    var sync = function () {
      var playing = !promo.paused;
      toggle.setAttribute('data-state', playing ? 'playing' : 'paused');
      toggle.setAttribute('aria-label', playing ? 'Pause the video' : 'Play the video');
    };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      promo.removeAttribute('autoplay');
      promo.pause();
      promo.load();
    }
    promo.addEventListener('play', sync);
    promo.addEventListener('pause', sync);
    toggle.addEventListener('click', function () {
      if (promo.paused) {
        var p = promo.play();
        if (p && p.catch) p.catch(function () {});
      } else {
        promo.pause();
      }
    });
    sync();
  }
})();
