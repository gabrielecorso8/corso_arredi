/* ==========================================================================
   CORSO ARREDI — CONFIGURATORE DI PROGETTO
   --------------------------------------------------------------------------
   Sostituisce il modulo contatti con un percorso a passi: una domanda alla
   volta, risposte già pronte da toccare, tutto facoltativo tranne un recapito.

   L'idea portante: mentre rispondi, il configuratore compone una frase in
   italiano che descrive il tuo progetto. Alla fine leggi esattamente quello
   che leggeremo noi, e quella frase viene spedita insieme ai dati.

   Serve a due cose. A chi scrive, per capire di aver comunicato bene. A chi
   riceve, per classificare la richiesta e rispondere nel merito invece che
   con un preventivo generico.

   Due scelte di impianto, prese dopo averlo provato:

   1. Niente <fieldset>/<legend>. Il browser posiziona la legend fuori dal
      flusso normale, nello spazio del bordo: dentro un contenitore flex
      finisce sovrapposta al contenuto. Qui si usa un div con role="group"
      e aria-labelledby, che ottiene lo stesso significato senza il difetto.

   2. Nessun avanzamento automatico. Scegliere e vedersi portare avanti da
      soli toglie il controllo: non fai in tempo a rileggere, e se hai
      sbagliato devi tornare indietro. Si avanza con Avanti o con Invio.
   ========================================================================== */

