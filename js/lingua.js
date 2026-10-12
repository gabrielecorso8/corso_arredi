/* ==========================================================================
   CORSO ARREDI — LE DUE LINGUE
   --------------------------------------------------------------------------
   Il sito esiste in italiano e in inglese. Non sono due siti: è lo stesso
   sito che legge un altro insieme di parole.

   PERCHÉ NON DUE CARTELLE DI PAGINE

   La strada classica è duplicare i file: una cartella /en con quindici
   pagine gemelle. Qui non serve, e sarebbe un peso. Le pagine di questo
   sito non contengono testo — contengono segnaposto vuoti che il
   JavaScript riempie leggendo i file di contenuto. Duplicarle vorrebbe
   dire duplicare quindici scheletri vuoti e doverli tenere allineati per
   sempre a ogni modifica.

   Quindi le pagine restano quindici, e cambia il libro da cui leggono:

     content/site.js      +  content/site.en.js
     content/pages.js     +  content/pages.en.js
     content/ui.js        (i due micro-testi, uno accanto all'altro)

   COSA SI PERDE, DETTO CHIARO

   Con due cartelle di pagine ogni lingua avrebbe un indirizzo suo, e un
   motore di ricerca le troverebbe senza eseguire niente. Qui la lingua sta
   in coda all'indirizzo — index.html?lang=en — quindi gli indirizzi sono
   comunque due, diversi, condivisibili e indicizzabili; ma per leggerli un
   motore deve eseguire il JavaScript. Lo fa già per tutto il resto di
   questo sito, che è costruito così dall'inizio.

   Se un giorno il sito passa a un vero server e la ricerca in inglese
   diventa importante, la strada è generare le pagine statiche per lingua a
   partire da questi stessi file di contenuto. Nessuna riscrittura: solo un
   passaggio in più prima di pubblicare.

   COME SI DECIDE LA LINGUA

     1. quello che c'è scritto nell'indirizzo (?lang=en)
     2. quello che si era scelto l'ultima volta
     3. la lingua del browser, se è inglese
     4. italiano

   L'ordine non è casuale: un indirizzo condiviso deve aprirsi nella lingua
   in cui è stato condiviso, sempre, anche se chi lo riceve aveva scelto
   l'altra. La scelta di prima vale solo quando l'indirizzo non dice niente.

   QUESTO FILE VA CARICATO PER PRIMO

   Prima di shared.js e di app.js: quando quelli partono, window.SITE e
   window.PAGES devono già essere il libro giusto.
   ========================================================================== */

