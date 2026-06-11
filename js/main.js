/* agustin-rios.github.io — progressive enhancement only:
   todo el contenido vive en el HTML; este archivo solo decora. */
(function () {
  'use strict';

  document.documentElement.classList.replace('no-js', 'js');

  /* ---------- i18n ES/EN ---------- */
  var I18N = {
    es: {
      'skip': 'Saltar al contenido',
      'nav.work': 'trabajo',
      'nav.stack': 'stack',
      'nav.edu': 'formación',
      'nav.contact': 'contacto',
      'hero.folio': 'portada',
      'hero.intro': 'Construyo y opero plataformas: infraestructura cloud-native, APIs en TypeScript y Python, identidad y tooling para flujos con IA.',
      'hero.cta1': 'Ver proyectos',
      'hero.cta2': 'Contacto',
      'perfil.lede': 'Me interesa el punto donde la infraestructura se encuentra con el producto: plataformas que se operan como producción —con GitOps, observabilidad y postmortems—, backends que aguantan tráfico real y sistemas de identidad que no estorban. Últimamente, también el tooling que conecta agentes de IA con sistemas reales.',
      'perfil.edu': 'Ingeniería · PUC Chile',
      'perfil.status': 'abierto a conversar',
      'work.title': 'Trabajo seleccionado',
      'work.lab.badge': 'status: en curso',
      'work.lab.desc': 'Laboratorio autodirigido para construir y operar una plataforma cloud-native multi-tenant simulada: Kubernetes, GitOps con ArgoCD, IaC con OpenTofu y observabilidad completa.',
      'work.lab.extra': 'Pensado para operarse como producción: ADRs por decisión, postmortems de incidentes simulados, runbooks y CI con escaneo de secretos y validación de Terraform. Roadmap de 12 meses, en construcción pública.',
      'work.cururo.desc': 'CLI en Python que automatiza la revisión de código con la API de OpenAI, integrable en GitHub Actions y con resultados vía webhook. Publicada en PyPI, con Docker y release automatizado.',
      'work.aegis.desc': 'Stack IAM autohospedado sobre Keycloak 26 y PostgreSQL: importación dinámica de realms, secretos OAuth inyectados vía Admin API (nunca en archivos), temas custom y ~40 targets de Make para operación.',
      'work.buda.desc': 'API REST en TypeScript y Express que calcula spreads de mercados cripto de Buda.com y gestiona alertas. Cliente HTTP tipado con openapi-typescript, tests de integración con Jest y Supertest, Docker y CI.',
      'work.dashboard.desc': 'Dashboard de productos con Next.js y React: route handlers como backend-for-frontend, arquitectura hexagonal ligera (puertos, dominio, adaptadores) y KPIs agregados sobre un catálogo paginado.',
      'work.invest.desc': 'API en Django y DRF para valorizar portafolios de inversión: carga precios y ponderaciones desde Excel y reconstruye el valor diario por activo con aritmética Decimal para precisión financiera.',
      'edu.title': 'Formación',
      'edu.degree': 'Ingeniería, especialidad en Computación — Pontificia Universidad Católica de Chile',
      'contact.title': 'Hablemos',
      'contact.copy': 'copiar',
      'contact.copied': 'copiado ✓',
      'colofon': 'Compuesto en Archivo e IBM Plex Mono. HTML, CSS y JS vanilla — sin frameworks, sin build step. exit 0 ✓'
    },
    en: {
      'skip': 'Skip to content',
      'nav.work': 'work',
      'nav.stack': 'stack',
      'nav.edu': 'background',
      'nav.contact': 'contact',
      'hero.folio': 'cover',
      'hero.intro': 'I build and operate platforms: cloud-native infrastructure, TypeScript and Python APIs, identity, and tooling for AI-powered workflows.',
      'hero.cta1': 'View work',
      'hero.cta2': 'Get in touch',
      'perfil.lede': 'I care about the point where infrastructure meets product: platforms operated like production —with GitOps, observability and postmortems—, backends that hold up under real traffic, and identity systems that stay out of the way. Lately, also the tooling that connects AI agents to real systems.',
      'perfil.edu': 'Engineering · PUC Chile',
      'perfil.status': 'open to interesting problems',
      'work.title': 'Selected work',
      'work.lab.badge': 'status: in progress',
      'work.lab.desc': 'Self-directed lab to build and operate a simulated multi-tenant cloud-native platform: Kubernetes, GitOps with ArgoCD, IaC with OpenTofu and full observability.',
      'work.lab.extra': 'Designed to be operated like production: ADRs per decision, postmortems for simulated incidents, runbooks, and CI with secret scanning and Terraform validation. A 12-month roadmap, built in public.',
      'work.cururo.desc': 'Python CLI that automates code review with the OpenAI API, pluggable into GitHub Actions with webhook-published results. Released on PyPI, with Docker and automated releases.',
      'work.aegis.desc': 'Self-hosted IAM stack on Keycloak 26 and PostgreSQL: dynamic realm import, OAuth secrets injected via the Admin API (never stored in files), custom themes and ~40 Make targets for operations.',
      'work.buda.desc': 'TypeScript/Express REST API that computes crypto market spreads from Buda.com and manages alerts. Typed HTTP client via openapi-typescript, integration tests with Jest and Supertest, Docker and CI.',
      'work.dashboard.desc': 'Product dashboard with Next.js and React: route handlers as a backend-for-frontend, light hexagonal architecture (ports, domain, adapters) and aggregated KPIs over a paginated catalog.',
      'work.invest.desc': 'Django/DRF API for investment portfolio valuation: ingests prices and weights from Excel and reconstructs daily per-asset value using Decimal arithmetic for financial precision.',
      'edu.title': 'Education',
      'edu.degree': 'Engineering, Computer Science track — Pontificia Universidad Católica de Chile',
      'contact.title': "Let's talk",
      'contact.copy': 'copy',
      'contact.copied': 'copied ✓',
      'colofon': 'Set in Archivo and IBM Plex Mono. Vanilla HTML, CSS and JS — no frameworks, no build step. exit 0 ✓'
    }
  };

  var currentLang = 'es';

  function applyLang(lang) {
    var dict = I18N[lang];
    if (!dict) return;
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-toggle__opt').forEach(function (opt) {
      opt.classList.toggle('is-active', opt.getAttribute('data-lang') === lang);
    });
    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.setAttribute('aria-label', lang === 'es' ? 'ES — EN: switch to English' : 'ES — EN: cambiar a español');
    }
    try { localStorage.setItem('lang', lang); } catch (e) { /* modo privado */ }
  }

  var toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      applyLang(currentLang === 'es' ? 'en' : 'es');
    });
  }

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* modo privado */ }
  if (saved && saved !== 'es') applyLang(saved);

  /* ---------- Scroll-spy ---------- */
  var spyLinks = document.querySelectorAll('.nav__links a[data-spy]');
  if ('IntersectionObserver' in window && spyLinks.length) {
    var byId = {};
    spyLinks.forEach(function (a) { byId[a.getAttribute('data-spy')] = a; });
    var activate = function (id) {
      spyLinks.forEach(function (a) { a.classList.remove('is-active'); });
      if (byId[id]) byId[id].classList.add('is-active');
    };
    // al fondo de la página, la última sección gana aunque nunca cruce la banda del observer
    var atBottom = function () {
      return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    };
    var spy = new IntersectionObserver(function (entries) {
      if (atBottom()) { activate('contacto'); return; }
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(entry.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ['trabajo', 'stack', 'formacion', 'contacto'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    window.addEventListener('scroll', function () {
      if (atBottom()) activate('contacto');
    }, { passive: true });
  }

  /* ---------- Reveal de secciones (una sola vez) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { revealer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Copiar email ---------- */
  var copyBtn = document.getElementById('copy-email');
  var feedback = document.getElementById('copy-feedback');
  if (copyBtn && feedback) {
    if (!navigator.clipboard) {
      copyBtn.hidden = true; // el mailto y el email en texto siguen disponibles
    } else {
      var feedbackTimer = null;
      var flash = function (text) {
        feedback.textContent = text;
        clearTimeout(feedbackTimer);
        feedbackTimer = setTimeout(function () { feedback.textContent = ''; }, 1500);
      };
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(copyBtn.getAttribute('data-email')).then(function () {
          flash(I18N[currentLang]['contact.copied']);
        }).catch(function () {
          flash(currentLang === 'es' ? 'error — copia manual' : 'error — copy manually');
        });
      });
    }
  }
})();
