/* ==========================================================================
   CORSO ARREDI — RENDERER DELLE SEZIONI
   Nucleo condiviso in js/shared.js. Contenuti in content/site.js e
   content/pages.js. Ogni funzione cerca il proprio segnaposto e, se non
   lo trova, non fa niente: lo stesso file serve tutte le pagine.
   ========================================================================== */

(function () {
  'use strict';

  const { $, $$, el, img, btn, head, boot } = window.CA;
  const S = window.SITE;

  const U = (k, d) => window.CAUI.t(k, d);

  const num = i => String(i + 1).padStart(2, '0');

  /* IL MORPHING FRA PAGINE — perché adesso è un attributo e non uno stile

     Un elemento con view-transition-name viene messo dal browser in un
     livello sopra la pagina per tutta la durata del passaggio. Se sulla
     pagina di partenza ce ne sono sei e su quella di arrivo ne combacia
     uno solo, gli altri cinque restano sospesi sopra la pagina nuova
     finché l'animazione non finisce, e poi scompaiono di colpo.

     Era esattamente il difetto che si vedeva entrando in una collezione:
     contenuti sovrapposti che sparivano dopo.

     La correzione: nessun nome scritto nel foglio di stile. Qui si segna
     solo QUALE elemento sarebbe morfabile, con data-morph. Il nome vero
     lo assegna js/transitions.js al momento del clic, a uno solo — quello
     che c'entra col viaggio che si sta facendo. */
  function morph(id) { return id || null; }

  /* ----------------------------------------------------------------------
     LA COPERTINA DI UNA COLLEZIONE

     Non più una resa generata, ma le fotografie vere che stanno nella
     cartella di quella collezione, che si alternano. Chi guarda la card
     sta già guardando la collezione, invece di guardare una promessa.

     Se qualcosa manca — la collezione non si trova, la cartella è vuota,
     il montaggio non c'è — resta l'immagine di prima. Una card senza
     fotografia sarebbe peggio di una card con una fotografia qualunque.
     ---------------------------------------------------------------------- */
  function copertina(href, ripiego, alt, opz) {
    opz = opz || {};
    const id = (String(href).match(/collezione-([a-z]+)\.html/) || [])[1];
    const cat = ((window.PAGES.collezioni || {}).categories || [])
      .filter(x => x.id === id)[0];
    if (!cat || !window.CACopertina) return img(ripiego, alt, opz.urgente);
    return window.CACopertina.costruisci(cat, opz);
  }

  /* Riga di elenco con hairline: 2 o 3 colonne */
  function row(a, b, c) {
    return el('div', {
      class: 'index__row',
      style: c ? null : 'grid-template-columns:56px minmax(0,1fr)'
    }, [a, b, c]);
  }

  /* Elenco chiave/valore usato in collezioni e smart living */
  function specs(pairs) {
    return el('ul', { class: 'spec-list t-body-sm' }, pairs.map(([k, v]) => el('li', {}, [
      el('span', { class: 't-meta', text: k }),
      el('span', { text: v })
    ])));
  }

  /* ======================================================================
     HOME — HERO
     ====================================================================== */
  function hero() {
    const m = $('#hero'); if (!m) return;
    const h = S.hero;

    /* Il titolo viene spezzato nelle sue righe — quelle che l'autore ha
       deciso col <br> in content/site.js — e ogni riga riceve un
       contenitore che la ritaglia. Serve all'apertura: ogni riga sale da
       dietro il proprio bordo invece di comparire tutta insieme.

       È il motivo per cui le righe si dichiarano nel testo e non le
       decide il browser andando a capo: una riga tagliata a metà da una
       finestra stretta non è un'unità da animare, una riga scritta lo è. */
    const righe = String(h.title).split(/<br\s*\/?>/i);
    const titolo = el('h1', { class: 't-heading-lg hero__title' },
      righe.map((r, i) => el('span', { class: 'hero__riga', style: `--i:${i}` }, [
        /* Lo spazio in coda a ogni riga tranne l'ultima non si vede — è a
           fine blocco — ma esiste nel testo: senza, copiando il titolo si
           otterrebbe "misura,dal disegno" tutto attaccato. */
        el('span', {
          class: 'hero__riga-in',
          html: r.trim() + (i < righe.length - 1 ? ' ' : '')
        })
      ])));

    /* La prima schermata non è più una fotografia sola: sono le stesse
       fotografie dello Studio che si alternano, ma con un'andatura più
       lenta di là. Qui il visitatore sta leggendo il titolo e decidendo
       se restare — un'immagine che cambia mentre legge lo interrompe.

       Quante siano lo decide la cartella assets/img/studio, non un elenco
       scritto: aggiungendo un file compare un posto in più, togliendolo il
       posto sparisce con lui.

       Se la vetrina non c'è, o se la cartella è vuota, resta la fotografia
       di riserva: la prima schermata non può mai essere un buco nero. */
    const sfondo = (window.CAVetrina && S.fotoStudio && S.fotoStudio.cartella)
      ? window.CAVetrina.costruisci(S.fotoStudio, U('studio.vetrinaHome'), {
          classe: 'vetrina--hero',
          tempo: 6000,
          cambio: 1300,
          didascalia: false,
          punti: false,
          /* Sul fondo di tutta la schermata il puntatore ci sta sopra
             quasi sempre: fermarsi al suo passaggio significherebbe
             restare fermi. */
          pausaSuHover: false,
          sizes: '(max-width: 1100px) 100vw, 58vw',
          riserva: { image: h.image, imageAlt: h.imageAlt }
        })
      : img(h.image, h.imageAlt, true);

    m.replaceWith(el('section', { class: 'hero' }, [
      el('div', { class: 'hero__media' }, [sfondo]),
      /* Il pannello che sfoca il lato sinistro. Sta sopra la fotografia e
         sotto il testo, e sfoca quello che ha dietro qualunque cosa sia:
         funziona da solo mentre le fotografie si alternano. */
      el('div', { class: 'hero__sfoca', 'aria-hidden': 'true' }),
      el('div', { class: 'container hero__content' }, [
        el('p', { class: 't-meta hero__label', style: '--i:0', text: h.label }),
        titolo,
        el('p', { class: 't-body-lg hero__lede measure', style: `--i:${righe.length}`, html: h.lede }),
        el('div', { class: 'hero__actions', style: `--i:${righe.length + 1}` },
           h.actions.map(a => btn(a.label, a.href, 'outline-invert')))
      ]),
      /* Un segno che dice che sotto c'è altro. Sparisce al primo
         movimento della pagina: ha una cosa sola da dire e la dice una
         volta. Nascosto ai lettori di schermo, che non ne hanno bisogno. */
      el('div', { class: 'hero__giu', 'aria-hidden': 'true' }, [
        el('span', { class: 'hero__giu-linea' })
      ])
    ]));
  }

  /* ======================================================================
     HOME — STATEMENT
     ====================================================================== */
  function statement() {
    const m = $('#statement'); if (!m) return;
    m.replaceWith(el('section', { class: 'section section--paper' }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'statement' }, [
          el('h2', { class: 't-heading-lg', html: S.statement.title })
        ])
      ])
    ]));
  }

  /* ======================================================================
     HOME — COMPETENZE
     ====================================================================== */
  function services() {
    const m = $('#services'); if (!m) return;
    const s = S.services;
    m.replaceWith(el('section', { class: 'section section--canvas' }, [
      el('div', { class: 'container' }, [
        head(s.label, s.title),
        el('div', { class: 'index' }, s.items.map((it, i) => row(
          el('span', { class: 't-meta index__num', text: num(i) }),
          el('div', { class: 'index__body' }, [
            el('h3', { class: 't-subheading', text: it.name }),
            el('p', { class: 't-body-sm measure', text: it.text })
          ]),
          el('ul', { class: 't-body-sm index__sub' },
             (it.bullets || []).map(b => el('li', {}, [el('span', { text: b })])))
        )))
      ])
    ]));
  }

  /* ======================================================================
     HOME — COLLEZIONI
     ====================================================================== */
  function collections() {
    const m = $('#collections'); if (!m) return;
    const c = S.collections;
    m.replaceWith(el('section', { class: 'section section--dark' }, [
      el('div', { class: 'container' }, [
        head(c.label, c.title),
        /* Con sei voci la seconda riga ne ha due: le centriamo sotto
           quelle di mezzo invece di lasciarle appese a sinistra. */
        el('div', {
          class: 'grid grid--4' + (c.items.length % 4 === 2 ? ' grid--center-tail' : '')
        }, c.items.map((it, k) =>
          el('a', { class: 'card', href: it.href }, [
            el('div', {
              class: 'card__media',
              /* L'identificativo si ricava dall'indirizzo:
                 collezione-cucine.html -> cucine. */
              'data-morph': morph((it.href.match(/collezione-([a-z]+)\.html/) || [])[1])
            }, [copertina(it.href, it.image, it.imageAlt, {
                  /* Quando cambiare e in che verso non lo decide più la
                     card: lo decide il coro, che le conosce tutte e sei e
                     le fa cambiare come una linea che attraversa la fila. */
                  sizes: '(max-width: 600px) 92vw, (max-width: 900px) 46vw, 28vw'
                })]),
            el('div', { class: 'card__body' }, [
              el('span', { class: 't-meta card__meta', text: it.meta }),
              el('span', { class: 'card__title', text: it.name })
            ])
          ])
        )),
        el('div', { class: 'cluster', style: 'margin-top:var(--spacing-45)' },
           [btn(c.cta.label, c.cta.href, 'outline-invert')])
      ])
    ]));
  }

  /* ======================================================================
     HOME — METODO
     ====================================================================== */
  function method() {
    const m = $('#method'); if (!m) return;
    const d = S.method;
    m.replaceWith(el('section', { class: 'section section--paper' }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'split' }, [
          el('div', { class: 'split__body' }, [
            el('p', { class: 't-meta', text: d.label }),
            el('h2', { class: 't-heading', html: d.title }),
            el('p', { class: 't-body measure', html: d.text }),
            el('div', { class: 'index', style: 'width:100%' }, d.steps.map((s, i) =>
              el('div', {
                class: 'index__row',
                style: 'grid-template-columns:56px 1fr;padding-block:var(--spacing-14)'
              }, [
                el('span', { class: 't-meta index__num', text: num(i) }),
                el('span', { class: 't-body', text: s })
              ])
            )),
            btn(d.cta.label, d.cta.href, 'ghost')
          ]),
          el('div', { class: 'split__media' }, [img(d.image, d.imageAlt)])
        ])
      ])
    ]));
  }

  /* ======================================================================
     HOME — SMART LIVING
     ====================================================================== */
  function smart() {
    const m = $('#smart'); if (!m) return;
    const s = S.smart;
    m.replaceWith(el('section', { class: 'section section--dark-2' }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'section-head' }, [
          el('p', { class: 't-meta', text: s.label }),
          el('h2', { class: 't-heading-lg', html: s.title }),
          el('p', { class: 't-body t-dim measure', html: s.text })
        ]),
        el('div', { class: 'index' }, s.items.map((it, i) => row(
          el('span', { class: 't-meta index__num', text: num(i) }),
          el('h3', { class: 't-meta', text: it.label }),
          el('p', { class: 't-body-sm t-dim', text: it.text })
        ))),
        el('div', { class: 'cluster', style: 'margin-top:var(--spacing-45)' },
           [btn(s.cta.label, s.cta.href, 'outline-invert')])
      ])
    ]));
  }

  /* ======================================================================
     HOME — SOSTENIBILITÀ
     ====================================================================== */
  function sustainability() {
    const m = $('#sustainability'); if (!m) return;
    const s = S.sustainability;
    /* Con una fotografia diventa banda fotografica con velo chiaro,
       altrimenti resta la banda canvas piatta. */
    m.replaceWith(el('section', {
      class: 'section ' + (s.image ? 'section--photo' : 'section--canvas')
    }, [
      s.image ? el('div', { class: 'section__media' }, [img(s.image, s.imageAlt)]) : null,
      el('div', { class: 'container' }, [
        head(s.label, s.title, el('p', { class: 't-body measure', html: s.text })),
        el('div', { class: 'metrics' }, s.metrics.map(x => el('div', { class: 'metric' }, [
          el('span', { class: 'metric__value', text: x.value }),
          el('span', { class: 't-meta metric__label', text: x.label })
        ]))),
        s.note ? el('p', {
          class: 't-body-sm',
          style: 'margin-top:var(--spacing-30);opacity:var(--opacity-dim)',
          text: s.note
        }) : null
      ])
    ]));

    /* I quattro numeri partono da zero e salgono al loro valore quando la
       banda entra in vista. Il valore vero resta scritto una volta sola,
       in content/site.js: chi conta lo legge da lì. */
    if (window.CANumeri) window.CANumeri.avvia(document, '.metric__value');
  }

  /* ======================================================================
     PAGINA COLLEZIONI
     ====================================================================== */
  function pageCollezioni(d) {
    const m = $('#categories'); if (!m || !d) return;

    /* Questa pagina è diventata un indice: sei porte, una per collezione.
       Le fotografie stanno dentro, non qui. Prima ci stavano tutte e 57 in
       una pagina sola: era lenta da aprire e nessuno guardava oltre la
       seconda categoria. */
    const blocks = d.categories.map((c, i) => el('section', {
      class: 'section category category--wide',
      id: c.id,
      style: 'scroll-margin-top:96px'
    }, [
      /* Anche la fotografia è un collegamento: è la cosa più grande della
         card, ed è quella che si tocca per istinto. */
      el('a', {
        class: 'category__media category__media--link',
        href: c.href,
        tabindex: '-1',
        'aria-hidden': 'true',
        'data-morph': c.id
      }, [copertina(c.href, c.image, c.imageAlt, {
            sizes: '(max-width: 900px) 92vw, 46vw'
          })]),
      el('div', { class: 'stack stack--wide' }, [
        el('div', { class: 'stack' }, [
          el('h2', { class: 't-heading' }, [
            el('a', { class: 'category__link', href: c.href, text: c.name })
          ]),
          el('p', { class: 't-body measure', text: c.text })
        ]),
        specs(c.specs),
        el('div', { class: 'cluster' }, [
          btn(U('coll.guarda'), c.href, 'outline'),
          btn(U('coll.parlane'), 'contatti.html', 'ghost')
        ])
      ])
    ]));

    /* Indice in testa alla pagina: adesso porta alle pagine, non a un'ancora */
    const jump = el('nav', { class: 'chips chips--porte', 'aria-label': U('coll.vaiA') },
      [el('span', { class: 't-meta chips__eti', text: U('coll.entra') })].concat(
        d.categories.map(c => el('a', { class: 'chip', href: c.href, text: c.name }))));

    const wrap = el('div', {}, [
      el('section', { class: 'section section--paper', style: 'padding-bottom:0' }, [
        el('div', { class: 'container' }, [jump])
      ]),
      el('div', { class: 'section--paper' }, [
        el('div', { class: 'container' }, blocks)
      ])
    ]);
    m.replaceWith(wrap);
  }

  /* ======================================================================
     PAGINA DI UNA SINGOLA COLLEZIONE
     La giostra sotto il titolo, poi le schede tecniche, poi le altre
     collezioni. Chi arriva in fondo alle cucine deve trovare una porta,
     non un vicolo cieco.
     ====================================================================== */
  function pageCollezione(c) {
    const m = $('#collezione'); if (!m || !c) return;

    const altre = ((window.PAGES.collezioni || {}).categories || [])
      .filter(x => x.id !== c.id);

    /* Il posto della giostra si prende subito, così il resto della pagina
       non salta quando le fotografie arrivano. La giostra ci si infila
       dentro appena la cartella è stata contata. */
    const posto = el('div', { class: 'giostra-posto' });
    if (window.CAGiostra && window.CACollezione) {
      window.CACollezione.carica(c).then(function (foto) {
        const g = window.CAGiostra.costruisci(c, foto);
        if (g) posto.replaceWith(g); else posto.remove();
      });
    }

    m.replaceWith(el('div', {}, [
      posto,

      el('section', { class: 'section section--paper' }, [
        el('div', { class: 'container' }, [
          el('div', { class: 'split', style: 'align-items:start' }, [
            el('div', { class: 'stack' }, [
              el('p', { class: 't-meta', text: U('coll.comeFatta') }),
              el('h2', { class: 't-heading', text: 'Materiali, ferramenta, tempi' }),
              el('p', { class: 't-body measure', text: c.text })
            ]),
            specs(c.specs)
          ])
        ])
      ]),

      el('section', { class: 'section section--paper', style: 'padding-top:0' }, [
        el('div', { class: 'container stack' }, [
          el('p', { class: 't-meta', text: U('coll.altre') }),
          el('nav', { class: 'chips', 'aria-label': U('coll.altre') },
             altre.map(x => el('a', { class: 'chip', href: x.href, text: x.name })))
        ])
      ])
    ]));
  }

  /* ======================================================================
     PAGINA PROGETTAZIONE
     ====================================================================== */
  function pageProgettazione(d) {
    const m = $('#steps'); if (!m || !d) return;

    m.replaceWith(el('div', {}, [
      el('section', { class: 'section section--paper' }, [
        el('div', { class: 'container' }, [
          el('div', { class: 'split' }, [
            el('div', { class: 'split__body' }, [
              el('p', { class: 't-meta', text: U('prog.partenza') }),
              el('h2', { class: 't-heading', text: U('prog.rilievo') }),
              el('p', { class: 't-body measure', text: U('prog.rilievoTesto') })
            ]),
            el('div', { class: 'split__media' }, [img(d.image, d.imageAlt)])
          ])
        ])
      ]),
      el('section', { class: 'section section--canvas' }, [
        el('div', { class: 'container' }, [
          head(U('prog.leFasi'), U('prog.esito')),
          el('div', { class: 'index' }, d.steps.map((s, i) => row(
            el('span', { class: 't-meta index__num', text: num(i) }),
            el('div', { class: 'index__body' }, [
              el('h3', { class: 't-subheading', text: s.name }),
              el('p', { class: 't-body-sm measure', text: s.text })
            ]),
            el('div', { class: 'stack stack--tight' }, [
              el('span', { class: 't-meta', text: U('prog.cosaRicevi') }),
              el('span', { class: 't-body-sm', text: s.out })
            ])
          )))
        ])
      ])
    ]));
  }

  /* ======================================================================
     PAGINA SMART LIVING
     ====================================================================== */
  function pageSmart(d) {
    const m = $('#blocks'); if (!m || !d) return;

    m.replaceWith(el('div', {}, d.blocks.map((b, i) => el('section', {
      class: 'section ' + (i % 2 ? 'section--canvas' : 'section--paper')
    }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'split' }, [
          el('div', { class: 'split__body' }, [
            el('p', { class: 't-meta', text: num(i) }),
            el('h2', { class: 't-heading', text: b.name }),
            el('p', { class: 't-body measure', text: b.text })
          ]),
          el('div', {}, [specs(b.specs)])
        ])
      ])
    ]))));
  }

  /* ======================================================================
     PAGINA AZIENDA
     ====================================================================== */
  function pageAzienda(d) {
    const m = $('#story'); if (!m || !d) return;

    m.replaceWith(el('div', {}, [
      /* La linea temporale sta su una sola fotografia verticale che
         l'attraversa tutta, da Agostino a oggi. */
      el('section', {
        class: 'section ' + (d.storyImage ? 'section--story' : 'section--paper')
      }, [
        el('div', { class: 'container' }, [
          head(U('azienda.storia'), U('azienda.dal1969')),
          /* La fotografia sta dentro questo blocco, non nella sezione:
             comincia al primo capitolo e non sotto l'intestazione. */
          el('div', { class: 'story' }, [
            d.storyImage ? el('div', { class: 'story-media' },
                              [img(d.storyImage, d.storyImageAlt)]) : null,
            el('div', { class: 'story__list' },
               d.chapters.map(c => el('article', { class: 'chapter' }, [
                 el('span', { class: 'chapter__year', text: c.year }),
                 el('div', { class: 'chapter__body' }, [
                   el('h3', { class: 't-subheading', text: c.title }),
                   el('p', { class: 't-body', text: c.text })
                 ])
               ])))
          ])
        ])
      ]),
      /* La storia e' su canvas: gli impegni passano a paper per avere uno
         stacco tonale fra le due bande chiare, come vuole l'alternanza. */
      el('section', { class: 'section section--paper' }, [
        el('div', { class: 'container' }, [
          el('div', { class: 'section-head' }, [
            el('p', { class: 't-meta', text: U('azienda.comportiamo') }),
            el('h2', { class: 't-heading-lg', text: U('azienda.impegni') })
          ]),
          el('div', { class: 'index' }, d.values.map((v, i) => row(
            el('span', { class: 't-meta index__num', text: num(i) }),
            el('h3', { class: 't-meta', text: v.label }),
            el('p', { class: 't-body-sm', text: v.text })
          )))
        ])
      ])
    ]));
  }

  /* ======================================================================
     PAGINA STUDIO
     ====================================================================== */
  function pageStudio(d) {
    const m = $('#studio'); if (!m || !d) return;

    m.replaceWith(el('div', {}, [
      el('section', { class: 'section section--paper' }, [
        el('div', { class: 'container' }, [
          el('div', { class: 'index' }, d.blocks.map((b, i) => row(
            el('span', { class: 't-meta index__num', text: num(i) }),
            el('h2', { class: 't-subheading', text: b.name }),
            el('p', { class: 't-body-sm', text: b.text })
          )))
        ])
      ]),
      el('section', { class: 'section section--canvas' }, [
        el('div', { class: 'container' }, [
          el('div', { class: 'split' }, [
            el('div', { class: 'split__body' }, [
              el('p', { class: 't-meta', text: U('studio.appuntamento') }),
              el('h2', { class: 't-heading', text: d.visit.title }),
              el('p', { class: 't-body measure', text: d.visit.text }),
              el('div', { class: 'cluster' }, [
                btn(U('studio.fissa'), 'contatti.html', 'outline'),
                btn(S.contact.phoneLabel, S.contact.phoneHref, 'ghost')
              ])
            ]),
            /* Qui c'era la fotografia della home, che non c'entrava niente
               con lo Studio. Adesso ci sono le fotografie dello Studio, e
               si alternano da sole mentre si legge il testo accanto. */
            el('div', { class: 'split__media' }, [
              (window.CAVetrina && S.fotoStudio && S.fotoStudio.cartella)
                ? window.CAVetrina.costruisci(S.fotoStudio, U('studio.vetrina'), {
                    sizes: '(max-width: 900px) 92vw, 46vw',
                    urgente: false,
                    riserva: { image: S.hero.image, imageAlt: S.hero.imageAlt }
                  })
                : img(S.hero.image, S.hero.imageAlt)
            ])
          ])
        ])
      ])
    ]));
  }

  /* ======================================================================
     PAGINA CONTATTI — configuratore + recapiti
     ====================================================================== */
  function pageContatti(d) {
    const m = $('#contact'); if (!m || !d) return;

    const cfg = window.CAConfig ? window.CAConfig.costruisci(d) : null;

    const info = el('div', { class: 'stack stack--wide' }, [
      cfg ? cfg.riepilogo : null,
      /* Le fotografie segnate stanno subito sotto il riepilogo: sono
         parte della richiesta, non un accessorio da fondo pagina. */
      cfg ? cfg.preferiti : null,
      el('div', { class: 'info' }, [
        el('div', { class: 'info__item' }, [
          el('span', { class: 't-meta', text: U('info.telefono') }),
          el('span', { class: 't-body-lg info__value',
            html: `<a href="${S.contact.phoneHref}">${S.contact.phoneLabel}</a>` })
        ]),
        el('div', { class: 'info__item' }, [
          el('span', { class: 't-meta', text: U('info.email') }),
          el('span', { class: 't-body-lg info__value',
            html: `<a href="mailto:${S.contact.email}">${S.contact.email}</a>` })
        ]),
        el('div', { class: 'info__item' }, [
          el('span', { class: 't-meta', text: U('info.dove') }),
          el('span', { class: 't-body info__value',
            html: `<a href="${d.mapsUrl}" target="_blank" rel="noopener noreferrer">${S.contact.address}</a>` })
        ])
      ]),
      el('div', { class: 'stack' }, [
        el('p', { class: 't-meta', text: U('info.orari') }),
        el('ul', { class: 'hours t-body-sm' }, d.hours.map(h => el('li', {}, [
          el('b', { text: h.days }),
          el('span', { text: h.time })
        ])))
      ])
    ]);

    m.replaceWith(el('section', { class: 'section section--paper' }, [
      el('div', { class: 'container' }, [
        /* Niente align-items:start qui: la colonna di destra deve essere
           alta quanto il modulo, altrimenti il riepilogo "appiccicato"
           si stacca a metà pagina e ricomincia a scorrere. */
        el('div', { class: 'split split--contatti' },
           [cfg ? cfg.form : null, info])
      ])
    ]));
  }

  /* ======================================================================
     PAGINA PRIVACY
     ====================================================================== */
  function pagePrivacy(d) {
    const m = $('#policy'); if (!m || !d) return;

    m.replaceWith(el('section', { class: 'section section--paper' }, [
      el('div', { class: 'container' }, [
        el('div', { class: 'prose' }, d.sections.flatMap(s => [
          el('h2', { text: s.h }),
          ...(s.p || []).map(t => el('p', { text: t })),
          s.ul ? el('ul', {}, s.ul.map(t => el('li', {}, [el('span', { text: t })]))) : null
        ]).filter(Boolean))
      ])
    ]));
  }

  /* ======================================================================
     PAGINA EVENTI — appuntamenti, iniziative, archivio

     Tre blocchi con tre nature diverse, e si vede:

       gli APPUNTAMENTI hanno una data e scadono;
       le INIZIATIVE non ce l'hanno e non finiscono;
       l'ARCHIVIO è quello che è già stato.

     Un elenco vuoto non lascia un buco: sparisce, e al posto degli
     appuntamenti compare una riga che dice cosa fare comunque. Una
     sezione "Prossimi appuntamenti" con sotto il nulla è peggio che non
     averla.

     LE VOCI DI ESEMPIO SI VEDONO CHE SONO ESEMPI

     Finché una voce ha "esempio: true" porta un'etichetta gialla e in
     cima alla pagina compare un avviso. Sono lì per far vedere come si
     impagina la sezione, e non devono poter passare per appuntamenti
     veri nemmeno per distrazione. Tolta quella riga, spariscono etichetta
     e avviso.
     ====================================================================== */
  function pageEventi(d) {
    const m = $('#eventi'); if (!m || !d) return;

    const vivi = l => (l || []).filter(Boolean);
    const conEsempi = [...vivi((d.prossimi || {}).voci), ...vivi((d.passati || {}).voci)]
      .some(x => x.esempio);

    /* Un appuntamento: la data prima di tutto, perché è la prima cosa che
       si cerca. <time> con la data leggibile dalle macchine dove c'è. */
    const appuntamento = (x) => el('article', { class: 'evento' + (x.esempio ? ' evento--esempio' : '') }, [
      el('div', { class: 'evento__quando' }, [
        x.dataISO
          ? el('time', { class: 't-meta evento__data', datetime: x.dataISO, text: x.data })
          : el('span', { class: 't-meta evento__data', text: x.data }),
        x.esempio ? el('span', { class: 't-meta evento__esempio', text: U('eventi.esempio') }) : null
      ]),
      el('div', { class: 'evento__cosa' }, [
        el('h3', { class: 't-subheading', text: x.titolo }),
        x.luogo ? el('p', { class: 't-meta evento__luogo', text: x.luogo }) : null,
        el('p', { class: 't-body-sm measure', text: x.testo })
      ])
    ]);

    const prossimi = d.prossimi || {};
    const passati = d.passati || {};
    const iniziative = d.iniziative || {};
    const vociProssime = vivi(prossimi.voci);
    const vociPassate = vivi(passati.voci);

    m.replaceWith(el('div', {}, [

      /* L'avviso sta in cima, prima di qualsiasi data: chi legge deve
         saperlo prima di leggere, non dopo. */
      conEsempi && d.avviso
        ? el('section', { class: 'section section--paper section--stretta' }, [
            el('div', { class: 'container' }, [
              el('p', { class: 'avviso-esempi t-body-sm', role: 'note', text: d.avviso })
            ])
          ])
        : null,

      /* Prossimi appuntamenti */
      el('section', { class: 'section section--paper' }, [
        el('div', { class: 'container' }, [
          head(prossimi.label, prossimi.title),
          vociProssime.length
            ? el('div', { class: 'eventi' }, vociProssime.map(appuntamento))
            : el('p', { class: 't-body measure', text: prossimi.vuoto || '' })
        ])
      ]),

      /* Iniziative: nessuna data, nessun archivio. Stesso elenco numerato
         dello Studio, perché sono la stessa cosa — punti fermi. */
      vivi(iniziative.voci).length
        ? el('section', { class: 'section section--dark' }, [
            el('div', { class: 'container' }, [
              head(iniziative.label, iniziative.title,
                   iniziative.testo ? el('p', { class: 't-body measure', text: iniziative.testo }) : null),
              el('div', { class: 'index' }, iniziative.voci.map((b, i) => row(
                el('span', { class: 't-meta index__num', text: num(i) }),
                el('h3', { class: 't-subheading', text: b.name }),
                el('p', { class: 't-body-sm', text: b.text })
              )))
            ])
          ])
        : null,

      /* Archivio */
      vociPassate.length
        ? el('section', { class: 'section section--canvas' }, [
            el('div', { class: 'container' }, [
              head(passati.label, passati.title),
              el('div', { class: 'eventi eventi--passati' }, vociPassate.map(appuntamento))
            ])
          ])
        : null
    ]));
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  boot(function (pageData) {
    /* Home */
    hero(); statement(); services(); collections();
    method(); smart(); sustainability();
    /* Pagine interne */
    pageCollezioni(pageData);
    pageCollezione(pageData);
    pageProgettazione(pageData);
    pageSmart(pageData);
    pageAzienda(pageData);
    pageStudio(pageData);
    pageEventi(pageData);
    pageContatti(pageData);
    pagePrivacy(pageData);
  });
})();