window.CALingua = (function () {
  'use strict';

  var LINGUE = ['it', 'en'];
  var CHIAVE = 'ca-lingua';

  function daIndirizzo() {
    try {
      var m = /[?&]lang=([a-z]{2})/i.exec(location.search);
      return m ? m[1].toLowerCase() : null;
    } catch (e) { return null; }
  }

  function ricordata() {
    try { return localStorage.getItem(CHIAVE); } catch (e) { return null; }
  }

  function dalBrowser() {
    var l = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return l.indexOf('en') === 0 ? 'en' : null;
  }

  function valida(x) { return LINGUE.indexOf(x) > -1 ? x : null; }

  var attiva = valida(daIndirizzo()) || valida(ricordata()) || dalBrowser() || 'it';

  /* Se l'indirizzo lo diceva, quella diventa anche la scelta ricordata:
     chi apre un collegamento in inglese e poi gira per il sito resta in
     inglese anche quando l'indirizzo non lo ripete. */
  var memoriaOk = true;
  try { localStorage.setItem(CHIAVE, attiva); } catch (e) { memoriaOk = false; }

  var altra = attiva === 'it' ? 'en' : 'it';

  /* ----------------------------------------------------------------------
     L'INDIRIZZO PORTA LA LINGUA CON SÉ

     Serve al cambio pagina, che riscrive l'indirizzo senza ricaricare: se
     la coda si perdesse, basterebbe un tasto Aggiorna per ritrovarsi
     nell'altra lingua senza aver chiesto niente.

     In italiano la coda non si scrive: è la lingua di casa, e un indirizzo
     pulito è meglio di uno con scritto sopra l'ovvio.
     ---------------------------------------------------------------------- */
  function coda(lingua) {
    var l = lingua || attiva;
    return l === 'it' ? '' : '?lang=' + l;
  }

  function indirizzo(file, lingua) {
    var pezzi = String(file || '').split('#');
    var nome = pezzi[0].split('?')[0];
    return nome + coda(lingua) + (pezzi[1] ? '#' + pezzi[1] : '');
  }

  /* ----------------------------------------------------------------------
     L'INDIRIZZO DELLE BANDIERE DICE SEMPRE LA LINGUA, ANCHE L'ITALIANA

     Qui la coda si scrive comunque, e non è un'incoerenza con la regola di
     sopra: è la correzione di un difetto vero.

     La bandiera italiana puntava a "index.html", pulito. Ma un indirizzo
     pulito, per la regola con cui si decide la lingua, è un indirizzo che
     NON dice niente — e quando l'indirizzo non dice niente vince la scelta
     ricordata, che a quel punto era "inglese". Risultato: dall'inglese non
     si tornava più indietro. La bandiera si premeva, la pagina si
     ricaricava, e restava in inglese.

     Premere una bandiera è l'atto più esplicito che ci sia in tutto il
     sito. Non può produrre un indirizzo ambiguo.

     La coda "?lang=it" resta nella barra degli indirizzi per un istante e
     poi sparisce da sola: appena la scelta è stata registrata, l'indirizzo
     torna pulito (vedi pulisci, qui sotto).
     ---------------------------------------------------------------------- */
  function indirizzoLingua(file, lingua) {
    var pezzi = String(file || '').split('#');
    var nome = pezzi[0].split('?')[0];
    return nome + '?lang=' + (lingua || attiva) + (pezzi[1] ? '#' + pezzi[1] : '');
  }

  /* ----------------------------------------------------------------------
     E POI SI RIPULISCE

     In italiano la coda ha esaurito il suo compito nell'istante in cui è
     stata letta: da lì in poi comanda la scelta ricordata. Lasciarla
     scritta vorrebbe dire indirizzi con sopra l'ovvio, e soprattutto
     indirizzi che qualcuno potrebbe copiare e condividere così.

     Non si ripulisce se la memoria non è disponibile — succede in
     navigazione privata: lì la coda è l'unica cosa che tiene la scelta, e
     toglierla vorrebbe dire tornare in inglese al primo Aggiorna.
     ---------------------------------------------------------------------- */
  function pulisci() {
    if (!memoriaOk || attiva !== 'it') return;
    if (!/[?&]lang=/i.test(location.search || '')) return;
    try {
      var q = (location.search || '')
        .replace(/([?&])lang=[a-z]{2}(&|$)/i, '$1')
        .replace(/[?&]$/, '');
      if (q === '?') q = '';
      history.replaceState(history.state, '', location.pathname + q + location.hash);
    } catch (e) {
      /* Da disco il browser rifiuta di riscrivere l'indirizzo: previsto,
         e non cambia niente di quello che si vede. */
    }
  }

  /* ----------------------------------------------------------------------
     IL LIBRO GIUSTO

     I file di contenuto non scrivono più direttamente window.SITE: ognuno
     scrive il suo (SITE_IT, SITE_EN), e qui si sceglie. Se la traduzione
     mancasse del tutto si resta in italiano invece di mostrare una pagina
     vuota — un sito nella lingua sbagliata è un fastidio, un sito bianco
     è un guasto.
     ---------------------------------------------------------------------- */
  function scegli() {
    var suffisso = attiva.toUpperCase();
    window.SITE  = window['SITE_' + suffisso]  || window.SITE_IT;
    window.PAGES = window['PAGES_' + suffisso] || window.PAGES_IT;
    if (!window['SITE_' + suffisso] && attiva !== 'it') attiva = 'it';
  }

  /* ----------------------------------------------------------------------
     QUELLO CHE VA DETTO AL DOCUMENTO

     La lingua di una pagina non è un dettaglio estetico: decide come un
     lettore di schermo pronuncia le parole, e come un motore di ricerca la
     classifica. Va scritta, e vanno dichiarate le due versioni una
     all'altra.
     ---------------------------------------------------------------------- */
  function dichiara() {
    document.documentElement.setAttribute('lang', attiva);

    var qui = (location.pathname.split('/').pop() || 'index.html');
    var base = location.origin && location.origin !== 'null'
      ? location.origin + location.pathname.replace(/[^/]*$/, '')
      : '';

    /* Le vecchie si tolgono: cambiando pagina senza ricaricare, altrimenti
       si accumulerebbero. */
    var vecchie = document.querySelectorAll('link[rel="alternate"][hreflang]');
    [].forEach.call(vecchie, function (x) { x.remove(); });

    LINGUE.concat(['x-default']).forEach(function (l) {
      var lang = l === 'x-default' ? 'it' : l;
      var link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', l);
      link.setAttribute('href', base + indirizzo(qui, lang));
      document.head.appendChild(link);
    });
  }

  scegli();
  if (document.documentElement) document.documentElement.setAttribute('lang', attiva);

  return {
    attiva: function () { return attiva; },
    altra: function () { return altra; },
    coda: coda,
    indirizzo: indirizzo,
    indirizzoLingua: indirizzoLingua,
    dichiara: dichiara,
    pulisci: pulisci,
    LINGUE: LINGUE
  };
})();
