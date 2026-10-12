/* ==========================================================================
   CORSO ARREDI — IL CAMBIO PAGINA
   --------------------------------------------------------------------------
   PERCHÉ QUESTO FILE ESISTE

   Fino a ieri il passaggio fra due pagine era affidato alle transizioni
   fra documenti del browser: si scrive una regola nel CSS e il browser
   anima da solo il ricambio. Sulla carta è la soluzione più pulita che ci
   sia. Nella pratica ha smesso di funzionare troppo spesso, e il motivo è
   che dipende da cose che non controlliamo:

     · il documento nuovo deve arrivare e diventare disegnabile entro un
       tempo massimo, altrimenti il browser rinuncia e cambia pagina secco;
     · funziona solo su Chromium recenti, e solo su http(s) — aprendo i
       file da disco non parte mai;
     · basta un elemento con un nome duplicato, o una navigazione lanciata
       mentre la precedente è in corso, e l'intera animazione salta senza
       dire niente;
     · le due pagine devono concordare sul tipo di movimento, ma si
       parlano solo attraverso l'API di navigazione, che non è ovunque.

   Ogni singolo punto l'ho corretto uno per uno. Continuavano a restare i
   casi che non dipendono da noi, e "quasi sempre" non è una risposta.

   Quindi il documento non si cambia più. Si costruisce il contenuto di
   <main>, si ridisegna, il tutto dentro una transizione dello stesso
   documento — che il browser esegue subito, perché non deve aspettare
   niente. Nav e footer non vengono nemmeno toccati: restano gli stessi
   elementi, quindi non possono sfarfallare.

   E NON SI SCARICA NIENTE

   La prima versione andava a prendere la pagina nuova con una richiesta di
   rete. Funzionava online e non funzionava aprendo i file con un doppio
   clic, perché da disco il browser vieta a una pagina di leggerne altre.

   Poi mi sono accorto che non c'era niente da andare a prendere. Le pagine
   di questo sito non contengono testo: contengono segnaposto vuoti che il
   JavaScript riempie leggendo i file di contenuto, già in memoria. Le tre
   righe che descrivono ogni pagina stanno adesso in content/pagine.js e
   ci sono fin dall'inizio.

   Risultato: il cambio pagina animato funziona ovunque — online, da disco,
   senza connessione — e non aspetta mai niente.

   COSA NON CAMBIA

   Ogni pagina resta un file HTML completo che funziona da solo. Se il
   JavaScript non c'è, se il browser è vecchio, se qualcosa non risponde,
   i collegamenti si comportano da collegamenti normali e il sito funziona
   come ha sempre funzionato. Non c'è niente da mantenere in due versioni.
   ========================================================================== */

