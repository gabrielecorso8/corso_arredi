/* ==========================================================================
   CORSO ARREDI — NUCLEO CONDIVISO
   Helper, logo, navigazione, page header e footer.
   Usato da tutte le pagine. I renderer specifici stanno in app.js.

   Motion: il design system dichiara profilo "none". Nessuna animazione,
   nessun reveal allo scroll, nessun parallax.
   ========================================================================== */

window.CA = (function () {
  'use strict';

  /* I micro-testi dell'interfaccia stanno in content/ui.js, nelle due
     lingue. Qui dentro non si scrive più nessuna parola destinata a
     essere letta da qualcuno. */
  const U = (k, d) => (window.CAUI ? window.CAUI.t(k, d) : k);

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k === 'text') node.textContent = v;
      else if (k === 'on') Object.entries(v).forEach(([ev, fn]) => node.addEventListener(ev, fn));
      else node.setAttribute(k, v);
    }
    (Array.isArray(children) ? children : [children]).filter(Boolean).forEach(c => node.append(c));
    return node;
  }

  /* ---------- Immagini ---------- */

  function img(src, alt, eager) {
    if (!src) return placeholder(alt);
    const im = el('img', { src, alt: alt || '' });
    if (eager) im.setAttribute('fetchpriority', 'high');
    else { im.setAttribute('loading', 'lazy'); im.setAttribute('decoding', 'async'); }
    im.addEventListener('error', () => im.replaceWith(placeholder(alt)), { once: true });
    return im;
  }

  function placeholder(alt) {
    const label = String(alt || U('img.mancante')).replace(/"/g, '&quot;');
    const wrap = el('div', {
      html: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="${label}" style="width:100%;height:100%;display:block">
        <rect width="300" height="400" fill="#1d1d1e"/>
        <line x1="0" y1="400" x2="300" y2="0" stroke="#e5e7eb" stroke-opacity=".12"/>
      </svg>`
    });
    wrap.style.cssText = 'width:100%;height:100%';
    return wrap;
  }

  /* ---------- Bottoni: solo le quattro varianti del design system ---------- */

  const BTN = {
    outline: 'btn btn--outline',
    'outline-invert': 'btn btn--outline-invert',
    filled: 'btn btn--filled',
    ghost: 'btn btn--ghost'
  };
  function btn(label, href, style) {
    return el('a', { class: BTN[style] || BTN.outline, href, text: label });
  }

  /* ---------- Logo lockup: monogramma + wordmark ---------- */

  function logo(variant) {
    const B = window.SITE.brand;
    const mark = el('span', { class: 'logo__mark' });

    /* Il monogramma arriva da content/logo.js come SVG inline: eredita
       currentColor e si inverte da solo tra banda chiara e banda scura.
       Inline e non via fetch, così funziona anche su file://. */
    if (window.LOGO_SVG) mark.innerHTML = window.LOGO_SVG;
    else mark.remove();   /* resta il solo wordmark */

    return el('a', {
      class: 'logo' + (variant ? ' logo--' + variant : ''),
      href: 'index.html',
      'aria-label': U('nav.home')
    }, [
      mark,
      el('span', { class: 'logo__rule', 'aria-hidden': 'true' }),
      el('span', { class: 'logo__word', html: `${B.name} <b>${B.nameBold}</b>` })
    ]);
  }

  /* ---------- Intestazione di sezione ---------- */

  function head(label, title, extra) {
    return el('div', { class: 'section-head' }, [
      label ? el('p', { class: 't-meta', text: label }) : null,
      title ? el('h2', { class: 't-heading-lg', html: title }) : null,
      extra || null
    ]);
  }

  /* ======================================================================
     NAVIGAZIONE
     ====================================================================== */
  /* ----------------------------------------------------------------------
     Il contatore delle fotografie segnate.
     Sta in testa a ogni pagina ma esiste solo se serve: finché il
     visitatore non ha segnato niente, non c'è. Comparire dal nulla al
     primo cuore è anche il modo più breve per spiegare a cosa serve.
     ---------------------------------------------------------------------- */
  function contatore() {
    if (!window.CAPref) return null;
    const n = el('span', { class: 'segna__n' });
    const a = el('a', {
      class: 'segna', href: 'contatti.html#preferiti',
      html: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">' +
            '<path d="M12 20.5S3.5 15 3.5 9.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8.5 2.1c0 5.6-8.5 11.1-8.5 11.1z" ' +
            'fill="currentColor"/></svg>'
    });
    a.append(n);

    /* La nav sopravvive al cambio pagina, quindi questo ascoltatore va
       registrato una volta sola e non va spento con il resto. */
    window.CAPref.osserva(l => {
      a.hidden = l.length === 0;
      n.textContent = l.length;
      a.setAttribute('aria-label',
        l.length === 1 ? U('segna.una') : U('segna.molte', { n: l.length }));
      if (l.length) { a.classList.remove('is-batte'); void a.offsetWidth; a.classList.add('is-batte'); }
    });
    return a;
  }

  /* ----------------------------------------------------------------------
     LE DUE BANDIERE

     Bandiere vere, disegnate qui come SVG: due rettangoli di colore per
     l'italiana, la Union Jack per l'inglese. Inline e non come file,
     perché così ereditano la dimensione dal testo, restano nitide a
     qualunque zoom e funzionano anche aprendo il sito da disco.

     PERCHÉ SI VEDONO TUTTE E DUE

     Il modo compatto sarebbe mostrare solo l'altra lingua: una bandiera
     sola, che cambia. Ma una bandiera sola non dice se sei tu adesso o
     dove andrai se la premi — è la stessa immagine con due significati
     opposti, e chi arriva sul sito non ha modo di indovinare quale.

     Con tutte e due si legge in un colpo: quella accesa è dove sei,
     l'altra è dove puoi andare. Costa venti pixel in più e toglie una
     domanda.

     Una bandiera non è una lingua — in Svizzera si parla italiano, negli
     Stati Uniti inglese — quindi accanto c'è sempre la sigla, e per chi
     legge con la voce c'è il nome per esteso. La bandiera è il richiamo,
     non l'informazione.
     ---------------------------------------------------------------------- */
  const BANDIERE = {
    it: '<svg viewBox="0 0 21 15" aria-hidden="true" focusable="false">' +
        '<rect width="7" height="15" fill="#008C45"/>' +
        '<rect x="7" width="7" height="15" fill="#F4F5F0"/>' +
        '<rect x="14" width="7" height="15" fill="#CD212A"/></svg>',
    en: '<svg viewBox="0 0 60 30" aria-hidden="true" focusable="false">' +
        '<clipPath id="ca-uk"><path d="M0 0v30h60V0z"/></clipPath>' +
        '<g clip-path="url(#ca-uk)">' +
        '<path d="M0 0v30h60V0z" fill="#012169"/>' +
        '<path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/>' +
        '<path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" stroke-width="4"/>' +
        '<path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/>' +
        '<path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/>' +
        '</g></svg>'
  };

  function bandiere() {
    if (!window.CALingua) return null;
    const L = window.CALingua;
    const qui = (location.pathname.split('/').pop() || 'index.html');

    return el('div', { class: 'lingue', role: 'group', 'aria-label': U('lingua.scegli') },
      L.LINGUE.map(lang => {
        const attiva = lang === L.attiva();
        return el('a', {
          class: 'lingua' + (attiva ? ' is-attiva' : ''),
          /* Esplicito anche per l'italiano: una bandiera premuta non può
             produrre un indirizzo che non dice in che lingua va. Era
             esattamente il difetto per cui dall'inglese non si tornava
             indietro. La coda si ripulisce da sola subito dopo. */
          href: L.indirizzoLingua(qui, lang),
          hreflang: lang,
          lang: lang,
          /* Il cambio lingua ricarica davvero la pagina: cambia il titolo,
             cambia l'attributo lang del documento, cambiano i tag che
             dichiarano le due versioni. Farlo a metà, senza ricaricare,
             lascerebbe in giro pezzi della lingua di prima. */
          'data-ricarica': 'true',
          'aria-current': attiva ? 'true' : null,
          'aria-label': U('lingua.' + lang)
        }, [
          el('span', { class: 'lingua__bandiera', html: BANDIERE[lang] }),
          el('span', { class: 'lingua__sigla', 'aria-hidden': 'true', text: lang.toUpperCase() })
        ]);
      }));
  }

  function renderNav() {
    const mount = $('#nav');
    if (!mount) return;
    const S = window.SITE;
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    const links = () => S.nav.links.map(l => el('a', {
      class: 'nav__link', href: l.href, text: l.label,
      'aria-current': l.href.toLowerCase() === current ? 'page' : null
    }));

    const toggle = el('button', {
      class: 'nav__toggle', type: 'button',
      'aria-expanded': 'false', 'aria-controls': 'nav-panel', 'aria-label': U('menu.apri')
    }, [el('span'), el('span')]);

    const panel = el('div', { class: 'nav__panel', id: 'nav-panel', 'data-open': 'false' }, [
      el('nav', { class: 'nav__panel-links', 'aria-label': U('menu.principale') },
         [...links(), el('a', { href: S.nav.cta.href, text: S.nav.cta.label })]),
      el('div', { class: 'stack stack--tight' }, [
        /* Nel menu a tutto schermo le bandiere ci sono comunque: sotto i
           900px spariscono dalla barra per non affollarla, e se non fossero
           qui la lingua non si potrebbe cambiare da telefono. */
        bandiere(),
        el('a', { class: 't-body', href: S.contact.phoneHref, text: S.contact.phoneLabel }),
        el('a', { class: 't-body-sm', href: 'mailto:' + S.contact.email, text: S.contact.email })
      ])
    ]);

    const bar = el('header', { class: 'nav nav--over-hero', id: 'site-nav' }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'nav__inner' }, [
          logo(),
          el('nav', { class: 'nav__links', 'aria-label': U('menu.principale') }, links()),
          el('div', { class: 'nav__actions' }, [
            bandiere(),
            contatore(),
            btn(S.nav.cta.label, S.nav.cta.href, 'outline-invert'),
            toggle
          ])
        ])
      ])
    ]);

    mount.replaceWith(bar);
    document.body.append(panel);

    const cta = $('.nav__actions .btn', bar);
    let lastFocus = null;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', U(open ? 'menu.chiudi' : 'menu.apri'));
      panel.dataset.open = String(open);
      document.documentElement.classList.toggle('ha-overlay', open);
      if (open) { lastFocus = document.activeElement; $('a', panel).focus(); }
      else if (lastFocus) { lastFocus.focus(); }
    }

    toggle.addEventListener('click', () => setOpen(panel.dataset.open !== 'true'));
    panel.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });

    document.addEventListener('keydown', e => {
      if (panel.dataset.open !== 'true') return;
      if (e.key === 'Escape') { setOpen(false); return; }
      /* Focus trap: il menu a tutto schermo non deve lasciar uscire il tab */
      if (e.key === 'Tab') {
        const f = $$('a, button', panel);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* LA BARRA RESTA IN ALTO, E SI VEDE

       Era già fissa, ma sulla home diventava leggibile solo dopo il 72%
       della prima schermata: per quasi tutta l'apertura restava
       trasparente sopra una fotografia, e trasparente sopra una
       fotografia vuol dire che a volte non c'è.

       Adesso basta cominciare a scorrere. Ferma in cima alla home resta
       trasparente — lì il titolo è l'unica cosa da guardare e una barra
       piena gli toglierebbe spazio — ma al primo movimento prende il suo
       fondo sfocato e non lo lascia più.

       Sulle pagine interne è sempre in quello stato. */
    const hero = $('.hero');
    const sync = () => {
      const stuck = window.scrollY > 24;
      bar.classList.toggle('nav--stuck', stuck);
      bar.classList.toggle('nav--over-hero', !stuck);
      if (cta) cta.className = stuck ? BTN.outline : BTN['outline-invert'];
    };
    if (!hero) {
      bar.classList.add('nav--stuck');
      bar.classList.remove('nav--over-hero');
      if (cta) cta.className = BTN.outline;
    } else {
      window.addEventListener('scroll', sync, { passive: true });
      sync();
    }
  }

  /* ======================================================================
     PAGE HEADER — solo pagine interne
     ====================================================================== */
  function renderPageHead(data) {
    const mount = $('#page-head');
    if (!mount || !data) return;

    /* Con una fotografia di sfondo il blocco cambia classe e riceve un velo.
       "tone" dice se la foto e' chiara (testo scuro) o in penombra (testo
       chiaro): lo scrim si inverte di conseguenza. */
    const foto = Boolean(data.headImage);
    const tono = data.tone === 'dark' ? 'dark' : 'light';

    mount.replaceWith(el('section', {
      class: 'page-head' + (foto ? ' page-head--photo page-head--' + tono : '')
    }, [
      foto ? el('div', { class: 'page-head__media' },
                [img(data.headImage, data.headImageAlt, true)]) : null,
      el('div', { class: 'container' }, [
        el('div', { class: 'page-head__inner' }, [
          /* Le pagine di secondo livello (una collezione) dichiarano il
             percorso completo; le altre hanno solo Home / se stesse. */
          el('nav', { class: 't-meta crumbs', 'aria-label': U('percorso') },
            (data.crumbs || [{ label: U('crumb.home'), href: 'index.html' }])
              .flatMap(c => [
                el('a', { href: c.href, text: c.label }),
                el('span', { 'aria-hidden': 'true', text: '/' })
              ])
              .concat([el('span', { 'aria-current': 'page', text: data.crumb })])),
          el('h1', { class: 't-heading-lg', html: data.title }),
          data.lede ? el('p', { class: 't-body-lg measure', html: data.lede }) : null
        ])
      ])
    ]));
  }

  /* ======================================================================
     BANDA DI CHIUSURA — riusata su tutte le pagine interne
     ====================================================================== */
  function renderClosing() {
    const mount = $('#closing');
    if (!mount) return;
    const c = window.SITE.closing;

    mount.replaceWith(el('section', { class: 'section section--dark' }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'statement' }, [
          el('h2', { class: 't-heading-lg', html: c.title }),
          el('p', { class: 't-body t-dim', style: 'margin-top:var(--spacing-20)', html: c.text }),
          el('div', { class: 'cluster', style: 'justify-content:center;margin-top:var(--spacing-36)' },
             c.actions.map(a => btn(a.label, a.href, a.style)))
        ])
      ])
    ]));
  }

  /* ======================================================================
     FOOTER
     ====================================================================== */
  function renderFooter() {
    const mount = $('#footer');
    if (!mount) return;
    const S = window.SITE;

    const cols = S.footer.columns.map(col => el('div', {}, [
      el('p', { class: 't-meta footer__col-title', text: col.title }),
      el('nav', { class: 'footer__list', 'aria-label': col.title },
         col.links.map(l => el('a', { href: l.href, text: l.label })))
    ]));

    mount.replaceWith(el('footer', { class: 'footer' }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'footer__top' }, [
          el('div', { class: 'footer__brand' }, [
            logo('footer'),
            el('p', { class: 't-body-sm t-dim', text: S.brand.tagline }),
            el('p', {
              class: 't-body-sm',
              html: `<a href="${S.contact.phoneHref}">${S.contact.phoneLabel}</a> · ` +
                    `<a href="mailto:${S.contact.email}">${S.contact.email}</a>`
            }),
            el('p', { class: 't-body-sm t-dim', text: S.contact.address })
          ]),
          ...cols
        ]),
        el('div', { class: 'footer__bottom' }, [
          el('span', { class: 'footer__legal',
            text: `${S.brand.copyright} ${new Date().getFullYear()} · ${S.brand.vat}` }),
          el('div', { class: 'footer__row' }, S.social.map(s => el('a', {
            href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.name
          })))
        ])
      ])
    ]));
  }

  /* ======================================================================
     I DATI DI UNA PAGINA DI COLLEZIONE
     Le sei pagine non hanno contenuti propri: leggono la loro categoria da
     content/pages.js, la stessa che alimenta l'indice. Un testo si corregge
     in un posto solo e cambia in tutti e due.
     ====================================================================== */
  function datiCollezione() {
    const raccolta = ((window.PAGES || {}).collezioni || {}).categories || [];
    const id = document.body.dataset.collezione;
    const c = raccolta.filter(x => x.id === id)[0];
    if (!c) { console.error('collezione sconosciuta: ' + id); return null; }
    return Object.assign({}, c, {
      crumb: c.name,
      crumbs: [
        { label: U('crumb.home'), href: 'index.html' },
        { label: U('crumb.collezioni'), href: 'collezioni.html' }
      ],
      title: c.name,
      lede: c.text
      /* Nessuna fotografia in testata: due righe sotto comincia la giostra,
         e mettere un'immagine grande subito sopra un'altra immagine grande
         è il modo più rapido per non farne guardare nessuna delle due. */
    });
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  /* ----------------------------------------------------------------------
     SMONTAGGIO
     Ogni pezzo di pagina che accende qualcosa che continua da solo — un
     intervallo, un osservatore, un ascoltatore delle preferenze — lascia
     qui il modo di spegnerlo. Prima di ridisegnare la pagina si spegne
     tutto: senza, cambiando pagina cinque volte resterebbero cinque
     giostre a girare in sottofondo su nodi che non esistono più.
     ---------------------------------------------------------------------- */
  let daSpegnere = [];
  function pulizia(fn) { if (typeof fn === 'function') daSpegnere.push(fn); }
  function spegni() {
    const l = daSpegnere; daSpegnere = [];
    l.forEach(fn => { try { fn(); } catch (e) {} });
  }

  let renderers = null;

  /* Disegna la pagina corrente. Chiamata una volta all'avvio e poi a ogni
     cambio pagina, che avviene senza ricaricare il documento. */
  function ridisegna() {
    if (!window.SITE) { console.error('content/site.js non caricato'); return; }
    spegni();
    /* Nav e footer esistono già dopo il primo giro: i loro segnaposto non
       ci sono più e le due funzioni escono da sole. È voluto — restando
       gli stessi elementi, non sfarfallano mai. */
    renderNav();
    /* La lingua va ridichiarata a ogni pagina: cambiando pagina senza
       ricaricare, i collegamenti che dicono "questa pagina esiste anche
       nell'altra lingua" puntavano ancora alla pagina di prima. */
    if (window.CALingua) {
      window.CALingua.dichiara();
      /* La coda "?lang=it" ha finito il suo lavoro appena è stata letta:
         da qui in poi comanda la scelta ricordata, e l'indirizzo torna
         pulito. */
      window.CALingua.pulisci();
      /* Anche il titolo della scheda: al primo caricamento è quello
         scritto nell'HTML, che è in italiano. Su una pagina inglese va
         sostituito subito, non solo al primo cambio pagina — le schede
         aperte sono la prima cosa che si guarda tornando al browser. */
      var qui = (location.pathname.split('/').pop() || 'index.html');
      var scheda = (window.PAGINE || {})[qui];
      if (scheda && window.CALingua.attiva() === 'en' && scheda.titoloEn) {
        document.title = scheda.titoloEn;
      }
    }
    const key = document.body.dataset.page;
    const data = key === 'collezione' ? datiCollezione() : (window.PAGES || {})[key];
    renderPageHead(data);
    if (typeof renderers === 'function') renderers(data);
    renderClosing();
    renderFooter();
    segnaPaginaCorrente();
    /* Adesso che la pagina esiste, si decide quale elemento morfa. */
    if (window.CATransizioni) window.CATransizioni.allArrivo();
  }

  /* La voce di menu della pagina in cui ci si trova */
  function segnaPaginaCorrente() {
    const qui = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav__link, .nav__panel a').forEach(a => {
      const suo = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (suo === qui) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function boot(pageRenderers) {
    renderers = pageRenderers;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ridisegna);
    else ridisegna();
  }

  /* ======================================================================
     RIENTRO DALLA CRONOLOGIA
     Il browser tiene la pagina viva quando si preme Indietro: la ripesca
     esattamente com'era, blocchi dello scorrimento compresi. Se si era
     usciti con una galleria o un menu aperto, si tornava su una pagina
     che sembrava congelata. Qui si sblocca tutto al rientro, una volta.
     ====================================================================== */
  window.addEventListener('pageshow', () => {
    document.documentElement.classList.remove('ha-overlay');
    document.querySelectorAll('dialog[open]').forEach(d => { try { d.close(); } catch (e) {} });
    const p = document.querySelector('.nav__panel');
    if (p) p.dataset.open = 'false';
  });

  return { $, $$, el, img, placeholder, btn, logo, head, boot, ridisegna, pulizia };
})();
