/* ==========================================================================
   CORSO ARREDI — LE FOTO CHE PIACCIONO AL VISITATORE
   --------------------------------------------------------------------------
   Un solo posto dove si tiene conto di cosa il visitatore ha segnato con
   "Mi piace" mentre sfoglia le collezioni. Serve a due cose:

     1. mostrargli, in contatti, quello che aveva scelto;
     2. far arrivare la sua scelta a noi insieme alla richiesta.

   Perché localStorage e non un parametro nell'indirizzo: le foto si segnano
   su collezioni.html e si leggono su contatti.html, ma anche cambiando
   pagina dieci volte in mezzo, o tornando il giorno dopo. Un parametro
   nell'URL si perderebbe al primo clic.

   Nota sulla privacy: qui non finisce nulla di personale. Solo l'elenco
   degli identificativi delle fotografie, sul dispositivo del visitatore,
   e nulla parte verso di noi finché non preme "Invia".
   ========================================================================== */

window.CAPref = (function () {
  'use strict';

  var CHIAVE = 'ca-preferiti';
  var MAX = 24;              /* oltre non è più una scelta, è un catalogo */

  /* Da categoria della collezione a risposta del configuratore. È l'unico
     punto in cui i due vocabolari si toccano: se un giorno cambia una
     categoria, si corregge qui e basta. */
  var AMBITO = {
    cucine:       'cucina',
    living:       'living',
    notte:        'notte',
    bagni:        'bagno',
    hospitality:  'hospitality',
    falegnameria: 'speciale'
  };

  /* Alcuni browser in navigazione privata lanciano un'eccezione al solo
     tocco di localStorage. In quel caso si lavora in memoria: le preferenze
     valgono per la sessione e non si perde la funzione. */
  var memoria = [];
  var disponibile = (function () {
    try {
      window.localStorage.setItem('ca-test', '1');
      window.localStorage.removeItem('ca-test');
      return true;
    } catch (e) { return false; }
  })();

  function leggi() {
    if (!disponibile) return memoria.slice();
    try {
      var v = JSON.parse(window.localStorage.getItem(CHIAVE) || '[]');
      return Array.isArray(v) ? v.filter(valida) : [];
    } catch (e) { return []; }
  }

  function valida(o) {
    return o && typeof o.id === 'string' && typeof o.cat === 'string';
  }

  var ascoltatori = [];

  function scrivi(lista) {
    lista = lista.slice(0, MAX);
    if (disponibile) {
      try { window.localStorage.setItem(CHIAVE, JSON.stringify(lista)); }
      catch (e) { disponibile = false; memoria = lista; }
    } else {
      memoria = lista;
    }
    ascoltatori.forEach(function (fn) { try { fn(lista); } catch (e) {} });
    return lista;
  }

  /* ---------------------------------------------------------------- API */

  function lista() { return leggi(); }
  function conta() { return leggi().length; }
  function ha(id)  { return leggi().some(function (o) { return o.id === id; }); }
  function pieno() { return leggi().length >= MAX; }

  /* Aggiunge o toglie, e restituisce lo stato in cui si è finiti:
     true = adesso è fra i preferiti. */
  function alterna(foto, cat, nomeCat) {
    var l = leggi();
    var i = -1;
    l.forEach(function (o, k) { if (o.id === foto.id) i = k; });
    if (i >= 0) { l.splice(i, 1); scrivi(l); return false; }
    if (l.length >= MAX) return true;   /* già al massimo: resta com'è */
    l.push({
      id:    foto.id,
      cat:   cat,
      nome:  nomeCat || cat,
      tit:   foto.title || '',
      thumb: foto.thumb || foto.image || '',
      alt:   foto.imageAlt || ''
    });
    scrivi(l);
    return true;
  }

  function togli(id) {
    scrivi(leggi().filter(function (o) { return o.id !== id; }));
  }

  function svuota() { scrivi([]); }

  /* Le risposte del configuratore da preselezionare, senza ripetizioni e
     nell'ordine in cui il visitatore ha segnato le foto. */
  function ambiti() {
    var out = [];
    leggi().forEach(function (o) {
      var a = AMBITO[o.cat];
      if (a && out.indexOf(a) === -1) out.push(a);
    });
    return out;
  }

  /* Riga leggibile per chi riceve la mail: "Cucine — Isola nera (cucine-03)" */
  function testo() {
    var per = {};
    leggi().forEach(function (o) {
      (per[o.nome] = per[o.nome] || []).push(o.tit ? o.tit + ' (' + o.id + ')' : o.id);
    });
    return Object.keys(per).map(function (n) {
      return n + ': ' + per[n].join('; ');
    }).join(' — ');
  }

  function osserva(fn) {
    ascoltatori.push(fn);
    fn(leggi());
    return function () { ascoltatori = ascoltatori.filter(function (x) { return x !== fn; }); };
  }

  /* Due schede aperte sullo stesso sito restano allineate: l'evento storage
     scatta nelle altre schede quando una scrive. */
  window.addEventListener('storage', function (e) {
    if (e.key === CHIAVE) {
      var l = leggi();
      ascoltatori.forEach(function (fn) { try { fn(l); } catch (err) {} });
    }
  });

  return {
    lista: lista, conta: conta, ha: ha, pieno: pieno, max: MAX,
    alterna: alterna, togli: togli, svuota: svuota,
    ambiti: ambiti, testo: testo, osserva: osserva
  };
})();
