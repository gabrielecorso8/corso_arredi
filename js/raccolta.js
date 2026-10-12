/* ==========================================================================
   CORSO ARREDI — LE FOTOGRAFIE SI CONTANO DA SOLE
   --------------------------------------------------------------------------
   IL PROBLEMA

   Le fotografie stanno in una cartella. Aggiungerne una deve voler dire
   copiare un file lì dentro, e basta: niente elenchi da aggiornare, nessuno
   da chiamare. Toglierne una deve voler dire cancellare il file, e il posto
   che occupava deve sparire con lei — non restare lì vuoto.

   Ma una pagina web non può guardare dentro una cartella. Il browser non ha
   un comando per farlo, e non ce l'ha di proposito: se una pagina potesse
   elencare i file di un server, potrebbe elencarne parecchi altri.

   LA SOLUZIONE

   Non serve elencarli: basta provarli. Le fotografie si chiamano 01, 02,
   03… e si può sempre chiedere a un indirizzo se esiste. Quindi si chiede la
   01, poi la 02, e si va avanti finché le richieste cominciano a non trovare
   più niente.

   Da qui viene l'unica regola che chi aggiunge una fotografia deve
   rispettare: il nome è un numero. Non è un capriccio — è la sola cosa che
   permette di indovinare un indirizzo senza averne l'elenco.

   CINQUE ATTENZIONI PERCHÉ FUNZIONI DAVVERO

   1. I BUCHI. Cancellando la 05, la 06 non deve sparire. Non ci si ferma al
      primo fallimento: si continua finché non mancano dodici numeri di
      fila. Si può cancellare mezza cartella senza rinumerare niente.

   2. IL COSTO DELLA DOMANDA. Chiedere "esiste?" caricando l'immagine
      significa scaricarla tutta: sedici fotografie da mezzo megabyte sono
      otto megabyte solo per contarle. Su un server si chiede invece la sola
      intestazione — una domanda da poche centinaia di byte, che risponde
      sì o no senza mandare niente. Aprendo i file da disco quella domanda
      non esiste e si torna a caricare l'immagine, che però lì è gratis.

   3. LA FRETTA. Si chiede un blocco di sei numeri per volta, tutti insieme,
      e si aspetta l'intero blocco. Sedici fotografie diventano tre attese
      invece di sedici.

   4. LA PROGRESSIONE. Ogni blocco consegna quello che ha trovato prima di
      chiedere il successivo, e nell'ordine giusto: la prima fotografia
      compare mentre le altre si stanno ancora cercando.

   5. LA MEMORIA. Ogni cartella si esplora una volta per visita. Sei
      copertine nella home e la stessa collezione più avanti chiedono la
      stessa cartella: la seconda volta la risposta è già pronta.

   L'ESTENSIONE NON CONTA

   Si prova .jpg, poi .jpeg, .png, .webp. E sotto il dieci vale anche il
   numero senza lo zero davanti: 7.jpg oltre a 07.jpg.

   Questi tentativi in più si fanno solo dove ha senso: fino a sei numeri
   oltre l'ultima fotografia trovata. Più in là si è in coda alla cartella,
   dove non c'è niente da perdonare — e continuare a chiedere quattro
   estensioni per dodici numeri a vuoto vorrebbe dire un centinaio di
   domande buttate per ogni cartella, per sei cartelle nella home.

   LA VERSIONE PICCOLA, E PERCHÉ SI MISURA

   Accanto a 07.jpg può esserci 07-s.jpg, la stessa fotografia più piccola.
   Serve dove l'immagine si vede piccola — le copertine, le vetrine — e lì
   si carica davvero, misurandola: la sua larghezza vera finisce nel
   documento.

   È l'errore che avevo fatto prima. Dichiaravo la piccola "larga 900" senza
   guardarla: quelle verticali sono larghe 675, il browser le sceglieva
   credendole sufficienti, e venivano sgranate. Una misura dichiarata a
   memoria non è una misura.

   Dove la piccola non serve — dentro una collezione, dove l'immagine è
   larga metà schermo — non si misura e non si scarica: si usa la grande,
   che è quella che serviva comunque.
   ========================================================================== */

