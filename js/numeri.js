/* ==========================================================================
   CORSO ARREDI — I NUMERI CHE SALGONO
   --------------------------------------------------------------------------
   Le quattro cifre della sostenibilità partono da zero e arrivano al loro
   valore quando entrano in vista.

   Non è un vezzo. Sono numeri che dicono una quantità accumulata — energia
   prodotta, chili di CO₂ non emessi, alberi equivalenti — e vederli salire
   racconta l'accumulo, che è esattamente quello che sono. Un numero già
   scritto è un dato; un numero che sale è una storia.

   IL VALORE È SCRITTO UNA VOLTA SOLA

   Nessuno duplica "129" in un attributo. Il valore finale è il testo che
   sta nella pagina, e da lì si ricava tutto: il numero, quello che c'è
   prima, quello che c'è dopo, e con che punteggiatura era scritto.

     "129 MWh"    -> 129   con " MWh" in coda
     "1.510"      -> 1510  da riscrivere col punto delle migliaia
     "50.600 kg"  -> 50600 col punto e " kg" in coda
     "100%"       -> 100   con "%" attaccato

   Così cambiare un dato resta quello che era: si cambia il testo in
   content/site.js e basta. Se un giorno diventasse "27,3 MWh", la virgola
   decimale viene riconosciuta e ricostruita.

   CHI NON VEDE SENTE IL NUMERO, NON IL CONTEGGIO

   Un lettore di schermo che annunciasse ottanta valori diversi mentre
   salgono sarebbe inutilizzabile. Il numero finale sta in un elemento
   nascosto alla vista ma leggibile dalla voce; quello che si anima è
   nascosto alla voce. Ognuno riceve la versione che gli serve.

   E CHI HA CHIESTO MENO ANIMAZIONI VEDE IL NUMERO E BASTA

   Non una versione ridotta: proprio il numero, fermo, da subito.

   IL TEMPO

   1,6 secondi, e la corsa rallenta verso la fine invece di fermarsi di
   colpo — un numero che si schianta sul valore finale sembra essersi
   rotto. La curva è la stessa dell'apertura della home, così il gesto
   appartiene al resto del sito.

   Parte una volta sola. Scorrendo su e giù non ricomincia da capo: un
   dato che si riazzera ogni volta che passa smette di essere un dato.
   ========================================================================== */

window.CANumeri = (function () {
  'use strict';

  var DURATA = 1600;

  /* Curva di uscita: parte decisa e si posa. La stessa dell'apertura. */
  function posa(t) { return 1 - Math.pow(1 - t, 3); }

  /* ----------------------------------------------------------------------
     LEGGERE UN NUMERO SCRITTO PER GLI UMANI

     Torna null se lì dentro non c'è niente da contare — e allora il testo
     resta com'è. Un valore che un giorno diventasse "quasi mille" non
     deve rompere la pagina, deve solo starsene fermo.
     ---------------------------------------------------------------------- */
  function leggi(testo) {
    /* Il gruppo del numero finisce sull'ultima cifra, non sull'ultimo
       carattere che gli somiglia. Facendolo arrivare fino allo spazio si
       mangiava lo spazio prima dell'unità, e "129 MWh" tornava indietro
       come "129MWh": un dettaglio che non si vede scrivendo la regola e
       si vede subito a schermo. */
    var m = /^([^\d]*)(\d(?:[\d.,]*\d)?)(.*)$/.exec(String(testo));
    if (!m) return null;

    var grezzo = m[2];
    /* La virgola è decimale, il punto separa le migliaia: è la scrittura
       italiana, ed è quella che si trova nei contenuti. */
    var decimali = 0;
    var virgola = grezzo.indexOf(',');
    if (virgola > -1) decimali = grezzo.length - virgola - 1;

    var valore = Number(grezzo.replace(/\./g, '').replace(',', '.'));
    if (!isFinite(valore)) return null;

    return {
      prima: m[1],
      dopo: m[3],
      valore: valore,
      decimali: decimali,
      /* Se il numero scritto ha il punto delle migliaia lo rimettiamo
         salendo: senza, "50.600" passerebbe a "50600" e sembrerebbe un
         altro numero. */
      migliaia: /\d\.\d{3}/.test(grezzo)
    };
  }

  function scrivi(n, f) {
    var v = f.decimali ? n.toFixed(f.decimali) : String(Math.round(n));
    if (f.decimali) v = v.replace('.', ',');
    if (f.migliaia) {
      var pezzi = v.split(',');
      pezzi[0] = pezzi[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      v = pezzi.join(',');
    }
    return f.prima + v + f.dopo;
  }

  /* ----------------------------------------------------------------------
     Prepara un elemento: il valore finale resta per la voce, la cifra che
     sale è solo per gli occhi.
     ---------------------------------------------------------------------- */
  function prepara(el) {
    if (el.dataset.conta === 'fatto') return null;
    var f = leggi(el.textContent);
    if (!f || !f.valore) return null;

    var finale = el.textContent;
    var visibile = document.createElement('span');
    visibile.setAttribute('aria-hidden', 'true');
    visibile.textContent = scrivi(0, f);

    var perLaVoce = document.createElement('span');
    perLaVoce.className = 'sr-only';
    perLaVoce.textContent = finale;

    el.textContent = '';
    el.append(visibile, perLaVoce);
    el.dataset.conta = 'pronto';

    return { el: el, visibile: visibile, f: f, finale: finale };
  }

  function corri(v) {
    v.el.dataset.conta = 'fatto';
    var inizio = null;
    function passo(ora) {
      if (inizio === null) inizio = ora;
      var t = Math.min(1, (ora - inizio) / DURATA);
      v.visibile.textContent = t < 1
        ? scrivi(v.f.valore * posa(t), v.f)
        : v.finale;
      if (t < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  /* ----------------------------------------------------------------------
     Avvia i numeri dentro un contenitore quando entra in vista.
     ---------------------------------------------------------------------- */
  function avvia(radice, selettore) {
    var elementi = [].slice.call((radice || document).querySelectorAll(selettore));
    if (!elementi.length) return;

    var fermi = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fermi) return;

    var voci = elementi.map(prepara).filter(Boolean);
    if (!voci.length) return;

    /* Se non c'è modo di sapere quando entrano in vista, si contano
       subito: meglio un'animazione fuori tempo che dei zeri per sempre. */
    if (!window.IntersectionObserver) { voci.forEach(corri); return; }

    var occhio = new IntersectionObserver(function (viste) {
      viste.forEach(function (x) {
        if (!x.isIntersecting) return;
        occhio.unobserve(x.target);
        var v = voci.filter(function (y) { return y.el === x.target; })[0];
        if (v && v.el.dataset.conta === 'pronto') corri(v);
      });
    }, { threshold: 0, rootMargin: '-10% 0px' });

    voci.forEach(function (v) { occhio.observe(v.el); });
    if (window.CA && window.CA.pulizia) {
      window.CA.pulizia(function () { occhio.disconnect(); });
    }
  }

  return { avvia: avvia, leggi: leggi, scrivi: scrivi };
})();
