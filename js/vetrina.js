/* ==========================================================================
   CORSO ARREDI — LA VETRINA
   --------------------------------------------------------------------------
   Un carosello che va da solo. Non è la giostra delle collezioni: là si
   sfoglia, qui si guarda. Là il visitatore comanda, qui la fotografia
   cambia da sé mentre lui legge il testo accanto.

   Per questo il movimento è un altro. Niente prospettiva, niente
   trascinamento, nessuna freccia: una dissolvenza lenta fra due immagini e
   un avvicinamento impercettibile che continua per tutto il tempo in cui
   una fotografia resta a schermo. È lo stesso respiro dell'apertura della
   home, e la ragione è la stessa: una fotografia ferma dentro un riquadro
   sembra un poster, una che si avvicina sembra una finestra.

   Due sole immagini esistono nel documento per volta — quella che si vede
   e quella che sta arrivando — anche con dodici fotografie in elenco.

   QUANTE SONO LO DECIDE LA CARTELLA

   La vetrina non ha un elenco scritto da nessuna parte: guarda dentro
   assets/img/studio e prende quello che trova. Aggiungendo un file
   compare un posto in più; togliendone uno il posto sparisce con lui.

   Prima l'elenco era scritto a mano nei contenuti, e bastava cancellare
   una fotografia dal disco per lasciare nel sito un riquadro grigio e un
   puntino che non portava da nessuna parte: il posto continuava a esistere
   perché era l'elenco a crearlo, non il file. Adesso è il file a crearlo.

   Le fotografie non arrivano tutte insieme — la cartella si esplora un
   pezzo per volta — e la vetrina non le aspetta: mostra la prima appena
   c'è e si allarga mentre le altre si presentano. I puntini nascono con
   loro.

   E se una si rompe davvero — il file c'era quando si è contato e non c'è
   più quando tocca a lei — viene tolta dall'elenco insieme al suo puntino,
   e si passa alla successiva. Un riquadro vuoto non si vede mai.

   LO STESSO COMPONENTE IN DUE POSTI, CON DUE ANDATURE

   Accanto a "Vieni a vedere" e nella prima schermata della home. Stesse
   fotografie, stesso meccanismo, ritmo diverso — ed è la differenza che
   conta:

     Studio    4,6s a fotografia, 0,9s di dissolvenza
     Home      6,0s a fotografia, 1,3s di dissolvenza

   Nella home il visitatore sta ancora decidendo se restare, e sta leggendo
   il titolo: un'immagine che cambia troppo spesso lo interrompe, una che
   cambia troppo di rado lo lascia credere che sia una fotografia sola. Sei
   secondi stanno in mezzo — il tempo di leggere il titolo e cominciare il
   sommario — e la dissolvenza lunga fa sì che il cambio si noti dopo, non
   durante. Nello Studio si è già dentro e si sta guardando: lì il ritmo
   può essere più vivo.

   L'ORDINE È CASUALE, E FUNZIONA A SACCHETTO

   Non si estrae ogni volta a caso: si mettono tutte le fotografie in un
   sacchetto, si pescano una alla volta senza rimetterle dentro, e quando
   il sacchetto è vuoto si riempie di nuovo. Così l'ordine è imprevedibile
   ma nessuna fotografia esce due volte prima che siano uscite tutte —
   cosa che l'estrazione a caso non garantisce affatto.

   È anche il modo giusto per una raccolta che cresce: una fotografia
   aggiunta mentre la vetrina gira entra nel sacchetto successivo, senza
   che si debba ricominciare niente.

   Il mescolamento è quello di Fisher e Yates: ogni ordine possibile ha la
   stessa probabilità. La versione ingenua — ordinare a caso — non ce l'ha,
   e su liste corte si vede.
   ========================================================================== */

