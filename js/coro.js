/* ==========================================================================
   CORSO ARREDI — IL CORO DELLE COPERTINE
   --------------------------------------------------------------------------
   Le copertine della home sono sei, tutte visibili insieme. Fino a ieri
   ognuna aveva il suo orologio: partiva scaglionata rispetto alle altre e
   poi andava per conto suo. Bastava che una si fermasse un attimo — il
   puntatore sopra, la scheda in secondo piano — perché lo sfasamento si
   perdesse per sempre. Dopo un minuto le sei cambiavano a caso.

   Sei orologi indipendenti non fanno un movimento d'insieme. Ne serve uno
   solo, che le chiami.

   COSA FA

   A ogni giro il coro decide, per ognuna, QUANDO cambiare e IN CHE VERSO.
   Le due cose insieme sono la coreografia. Ce ne sono sei, e si alternano
   in ordine: chi guarda la home per venti secondi le vede tutte.

     1. da sinistra a destra   una linea attraversa la fila e le cambia
                               al suo passaggio; le card incolonnate una
                               sopra l'altra cambiano insieme
     2. dal basso in alto      prima la riga di sotto, poi quella di sopra
     3. da destra a sinistra   la stessa linea, nel verso opposto
     4. dall'alto in basso     prima la riga di sopra, poi quella di sotto
     5. alternate verticali    una alla volta, in ordine di lettura, una
                               che sale e la successiva che scende
     6. alternate orizzontali  una alla volta, una da sinistra e la
                               successiva da destra

   Nelle prime quattro il verso del movimento è lo stesso della linea: se
   la linea corre verso destra, la fotografia nuova entra da sinistra e si
   posa. È quello che fa leggere il gesto come una sola cosa che attraversa
   la pagina invece che come sei cambi vicini.

   DOVE SONO LE CARD, LO DICE LA PAGINA

   Chi sta sopra chi non è scritto da nessuna parte: si misura. A ogni giro
   il coro chiede alla pagina dove sono le copertine e le raggruppa per
   colonna e per riga.

   È l'unico modo che regge le tre disposizioni che la home ha davvero —
   quattro colonne sopra i 900px, due sotto, una sotto i 600 — senza che
   nessuno debba ricordarsi di aggiornare un elenco. Su una pagina dove le
   copertine sono incolonnate, "da sinistra a destra" le fa cambiare tutte
   insieme, che è la cosa giusta: non c'è nessuna sinistra e nessuna destra.

   LE MISURE SI PRENDONO TUTTE INSIEME

   Prima si leggono tutte le posizioni, poi si scrive. Leggere e scrivere a
   turno costringerebbe il browser a ricalcolare la disposizione sei volte
   per ogni giro.
   ========================================================================== */