window.CANav = (function () {
  'use strict';

  var CA = window.CA;
  var T  = window.CATransizioni;

  var DA_DISCO = location.protocol === 'file:';

  /* Tutto quello che serve, e non è molto: sapere com'è fatta una pagina —
     che è in memoria — e saper animare un cambiamento. Se manca uno dei
     due si lascia perdere e i collegamenti restano collegamenti. */
  var SUPPORTO =
    typeof document.startViewTransition === 'function' &&
    window.PAGINE && typeof window.PAGINE === 'object';

  function nome(url) {
    try {
      var f = new URL(url, location.href).pathname.split('/').pop();
      return (f || 'index.html').toLowerCase();
    } catch (e) { return ''; }
  }

  /* ----------------------------------------------------------------------
     Il ricambio vero e proprio
     ---------------------------------------------------------------------- */
  var inCorso = false;

  function sostituisci(p, url, ancora, scorrimento) {
    /* Il titolo della scheda del browser e l'indirizzo canonico */
    var inglese = window.CALingua && window.CALingua.attiva() === 'en';
    document.title = (inglese && p.titoloEn) || p.titolo;
    var mioCan = document.querySelector('link[rel="canonical"]');
    if (mioCan && p.canonical) mioCan.setAttribute('href', p.canonical);

    /* Quale pagina è, e — se è una collezione — quale */
    document.body.dataset.page = p.page || '';
    if (p.collezione) document.body.dataset.collezione = p.collezione;
    else delete document.body.dataset.collezione;

    /* I segnaposto della pagina nuova al posto di quelli vecchi. Poi
       CA.ridisegna() li riempie come se la pagina fosse appena aperta. */
    var mioMain = document.getElementById('main');
    if (!mioMain) { location.href = url; return; }
    mioMain.innerHTML = p.main;

    CA.ridisegna();

    /* Lo scorrimento: in cima se si sta andando avanti, dov'era se si sta
       tornando indietro — è quello che il browser farebbe da solo. */
    if (ancora) {
      var bersaglio = document.getElementById(ancora);
      if (bersaglio && bersaglio.scrollIntoView) bersaglio.scrollIntoView();
      else window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, typeof scorrimento === 'number' ? scorrimento : 0);
    }
  }

  /* Dopo il cambio il fuoco va all'inizio del contenuto: chi naviga da
     tastiera o con la voce deve ripartire da lì e non da dove si trovava
     nella pagina precedente, che non esiste più. */
  function riporta() {
    var m = document.getElementById('main');
    if (!m) return;
    m.setAttribute('tabindex', '-1');
    try { m.focus({ preventScroll: true }); } catch (e) {}
    m.removeAttribute('tabindex');
  }

  function vai(url, opzioni) {
    opzioni = opzioni || {};
    if (inCorso) return Promise.resolve();
    inCorso = true;

    var da = nome(location.href);
    var a  = nome(url);
    var ancora = (url.split('#')[1] || '');

    var p = window.PAGINE[a];
    if (!p) { inCorso = false; location.href = url; return Promise.resolve(); }

    /* I nomi per il morphing si mettono PRIMA della fotografia dello
       stato di partenza: il browser scatta appena si chiama la
       transizione, e da lì in poi è tardi. */
    if (T) T.prepara(a);

    return Promise.resolve().then(function () {
      var tipi = T ? T.tipi(da, a) : [];

      function aggiorna() {
        /* Aprendo i file da disco il browser rifiuta di riscrivere
           l'indirizzo: è una restrizione di quella modalità, non un
           errore. La pagina cambia lo stesso, resta indietro solo quello
           che c'è scritto nella barra — e solo in anteprima locale. */
        if (!opzioni.indietro) {
          try { history.pushState({ y: 0 }, '', url); } catch (err) {}
        }
        sostituisci(p, url, ancora, opzioni.scorrimento);
      }

      /* La forma con i tipi è quella recente; dove non c'è, si passa la
         sola funzione e i tipi si aggiungono subito dopo. Il risultato è
         lo stesso, cambia solo come glielo si dice. */
      var vt;
      try {
        vt = document.startViewTransition({ update: aggiorna, types: tipi });
      } catch (e) {
        vt = document.startViewTransition(aggiorna);
        if (vt.types && vt.types.add) {
          tipi.join(' ').split(' ').forEach(function (t) {
            if (t) { try { vt.types.add(t); } catch (err) {} }
          });
        }
      }

      /* finished rifiuta se la transizione viene saltata: previsto. */
      return vt.finished.catch(function () {}).then(function () {
        inCorso = false;
        riporta();
      });
    }).catch(function () {
      /* Qualunque cosa vada storta, si cambia pagina come si è sempre
         fatto. Un sito che non si apre è peggio di un sito senza
         animazioni. */
      inCorso = false;
      location.href = url;
    });
  }

  /* ----------------------------------------------------------------------
     I collegamenti
     ---------------------------------------------------------------------- */
  /* Il nome della pagina con la coda della lingua attaccata. In italiano
     la coda è vuota e l'indirizzo resta pulito. */
  function conLingua(file) {
    return window.CALingua ? window.CALingua.indirizzo(file) : file;
  }

  function interno(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return null;
    if (a.getAttribute('rel') === 'external') return null;
    /* Il cambio lingua non è un cambio pagina: è un altro documento, con
       un altro titolo e un altro attributo lang. Cambiarlo senza
       ricaricare lascerebbe in giro pezzi della lingua di prima — il
       titolo nella scheda, i tag che dichiarano le due versioni. Questi
       collegamenti li lascia gestire al browser. */
    if (a.hasAttribute('data-ricarica')) return null;
    var u;
    try { u = new URL(a.href, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin) return null;
    if (!/\.html$/.test(u.pathname) && u.pathname !== '/') return null;
    return u;
  }

  if (SUPPORTO) {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href]');
      var u = interno(a);
      if (!u) return;

      /* Un'ancora dentro la stessa pagina non è un cambio pagina: la
         lascia gestire al browser, che sa già scorrere fin lì. */
      if (u.pathname === location.pathname && u.hash) return;

      e.preventDefault();
      /* La lingua viaggia con l'indirizzo: senza, basterebbe premere
         Aggiorna dopo due passaggi per ritrovarsi nell'altra lingua
         senza aver chiesto niente. */
      vai(conLingua(u.pathname.split('/').pop()) + u.hash);
    });

    /* Avanti e indietro del browser. Lo scorrimento lo ripristiniamo noi,
       perché il documento non cambia e il browser non sa che è successo
       qualcosa. */
    history.scrollRestoration = 'manual';
    window.addEventListener('popstate', function (e) {
      var y = (e.state && typeof e.state.y === 'number') ? e.state.y : 0;
      vai(conLingua(nome(location.href)) + location.hash, { indietro: true, scorrimento: y });
    });

    /* Prima di lasciare una pagina si annota dov'era lo scorrimento, così
       tornandoci si riprende dallo stesso punto.

       Con un ritardo, e non a ogni fotogramma di scorrimento: riscrivere
       la cronologia centinaia di volte al secondo fa scattare la
       protezione del browser, che comincia a ignorare le chiamate e
       stampa un avviso. 250ms sono impercettibili e bastano. */
    var attesa = null;
    window.addEventListener('scroll', function () {
      if (inCorso || attesa) return;
      attesa = setTimeout(function () {
        attesa = null;
        if (inCorso) return;
        try { history.replaceState({ y: window.scrollY }, ''); } catch (err) {}
      }, 250);
    }, { passive: true });
  }

  return { vai: vai, supporto: SUPPORTO, daDisco: DA_DISCO };
})();