window.CAVetrina = (function () {
  'use strict';

  var el = window.CA.el;

  var TEMPO = 4600;      /* quanto resta a schermo una fotografia */
  var CAMBIO = 900;      /* quanto dura la dissolvenza */

  /* Mescolamento di Fisher e Yates. Si lavora su una copia: l'elenco che
     arriva dai contenuti non va toccato, lo usano anche altrove. */
  function mescola(v) {
    var a = v.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ------------------------------------------------------------------------
     fonte può essere:
       { cartella: "assets/img/studio", descrizioni: { "01": {...} } }
         — la cartella si esplora e le fotografie arrivano una alla volta;
       [ {...}, {...} ]
         — un elenco già pronto, per i casi in cui non c'è una cartella.
     ------------------------------------------------------------------------ */
  function costruisci(fonte, etichetta, opz) {
    if (!fonte) return null;
    opz = opz || {};

    var tempo  = opz.tempo  || TEMPO;
    var cambio = opz.cambio || CAMBIO;
    var conDidascalia = opz.didascalia !== false;
    var conPunti = opz.punti !== false;
    /* Sul fondo di una schermata intera fermarsi al passaggio del mouse
       non ha senso: il puntatore ci sta sopra praticamente sempre, e la
       vetrina resterebbe ferma senza che nessuno l'abbia chiesto. */
    var pausaSuHover = opz.pausaSuHover !== false;
    var casuale = opz.casuale !== false;

    var foto = [];          /* quelle vive, adesso */
    var corrente = null;    /* quella che si vede */
    var sacchetto = [];     /* le prossime, già mescolate */

    var palco = el('div', { class: 'vetrina__palco' });
    var didascalia = el('p', { class: 'vetrina__did t-meta' });

    /* L'annuncio per chi non vede. La vetrina cambia da sola, e un
       cambiamento automatico non va gridato a ogni giro: si dichiara
       l'elenco una volta e si lascia che sia il visitatore a chiedere,
       non la pagina a interrompere. Per questo aria-live è assente. */
    var punti = el('div', { class: 'vetrina__punti', role: 'tablist',
                            'aria-label': window.CAUI.t('vetrina.scegli') });

    /* ------------------------------------------------------------------
       IL SACCHETTO
       ------------------------------------------------------------------ */
    function riempiSacchetto() {
      sacchetto = casuale ? mescola(foto) : foto.slice();
      /* Un doppione a cavallo fra due giri sarebbe l'unico caso in cui la
         stessa fotografia si vede due volte di fila: si evita scambiando
         la prima con l'ultima. */
      if (sacchetto.length > 1 && sacchetto[0] === corrente) {
        var t = sacchetto[0];
        sacchetto[0] = sacchetto[sacchetto.length - 1];
        sacchetto[sacchetto.length - 1] = t;
      }
    }

    function pesca() {
      if (!foto.length) return null;
      if (!sacchetto.length) riempiSacchetto();
      var f = sacchetto.shift();
      /* Può essere una scartata nel frattempo: si tira ancora. */
      return foto.indexOf(f) === -1 ? pesca() : f;
    }

    /* ------------------------------------------------------------------
       MOSTRA
       ------------------------------------------------------------------ */
    function mostra(f, animato) {
      if (!f) return;
      corrente = f;

      var im = window.CACollezione.immagine(f, f.imageAlt, {
        urgente: !animato && opz.urgente !== false,
        sizes: opz.sizes || '(max-width: 900px) 92vw, 46vw',
        /* Il file non c'è più: la fotografia esce di scena e con lei il
           suo puntino. Meglio una vetrina di otto che una di nove con un
           buco dentro. */
        suErrore: function () { scarta(f); }
      });

      var nuova = el('figure', { class: 'vetrina__foto' + (animato ? ' is-entra' : '') }, [ im ]);

      /* Tutte quelle già presenti, non solo la prima. Premendo i puntini
         in rapida successione se ne accumulavano: ognuna prendeva di mira
         sempre il primo elemento, e le altre restavano nel documento a
         piena opacità sotto quella nuova. */
      var vecchie = [].slice.call(palco.children);
      palco.append(nuova);

      /* Due fotogrammi di attesa: il browser deve applicare lo stato di
         partenza prima che la classe venga tolta, o non anima niente. */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          nuova.classList.remove('is-entra');
          vecchie.forEach(function (x) {
            x.classList.add('is-esce');
            setTimeout(function () { x.remove(); }, cambio + 60);
          });
        });
      });

      aggiornaSotto();
    }

    function aggiornaSotto() {
      didascalia.textContent = (corrente && corrente.didascalia) || '';
      foto.forEach(function (f) {
        if (f.punto) f.punto.setAttribute('aria-selected', String(f === corrente));
      });
    }

    /* ------------------------------------------------------------------
       AGGIUNGI E SCARTA
       Sono le due sole porte da cui l'elenco cambia: chiuderle qui vuol
       dire che i puntini, il sacchetto e il battito non possono restare
       indietro rispetto a quello che c'è davvero.
       ------------------------------------------------------------------ */
    function aggiungi(f) {
      if (!f || !f.image) return;
      f.punto = el('button', {
        class: 'vetrina__punto', type: 'button', role: 'tab',
        'aria-label': f.didascalia || f.title || window.CAUI.t('vetrina.numero', { n: foto.length + 1 })
      });
      f.punto.addEventListener('click', function () {
        ferma(); mostra(f, true); riprendi();
      });
      punti.append(f.punto);
      foto.push(f);

      /* LA PRIMA NON È LA PRIMA DELLA CARTELLA

         Mostrare subito quella appena arrivata sarebbe stato più semplice,
         ma la prima ad arrivare è sempre la 01: la prima schermata sarebbe
         stata identica a ogni visita, e l'ordine casuale avrebbe cominciato
         a contare solo dalla seconda fotografia — cioè dopo sei secondi,
         quando molti se ne sono già andati.

         Le fotografie arrivano a gruppi di sei, tutte nello stesso istante.
         Aspettare la fine di quell'istante — non un decimo di secondo, il
         tempo di un turno — vuol dire poter pescare a caso fra sei invece
         di prendere per forza la prima. */
      if (!primaChiesta) {
        primaChiesta = true;
        setTimeout(prima, 0);
      }
      if (foto.length === 2) parti();
      aggiornaConto();
    }

    var primaChiesta = false;
    var primaFatta = false;
    function prima() {
      if (primaFatta || !foto.length) return;
      primaFatta = true;
      mostra(pesca(), false);
      parti();
    }

    function scarta(f) {
      var k = foto.indexOf(f);
      if (k === -1) return;
      foto.splice(k, 1);
      if (f.punto) f.punto.remove();
      sacchetto = sacchetto.filter(function (x) { return x !== f; });
      aggiornaConto();

      if (f !== corrente) return;
      /* Era quella in vista: si passa subito alla prossima, senza
         aspettare il battito. Se non ne restano, il palco si svuota e la
         riserva prende il suo posto. */
      corrente = null;
      var p = pesca();
      if (p) { mostra(p, true); return; }
      ferma();
      palco.replaceChildren();
      riserva();
    }

    function aggiornaConto() {
      sezione.classList.toggle('is-sola', foto.length < 2);
      sezione.classList.toggle('is-vuota', foto.length === 0);
    }

    /* Se non è rimasto niente — cartella vuota, o tutte rotte — si mette
       quello che chi ci chiama ha indicato come ripiego. Se non ha
       indicato niente, la vetrina resta vuota e non finge. */
    var riservaMessa = false;
    function riserva() {
      if (riservaMessa || !opz.riserva || !opz.riserva.image) return;
      riservaMessa = true;
      palco.append(el('figure', { class: 'vetrina__foto' },
        [ window.CA.img(opz.riserva.image, opz.riserva.imageAlt, true) ]));
    }

    /* ------------------------------------------------------------------
       Il tempo
       ------------------------------------------------------------------ */
    var battito = null;
    var ripresa = null;
    var inVista = false;
    var pochiMovimenti = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function parti() {
      if (battito || pochiMovimenti || foto.length < 2 || !inVista) return;
      battito = setInterval(function () {
        if (document.hidden) return;
        mostra(pesca(), true);
      }, tempo);
    }
    function ferma() {
      if (battito) { clearInterval(battito); battito = null; }
      if (ripresa) { clearTimeout(ripresa); ripresa = null; }
    }
    function riprendi() {
      if (ripresa) clearTimeout(ripresa);
      ripresa = setTimeout(function () { ripresa = null; parti(); }, tempo);
    }

    /* Avanti e indietro seguono l'ordine della cartella, non il sacchetto:
       chi preme una freccia sta sfogliando, e sfogliare a caso non è
       sfogliare. */
    function scorri(verso) {
      if (foto.length < 2) return;
      var k = foto.indexOf(corrente);
      if (k === -1) k = 0;
      mostra(foto[((k + verso) % foto.length + foto.length) % foto.length], true);
    }

    var sotto = (conDidascalia || conPunti)
      ? el('div', { class: 'vetrina__sotto' }, [
          conDidascalia ? didascalia : null,
          conPunti ? punti : null
        ])
      : null;

    var sezione = el('div', {
      class: 'vetrina' + (opz.classe ? ' ' + opz.classe : '') + ' is-vuota is-sola',
      style: '--vetrina-cambio:' + cambio + 'ms; --vetrina-tempo:' + tempo + 'ms',
      'aria-roledescription': window.CAUI.t('vetrina.ruolo'),
      'aria-label': etichetta || window.CAUI.t('vetrina.etichetta')
    }, [ palco, sotto ]);

    /* Col puntatore sopra la vetrina si sta guardando: non si cambia.
       Vale dove la vetrina è un oggetto che si guarda, non dove è il
       fondo della pagina. */
    if (pausaSuHover) {
      sezione.addEventListener('pointerenter', ferma);
      sezione.addEventListener('pointerleave', riprendi);
    }
    sezione.addEventListener('focusin', ferma);
    sezione.addEventListener('focusout', riprendi);

    sezione.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); ferma(); scorri(1); riprendi(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); ferma(); scorri(-1); riprendi(); }
    });

    /* Non gira fuori dallo schermo: consuma e non lo vede nessuno.

       Soglia zero e non una frazione: con una soglia al 30% una vetrina
       più alta della finestra non la raggiunge mai, e resta ferma per
       sempre. Il margine negativo chiede in cambio che sia entrata almeno
       di un po', così non parte per una riga di pixel sul bordo. */
    if (window.IntersectionObserver) {
      var occhio = new IntersectionObserver(function (voci) {
        voci.forEach(function (v) { inVista = v.isIntersecting; if (inVista) parti(); else ferma(); });
      }, { threshold: 0, rootMargin: '-8% 0px' });
      occhio.observe(sezione);
      window.CA.pulizia(function () { occhio.disconnect(); });
    } else {
      inVista = true;
    }
    window.CA.pulizia(ferma);

    /* ------------------------------------------------------------------
       LE FOTOGRAFIE

       Da una cartella arrivano una alla volta: la prima si vede subito,
       le altre si aggiungono mentre si stanno ancora cercando. Nessuna
       attesa a schermo vuoto, e nessun posto creato in anticipo per una
       fotografia che potrebbe non esserci.
       ------------------------------------------------------------------ */
    if (Array.isArray(fonte)) {
      fonte.forEach(aggiungi);
      if (!foto.length) riserva();
    } else if (fonte.cartella && window.CACollezione) {
      window.CACollezione.carica(fonte, function (f) { aggiungi(f); }, { misura: true })
        .then(function () {
          if (!foto.length) riserva();
          /* Se per qualsiasi motivo il battito non è partito — la vetrina
             è entrata in vista mentre si contava, per esempio — qui c'è
             la rete che lo prende. */
          parti();
        });
    }

    /* L'osservatore risponde al fotogramma dopo. Se la vetrina è già in
       vista al momento della costruzione — ed è il caso della prima
       schermata — questa la fa partire subito, senza aspettarlo. */
    requestAnimationFrame(function () {
      if (inVista || !sezione.getBoundingClientRect) return;
      var r = sezione.getBoundingClientRect();
      var h = window.innerHeight || 0;
      if (r.top < h && r.bottom > 0) { inVista = true; parti(); }
    });

    return sezione;
  }

  return { costruisci: costruisci };
})();
