/* Everglen — runtime wiring.
   - Assembles the contact email so Cloudflare Email Obfuscation
     can't rewrite a literal mailto: into a /cdn-cgi/l/email-protection link.
   - Wires store badges to the live listings. Everglen isn't launched yet, so
     both URLs are empty and the badges stay "Coming soon". When a listing goes
     live, fill in its URL here and swap that badge's markup in index.html from
     the coming-soon <span> to an <a data-store="..."> link. */

(function () {
  var STORE_URLS = {
    appstore: '',
    googleplay: ''
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
})();