window.CAConfig = (function () {
  'use strict';

  var U = function (k, d) { return window.CAUI.t(k, d); };

  var el = window.CA.el;
  var seq = 0;                     /* per generare id univoci */

  /* Unisce più etichette in un elenco: "a, b e c" — e in inglese
     "a, b and c". La congiunzione sta in content/ui.js, perché è una
     parola come le altre e va tradotta come le altre. */
  function elenco(v) {
    if (!v.length) return '';
    if (v.length === 1) return v[0];
    return v.slice(0, -1).join(', ') + U('cfg.e') + v[v.length - 1];
  }

  function minuscolo(t) { return t.charAt(0).toLowerCase() + t.slice(1); }

  /* scrollIntoView non esiste in tutti gli ambienti: meglio non darlo
     per scontato, così il configuratore non si blocca se manca. */
  function porta(n) {
    if (n && typeof n.scrollIntoView === 'function') {
      n.scrollIntoView({ block: 'nearest' });
    }
  }

  function costruisci(d) {
    var passi = d.steps || [];
    var scelte = {};                 /* id -> array di valori */
    var corrente = 0;
    var totale = passi.length + 1;   /* i passi più quello dei recapiti */

    /* ------------------------------------------------------------------
       Quello che il visitatore ha già detto guardando le fotografie.

       Chi arriva qui dopo aver segnato tre cucine ha già risposto alla
       prima domanda: chiedergliela di nuovo sarebbe farlo lavorare due
       volte. Le voci corrispondenti partono selezionate.

       La preselezione avviene una volta sola, al caricamento. Da lì in
       poi comanda lui: può togliere una voce che gli abbiamo messo, o
       aggiungerne altre, e togliere una fotografia dai preferiti non
       gli cancella una risposta che nel frattempo aveva confermato.
       ------------------------------------------------------------------ */
    var P = window.CAPref;
    var preselezionati = [];
    (function preselezione() {
      if (!P) return;
      var passoAmbito = passi.filter(function (p) { return p.id === 'ambito'; })[0];
      if (!passoAmbito) return;
      preselezionati = P.ambiti().filter(function (v) {
        return passoAmbito.options.some(function (o) { return o.v === v; });
      });
      if (preselezionati.length) scelte.ambito = preselezionati.slice();
    })();

    /* ------------------------------------------------------------------
       Riepilogo: compone la frase dai pezzi dichiarati nei dati.
       ------------------------------------------------------------------ */
    var liberi = {};                 /* id passo -> testo scritto a mano */

    function frase() {
      var pezzi = [];
      passi.forEach(function (p) {
        var scritto = (liberi[p.id] || '').trim();
        if (scritto) {
          /* Quello che è stato scritto a mano vince sulla fascia scelta:
             se qualcuno si prende la briga di precisare, la precisazione
             è il dato più affidabile che abbiamo. */
          pezzi.push(p.riepilogo.replace('%s',
            (p.libero && p.libero.r ? p.libero.r : '%s').replace('%s', scritto)));
          return;
        }
        var v = scelte[p.id];
        if (!v || !v.length) return;
        var etichette = v.map(function (val) {
          var o = p.options.filter(function (x) { return x.v === val; })[0];
          if (!o) return val;
          /* "r" è la forma da usare nella frase, quando l'etichetta del
             bottone non ci starebbe bene. Se manca, si usa l'etichetta. */
          return o.r || minuscolo(o.l);
        });
        pezzi.push(p.riepilogo.replace('%s', elenco(etichette)));
      });
      if (!pezzi.length) return '';
      /* I pezzi si uniscono con la virgola e basta: sono frammenti di
         frase, e in italiano la virgola è corretta. */
      return pezzi.join(', ') + '.';
    }

    function maiuscola(f) { return f ? f.charAt(0).toUpperCase() + f.slice(1) : ''; }

    /* ------------------------------------------------------------------
       IL RIEPILOGO SI PUÒ CORREGGERE

       Fin qui la frase la scriveva il modulo e l'utente la subiva. Ma è la
       frase che leggeremo noi, e nessuno conosce il proprio progetto meglio
       di chi ce lo sta raccontando: se il riassunto non gli somiglia, deve
       poterlo riscrivere.

       Finché non la tocca, la frase si riscrive da sola a ogni risposta.
       Appena la modifica, smette di essere sovrascritta — perdere due righe
       appena scritte perché si è cambiato un bottone sarebbe una piccola
       crudeltà. "Ricomincia" la riporta a quella automatica.
       ------------------------------------------------------------------ */
    var riepScritto = false;

    var riepTesto = el('textarea', {
      class: 'cfg__summary-text t-body',
      id: 'riepilogo-testo',
      rows: '4',
      /* A schermo la parola non c'è più: il bordo e il cursore lo dicono
         da soli. Chi naviga con la voce non li ha, e qui è l'unico posto
         dove sentirselo dire. */
      'aria-label': U('cfg.riepilogoAria')
    });

    var riepRipristina = el('button', {
      class: 'cfg__summary-reset t-body-sm', type: 'button',
      text: U('cfg.ricomincia'), hidden: 'hidden'
    });
    riepRipristina.addEventListener('click', function () {
      riepScritto = false;
      riepRipristina.hidden = true;
      aggiornaRiepilogo();
      riepTesto.focus();
    });

    riepTesto.addEventListener('input', function () {
      riepScritto = riepTesto.value.trim() !== maiuscola(frase()).trim();
      riepRipristina.hidden = !riepScritto;
      campoRiepilogo.value = riepTesto.value;
      /* Cresce con quello che si scrive invece di aprire una barra
         di scorrimento dentro un riquadro alto quattro righe. */
      riepTesto.style.height = 'auto';
      riepTesto.style.height = riepTesto.scrollHeight + 'px';
    });

    var riepVuoto = el('p', { class: 'cfg__summary-empty t-body-sm', text: d.riepilogoVuoto });

    function aggiornaRiepilogo() {
      var f = maiuscola(frase());
      if (!riepScritto) riepTesto.value = f;
      var pieno = Boolean(riepTesto.value.trim());
      riepTesto.hidden = !pieno;
      riepVuoto.hidden = pieno;
      campoRiepilogo.value = riepTesto.value;
    }

    /* L'avanzamento segue la posizione, non quante risposte hai dato:
       tornando indietro il numero deve tornare indietro con te. */
    function aggiornaAvanzamento() {
      if (corrente === iApp) {
        /* Il calendario non ha un numero: è fuori dalla fila. */
        barra.style.setProperty('--cfg-progress', '100%');
        contatore.textContent = U('cfg.scegliQuando');
        return;
      }
      barra.style.setProperty('--cfg-progress', ((corrente + 1) / totale * 100) + '%');
      contatore.textContent = U('cfg.passo', { i: corrente + 1, n: totale });
    }

    /* ------------------------------------------------------------------
       Un passo
       ------------------------------------------------------------------ */
    function creaPasso(p, indice) {
      var idTit = 'cfg-q-' + (++seq);

      var opzioni = el('div', {
        class: 'cfg__options',
        role: 'group',
        'aria-labelledby': idTit
      });

      var gia = scelte[p.id] || [];

      p.options.forEach(function (o, k) {
        var b = el('button', {
          class: 'cfg__opt', type: 'button',
          'aria-pressed': String(gia.indexOf(o.v) > -1),
          'data-val': o.v
        }, [
          el('span', { class: 'cfg__opt-key t-meta', 'aria-hidden': 'true', text: String(k + 1) }),
          el('span', { class: 'cfg__opt-label', text: o.l })
        ]);

        b.addEventListener('click', function () {
          var v = scelte[p.id] || [];
          if (p.multi) {
            v = v.indexOf(o.v) > -1 ? v.filter(function (x) { return x !== o.v; }) : v.concat([o.v]);
          } else {
            /* Anche a scelta singola si può togliere la selezione:
               ripremendo la stessa voce si azzera il passo. */
            v = v.indexOf(o.v) > -1 ? [] : [o.v];
          }
          scelte[p.id] = v;
          [].forEach.call(opzioni.children, function (x) {
            x.setAttribute('aria-pressed', String(v.indexOf(x.dataset.val) > -1));
          });
          aggiornaRiepilogo();
          aggiornaComandi();
        });

        opzioni.append(b);
      });

      /* --------------------------------------------------------------
         Il valore su misura
         Le fasce servono a chi non sa. Chi sa scrive: "68 m² più
         terrazzo" dice più di "50 – 100 m²", e a noi serve quello.
         Scrivendo si spengono le fasce, perché tenere accese tutte e due
         le risposte significherebbe mandarne una sbagliata.
         -------------------------------------------------------------- */
      var campoLibero = null;
      if (p.libero) {
        var idL = 'libero-' + p.id;
        campoLibero = el('div', { class: 'cfg__libero' }, [
          el('label', { class: 'field__label', for: idL, text: p.libero.label }),
          el('input', {
            class: 'field__control', id: idL, type: 'text',
            placeholder: p.libero.placeholder, autocomplete: 'off'
          })
        ]);
        campoLibero.querySelector('input').addEventListener('input', function () {
          liberi[p.id] = this.value;
          var scritto = Boolean(this.value.trim());
          opzioni.classList.toggle('is-spento', scritto);
          if (scritto) {
            scelte[p.id] = [];
            [].forEach.call(opzioni.children, function (x) {
              x.setAttribute('aria-pressed', 'false');
            });
          }
          aggiornaRiepilogo();
          aggiornaComandi();
        });
      }

      return el('div', {
        class: 'cfg__step', role: 'group', 'aria-labelledby': idTit,
        'data-step': String(indice)
      }, [
        el('p', { class: 'cfg__legend', id: idTit }, [
          el('span', { class: 't-meta cfg__step-num', text: String(indice + 1).padStart(2, '0') }),
          el('span', { class: 'cfg__question t-heading', text: p.question })
        ]),
        p.hint ? el('p', { class: 'cfg__hint t-body-sm', text: p.hint }) : null,
        /* Se abbiamo risposto noi al posto suo, glielo diciamo. Un campo
           già compilato senza spiegazione fa sospettare un errore. */
        (p.id === 'ambito' && preselezionati.length)
          ? el('p', { class: 'cfg__pre t-body-sm',
                      text: U('cfg.dalleFoto') })
          : null,
        opzioni,
        campoLibero
      ]);
    }

    /* ------------------------------------------------------------------
       Ultimo passo: i recapiti.
       Chiediamo il minimo: un canale per risponderti e, se vuoi, due
       righe. Nome e zona restano, ma dichiarati facoltativi e separati
       dal canale di contatto, così si capisce a colpo d'occhio cosa
       serve davvero.
       ------------------------------------------------------------------ */
    function campo(id, etichetta, tipo, ph, opzionale, aiuto) {
      return el('div', { class: 'field' }, [
        el('label', {
          class: 'field__label', for: id,
          html: etichetta + (opzionale ? ' <span>facoltativo</span>' : '')
        }),
        el('input', {
          class: 'field__control', id: id, name: id, type: tipo, placeholder: ph,
          autocomplete: aiuto || null,
          'aria-describedby': id + '-err'
        }),
        el('p', { class: 'field__error t-body-sm', id: id + '-err', hidden: 'hidden' })
      ]);
    }

    /* ------------------------------------------------------------------
       L'APPUNTAMENTO

       Non sostituisce la richiesta scritta: la affianca. Si può inviare e
       basta, prenotare e basta, o fare tutte e due — e il bottone finale
       cambia parole da solo in base a cosa si è scelto, invece di
       chiedere all'utente di capire quale dei due premere.

       Il calendario nasce chiuso. Aprirlo è una scelta, non un ostacolo
       messo in mezzo a chi voleva solo scrivere due righe.
       ------------------------------------------------------------------ */
    var app = d.appuntamento || null;
    var appScelto = null;          /* { giorno, ora, luogo } */
    var pannelloAppuntamento = null;
    var campoAppuntamento = el('input', { type: 'hidden', name: 'appuntamento' });

    function costruisciAppuntamento() {
      if (!app || !window.CAAgenda) return null;
      var A = window.CAAgenda;

      var giorniRiga = el('div', { class: 'cal__giorni', role: 'tablist', 'aria-label': U('cfg.scegliGiorno') });
      var oreRiga    = el('div', { class: 'cal__ore', role: 'group', 'aria-label': U('cfg.scegliOra') });
      var luoghiRiga = el('div', { class: 'cal__luoghi', role: 'group', 'aria-label': 'Dove' });
      var conferma   = el('p', { class: 'cal__conferma t-body', role: 'status', hidden: 'hidden' });
      var nota       = el('p', { class: 'cal__nota t-body-sm' });

      var giorniDisp = [];
      var giornoScelto = null;
      var luogoScelto = app.luoghi[0].v;

      function disegnaOre() {
        oreRiga.replaceChildren();
        if (!giornoScelto) return;
        var g = giorniDisp.filter(function (x) { return x.chiave === giornoScelto; })[0];
        if (!g || !g.orari.length) {
          oreRiga.append(el('p', { class: 't-body-sm', text: app.nessunOrario }));
          return;
        }
        g.orari.forEach(function (ora) {
          var b = el('button', {
            class: 'cal__ora', type: 'button', 'aria-pressed': 'false',
            /* L'ora di fine è scritta, non sottintesa: "10:00 – 11:00" dice
               quanto dura senza che nessuno debba chiederlo. */
            text: A.inizio(ora) + ' – ' + A.fine(ora)
          });
          b.addEventListener('click', function () {
            [].forEach.call(oreRiga.children, function (x) {
              if (x.setAttribute) x.setAttribute('aria-pressed', 'false');
            });
            b.setAttribute('aria-pressed', 'true');
            appScelto = { giorno: g, ora: ora, luogo: luogoScelto };
            mostraConferma();
          });
          oreRiga.append(b);
        });
      }

      function mostraConferma() {
        if (!appScelto) {
          conferma.hidden = true;
          campoAppuntamento.value = '';
          aggiornaComandi();
          return;
        }
        var l = app.luoghi.filter(function (x) { return x.v === appScelto.luogo; })[0];
        var quando = A.etichetta(appScelto.giorno.data) + ', ' +
                     A.inizio(appScelto.ora) + ' – ' + A.fine(appScelto.ora);
        conferma.hidden = false;
        conferma.textContent = quando + ' · ' + (l ? l.r : '');
        campoAppuntamento.value = A.chiaveOra(appScelto.giorno.data, appScelto.ora) +
                                  ' (' + (l ? l.l : '') + ', ' + A.durata + ' minuti)';
        aggiornaComandi();
      }

      app.luoghi.forEach(function (l, k) {
        var b = el('button', {
          class: 'cal__luogo', type: 'button',
          'aria-pressed': String(k === 0), text: l.l
        });
        b.addEventListener('click', function () {
          luogoScelto = l.v;
          [].forEach.call(luoghiRiga.children, function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          if (appScelto) { appScelto.luogo = l.v; mostraConferma(); }
        });
        luoghiRiga.append(b);
      });

      function disegnaGiorni() {
        giorniDisp = A.giorni();
        giorniRiga.replaceChildren();
        if (!giorniDisp.length) {
          giorniRiga.append(el('p', { class: 't-body-sm', text: app.nessunOrario }));
          return;
        }
        giorniDisp.forEach(function (g, k) {
          var b = el('button', {
            class: 'cal__giorno', type: 'button', role: 'tab',
            'aria-selected': 'false',
            'aria-label': U('cfg.oreLibere', { d: A.etichetta(g.data), n: g.orari.length })
          }, [
            el('span', { class: 'cal__gg t-meta', text: A.etichettaBreve(g.data) }),
            el('span', { class: 'cal__nn', text: String(g.data.getDate()) })
          ]);
          b.addEventListener('click', function () {
            giornoScelto = g.chiave;
            appScelto = null;
            [].forEach.call(giorniRiga.children, function (x) {
              if (x.setAttribute) x.setAttribute('aria-selected', 'false');
            });
            b.setAttribute('aria-selected', 'true');
            disegnaOre();
            mostraConferma();
          });
          giorniRiga.append(b);
          if (k === 0) b.click();
        });
      }

      var idApp = 'cfg-q-app';
      var passo = el('div', {
        class: 'cfg__step', role: 'group', 'aria-labelledby': idApp,
        'data-step': 'appuntamento', hidden: 'hidden'
      }, [
        el('p', { class: 'cfg__legend', id: idApp }, [
          el('span', { class: 'cfg__question t-heading', text: app.question })
        ]),
        el('p', { class: 't-body-sm cal__intro', text: app.testo }),
        luoghiRiga,
        giorniRiga,
        oreRiga,
        conferma,
        nota
      ]);

      /* Si popola la prima volta che il passo viene aperto, non prima:
         chi invia e basta non deve aspettare un calendario che non
         guarderà mai. */
      passo.popola = function () {
        if (giorniDisp.length) return Promise.resolve();
        return A.carica().then(function (collegata) {
          nota.textContent = collegata
            ? U('cal.liberi') : U('cal.nonCollegata');
          disegnaGiorni();
        });
      };
      passo.scelto = function () { return Boolean(appScelto); };
      return passo;
    }

    pannelloAppuntamento = costruisciAppuntamento();

    var idFin = 'cfg-q-fin';

    var passoFinale = el('div', {
      class: 'cfg__step', role: 'group', 'aria-labelledby': idFin,
      'data-step': String(passi.length)
    }, [
      el('p', { class: 'cfg__legend', id: idFin }, [
        el('span', { class: 't-meta cfg__step-num', text: String(totale).padStart(2, '0') }),
        el('span', { class: 'cfg__question t-heading', text: d.contatto.question })
      ]),
      el('p', { class: 'cfg__hint t-body-sm', text: d.contatto.hint }),

      /* Il canale di contatto: basta uno dei due */
      el('div', { class: 'form__row' }, [
        campo('email', U('cfg.campo.email'), 'email', U('cfg.campo.emailHint'), false, 'email'),
        campo('telefono', U('cfg.campo.tel'), 'tel', U('cfg.campo.telHint'), false, 'tel')
      ]),
      el('p', { class: 'field__error t-body-sm', id: 'canale-err', hidden: 'hidden' }),

      /* Un riquadro solo per tutto quello che non serve.
         Prima "facoltativo" era scritto tre volte, accanto a ogni campo:
         ripeterlo non lo rendeva più vero, rendeva solo più affollata la
         pagina. Detto una volta sopra il riquadro, vale per quello che
         c'è dentro — che è esattamente come funziona un riquadro. */
      el('div', { class: 'cfg__optional' }, [
        el('p', { class: 't-meta cfg__optional-label', text: d.contatto.opzionaliTitolo }),
        el('p', { class: 'cfg__optional-note t-body-sm', text: d.contatto.opzionaliNota }),
        el('div', { class: 'form__row' }, [
          campo('nome', U('cfg.campo.nome'), 'text', U('cfg.campo.nomeHint'), false, 'name'),
          campo('luogo', U('cfg.campo.luogo'), 'text', U('cfg.campo.luogoHint'), false, 'address-level2')
        ]),
        el('div', { class: 'field' }, [
          el('label', { class: 'field__label', for: 'messaggio', text: U('cfg.campo.note') }),
          el('textarea', {
            class: 'field__control', id: 'messaggio', name: 'messaggio',
            placeholder: U('cfg.vincolo')
          })
        ])
      ]),

      el('div', { class: 'field--check' }, [
        el('input', { type: 'checkbox', id: 'privacy', name: 'privacy' }),
        el('label', { for: 'privacy',
          html: 'Ho letto la <a href="privacy.html">privacy policy</a> e acconsento al trattamento dei dati.' })
      ]),
      el('p', { class: 'field__error t-body-sm', id: 'privacy-err', hidden: 'hidden' })
    ]);

    /* ------------------------------------------------------------------
       Navigazione
       ------------------------------------------------------------------ */
    /* I passi numerati finiscono coi recapiti. L'appuntamento sta in
       fondo ma non entra nel conteggio: non è un passo obbligato del
       percorso, è un ramo che si imbocca solo scegliendolo. */
    var tutti = passi.map(creaPasso).concat([passoFinale]);
    var ultimo = tutti.length - 1;              /* i recapiti */
    var iApp = -1;
    if (pannelloAppuntamento) { tutti.push(pannelloAppuntamento); iApp = tutti.length - 1; }

    var barra     = el('div', { class: 'cfg__bar', 'aria-hidden': 'true' });
    var contatore = el('span', { class: 't-meta cfg__counter' });

    var indietro = el('button', { class: 'btn btn--ghost cfg__back', type: 'button', text: U('cfg.indietro') });
    var avanti   = el('button', { class: 'btn btn--outline', type: 'button', text: U('cfg.avanti') });
    var salta    = el('button', { class: 'btn btn--ghost cfg__salta', type: 'button', text: U('cfg.salta') });
    var invia    = el('button', { class: 'btn btn--outline', type: 'submit', text: U('cfg.invia') });
    var prenota  = el('button', { class: 'btn btn--filled cfg__prenota', type: 'button',
                                  text: U('cfg.prenota') });
    var conferma = el('button', { class: 'btn btn--filled', type: 'submit',
                                  text: U('cfg.conferma'), hidden: 'hidden' });

    /* ------------------------------------------------------------------
       AVANTI E SALTA SONO DUE COSE DIVERSE

       Avanti vuol dire "ho risposto": si accende quando c'è una risposta,
       scelta o scritta a mano. Salta vuol dire "non lo so, o non conta":
       è sempre disponibile e non chiede scuse.

       Prima esisteva solo Avanti, e passare oltre senza rispondere aveva
       lo stesso aspetto di aver risposto. Due bottoni distinti dicono
       all'utente che saltare è previsto, non un ripiego — e a noi dicono
       la differenza fra "nessuna preferenza" e "non ha voluto dirlo".
       ------------------------------------------------------------------ */
    function rispostoA(k) {
      var p = passi[k];
      if (!p) return true;
      var v = scelte[p.id] || [];
      return v.length > 0 || Boolean((liberi[p.id] || '').trim());
    }

    /* ------------------------------------------------------------------
       DUE FINALI, NON UN BOTTONE CHE CAMBIA NOME

       Dopo i recapiti la strada si divide: "Invia la richiesta" chiude
       lì, "Prenota un appuntamento" porta al calendario e chiude di là.

       Prima erano la stessa cosa e il bottone cambiava parole da solo:
       chi voleva prenotare doveva prima capire che il calendario era
       nascosto dentro il passo dei recapiti, aprirlo, sceglierlo, e solo
       allora il bottone cambiava. Due strade dichiarate si vedono; una
       strada che si trasforma va indovinata.
       ------------------------------------------------------------------ */
    function aggiornaComandi() {
      var recapiti = corrente === ultimo;
      var calendario = corrente === iApp;

      avanti.hidden = recapiti || calendario;
      salta.hidden = recapiti || calendario;
      invia.hidden = !recapiti;
      prenota.hidden = !recapiti || !pannelloAppuntamento;
      conferma.hidden = !calendario;
      indietro.disabled = corrente === 0;

      if (!recapiti && !calendario) {
        var ok = rispostoA(corrente);
        avanti.disabled = !ok;
        avanti.setAttribute('aria-disabled', String(!ok));
        avanti.title = ok ? '' : U('cfg.scegliVoce');
      }

      if (calendario) {
        var scelto = pannelloAppuntamento.scelto();
        conferma.disabled = !scelto;
        conferma.title = scelto ? '' : U('cfg.scegliPrima');
      }
    }

    function vai(n) {
      corrente = Math.max(0, Math.min(tutti.length - 1, n));
      tutti.forEach(function (s, k) { s.hidden = k !== corrente; });
      aggiornaComandi();
      aggiornaAvanzamento();
      var primo = tutti[corrente].querySelector('button, input, textarea');
      if (primo) primo.focus({ preventScroll: true });
      porta(tutti[corrente]);
    }

    indietro.addEventListener('click', function () {
      /* Dal calendario si torna ai recapiti, non al passo che lo precede
         nell'array: la fila numerata finisce lì. */
      vai(corrente === iApp ? ultimo : corrente - 1);
    });

    prenota.addEventListener('click', function () {
      if (!valida()) return;                 /* i recapiti servono comunque */
      pannelloAppuntamento.popola().then(function () {
        vai(iApp);
        aggiornaComandi();
      });
    });
    avanti.addEventListener('click',   function () { vai(corrente + 1); });
    salta.addEventListener('click',    function () { vai(corrente + 1); });

    /* ------------------------------------------------------------------
       Validazione: serve solo un recapito e il consenso
       ------------------------------------------------------------------ */
    function errore(id, msg) {
      var e = form.querySelector('#' + id + '-err');
      var c = form.querySelector('#' + id);
      if (e) { e.textContent = msg || ''; e.hidden = !msg; }
      if (c) c.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }

    function valida() {
      var val = function (id) { return ((form.querySelector('#' + id) || {}).value || '').trim(); };
      var email = val('email'), tel = val('telefono');
      var ok = true, primo = null;

      errore('email', ''); errore('telefono', ''); errore('canale', '');

      if (!email && !tel) {
        errore('canale', U('cfg.err.recapito'));
        ok = false; primo = 'email';
      } else {
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          errore('email', U('cfg.err.email'));
          ok = false; primo = primo || 'email';
        }
        /* Il telefono lo teniamo largo: prefissi, spazi e punti sono
           normali. Basta che ci siano almeno sei cifre. */
        if (tel && (tel.replace(/\D/g, '').length < 6)) {
          errore('telefono', U('cfg.err.telefono'));
          ok = false; primo = primo || 'telefono';
        }
      }

      var box = form.querySelector('#privacy');
      var rigaBox = box.closest('.field--check');
      if (!box.checked) {
        errore('privacy', U('cfg.err.consenso'));
        rigaBox.classList.add('is-errata');
        box.setAttribute('aria-invalid', 'true');
        ok = false; primo = primo || 'privacy';
      } else {
        errore('privacy', '');
        rigaBox.classList.remove('is-errata');
        box.removeAttribute('aria-invalid');
      }

      if (primo) form.querySelector('#' + primo).focus();
      return ok;
    }

    /* ------------------------------------------------------------------
       Il modulo
       ------------------------------------------------------------------ */
    var campoRiepilogo = el('input', { type: 'hidden', name: 'riepilogo' });
    var campoPreferiti = el('input', { type: 'hidden', name: 'preferiti' });
    var campiScelte    = el('div', { hidden: 'hidden' });
    var stato = el('p', { class: 'form__status t-body-sm', role: 'status', hidden: 'hidden' });

    var form = el('form', {
      class: 'cfg', novalidate: 'novalidate',
      action: d.form.action || null,
      method: d.form.action ? 'post' : null
    }, [
      el('div', { class: 'cfg__head' }, [ barra, contatore ]),
      el('div', { class: 'cfg__steps' }, tutti),
      el('div', { class: 'cfg__actions' }, [ indietro, salta, avanti, invia, prenota, conferma ]),
      campoRiepilogo, campoPreferiti, campoAppuntamento, campiScelte, stato,
      el('p', { class: 'form__note', text: d.form.note })
    ]);

    /* Scorciatoie: i numeri scelgono, Invio avanza, Backspace torna.
       Solo fuori dai campi di testo, altrimenti si scriverebbe male. */
    form.addEventListener('keydown', function (e) {
      var dentroCampo = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if (e.key === 'Enter' && !dentroCampo && corrente < ultimo) {
        e.preventDefault();
        /* Invio equivale ad Avanti, quindi segue la stessa regola: senza
           una risposta non porta da nessuna parte. Per passare oltre c'è
           Salta, che è un gesto deliberato. */
        if (rispostoA(corrente)) vai(corrente + 1);
        return;
      }
      if (dentroCampo) return;
      if (e.key === 'Backspace' && corrente > 0) { e.preventDefault(); vai(corrente - 1); return; }
      if (/^[1-9]$/.test(e.key)) {
        var opts = tutti[corrente].querySelectorAll('.cfg__opt');
        var b = opts[Number(e.key) - 1];
        if (b) { e.preventDefault(); b.click(); }
      }
    });

    /* ------------------------------------------------------------------
       LA SCHERMATA DI CHIUSURA
       Il modulo sparisce e resta quello che si è detto. Sono due testi
       diversi perché sono due cose diverse: una richiesta scritta si
       legge quando si può, un appuntamento occupa un'ora di agenda.
       ------------------------------------------------------------------ */
    function mostraEsito(conAppuntamento) {
      var E = d.form.esito;
      var t = conAppuntamento ? E.appuntamento : E.richiesta;

      var righe = [];
      if (campoAppuntamento.value) {
        righe.push(['Quando', pannelloAppuntamento
          ? form.querySelector('.cal__conferma').textContent
          : campoAppuntamento.value]);
      }
      var em = (form.querySelector('#email') || {}).value;
      var tl = (form.querySelector('#telefono') || {}).value;
      if (em) righe.push(['Email', em]);
      if (tl) righe.push(['Telefono', tl]);
      if (campoRiepilogo.value) righe.push(['Il progetto', campoRiepilogo.value]);
      if (campoPreferiti.value) righe.push(['Fotografie segnate', campoPreferiti.value]);

      var pannello = el('div', { class: 'cfg__esito', role: 'status' }, [
        el('p', { class: 't-meta', text: conAppuntamento ? 'Fatto' : 'Fatto' }),
        el('h2', { class: 't-heading', text: t.titolo }),
        el('p', { class: 't-body measure', text: t.testo }),
        el('dl', { class: 'cfg__esito-dati' }, righe.reduce(function (acc, r) {
          acc.push(el('dt', { class: 't-meta', text: r[0] }));
          acc.push(el('dd', { class: 't-body-sm', text: r[1] }));
          return acc;
        }, [])),
        /* Senza server la richiesta si fermerebbe qui. Consegnarla al
           cliente già scritta è il modo più onesto di non perderla. */
        d.form.action ? null : el('div', { class: 'cfg__esito-fallback' }, [
          el('p', { class: 't-body-sm', text: E.mailtoNota }),
          el('a', { class: 'btn btn--filled', href: mailto(conAppuntamento), text: E.mailtoLabel })
        ]),
        el('button', { class: 'btn btn--ghost', type: 'button', text: E.ricomincia,
          on: { click: function () { location.reload(); } } })
      ]);

      form.querySelector('.cfg__head').hidden = true;
      form.querySelector('.cfg__steps').hidden = true;
      form.querySelector('.cfg__actions').hidden = true;
      form.append(pannello);
      porta(pannello);
    }

    /* La stessa richiesta, pronta da spedire dal programma di posta. */
    function mailto(conAppuntamento) {
      var dati = new FormData(form);
      var corpo = [];
      var etichette = {
        riepilogo: U('cfg.campo.progetto'), preferiti: U('cfg.campo.segnate'),
        appuntamento: U('cfg.campo.app'), email: U('cfg.campo.email'),
        telefono: U('cfg.campo.tel'), nome: U('cfg.campo.nome'),
        luogo: U('cfg.campo.luogo'), messaggio: U('cfg.campo.note')
      };
      dati.forEach(function (v, k) {
        if (!v || k === 'privacy') return;
        corpo.push((etichette[k] || k) + ': ' + v);
      });
      return 'mailto:' + (window.SITE.contact.email) +
             '?subject=' + encodeURIComponent(conAppuntamento
               ? U('cfg.oggettoApp')
               : U('cfg.oggetto')) +
             '&body=' + encodeURIComponent(corpo.join('\n\n'));
    }

    form.addEventListener('submit', function (e) {
      if (!valida()) { e.preventDefault(); return; }
      /* Le scelte viaggiano come campi nascosti, uno per passo: così
         arrivano già classificate e non da interpretare. */
      campiScelte.innerHTML = '';
      passi.forEach(function (p) {
        var scritto = (liberi[p.id] || '').trim();
        if (scritto) {
          /* Marcato come "su misura" perché chi legge sappia subito che
             quel valore l'ha scritto il cliente, non l'ha scelto da un
             elenco: è più preciso e va letto con più attenzione. */
          campiScelte.append(el('input', {
            type: 'hidden', name: p.id, value: scritto + ' (su misura)'
          }));
          return;
        }
        var v = scelte[p.id] || [];
        if (!v.length) return;
        var etichette = v.map(function (val) {
          var o = p.options.filter(function (x) { return x.v === val; })[0];
          return o ? o.l : val;
        });
        campiScelte.append(el('input', {
          type: 'hidden', name: p.id, value: etichette.join(', ')
        }));
      });
      /* Senza indirizzo del server non si spedisce niente: si mostra
         comunque la chiusura, con dentro il modo di spedire davvero. */
      if (!d.form.action) e.preventDefault();
      mostraEsito(Boolean(campoAppuntamento.value));
    });

    /* L'errore sparisce appena si comincia a correggerlo: lasciarlo lì
       mentre l'utente sta già scrivendo la risposta giusta è una
       sgridata che continua dopo le scuse. */
    function pulisci(e) {
      if (/^(email|telefono)$/.test(e.target.id)) { errore(e.target.id, ''); errore('canale', ''); }
      if (e.target.id === 'privacy') {
        errore('privacy', '');
        var r = e.target.closest('.field--check');
        if (r) r.classList.remove('is-errata');
        e.target.removeAttribute('aria-invalid');
      }
    }
    form.addEventListener('input', pulisci);
    form.addEventListener('change', pulisci);

    /* ------------------------------------------------------------------
       LE FOTOGRAFIE SEGNATE
       Il pannello che le mostra qui non è un promemoria decorativo: è
       la parte più concreta della richiesta. Una foto dice in un colpo
       d'occhio quello che tre righe di testo dicono male.

       Restano rimovibili fino all'ultimo. Se il visitatore ci ripensa,
       deve poterlo fare qui e non tornare indietro di due pagine.
       ------------------------------------------------------------------ */
    var elenco2 = el('ul', { class: 'pref__lista' });
    var vuoto   = el('p', { class: 'pref__vuoto t-body-sm',
      html: U('cfg.pref.vuoto') });
    var titoloP = el('p', { class: 't-meta' });

    function disegnaPreferiti(l) {
      titoloP.textContent = !l.length ? U('cfg.pref.titolo')
        : (l.length === 1 ? U('cfg.pref.una') : U('cfg.pref.molte', { n: l.length }));
      vuoto.hidden = l.length > 0;
      elenco2.hidden = l.length === 0;

      elenco2.replaceChildren.apply(elenco2, l.map(function (o) {
        var togli = el('button', {
          class: 'pref__togli', type: 'button',
          'aria-label': U('cfg.pref.togli', { x: o.tit || o.id }),
          html: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">' +
                '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
        });
        togli.addEventListener('click', function () { P.togli(o.id); });

        return el('li', { class: 'pref__voce' }, [
          o.thumb ? window.CA.img(o.thumb, o.alt || '') : null,
          el('span', { class: 'pref__eti' }, [
            el('span', { class: 'pref__cat t-meta', text: o.nome }),
            el('span', { class: 'pref__tit t-body-sm', text: o.tit || '' })
          ]),
          togli
        ]);
      }));

      campoPreferiti.value = P ? P.testo() : '';
    }

    var preferiti = el('aside', { class: 'pref', id: 'preferiti' }, [
      titoloP,
      el('div', { 'aria-live': 'polite' }, [ elenco2, vuoto ]),
      el('a', { class: 'pref__altre t-body-sm', href: 'collezioni.html',
                text: U('cfg.pref.altre') })
    ]);

    if (P) window.CA.pulizia(P.osserva(disegnaPreferiti)); else preferiti.hidden = true;

    vai(0);
    aggiornaRiepilogo();

    return {
      form: form,
      preferiti: preferiti,
      /* Nell'intestazione resta solo il titolo. La parola "correggibile"
         accanto stava spiegando quello che il riquadro già mostra: un
         campo di testo con un bordo, un cursore che ci entra. Un'etichetta
         che descrive l'ovvio non aiuta, aggiunge una cosa da leggere.

         Per chi non vede il riquadro, quello che si può farci è detto
         nell'aria-label del campo — dove serve davvero. */
      riepilogo: el('aside', { class: 'cfg__summary' }, [
        el('div', { class: 'cfg__summary-head' }, [
          el('label', { class: 't-meta', for: 'riepilogo-testo', text: d.riepilogoTitolo })
        ]),
        riepTesto, riepVuoto, riepRipristina
      ])
    };
  }

  return { costruisci: costruisci };
})();
