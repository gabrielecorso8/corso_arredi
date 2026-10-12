/* ==========================================================================
   CORSO ARREDI — L'AGENDA
   --------------------------------------------------------------------------
   Da qui nascono i giorni e gli orari che il visitatore può scegliere.

   COME SI COLLEGA AL GESTIONALE

   Un solo indirizzo, qui sotto, in ORIGINE. Il gestionale deve rispondere
   con un JSON fatto così:

       { "occupati": ["2026-08-04T09:00", "2026-08-04T15:00"],
         "chiusure": ["2026-08-15"] }

     occupati   gli appuntamenti già presi. Ora locale, senza fuso: sono
                orari di negozio, non di server.
     chiusure   giornate intere in cui non si riceve (ferie, festivi).

   Tutto il resto — quali fasce esistono, quanto dura un incontro, quanto
   preavviso serve — sta nelle REGOLE qui sotto e si cambia senza toccare
   una riga di logica.

   FINCHÉ L'INDIRIZZO È VUOTO il calendario funziona lo stesso, sulle sole
   regole di apertura. In quel caso la scelta del visitatore è una proposta,
   non una conferma: il testo lo dice esplicitamente, perché promettere un
   orario che potrebbe essere già occupato è peggio che non prometterlo.
   ========================================================================== */

window.CAAgenda = (function () {
  'use strict';

  /* ----------------------------------------------------------------------
     DA CAMBIARE QUANDO IL GESTIONALE È PRONTO
     ---------------------------------------------------------------------- */
  var ORIGINE = '';          /* esempio: 'agenda.json' oppure '/api/agenda' */

  var REGOLE = {
    durata: 60,              /* minuti per incontro */
    preavviso: 24,           /* ore minime fra adesso e l'appuntamento */
    finestra: 28,            /* quanti giorni in avanti si può prenotare */
    /* Ora di inizio di ogni fascia, giorno per giorno.
       0 = domenica, 1 = lunedì … 6 = sabato. */
    fasce: {
      1: [9, 10, 11, 15, 16, 17],
      2: [9, 10, 11, 15, 16, 17],
      3: [9, 10, 11, 15, 16, 17],
      4: [9, 10, 11, 15, 16, 17],
      5: [9, 10, 11, 15, 16, 17],
      6: [9, 10, 11],
      0: []
    }
  };

  /* I nomi dei giorni e dei mesi stanno in content/ui.js, nelle due
     lingue: una data scritta in italiano dentro una pagina inglese è
     la prima cosa che si nota. */

  var occupati = null;       /* null = non ancora chiesto */
  var chiusure = [];

  /* Chiave stabile per un giorno, indipendente dal fuso: toISOString
     sposterebbe la mezzanotte al giorno prima per mezza Europa. */
  function chiave(d) {
    return d.getFullYear() + '-' +
           String(d.getMonth() + 1).padStart(2, '0') + '-' +
           String(d.getDate()).padStart(2, '0');
  }
  function chiaveOra(d, ora) {
    return chiave(d) + 'T' + String(ora).padStart(2, '0') + ':00';
  }

  function etichetta(d)      { return window.CAUI.dataEstesa(d); }
  function etichettaBreve(d) { return window.CAUI.giornoBreve(d); }

  /* ----------------------------------------------------------------------
     Interroga il gestionale. Se non risponde, o se non è configurato, si
     prosegue sulle sole regole di apertura: un calendario che non si apre
     è peggio di un calendario ottimista.
     ---------------------------------------------------------------------- */
  function carica() {
    if (!ORIGINE || typeof fetch !== 'function') {
      occupati = [];
      return Promise.resolve(false);
    }
    return fetch(ORIGINE, { headers: { accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (dati) {
        occupati = Array.isArray(dati.occupati) ? dati.occupati : [];
        chiusure = Array.isArray(dati.chiusure) ? dati.chiusure : [];
        return true;
      })
      .catch(function () { occupati = []; return false; });
  }

  function collegata() { return Boolean(ORIGINE) && occupati !== null; }

  /* ----------------------------------------------------------------------
     Gli orari liberi di un giorno.
     ---------------------------------------------------------------------- */
  function orari(d) {
    if (chiusure.indexOf(chiave(d)) > -1) return [];
    var fasce = REGOLE.fasce[d.getDay()] || [];
    var limite = new Date();
    limite.setHours(limite.getHours() + REGOLE.preavviso);

    return fasce.filter(function (ora) {
      var quando = new Date(d.getFullYear(), d.getMonth(), d.getDate(), ora, 0, 0);
      if (quando < limite) return false;
      return !(occupati || []).some(function (o) {
        return String(o).slice(0, 16) === chiaveOra(d, ora);
      });
    });
  }

  /* I giorni prenotabili nella finestra, saltando quelli senza orari. */
  function giorni() {
    var out = [];
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    for (var k = 0; k <= REGOLE.finestra; k++) {
      var g = new Date(d.getFullYear(), d.getMonth(), d.getDate() + k);
      var o = orari(g);
      if (o.length) out.push({ data: g, chiave: chiave(g), orari: o });
    }
    return out;
  }

  function fine(ora) {
    var m = ora * 60 + REGOLE.durata;
    return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  }
  function inizio(ora) { return String(ora).padStart(2, '0') + ':00'; }

  return {
    carica: carica,
    collegata: collegata,
    giorni: giorni,
    orari: orari,
    durata: REGOLE.durata,
    chiave: chiave,
    chiaveOra: chiaveOra,
    etichetta: etichetta,
    etichettaBreve: etichettaBreve,
    inizio: inizio,
    fine: fine
  };
})();
