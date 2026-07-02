/**
 * lang.js — Traducción ES/EN + Menú hamburguesa — WAyNET Servicios
 */

(function () {

  function applyLang(lang) {
    document.querySelectorAll('[data-es], [data-en]').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text !== null) el.innerHTML = text;
    });

    document.documentElement.lang = lang;

    var btnEs = document.getElementById('btn-es');
    var btnEn = document.getElementById('btn-en');
    if (btnEs) btnEs.classList.toggle('active', lang === 'es');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');

    localStorage.setItem('waynet-lang', lang);
  }

  // Función global para los botones onclick="setLang('en')"
  window.setLang = function (lang) {
    applyLang(lang);
  };

  // Todo dentro de DOMContentLoaded para garantizar que el HTML
  // ya esté cargado antes de buscar elementos
  document.addEventListener('DOMContentLoaded', function () {

    // ── Menú hamburguesa ──────────────────────────
    var toggle = document.querySelector('.menu-toggle');
    var nav    = document.querySelector('.nav-container nav');

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('active');
        toggle.textContent = isOpen ? '✕' : '☰';
        toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      });

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('active');
          toggle.textContent = '☰';
          toggle.setAttribute('aria-label', 'Abrir menú');
        });
      });
    }

    // ── Aplicar idioma guardado al cargar ─────────
    var saved = localStorage.getItem('waynet-lang') || 'es';
    applyLang(saved);

  });

})();
