/* ==========================================================================
   CORSO ARREDI — LA COPERTINA CHE GIRA
   --------------------------------------------------------------------------
   Al posto dell'immagine ferma sulle card della home e sulle categorie di
   Collezioni: le fotografie vere di quella collezione, che si alternano.

   Prima lì c'era un'unica resa generata. Adesso quello che si vede è
   quello che c'è dentro — e chi guarda la card sta già guardando la
   collezione, invece di guardare una promessa.

   NON DECIDE QUANDO CAMBIARE, E NON DECIDE COME

   Questo file sa fare una cosa sola: mostrare la fotografia successiva, in
   un verso che gli viene detto. Quando farlo e in che verso lo decide il
   coro (js/coro.js), che le conosce tutte e sei.

   Prima non era così: ogni copertina aveva il suo orologio e il suo
   movimento fisso, assegnato dalla posizione. Sei orologi indipendenti
   però non fanno un movimento d'insieme — bastava che una si fermasse un
   attimo col puntatore sopra perché lo sfasamento si perdesse, e dopo un
   minuto le sei cambiavano a caso. Adesso l'orologio è uno solo.

   QUELLO CHE RESTA SUO

   Le sue fotografie, il respiro mentre è ferma, e il diritto di dire "adesso
   no": se è fuori dallo schermo, se ha meno di due fotografie, o se qualcuno
   ci ha sopra il puntatore. Chi si tira indietro per un giro non perde il
   passo — al giro dopo rientra, perché il passo non è suo.
   ========================================================================== */

window.CACopertina = (function () {
  'use strict';

  var el = window.CA.el;
  var C  = window.CACoro;

  var CAMBIO = 640;     /* quanto dura il passaggio */
  var TEMPO  = (C && C.TEMPO) || 3800;

  function costruisci(cat, opz) {
    opz = opz || {};

    var palco = el('div', {
      class: 'copertina',
      /* Le durate si dichiarano qui una volta sola e il foglio di stile le
         legge. Prima erano scritte in tutti e due i posti, e bastava
         cambiarne una perché la dissolvenza e il respiro non tornassero
         più insieme. */
      style: '--copertina-cambio:' + CAMBIO + 'ms; ' +
             '--copertina-vita:' + (TEMPO + CAMBIO) + 'ms'
    });

    var foto = [];
    var i = 0;
    var inVista = false;
    var sospesa = false;     /* il puntatore è sopra */

    function disegna(k, stile) {
      if (!foto.length) return;
      i = ((k % foto.length) + foto.length) % foto.length;
      var f = foto[i];

      /* Il verso arriva dal coro e cambia a ogni giro: la classe si
         riscrive ogni volta, non si mette una volta per sempre. */
      palco.className = 'copertina' + (stile ? ' copertina--' + stile : '');
      if (stile) palco.setAttribute('data-stile', stile);

      var nuova = el('figure', {
        class: 'copertina__foto' + (stile ? ' is-entra' : '')
      }, [ window.CACollezione.immagine(f, f.imageAlt, {
             urgente: !stile && opz.urgente,
             /* Quanto sarà larga davvero: sulla card della home un quarto
                della pagina, sulla categoria di Collezioni quasi metà. Da
                qui il browser sa quale dei due file gli serve. */
             sizes: opz.sizes || '(max-width: 600px) 92vw, (max-width: 1100px) 46vw, 28vw',
             /* Il file non c'è più: la fotografia esce dal giro invece di
                lasciare un rettangolo vuoto sulla copertina. */
             suErrore: function () { scarta(f); }
           }) ]);

      var vecchie = [].slice.call(palco.children);
      palco.append(nuova);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          nuova.classList.remove('is-entra');
          vecchie.forEach(function (x) {
            x.classList.add('is-esce');
            setTimeout(function () { x.remove(); }, CAMBIO + 80);
          });
        });
      });
    }

    /* Una fotografia che non si carica esce dall'elenco: il giro si
       accorcia e nessuno se ne accorge. Lasciarla dentro vorrebbe dire un
       rettangolo vuoto ogni volta che torna il suo turno. */
    function scarta(f) {
      var k = foto.indexOf(f);
      if (k === -1) return;
      foto.splice(k, 1);
      if (!foto.length) { palco.replaceChildren(); return; }
      if (k <= i) i = Math.max(0, i - 1);
      disegna(i, 'da-sotto');
    }

    /* ------------------------------------------------------------------
       QUELLO CHE IL CORO CHIEDE

       viva()  — partecipi a questo giro?
       cambia() — allora vai, in questo verso.
       ------------------------------------------------------------------ */
    var voce = {
      palco: palco,
      viva: function () { return inVista && !sospesa && foto.length > 1; },
      cambia: function (stile) { disegna(i + 1, stile || 'da-sotto'); }
    };

    if (C) window.CA.pulizia(C.iscrivi(voce));

    palco.addEventListener('pointerenter', function () { sospesa = true; });
    palco.addEventListener('pointerleave', function () { sospesa = false; });

    /* Le fotografie arrivano una alla volta mentre la cartella si esplora.
       La prima si disegna appena c'è: la card non resta vuota ad aspettare
       che si sia finito di contare. */
    window.CACollezione.carica(cat, function (f, k) {
      foto.push(f);
      if (k === 0) disegna(0, null);
      /* Alla seconda la copertina è pronta a cantare: lo dice al coro, che
         magari stava zitto perché nessuna lo era ancora. */
      if (k === 1 && C) C.sveglia();
    }, { misura: true }).then(function () {
      if (C) C.sveglia();
    });

    if (window.IntersectionObserver) {
      var occhio = new IntersectionObserver(function (voci) {
        voci.forEach(function (v) {
          inVista = v.isIntersecting;
          if (C) C.sveglia();
        });
      }, { threshold: 0, rootMargin: '-5% 0px' });
      occhio.observe(palco);
      window.CA.pulizia(function () { occhio.disconnect(); });
    } else {
      inVista = true;
    }

    return palco;
  }

  return { costruisci: costruisci };
})();