window.CARaccolta = (function () {
  'use strict';

  var BLOCCO  = 6;     /* quanti numeri si chiedono insieme */
  var MASSIMO = 200;   /* oltre non si cerca */
  var SALTO   = 12;    /* quanti numeri di fila possono mancare senza fermarsi */

  var ESTENSIONI = ['jpg', 'jpeg', 'png', 'webp'];

  /* La larghezza dichiarata per la fotografia grande. Non è una misura: è
     un limite superiore. Serve solo a dire al browser "questa è la più
     grande che ho" — sbagliarla per eccesso non fa danni, perché non c'è
     nessun'altra candidata oltre a lei. Sbagliarla per difetto sì. */
  var GRANDE_W = 3000;

  /* La larghezza da attribuire alla piccola quando non la si è misurata.
     Anche questa non è una misura: è un limite inferiore. Le piccole sono
     generate a 900 pixel sul lato lungo, quindi sono larghe fra 675 (le
     verticali) e 900 (le orizzontali). Dichiarando 600 il browser la
     sceglie solo quando le basterebbe anche la più stretta delle due —
     cioè quando è sicuramente abbastanza. Sbagliare per difetto costa
     qualche kilobyte; sbagliare per eccesso costa un'immagine sgranata. */
  var PICCOLA_W = 600;

  /* Quello che si è già scoperto in questa visita. La chiave tiene conto
     anche del fatto che si sia misurata o no la versione piccola: sono due
     esplorazioni diverse e una non può passare per l'altra. */
  var memoria = {};

  var RETE = typeof location !== 'undefined' && /^https?:$/.test(location.protocol);

  function due(n) { return n < 10 ? '0' + n : String(n); }

  /* ----------------------------------------------------------------------
     ESISTE?

     Due modi, e la differenza è tutta nel costo.

     Su un server si chiede la sola intestazione della risorsa: risponde
     "sì, c'è" senza mandare un byte del contenuto. Se il server non sa
     rispondere a quel tipo di domanda — succede, è raro — si torna al modo
     lento.

     Da disco quella domanda non si può fare (una pagina aperta da file://
     non può fare richieste di rete), ma si può caricare l'immagine: lì è
     una lettura dal disco locale, e non costa niente.
     ---------------------------------------------------------------------- */
  function caricaEMisura(url) {
    return new Promise(function (risolvi) {
      var im = new Image();
      im.onload = function () {
        risolvi(im.naturalWidth > 0 ? { larghezza: im.naturalWidth } : null);
      };
      im.onerror = function () { risolvi(null); };
      im.src = url;
    });
  }

  function esiste(url) {
    if (!RETE || typeof fetch !== 'function') {
      return caricaEMisura(url).then(function (m) { return !!m; });
    }
    try {
      return fetch(url, { method: 'HEAD' }).then(function (r) {
        /* Il server non gestisce questo tipo di domanda: si ripiega. */
        if (r.status === 405 || r.status === 501) {
          return caricaEMisura(url).then(function (m) { return !!m; });
        }
        if (!r.ok) return false;
        /* Certi hosting rispondono 200 con la pagina "non trovato" al posto
           del file. Una pagina HTML non è una fotografia. */
        var tipo = r.headers && r.headers.get ? (r.headers.get('content-type') || '') : '';
        return tipo.indexOf('text/html') === -1;
      }, function () {
        return caricaEMisura(url).then(function (m) { return !!m; });
      });
    } catch (e) {
      return caricaEMisura(url).then(function (m) { return !!m; });
    }
  }

  /* I nomi possibili per un numero, nell'ordine in cui conviene provarli.
     Il primo è quello giusto quasi sempre: gli altri costano solo quando
     il numero manca del tutto. */
  function nomi(n) {
    var v = [];
    var p = due(n);
    ESTENSIONI.forEach(function (e) { v.push(p + '.' + e); });
    if (n < 10) ESTENSIONI.forEach(function (e) { v.push(String(n) + '.' + e); });
    return v;
  }

  function piccolaDi(url) { return url.replace(/\.[a-z0-9]+$/i, '-s$&'); }

  /* Cerca il numero n dentro la cartella. Risolve con la fotografia, o con
     null se quel numero non c'è in nessuna delle forme previste.

     Due tempi, non otto. Prima si prova il nome giusto quasi sempre —
     07.jpg — e in quel caso è finita in una domanda sola. Solo se quello
     manca si provano gli altri sette nomi, e allora si chiedono tutti
     insieme: chi cerca sta già aspettando, e sette attese in fila
     sarebbero sette volte il ritardo di una. */
  function cerca(cartella, n, misura, conAlternative) {
    var v = conAlternative ? nomi(n) : [due(n) + '.jpg'];

    function conPiccola(url) {
      var f = { num: due(n), image: url, imageW: GRANDE_W, small: null, smallW: 0 };
      var pic = piccolaDi(url);

      /* Dove la piccola verrà mostrata si carica davvero: serve la sua
         larghezza vera, e tanto è la stessa che comparirà subito dopo.
         Dove non verrà mostrata basta sapere se esiste — e chiederlo
         costa un'intestazione invece di un'immagine intera. */
      if (misura) {
        return caricaEMisura(pic).then(function (m) {
          if (m && m.larghezza > 0) { f.small = pic; f.smallW = m.larghezza; }
          return f;
        });
      }
      return esiste(pic).then(function (c) {
        if (c) { f.small = pic; f.smallW = PICCOLA_W; }
        return f;
      });
    }

    return esiste(cartella + '/' + v[0]).then(function (c) {
      if (c) return conPiccola(cartella + '/' + v[0]);

      var altri = v.slice(1);
      return Promise.all(altri.map(function (nome) {
        return esiste(cartella + '/' + nome).then(function (ok) { return ok ? nome : null; });
      })).then(function (esiti) {
        /* Il primo dell'elenco che ha risposto, non il primo che è
           arrivato: l'ordine dei nomi è una preferenza, non una corsa. */
        for (var k = 0; k < esiti.length; k++) {
          if (esiti[k]) return conPiccola(cartella + '/' + esiti[k]);
        }
        return null;
      });
    });
  }

  /* ----------------------------------------------------------------------
     ESPLORA UNA CARTELLA

     onTrovata(foto, indice) viene chiamata appena una fotografia risponde,
     senza aspettare le altre. La promessa si chiude con l'elenco completo.

     opz.misura — carica anche la versione piccola e ne prende la larghezza.
     Da attivare dove la piccola verrà mostrata (le copertine, le vetrine),
     da lasciare spento dove si userà comunque la grande.
     ---------------------------------------------------------------------- */
  function esplora(cartella, onTrovata, opz) {
    opz = opz || {};
    var misura = !!opz.misura;
    var chiave = cartella + (misura ? '#m' : '');

    if (memoria[chiave]) {
      return memoria[chiave].then(function (l) {
        /* Anche dalla memoria si consegna una alla volta, così chi chiama
           non deve avere due strade diverse a seconda di chi è arrivato
           prima. */
        if (onTrovata) l.forEach(function (f, i) { onTrovata(f, i); });
        return l;
      });
    }

    var lavoro = (function () {
      var trovate = [];
      var n = 1;
      var vuotiDiFila = 0;
      var ultimo = 0;        /* il numero più alto trovato finora */

      function blocco() {
        if (n > MASSIMO || vuotiDiFila >= SALTO) return Promise.resolve(trovate);

        var numeri = [];
        for (var k = 0; k < BLOCCO && n <= MASSIMO; k++, n++) numeri.push(n);

        return Promise.all(numeri.map(function (x) {
          /* Gli altri sette nomi si provano solo dentro un blocco
             dall'ultima fotografia trovata. Più in là si è ormai in coda
             alla cartella, dove non c'è niente da perdonare: continuare a
             chiedere .png, .webp e il numero senza zero per dodici numeri
             a vuoto vorrebbe dire un centinaio di domande inutili per ogni
             cartella, moltiplicate per sei nella home. */
          return cerca(cartella, x, misura, x <= ultimo + BLOCCO);
        })).then(function (esiti) {
          esiti.forEach(function (f, k) {
            if (!f) { vuotiDiFila++; return; }
            vuotiDiFila = 0;
            ultimo = numeri[k];
            trovate.push(f);
            if (onTrovata) onTrovata(f, trovate.length - 1);
          });
          return vuotiDiFila >= SALTO ? trovate : blocco();
        });
      }
      return blocco();
    })();

    memoria[chiave] = lavoro;
    return lavoro;
  }

  /* Quante ne ha una cartella, senza consegnarle una a una. */
  function conta(cartella) {
    return esplora(cartella).then(function (l) { return l.length; });
  }

  /* Dimentica quello che si è scoperto. Serve alle prove. */
  function scorda(cartella) {
    if (!cartella) { memoria = {}; return; }
    delete memoria[cartella];
    delete memoria[cartella + '#m'];
  }

  return { esplora: esplora, conta: conta, scorda: scorda, GRANDE_W: GRANDE_W };
})();
