/* ==========================================================================
   CORSO ARREDI — DALLA CARTELLA ALLA FOTOGRAFIA
   --------------------------------------------------------------------------
   Mette insieme le due metà di una raccolta di fotografie:

     i FILE      li conta js/raccolta.js guardando la cartella
     le PAROLE   stanno nei contenuti, sotto "descrizioni"

   La chiave che le unisce è il numero del file. La 03 della cartella cucine
   prende la voce "03" delle descrizioni di cucine.

   Una fotografia senza voce non sparisce e non rompe niente: prende una
   descrizione generica costruita dal nome della collezione. È il caso di
   una fotografia appena copiata nella cartella, e deve funzionare — se
   aggiungere una foto costringesse anche a scrivere due righe di testo,
   non sarebbe più "copia il file e basta".

   E una voce senza fotografia non lascia niente in giro: le descrizioni non
   creano posti, li riempiono. Se la 06 è stata cancellata dalla cartella, la
   voce "06" resta scritta e non la legge nessuno.
   ========================================================================== */

window.CACollezione = (function () {
  'use strict';

  /* Costruisce la scheda di una fotografia a partire dal file trovato. */
  function foto(cat, f) {
    var d = (cat.descrizioni || {})[f.num];
    return {
      id: (cat.id || 'foto') + '-' + f.num,
      num: f.num,
      image: f.image,
      imageW: f.imageW || 3000,
      /* La piccola c'è solo se è stata trovata e misurata davvero. Se non
         c'è, questo resta vuoto e l'immagine userà la grande: mai una
         candidata dichiarata che poi non esiste. */
      small: f.small || null,
      smallW: f.smallW || 0,
      title: d ? d.titolo : (cat.name || ''),
      text: d ? d.testo : '',
      didascalia: d ? (d.didascalia || d.titolo || '') : '',
      imageAlt: (d && d.alt) ? d.alt
        : (cat.altGenerico ||
           window.CAUI.t('coll.altGenerico', { x: cat.name || 'Corso Arredi' }))
    };
  }

  /* Esplora la cartella di una categoria e consegna le fotografie già
     unite alle loro parole. onTrovata scatta a ogni ritrovamento.

     opz.misura chiede anche la versione piccola: si attiva dove la piccola
     verrà davvero mostrata. */
  function carica(cat, onTrovata, opz) {
    if (!window.CARaccolta || !cat || !cat.cartella) return Promise.resolve([]);
    return window.CARaccolta.esplora(cat.cartella, function (f, i) {
      if (onTrovata) onTrovata(foto(cat, f), i);
    }, opz).then(function (l) {
      return l.map(function (f) { return foto(cat, f); });
    });
  }

  /* ----------------------------------------------------------------------
     L'IMMAGINE, NELLA MISURA GIUSTA

     Di ogni fotografia può esistere un secondo file più piccolo. Quale dei
     due usare non lo decide il codice: si dichiarano tutti e due con le
     loro larghezze, si dice quanto spazio occuperà l'immagine sullo
     schermo, e sceglie il browser — che è l'unico a sapere quanto è larga
     la finestra e quanti pixel veri ha lo schermo.

     Due errori fatti prima, e come sono stati chiusi:

     La piccola da 640 pixel andava benissimo su una copertina della home e
     diventava sgranata sulla categoria di Collezioni, che è grande il
     triplo. Non c'è una misura giusta per tutti i posti: "sizes" arriva da
     chi chiama, perché solo lui sa dove finirà l'immagine.

     E la larghezza della piccola era scritta a memoria — 900 — mentre le
     verticali sono larghe 675. Il browser le sceglieva credendole
     sufficienti. Adesso quella larghezza è misurata sul file vero, e se il
     file non c'è la candidata non viene nemmeno dichiarata: una candidata
     che non esiste è un'immagine rotta, non un ripiego.
     ---------------------------------------------------------------------- */
  function immagine(f, alt, opz) {
    opz = opz || {};
    var im = window.CA.el('img', {
      src: f.image,
      alt: alt || f.imageAlt || ''
    });

    if (f.small && f.smallW > 0) {
      im.setAttribute('srcset',
        f.small + ' ' + f.smallW + 'w, ' + f.image + ' ' + (f.imageW || 3000) + 'w');
      im.setAttribute('sizes', opz.sizes || '(max-width: 900px) 92vw, 46vw');
    }

    if (opz.urgente) im.setAttribute('fetchpriority', 'high');
    else { im.setAttribute('loading', 'lazy'); im.setAttribute('decoding', 'async'); }

    /* Se l'immagine non si carica — il file è stato tolto mentre la pagina
       era aperta, o è danneggiato — chi l'ha chiesta decide cosa farne.
       Un carosello la butta via insieme al suo posto; un'immagine sola
       mette un riquadro neutro al suo posto. Il riquadro neutro dentro un
       carosello sarebbe proprio lo slot vuoto da evitare. */
    im.addEventListener('error', function () {
      if (opz.suErrore) opz.suErrore(f, im);
      else im.replaceWith(window.CA.placeholder(alt));
    }, { once: true });

    return im;
  }

  return { carica: carica, foto: foto, immagine: immagine };
})();
