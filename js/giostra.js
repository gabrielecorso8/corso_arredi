/* ==========================================================================
   CORSO ARREDI — LA GIOSTRA
   --------------------------------------------------------------------------
   Lo scorrimento circolare che si trova entrando in una collezione. Non ha
   un primo né un ultimo scatto: dalla sedicesima cucina si torna alla prima
   senza che accada niente di visibile.

   COME È FATTA, E PERCHÉ COSÌ

   Il modo ovvio di fare un carosello infinito è duplicare le fotografie in
   testa e in coda e, arrivati al bordo, riportare lo scorrimento indietro
   di nascosto. Funziona finché l'utente non trascina piano: allora il salto
   si vede, ed è il difetto classico di questi componenti.

   Qui non ci sono duplicati e non c'è nessun salto da nascondere. Esistono
   cinque riquadri fisici, sempre gli stessi, ognuno con una distanza dal
   centro (-2, -1, 0, +1, +2). Avanzando, tutte le distanze calano di uno e
   il riquadro che esce dal bordo sinistro viene rimesso a destra con la
   fotografia successiva — mentre è fuori campo, dove nessuno lo guarda.

   Sedici scatti o duecento, i riquadri restano cinque. La memoria non
   cresce, lo scorrimento non rallenta.

   COME SI DISTINGUONO FRA LORO

   Prima le fotografie ai lati erano semplicemente più trasparenti. Sembrava
   sobrio e invece era il difetto peggiore: due immagini semitrasparenti che
   si toccano si mescolano, e non si capisce più dove finisce una e comincia
   l'altra.

   Adesso nessuna fotografia è trasparente. Sono tutte piene, ognuna dentro
   la sua cornice, e stanno su piani diversi: quella che si guarda è davanti,
   le altre indietreggiano nello spazio e ruotano di lato, come le pagine di
   un libro aperto. La profondità la fa la prospettiva, non l'opacità — e due
   oggetti opachi a distanze diverse non si confondono mai.

   Chi sta dietro riceve un velo scuro che appartiene a lui, non alla
   fotografia: è ombra, non trasparenza. Il velo copre, non lascia passare.

   IL TRASCINAMENTO

   La rotazione segue il dito o il mouse fotogramma per fotogramma: non si
   aspetta il rilascio per capire dove si sta andando. Lasciando la presa la
   giostra si assesta sulla fotografia più vicina. Col puntatore fermo sopra
   si ferma e aspetta.
   ========================================================================== */

