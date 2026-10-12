/* ==========================================================================
   CORSO ARREDI — IL CUORE
   --------------------------------------------------------------------------
   Il bottone con cui il visitatore segna una fotografia che gli piace, e
   il messaggio breve che compare quando c'è qualcosa da dirgli.

   Segnando una fotografia, la scelta lo segue fino a contatti: il modulo
   si trova già compilato nella parte che riguarda l'ambito di lavoro, e le
   fotografie partono insieme alla richiesta.

   Questo file conteneva anche una griglia di anteprime e una galleria a
   schermo pieno. Non ci sono più: le anteprime sono sparite quando la
   pagina delle collezioni è diventata un indice, la galleria quando le
   fotografie sono passate alla giostra. Tenerle "per sicurezza" avrebbe
   voluto dire mantenere per sempre codice che nessuno esegue.
   ========================================================================== */

window.CAGallery = (function () {
  'use strict';

  var U = function (k, d) { return window.CAUI.t(k, d); };

  var el = window.CA.el;
  var P  = window.CAPref;

  /* Un cuore solo, disegnato una volta. Vuoto o pieno lo decide il CSS
     con "fill: currentColor" sul contorno: nessuna seconda icona da
     tenere allineata alla prima. */
  var CUORE = '<svg class="cuore__ico" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">' +
              '<path d="M12 20.5S3.5 15 3.5 9.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8.5 2.1c0 5.6-8.5 11.1-8.5 11.1z" ' +
              'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';

  /* ----------------------------------------------------------------------
     IL CUORE
     Un bottone che vale per una fotografia. Si aggiorna da solo quando
     la stessa foto viene tolta altrove — nella griglia mentre è aperta la
     galleria, o in un'altra scheda del browser.
     ---------------------------------------------------------------------- */
  function cuore(foto, cat, nomeCat, variante) {
    var b = el('button', {
      class: 'cuore' + (variante ? ' cuore--' + variante : ''),
      type: 'button',
      html: CUORE + '<span class="cuore__testo"></span>'
    });
    var testo = b.querySelector('.cuore__testo');

    /* Nella galleria a schermo pieno il cuore è uno solo e cambia
       fotografia insieme al palco. Ricrearlo a ogni scorrimento
       lascerebbe dietro un ascoltatore morto per ogni scatto sfogliato. */
    b.punta = function (nuova) { foto = nuova; stato(); };

    function stato() {
      var dentro = P.ha(foto.id);
      b.setAttribute('aria-pressed', String(dentro));
      b.classList.toggle('is-on', dentro);
      var etichetta = dentro
        ? U('cuore.togli', { x: foto.title || U('cuore.questa') })
        : U('cuore.metti', { x: foto.title || U('cuore.questa') });
      b.setAttribute('aria-label', etichetta);
      b.setAttribute('title', U(dentro ? 'cuore.dentro' : 'cuore.fuori'));
      if (testo) testo.textContent = U(dentro ? 'cuore.dentro' : 'cuore.fuori');
    }

    b.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();          /* nella griglia il cuore sta dentro
                                       la tessera: non deve aprire la foto */
      if (!P.ha(foto.id) && P.pieno()) {
        avviso(U('cuore.pieno', { n: P.max }));
        return;
      }
      var ora = P.alterna(foto, cat, nomeCat);
      stato();
      if (ora) {
        b.classList.remove('is-batte');
        void b.offsetWidth;         /* forza il riavvio dell'animazione */
        b.classList.add('is-batte');
      }
    });

    /* Il cuore ascolta le preferenze: cambiando pagina va staccato,
       altrimenti resta a rispondere per un nodo che non c'è più. */
    window.CA.pulizia(P.osserva(stato));
    return b;
  }

  /* Messaggio breve, autoannunciato ai lettori di schermo e poi via. */
  var regione = null;
  function avviso(msg) {
    if (!regione) {
      regione = el('p', { class: 'avviso', role: 'status', 'aria-live': 'polite' });
      document.body.append(regione);
    }
    regione.textContent = msg;
    regione.classList.add('is-visibile');
    clearTimeout(avviso._t);
    avviso._t = setTimeout(function () {
      regione.classList.remove('is-visibile');
    }, 3600);
  }

  return { cuore: cuore, avviso: avviso };
})();
