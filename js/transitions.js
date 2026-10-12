/* ==========================================================================
   CORSO ARREDI — TIPI DI TRANSIZIONE FRA PAGINE
   --------------------------------------------------------------------------
   Decide COME due pagine si scambiano, in base al rapporto che hanno fra
   loro. Il disegno dell'animazione sta in css/motion.css; a eseguirla è
   js/navigazione.js.

   Questo file non ascolta più eventi del browser. Risponde a due domande —
   che movimento serve fra queste due pagine, e quale elemento si trasforma
   nell'altro — e basta. Le domande gliele fa il navigatore.

   Il criterio è la gerarchia, non la pagina:

     home  ->  pagina interna     si entra, si va in profondità
     pagina interna  ->  home     si esce, movimento contrario
     interna  ->  interna         si scorre di lato, nel verso del menu
     qualsiasi  ->  contatti      gesto proprio: è l'azione, non una lettura
     qualsiasi  ->  privacy       dissolvenza piatta: è una pagina di servizio

   Così il movimento dice dove stai andando invece di essere decorazione.
   La stessa pagina entra in modo diverso a seconda da dove arrivi, ed è
   esattamente il punto.
   ========================================================================== */

window.CATransizioni = (function () {
  'use strict';

  /* Ordine di navigazione: serve a capire se un collegamento va avanti o
     indietro fra pagine dello stesso livello. Rispecchia il menu. */
  var ORDINE = [
    'index.html',
    'collezioni.html',
    'collezione-cucine.html',
    'collezione-living.html',
    'collezione-notte.html',
    'collezione-bagni.html',
    'collezione-hospitality.html',
    'collezione-falegnameria.html',
    'progettazione.html',
    'smart-living.html',
    'azienda.html',
    'studio.html',
    'contatti.html',
    'privacy.html'
  ];

  function nome(url) {
    try {
      var f = new URL(url, location.href).pathname.split('/').pop();
      return (f || 'index.html').toLowerCase();
    } catch (e) { return ''; }
  }

  /* ----------------------------------------------------------------------
     LA PROVENIENZA
     Chi arriva deve sapere da dove si veniva, anche quando ci si arriva da
     un segnalibro o da un collegamento condiviso — lì non c'è provenienza,
     e il codice deve comportarsi bene lo stesso invece di avere un caso
     particolare. sessionStorage: vive quanto la scheda, non lascia tracce.
     ---------------------------------------------------------------------- */
  var TRACCIA = 'ca-da';

  function scrivi(da) { try { sessionStorage.setItem(TRACCIA, da); } catch (e) {} }
  function leggi()    { try { return sessionStorage.getItem(TRACCIA) || ''; } catch (e) { return ''; } }

  window.addEventListener('pagehide', function () { scrivi(nome(location.href)); });

  /* ----------------------------------------------------------------------
     Che movimento serve
     ---------------------------------------------------------------------- */
  function tipi(da, a) {
    if (!da || !a || da === a) return ['ca-fade'];

    if (a === 'privacy.html' || da === 'privacy.html') return ['ca-fade'];
    if (a === 'contatti.html') return ['ca-action'];
    if (da === 'contatti.html') return ['ca-action-back'];

    /* Entrare in una collezione è scendere di un livello, uscirne è
       risalire: stesso gesto della home verso le pagine interne. */
    if (/^collezione-/.test(a) && !/^collezione-/.test(da)) return ['ca-in'];
    if (/^collezione-/.test(da) && !/^collezione-/.test(a)) return ['ca-out'];

    if (da === 'index.html') return ['ca-in'];
    if (a === 'index.html') return ['ca-out'];

    var i = ORDINE.indexOf(da), j = ORDINE.indexOf(a);
    if (i === -1 || j === -1) return ['ca-fade'];
    return [j > i ? 'ca-side ca-side-next' : 'ca-side ca-side-prev'];
  }

  /* Restituisce l'elenco piatto dei tipi e annota la provenienza. */
  function tipiPer(da, a) {
    scrivi(da);
    return tipi(da, a).join(' ').split(' ').filter(Boolean);
  }

  /* ----------------------------------------------------------------------
     UN SOLO ELEMENTO CON NOME PER VOLTA

     Ogni elemento con view-transition-name viene sollevato dal browser in
     un livello sopra la pagina per tutta la durata del passaggio. Su
     collezioni.html gli elementi candidati sono sei — uno per categoria —
     ma andando alle cucine ne combacia uno solo: gli altri cinque
     resterebbero appesi sopra la pagina nuova e poi svanirebbero di colpo.
     Era esattamente il difetto che si vedeva.

     Quindi il nome non sta nel foglio di stile. Gli elementi dichiarano
     solo di essere candidati, con data-morph; il nome lo riceve uno solo,
     qui, ed è quello che c'entra col viaggio in corso.
     ---------------------------------------------------------------------- */
  function idCollezione(pagina) {
    var m = /^collezione-([a-z]+)\.html$/.exec(pagina || '');
    return m ? m[1] : null;
  }

  function prepara(destinazione) {
    var qui = idCollezione(nome(location.href));
    var la  = idCollezione(destinazione);

    /* Il protagonista del passaggio è la stessa fotografia, che si stia
       entrando o uscendo. Fra due collezioni diverse non c'è nessun
       protagonista comune: sono due fotografie, e trasformare l'una
       nell'altra racconterebbe una cosa falsa. */
    var attivo = (qui && la && qui !== la) ? null : (la || qui);

    var nodi = document.querySelectorAll('[data-morph]');
    for (var i = 0; i < nodi.length; i++) {
      var n = nodi[i];
      var suo = attivo && n.getAttribute('data-morph') === attivo;
      n.style.setProperty('view-transition-name', suo ? 'ca-coll-' + attivo : 'none');
      n.style.setProperty('view-transition-class', suo ? 'ca-morph' : '');
    }
  }

  /* Dopo che la pagina è stata disegnata: nomina l'elemento in arrivo. */
  function preparaAllArrivo() { prepara(leggi()); }

  return {
    tipi: tipiPer,
    prepara: prepara,
    allArrivo: preparaAllArrivo,
    nome: nome
  };
})();