window.CAGiostra = (function () {
  'use strict';

  var el  = window.CA.el;
  var img = window.CA.img;
  var P   = window.CAPref;
  var U   = function (k, d) { return window.CAUI.t(k, d); };

  var SX = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var DX = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* --------------------------------------------------------------------
     LA FORMA DELLA GIOSTRA
     Tre numeri, e tutto il resto discende da questi. La posizione p è la
     distanza dal centro espressa in fotografie: 0 è quella davanti, 1 la
     prossima a destra, e i valori intermedi esistono davvero mentre si
     trascina — è per questo che il movimento è continuo e non a scatti.
     -------------------------------------------------------------------- */
  var PASSO      = 46;    /* % di larghezza fra una fotografia e l'altra */
  var PROFONDITA = 190;   /* px di allontanamento per ogni posizione     */
  var ANGOLO     = 26;    /* gradi di rotazione per ogni posizione       */
  var LIMITE     = 2.7;   /* oltre questa distanza non si disegna più    */

  function morsa(v, min, max) { return v < min ? min : (v > max ? max : v); }

  function due(n) { return String(n).padStart(2, '0'); }

  /* Le fotografie arrivano dalla cartella, non da un elenco scritto. La
     costruzione aspetta che siano tutte contate: la giostra ha bisogno di
     sapere quante sono per disporre i riquadri e i puntini, e contarle è
     questione di due o tre attese. Nel frattempo la pagina mostra il
     titolo e la descrizione, che ci sono già. */
  function costruisci(cat, elenco) {
    /* Una copia: da qui in poi l'elenco è della giostra, che può
       accorciarlo se una fotografia si rivela morta. */
    var foto = elenco.slice();
    var N = foto.length;
    if (!N) return null;

    /* Cinque riquadri, o meno se le fotografie sono poche: con quattro
       scatti un quinto riquadro mostrerebbe un doppione a fianco
       dell'originale. */
    var QUANTI = Math.min(5, N);
    var centro = 0;

    var pista = el('div', { class: 'giostra__pista' });
    var riquadri = [];
    var dist = [];

    for (var k = 0; k < QUANTI; k++) {
      var r = el('div', { class: 'diapo' }, [
        el('figure', {}, [
          el('div', { class: 'diapo__cornice' }, [
            /* Il velo è un elemento del riquadro, non un'opacità applicata
               alla fotografia: copre invece di lasciar passare, e due
               riquadri sovrapposti non si mescolano. */
            el('span', { class: 'diapo__ombra', 'aria-hidden': 'true' })
          ])
        ])
      ]);
      pista.append(r);
      riquadri.push(r);
      dist.push(k - Math.floor(QUANTI / 2));
    }

    function foto_a(i) { return foto[((i % N) + N) % N]; }

    function riempi(k, indice) {
      var f = foto_a(indice);
      var cornice = riquadri[k].querySelector('.diapo__cornice');
      /* Il riquadro della giostra è grande: 880 pixel su desktop, che a
         doppia densità vogliono dire 1760. Qui serve la grande, e il
         browser la prende da solo leggendo le due larghezze dichiarate. */
      var im = window.CACollezione.immagine(f, f.imageAlt, {
        urgente: indice === centro,
        sizes: '(max-width: 900px) 88vw, min(72vw, 880px)',
        /* Il file non c'è più: la fotografia esce dalla giostra insieme al
           suo puntino, e la giostra si accorcia. Un riquadro vuoto che
           continua a passare davanti è peggio di una fotografia in meno. */
        suErrore: function () { scarta(f); }
      });

      cornice.replaceChildren(im, el('span', { class: 'diapo__ombra', 'aria-hidden': 'true' }));
      riquadri[k].dataset.foto = f.id;
    }

    /* Dove sta il riquadro k adesso, tenendo conto del trascinamento in
       corso. Durante un trascinamento p non è un numero intero: è la
       posizione reale, a metà strada, e la fotografia sta davvero lì. */
    function posizione(k) { return dist[k] - trascinamento; }

    function applica(k) {
      var r = riquadri[k];
      var p = posizione(k);
      var ap = Math.abs(p);
      var davanti = ap < 0.5;

      /* Durante il trascinamento cambiano solo le posizioni. Quello che
         riguarda la lettura — chi è annunciato, chi è raggiungibile col
         tab, chi è il candidato al morphing — si aggiorna solo quando la
         giostra si è fermata: un lettore di schermo non deve raccontare
         ogni fotogramma di un gesto ancora in corso. */
      var fermo = trascinamento === 0;

      if (fermo) {
        var fig = r.firstElementChild.firstElementChild;
        if (davanti) fig.setAttribute('data-morph', cat.id);
        else fig.removeAttribute('data-morph');
      }

      /* Traslazione, allontanamento e rotazione crescono insieme alla
         distanza. La rotazione si ferma a due posizioni: oltre, la
         fotografia si vedrebbe quasi di taglio e diventerebbe una riga.

         Si calcolano anche per chi è fuori campo: costa un'assegnazione e
         garantisce che rientrando non salti dentro dalla posizione di
         qualche gesto fa. */
      var x = p * PASSO;
      var z = -Math.min(ap, 3) * PROFONDITA;
      var g = -morsa(p, -2, 2) * ANGOLO;

      r.style.transform =
        'translate3d(' + x.toFixed(2) + '%, 0, ' + z.toFixed(1) + 'px) ' +
        'rotateY(' + g.toFixed(2) + 'deg)';

      /* Chi è più lontano riceve più ombra. È un velo che appartiene al
         riquadro: copre la fotografia invece di renderla trasparente,
         quindi due riquadri sovrapposti non si mescolano mai. */
      r.style.setProperty('--velo', (Math.min(ap, 2) / 2 * 0.62).toFixed(3));

      /* L'ordine di impilamento segue la profondità: davanti sta davanti. */
      r.style.zIndex = String(100 - Math.round(ap * 10));

      /* Oltre il limite non si vede: niente da comporre, niente da
         leggere, niente da toccare. */
      r.style.visibility = ap > LIMITE ? 'hidden' : '';
      if (ap > LIMITE) {
        if (fermo) { r.setAttribute('aria-hidden', 'true'); r.inert = true; }
        return;
      }

      r.classList.toggle('is-centro', davanti);
      /* Chi non è davanti esce dall'ordine di lettura e dal percorso del
         tab: un lettore di schermo non deve annunciare quattro scatti che
         nessuno sta guardando. */
      if (fermo) {
        r.setAttribute('aria-hidden', String(!davanti));
        r.inert = !davanti;
      }
    }

    function ridisegna() {
      for (var k = 0; k < QUANTI; k++) applica(k);
    }

    /* Rimettere un riquadro dall'altra parte è un salto di posizione, non
       un movimento: va fatto senza transizione, altrimenti lo si vede
       attraversare tutto lo schermo. */
    function senzaTransizione(k) {
      riquadri[k].classList.add('is-salto');
      void riquadri[k].offsetWidth;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { riquadri[k].classList.remove('is-salto'); });
      });
    }

    var bordo = Math.floor(QUANTI / 2);
    var trascinamento = 0;      /* posizioni, anche frazionarie */

    /* Ruota di n posizioni in un colpo solo. Serve anche al trascinamento,
       che può lasciare la presa dopo tre fotografie. */
    function passo(n) {
      if (!n) return;
      centro = ((centro + n) % N + N) % N;
      for (var k = 0; k < QUANTI; k++) {
        var prima = dist[k];
        dist[k] -= n;
        /* Il riquadro uscito da un lato rientra dall'altro. Con più di un
           passo per volta può doverlo fare più di una volta, quindi è un
           ciclo e non un controllo singolo. */
        var rientrato = false;
        while (dist[k] > bordo)  { dist[k] -= QUANTI; rientrato = true; }
        while (dist[k] < -bordo) { dist[k] += QUANTI; rientrato = true; }
        if (rientrato || prima !== dist[k]) {
          if (rientrato) { riempi(k, centro + dist[k]); senzaTransizione(k); }
        }
        applica(k);
      }
      aggiornaTesto();
    }

    /* Andare a una fotografia lontana un passo alla volta sarebbe lento e
       confuso. Si sceglie il verso più corto sul cerchio e si ricostruisce
       la disposizione da fermi. */
    function vaiA(indice) {
      centro = ((indice % N) + N) % N;
      trascinamento = 0;
      for (var k = 0; k < QUANTI; k++) {
        dist[k] = k - bordo;
        riempi(k, centro + dist[k]);
        senzaTransizione(k);
        applica(k);
      }
      aggiornaTesto();
    }

    /* ------------------------------------------------------------------
       QUANDO UNA FOTOGRAFIA NON C'È PIÙ

       Il file c'era quando si è contato e non c'è più adesso. Invece di
       lasciare un riquadro vuoto che continua a passare davanti, la
       fotografia esce: dall'elenco, dai puntini, e dal giro.

       Se restano meno di cinque scatti servono meno riquadri, o si
       vedrebbe lo stesso scatto due volte affiancato: quelli di troppo si
       nascondono e la giostra si ricompone da ferma.
       ------------------------------------------------------------------ */
    function scarta(f) {
      var k = foto.indexOf(f);
      if (k === -1) return;

      foto.splice(k, 1);
      N = foto.length;
      if (punti.children[k]) punti.children[k].remove();

      if (!N) { fermaDaSola(); sezione.hidden = true; return; }

      if (k < centro) centro--;
      centro = ((centro % N) + N) % N;

      var nuovo = Math.min(5, N);
      if (nuovo !== QUANTI) {
        for (var j = 0; j < riquadri.length; j++) riquadri[j].hidden = j >= nuovo;
        QUANTI = nuovo;
        bordo = Math.floor(QUANTI / 2);
      }
      vaiA(centro);
    }

    /* ------------------------------------------------------------------
       Quello che si legge sotto la fotografia
       ------------------------------------------------------------------ */
    /* Il numero della fotografia non si vede più: in una raccolta che gira
       all'infinito, "03 / 16" è una precisione che non serve a nessuno e
       fa somigliare la collezione a un elenco. I puntini bastano a dire a
       che punto si è. Resta però l'annuncio per chi naviga con la voce:
       lì la posizione è l'unico orientamento possibile. */
    var voce   = el('p', { class: 'sr-only', role: 'status', 'aria-live': 'polite' });
    var titolo = el('h2', { class: 't-heading giostra__tit' });
    var testo  = el('p', { class: 't-body giostra__testo measure' });
    var didascalie = el('div', { class: 'giostra__testi' }, [ titolo, testo ]);

    /* Il cuore sta sopra la fotografia, in alto a destra: è lì che si
       cerca, ed è lì che si tocca senza spostare lo sguardo. */
    var cuoreG = window.CAGallery.cuore(foto[0], cat.id, cat.name, 'foto');
    var vaiContatti = el('a', {
      class: 'btn btn--filled giostra__cta', href: 'contatti.html'
    });

    var punti = el('div', { class: 'giostra__punti', role: 'tablist',
                            'aria-label': U('giostra.vaiA') });
    foto.forEach(function (f, k) {
      var p = el('button', {
        class: 'giostra__punto', type: 'button', role: 'tab',
        'aria-label': (f.title || U('vetrina.numero', { n: k + 1 }))
      });
      p.addEventListener('click', function () { pausaEPoiRiprendi(); vaiA(k); });
      punti.append(p);
    });

    function aggiornaTesto() {
      var f = foto_a(centro);
      voce.textContent   = U('giostra.posizione', { i: centro + 1, n: N, t: f.title || '' });
      titolo.textContent = f.title || cat.name;
      testo.textContent  = f.text || '';
      cuoreG.punta(f);

      /* La dissolvenza del testo riparte a ogni cambio: si riavvia
         togliendo e rimettendo la classe fra due fotogrammi. */
      didascalie.classList.remove('is-entra');
      void didascalie.offsetWidth;
      didascalie.classList.add('is-entra');

      [].forEach.call(punti.children, function (p, k) {
        p.setAttribute('aria-selected', String(k === centro));
      });
    }

    /* ------------------------------------------------------------------
       LE ISTRUZIONI STANNO PRIMA DELLE FOTOGRAFIE

       Prima erano sotto. Ma chi guarda una fotografia e vede un cuore
       nell'angolo si è già chiesto cosa faccia: la spiegazione arrivava
       dopo la domanda, quando ormai o l'aveva premuto a caso o l'aveva
       ignorato. Detta prima, il cuore si trova già spiegato.
       ------------------------------------------------------------------ */
    var istruzioni = el('p', { class: 'giostra__istruzioni t-body measure' }, [
      el('span', {
        class: 'giostra__cuoricino', 'aria-hidden': 'true',
        html: '<svg width="15" height="15" viewBox="0 0 24 24">' +
              '<path d="M12 20.5S3.5 15 3.5 9.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8.5 2.1c0 5.6-8.5 11.1-8.5 11.1z" ' +
              'fill="currentColor"/></svg>'
      }),
      el('span', { text: U('giostra.istruzioni') })
    ]);

    /* Sotto le fotografie resta solo il conto di quello che è stato
       segnato: non è più una spiegazione, è un riscontro. */
    var spinta = el('p', { class: 'giostra__spinta t-body-sm' });
    var primoCuore = true;

    window.CA.pulizia(P.osserva(function (l) {
      if (!l.length) {
        spinta.textContent = U('giostra.nessuna');
        vaiContatti.textContent = U('giostra.parlane');
        vaiContatti.classList.remove('is-pronta');
      } else {
        spinta.textContent = l.length === 1
          ? U('giostra.una') : U('giostra.molte', { n: l.length });
        vaiContatti.textContent = U('giostra.continua');
        vaiContatti.classList.add('is-pronta');
      }
    }));

    cuoreG.addEventListener('click', function () {
      if (primoCuore && P.conta() > 0) {
        primoCuore = false;
        window.CAGallery.avviso(U('giostra.segnata'));
      }
    });

    /* ------------------------------------------------------------------
       Comandi
       ------------------------------------------------------------------ */
    var prec = el('button', { class: 'giostra__nav giostra__nav--prev', type: 'button',
                              'aria-label': U('giostra.prec'), html: SX });
    var succ = el('button', { class: 'giostra__nav giostra__nav--next', type: 'button',
                              'aria-label': U('giostra.succ'), html: DX });
    prec.addEventListener('click', function () { pausaEPoiRiprendi(); passo(-1); });
    succ.addEventListener('click', function () { pausaEPoiRiprendi(); passo(1); });

    var palco = el('div', { class: 'giostra__palco' }, [ pista, cuoreG, prec, succ ]);

    /* ------------------------------------------------------------------
       IL TRASCINAMENTO

       La giostra segue il dito fotogramma per fotogramma: mentre si
       trascina le fotografie sono davvero a metà strada, non ferme in
       attesa del rilascio. È la differenza fra girare una manopola e
       premere un pulsante.

       Lasciando la presa si assesta sulla più vicina — con un po' di
       slancio, così un gesto rapido fa più di una fotografia anche se il
       dito non ha percorso tutta la distanza.
       ------------------------------------------------------------------ */
    var presa = null;

    function larghezzaPasso() {
      /* Quanti pixel separano una fotografia dalla successiva, adesso.
         Si ricalcola a ogni presa: dipende dalla larghezza della finestra. */
      var w = riquadri[0] ? riquadri[0].offsetWidth : palco.offsetWidth;
      return Math.max(80, w * PASSO / 100);
    }

    palco.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      presa = {
        x: e.clientX, y: e.clientY, t: Date.now(),
        larghezza: larghezzaPasso(), attiva: false, id: e.pointerId
      };
    });

    palco.addEventListener('pointermove', function (e) {
      if (!presa) return;
      var dx = e.clientX - presa.x;
      var dy = e.clientY - presa.y;

      /* Finché non si è capito se è uno scorrimento orizzontale o una
         sfogliata verticale della pagina, non si prende in carico il
         gesto: rubare uno scorrimento verticale su telefono è il modo
         più rapido di rendere una pagina inusabile. */
      if (!presa.attiva) {
        if (Math.abs(dx) < 8) return;
        if (Math.abs(dx) < Math.abs(dy)) { presa = null; return; }
        presa.attiva = true;
        palco.classList.add('is-presa');
        fermaDaSola();
        try { palco.setPointerCapture(presa.id); } catch (err) {}
      }

      e.preventDefault();
      trascinamento = -dx / presa.larghezza;
      ridisegna();
    }, { passive: false });

    function lasciaPresa(e) {
      if (!presa) return;
      var attiva = presa.attiva;
      var dx = e && typeof e.clientX === 'number' ? e.clientX - presa.x : 0;
      var durata = Math.max(1, Date.now() - presa.t);
      try { palco.releasePointerCapture(presa.id); } catch (err) {}
      presa = null;
      palco.classList.remove('is-presa');
      if (!attiva) return;

      /* Lo slancio: un gesto rapido conta più di quanto abbia percorso.
         Limitato a due fotografie, oltre diventa una lotteria. */
      var velocita = dx / durata;                       /* px al millisecondo */
      var slancio = morsa(-velocita * 120 / larghezzaPasso(), -2, 2);
      var quante = Math.round(trascinamento + slancio);

      trascinamento = 0;
      if (quante) passo(quante); else ridisegna();
      pausaEPoiRiprendi();
    }

    palco.addEventListener('pointerup', lasciaPresa);
    palco.addEventListener('pointercancel', function () {
      if (!presa) return;
      presa = null;
      palco.classList.remove('is-presa');
      trascinamento = 0;
      ridisegna();
      pausaEPoiRiprendi();
    });

    /* Trascinando con il mouse il browser proverebbe a "prendere" la
       fotografia come si fa per salvarla: qui il gesto è nostro. */
    palco.addEventListener('dragstart', function (e) { e.preventDefault(); });

    /* Rotellina orizzontale e trackpad. Con una soglia e una pausa, se no
       un solo gesto del trackpad manderebbe avanti otto fotografie. */
    var ultimoGesto = 0;
    palco.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
      e.preventDefault();
      var ora = Date.now();
      if (ora - ultimoGesto < 320) return;
      ultimoGesto = ora;
      pausaEPoiRiprendi();
      passo(e.deltaX > 0 ? 1 : -1);
    }, { passive: false });

    var sezione = el('section', {
      class: 'giostra',
      'aria-roledescription': U('giostra.ruolo'),
      'aria-label': U('giostra.etichetta', { x: cat.name })
    }, [
      el('div', { class: 'container' }, [ istruzioni ]),
      palco,
      el('div', { class: 'container' }, [
        el('div', { class: 'giostra__sotto' }, [
          didascalie,
          el('div', { class: 'giostra__barra' }, [
            el('div', { class: 'giostra__azioni' }, [ vaiContatti ]),
            spinta
          ]),
          punti,
          voce
        ])
      ])
    ]);

    /* Frecce da tastiera: solo quando il fuoco è dentro la giostra,
       altrimenti si ruberebbero le frecce al resto della pagina. */
    sezione.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); pausaEPoiRiprendi(); passo(1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); pausaEPoiRiprendi(); passo(-1); }
      if (e.key === 'm' || e.key === 'M') { e.preventDefault(); cuoreG.click(); }
    });

    /* ------------------------------------------------------------------
       Il respiro
       La giostra avanza da sola, piano, finché nessuno la tocca. Serve a
       far capire in due secondi che le fotografie sono tante e che si
       possono scorrere — cosa che una freccia ferma non dice.

       Si ferma per sempre al primo gesto: da lì in poi comanda l'utente e
       non deve rincorrere niente. Si ferma anche quando la scheda passa in
       secondo piano e quando il sistema chiede meno animazioni.

       Per toglierla del tutto basta cambiare RESPIRO in 0.
       ------------------------------------------------------------------ */
    var RESPIRO = 5200;      /* ogni quanto avanza da sola */
    var PAUSA   = 9000;       /* quanto sta zitta dopo un gesto */
    var battito = null;
    var ripresa = null;
    var inVista = false;
    var pochiMovimenti = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function partiDaSola() {
      if (!RESPIRO || battito || pochiMovimenti || N < 2 || !inVista) return;
      battito = setInterval(function () {
        if (document.hidden) return;
        passo(1);
      }, RESPIRO);
    }

    function fermaDaSola() {
      if (battito) { clearInterval(battito); battito = null; }
      if (ripresa) { clearTimeout(ripresa); ripresa = null; }
    }

    /* Toccando qualcosa la giostra si mette da parte, non si spegne.
       Spegnerla per sempre al primo gesto era una punizione: chi va
       avanti di una foto per curiosità si ritrovava un carosello morto e
       doveva continuare a mano. Nove secondi di silenzio sono il tempo di
       leggere la descrizione; dopo, riprende da dove l'utente l'ha
       lasciata — che è il posto giusto da cui ripartire. */
    function pausaEPoiRiprendi() {
      fermaDaSola();
      ripresa = setTimeout(function () { ripresa = null; partiDaSola(); }, PAUSA);
    }

    sezione.addEventListener('pointerdown', pausaEPoiRiprendi);
    sezione.addEventListener('focusin', pausaEPoiRiprendi);
    /* Col puntatore fermo sopra la fotografia si sta guardando quella:
       non gliela si porta via. */
    palco.addEventListener('pointerenter', fermaDaSola);
    palco.addEventListener('pointerleave', pausaEPoiRiprendi);

    /* Non parte finché la giostra non è davvero sullo schermo: muoversi
       fuori campo consuma batteria e non lo vede nessuno. */
    if (window.IntersectionObserver) {
      var occhio = new IntersectionObserver(function (voci) {
        voci.forEach(function (v) {
          inVista = v.isIntersecting;
          if (inVista) partiDaSola(); else fermaDaSola();
        });
      }, { threshold: 0.4 });
      occhio.observe(sezione);
      window.CA.pulizia(function () { occhio.disconnect(); });
    } else {
      inVista = true;
      partiDaSola();
    }

    /* Cambiando pagina la giostra sparisce dallo schermo ma il suo
       intervallo continuerebbe a girare su nodi che non esistono più.
       Qui si spegne insieme al resto. */
    window.CA.pulizia(fermaDaSola);

    vaiA(0);

    /* Ridimensionando la finestra cambia la larghezza di una fotografia e
       con essa il passo: le posizioni vanno ricalcolate, altrimenti la
       fila resta larga come la finestra di prima. */
    if (window.ResizeObserver) {
      var metro = new window.ResizeObserver(function () { ridisegna(); });
      metro.observe(palco);
      window.CA.pulizia(function () { metro.disconnect(); });
    } else {
      window.addEventListener('resize', ridisegna);
      window.CA.pulizia(function () { window.removeEventListener('resize', ridisegna); });
    }

    return sezione;
  }

  return { costruisci: costruisci };
})();