window.CACoro = (function () {
  'use strict';

  var TEMPO   = 3800;   /* fra l'inizio di un giro e l'inizio del successivo */
  var PASSO   = 190;    /* fra una colonna (o una riga) e la successiva */
  var SINGOLO = 150;    /* fra una card e la successiva, nelle alternate */
  var VICINE  = 24;     /* px entro cui due card stanno nella stessa fila */

  /* --------------------------------------------------------------------
     LE SEI COREOGRAFIE

     Ognuna dice, per ogni card, il ritardo e il verso. Sono funzioni pure:
     ricevono le posizioni e restituiscono i turni, senza toccare niente.
     È anche il motivo per cui si possono provare senza aprire una pagina.
     -------------------------------------------------------------------- */

  /* Raggruppa dei valori vicini fra loro: tutte le card che stanno entro
     24 pixel finiscono nello stesso gruppo. Restituisce, per ogni valore,
     l'indice del suo gruppo contando da zero. */
  function gruppi(valori, tolleranza) {
    var ordinati = valori.slice().sort(function (a, b) { return a - b; });
    var soglie = [];
    ordinati.forEach(function (v) {
      if (!soglie.length || v - soglie[soglie.length - 1] > tolleranza) soglie.push(v);
    });
    return valori.map(function (v) {
      var vicino = 0;
      for (var k = 1; k < soglie.length; k++) {
        if (Math.abs(v - soglie[k]) < Math.abs(v - soglie[vicino])) vicino = k;
      }
      return vicino;
    });
  }

  var COREOGRAFIE = [
    'sinistra-destra', 'sotto-sopra', 'destra-sinistra', 'sopra-sotto',
    'alternate-verticali', 'alternate-orizzontali'
  ];

  /* punti: [{ x, y }] — un punto per copertina, nell'ordine in cui stanno
     nella pagina. Torna [{ ritardo, stile }] nello stesso ordine. */
  function coreografia(nome, punti, opz) {
    opz = opz || {};
    var passo   = opz.passo   || PASSO;
    var singolo = opz.singolo || SINGOLO;
    var toll    = opz.tolleranza != null ? opz.tolleranza : VICINE;

    var col = gruppi(punti.map(function (p) { return p.x; }), toll);
    var rig = gruppi(punti.map(function (p) { return p.y; }), toll);
    var nCol = Math.max.apply(null, col.concat([0])) + 1;
    var nRig = Math.max.apply(null, rig.concat([0])) + 1;

    /* L'ordine di lettura: prima la riga, poi la colonna. Serve alle due
       coreografie che vanno una card alla volta. */
    var lettura = punti.map(function (_, i) { return i; }).sort(function (a, b) {
      return rig[a] - rig[b] || col[a] - col[b];
    });
    var posto = [];
    lettura.forEach(function (i, k) { posto[i] = k; });

    return punti.map(function (_, i) {
      switch (nome) {
        /* Le quattro linee. Il verso del movimento segue il verso della
           linea: la fotografia entra dal lato da cui la linea arriva. */
        case 'sinistra-destra':
          return { ritardo: col[i] * passo, stile: 'da-sinistra' };
        case 'destra-sinistra':
          return { ritardo: (nCol - 1 - col[i]) * passo, stile: 'da-destra' };
        case 'sotto-sopra':
          return { ritardo: (nRig - 1 - rig[i]) * passo, stile: 'da-sotto' };
        case 'sopra-sotto':
          return { ritardo: rig[i] * passo, stile: 'da-sopra' };

        /* Le due alternate: una alla volta, e il verso cambia a ogni card.
           Qui non c'è una linea da seguire — è un botta e risposta. */
        case 'alternate-verticali':
          return { ritardo: posto[i] * singolo,
                   stile: posto[i] % 2 ? 'da-sopra' : 'da-sotto' };
        case 'alternate-orizzontali':
          return { ritardo: posto[i] * singolo,
                   stile: posto[i] % 2 ? 'da-destra' : 'da-sinistra' };
        default:
          return { ritardo: 0, stile: 'da-sotto' };
      }
    });
  }

  /* --------------------------------------------------------------------
     IL CORO
     -------------------------------------------------------------------- */

  var voci = [];
  var battito = null;
  var giro = 0;
  var attese = [];

  var fermaSempre = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function pulisciAttese() {
    attese.forEach(function (t) { clearTimeout(t); });
    attese = [];
  }

  function passata() {
    if (document.hidden) return;

    /* Chi partecipa a questo giro: chi è in vista, ha almeno due
       fotografie, e non ha il puntatore sopra. Chi non partecipa non
       perde il passo — rientra al giro successivo, perché il passo non è
       suo, è del coro. */
    var attive = voci.filter(function (v) { return v.viva(); });
    if (!attive.length) return;

    /* Tutte le misure prima, tutte le scritture dopo. */
    var punti = attive.map(function (v) {
      var r = v.palco.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    });

    var nome = COREOGRAFIE[giro % COREOGRAFIE.length];
    giro++;

    var turni = coreografia(nome, punti);
    pulisciAttese();
    turni.forEach(function (t, i) {
      if (!t.ritardo) { attive[i].cambia(t.stile); return; }
      attese.push(setTimeout(function () { attive[i].cambia(t.stile); }, t.ritardo));
    });
  }

  function parti() {
    if (battito || fermaSempre || !voci.length) return;
    battito = setInterval(passata, TEMPO);
  }
  function ferma() {
    if (battito) { clearInterval(battito); battito = null; }
    pulisciAttese();
  }

  /* Il coro canta solo se qualcuno lo sta guardando. Basta una copertina in
     vista: le altre sono nella stessa fila e stanno arrivando. */
  function verifica() {
    var qualcuna = voci.some(function (v) { return v.viva(); });
    if (qualcuna) parti(); else ferma();
  }

  /* Una copertina entra nel coro. Torna la funzione per uscirne: cambiando
     pagina le vecchie se ne vanno e le nuove prendono il loro posto, senza
     che resti in giro un orologio che chiama nodi che non esistono più. */
  function iscrivi(voce) {
    voci.push(voce);
    verifica();
    return function () {
      var k = voci.indexOf(voce);
      if (k > -1) voci.splice(k, 1);
      if (!voci.length) ferma();
    };
  }

  /* Quando una copertina entra o esce dallo schermo lo dice al coro, che
     decide se vale ancora la pena di battere il tempo. */
  function sveglia() { verifica(); }

  return {
    iscrivi: iscrivi,
    sveglia: sveglia,
    coreografia: coreografia,
    gruppi: gruppi,
    COREOGRAFIE: COREOGRAFIE,
    TEMPO: TEMPO,
    PASSO: PASSO,
    SINGOLO: SINGOLO
  };
})();
