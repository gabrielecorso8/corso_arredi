/* ==========================================================================
   CORSO ARREDI — CONTENUTI DEL SITO
   --------------------------------------------------------------------------
   QUESTO È L'UNICO FILE DA MODIFICARE PER CAMBIARE TESTI E IMMAGINI.
   Non serve toccare HTML o CSS.

   Regole rapide:
   - I testi vanno tra virgolette "..."
   - Per andare a capo in un titolo usa <br>
   - Ogni voce di un elenco finisce con la virgola, tranne l'ultima
   - Le immagini stanno in assets/img/
   - Se un'immagine manca, compare un segnaposto neutro al suo posto
   ========================================================================== */

window.SITE_IT = {

  /* ======================================================================
     1. IDENTITÀ
     ====================================================================== */
  brand: {
    name: "Corso",
    nameBold: "Arredi",
    /* Monogramma vettoriale: eredita currentColor, si inverte da solo */
    mark: "assets/logo.svg",
    tagline: "Progettiamo interni su misura e li costruiamo nella nostra falegnameria a Pescantina. Dal 1969.",
    vat: "P.IVA 04496820236",
    copyright: "© Corso Arredi"
  },

  contact: {
    phoneLabel: "045 715 1234",
    phoneHref: "tel:+390457151234",
    email: "info@corsoarredi.com",
    address: "Via Nassar, 42 — 37026 Pescantina (VR)"
  },

  social: [
    { name: "Instagram", url: "https://www.instagram.com/corso_arredi/" },
    { name: "Facebook",  url: "https://www.facebook.com/corsoarredi" },
    { name: "LinkedIn",  url: "https://it.linkedin.com/in/tiziano-corso-18762085" }
  ],

  /* ======================================================================
     2. NAVIGAZIONE
     ====================================================================== */
  nav: {
    links: [
      { label: "Collezioni",    href: "collezioni.html" },
      { label: "Progettazione", href: "progettazione.html" },
      { label: "Smart Living",  href: "smart-living.html" },
      { label: "Azienda",       href: "azienda.html" },
      { label: "Lo Studio",     href: "studio.html" },
      { label: "Eventi",        href: "eventi.html" }
    ],
    cta: { label: "Contattaci", href: "contatti.html" }
  },

  /* ======================================================================
     3. HERO — fotografia full-bleed, testo in basso a sinistra
     ====================================================================== */
  hero: {
    label: "Progettazione su misura dal 1969 · Settimo di Pescantina",
    title: "Interni su misura,<br>dal disegno alla posa.",
    lede: "Tre generazioni fra studio di progettazione e falegnameria. Ascoltiamo lo spazio e chi lo vive, poi disegniamo, costruiamo e installiamo: un interlocutore solo, dal primo sopralluogo all'assistenza.",
    /* Immagine orizzontale dedicata all'hero, con più pixel della serie
       verticale dello Studio e già in proporzione alla schermata. */
    image: "assets/img/hero-living.jpg",
    imageAlt: "Soggiorno contemporaneo con parete attrezzata in legno, illuminazione integrata e ampie vetrate",
    actions: [
      { label: "Collezioni", href: "collezioni.html" },
      { label: "Eventi", href: "eventi.html" }
    ]
  },

  /* ======================================================================
     4. STATEMENT — lo statement da solo, nessun elemento di supporto
     ====================================================================== */
  statement: {
    title: "Il progetto e la produzione<br>sotto lo stesso tetto."
  },

  /* ======================================================================
     5. COMPETENZE — elenco type-driven, nessuna immagine
     ====================================================================== */
  services: {
    label: "Competenze",
    title: "Quattro mestieri, una filiera",
    /* L'ordine è quello della presentazione aziendale, ed è anche quello
       in cui le cose succedono davvero: prima si disegna, poi si guarda,
       poi si costruisce, e la tecnologia entra dentro il mobile. */
    items: [
      {
        name: "Progettazione",
        text: "Rilievo metrico, studio distributivo e illuminotecnico, capitolato materiali. Il progetto nasce dall'ascolto dello spazio e arriva come documento tecnico, non come catalogo.",
        bullets: ["Sopralluogo e rilievo", "Studio della luce e dei percorsi", "Computo senza voci nascoste"]
      },
      {
        name: "Rendering",
        text: "Prima di produrre, vedi. Restituiamo il progetto in immagini fotorealistiche e percorsi navigabili: le finiture si scelgono guardando, non immaginando.",
        bullets: ["Viste fotorealistiche", "Varianti a confronto", "Revisioni fino all'approvazione"]
      },
      {
        name: "Falegnameria",
        text: "Produzione interna dal 1969. Ante, boiserie, librerie, cabine armadio e banconi disegnati e costruiti nel nostro laboratorio, a pochi metri dal tavolo dove sono stati pensati.",
        bullets: ["Su misura al millimetro", "Legni certificati, vernici all'acqua", "Premontaggio prima della posa"]
      },
      {
        name: "Smart living",
        text: "Domotica integrata nel mobile, non appiccicata sopra. Luci, clima, tapparelle e sicurezza su un'unica logica, scelta insieme ai materiali e non dopo.",
        bullets: ["Impianti KNX e wireless", "Elettrodomestici connessi", "Operativo anche offline"]
      }
    ]
  },

  /* ======================================================================
     6. COLLEZIONI — quattro card, immagine 32px di raggio
     ====================================================================== */
  collections: {
    label: "Collezioni",
    title: "Progetti realizzati e consegnati",
    cta: { label: "Tutte le collezioni", href: "collezioni.html" },
    items: [
      {
        name: "Cucine",
        meta: "Su misura, elettrodomestici integrati",
        href: "collezione-cucine.html",
        image: "assets/img/coll-cucine.jpg",
        imageAlt: "Cucina su misura con isola in pietra e ante a doghe verticali in rovere"
      },
      {
        name: "Living",
        meta: "Boiserie, librerie, zone giorno",
        href: "collezione-living.html",
        image: "assets/img/coll-living.jpg",
        imageAlt: "Libreria su misura a tutta altezza in rovere con illuminazione lineare integrata"
      },
      {
        name: "Zona notte",
        meta: "Camere, testate, cabine armadio",
        href: "collezione-notte.html",
        image: "assets/img/coll-notte.jpg",
        imageAlt: "Camera da letto con testata imbottita a tutta parete e comodini sospesi in rovere"
      },
      {
        name: "Bagni",
        meta: "Mobili sospesi, lavabi, specchi",
        href: "collezione-bagni.html",
        image: "assets/img/coll-bagni.jpg",
        imageAlt: "Bagno con mobile sospeso in rovere, lavabo in pietra e specchio retroilluminato"
      },
      {
        name: "Falegnameria",
        meta: "Lavorazioni speciali e restauro",
        href: "collezione-falegnameria.html",
        image: "assets/img/coll-falegnameria.jpg",
        imageAlt: "Dettaglio di un incastro a coda di rondine in rovere massello con scalpello e truciolo"
      },
      {
        name: "Hospitality",
        meta: "Hotel, ristorazione, negozi e boutique",
        href: "collezione-hospitality.html",
        image: "assets/img/coll-hospitality.jpg",
        imageAlt: "Reception di hotel con bancone curvo a doghe verticali in rovere e piano in pietra"
      }
    ]
  },

  /* ======================================================================
     7. METODO — split con immagine
     ====================================================================== */
  method: {
    label: "Metodo",
    title: "Sei fasi, nessuna zona grigia",
    text: "Sai sempre a che punto siamo, chi sta lavorando e cosa succede dopo. Gli imprevisti li risolviamo in laboratorio, non nel tuo cantiere.",
    image: "assets/img/progettazione.jpg",
    imageAlt: "Tavolo da lavoro con disegni tecnici in pianta, campionature di legno e pietra, squadra e metro",
    /* Le sei fasi sono quelle della presentazione aziendale, con i nomi
       che l'azienda usa davvero quando le racconta. */
    steps: [
      "Analisi delle esigenze",
      "Progetto e rendering",
      "Produzione in falegnameria",
      "Controllo dello stato lavori",
      "Consegna, accessori e luce",
      "Post vendita"
    ],
    cta: { label: "Il metodo in dettaglio", href: "progettazione.html" }
  },

  /* ======================================================================
     8. SMART LIVING — banda scura, solo tipografia
     ====================================================================== */
  smart: {
    label: "Smart living · IoT e AIoT",
    title: "La tecnologia migliore<br>è quella che non devi guardare.",
    text: "Integriamo domotica ed elettrodomestici connessi dentro il progetto d'arredo. Nessun interruttore aggiunto dopo, nessuna scatoletta a vista.",
    items: [
      { label: "Controllo ambientale",     text: "Luci, clima, tende e tapparelle su scenari che seguono le tue giornate." },
      { label: "Elettrodomestici connessi", text: "Forni, cappe e cantine dei nostri partner, integrati nel mobile e nella stessa app." },
      { label: "Efficienza misurabile",    text: "Consumi monitorati e regolazione automatica: la casa spegne quello che non serve." },
      { label: "Funziona offline",         text: "Ogni scenario resta operativo in locale. Se cade la linea, la casa risponde." }
    ],
    cta: { label: "Scopri lo smart living", href: "smart-living.html" }
  },

  /* ======================================================================
     8-bis. LE FOTOGRAFIE DELL'AZIENDA

     Non un elenco: una cartella. Le fotografie stanno in
     assets/img/studio e si chiamano col numero — 01.jpg, 02.jpg, 03.jpg.
     Il sito le conta da solo a ogni apertura.

     Copiandone una dentro compare un posto in piu'; cancellandola il posto
     sparisce con lei. Prima l'elenco era scritto qui sotto, e cancellare un
     file dal disco lasciava nel sito un riquadro grigio con un puntino che
     non portava da nessuna parte: il posto continuava a esistere perche' era
     questo elenco a crearlo. Adesso lo crea il file.

     Le stesse fotografie si vedono in due posti — dietro il titolo della
     home e accanto a "Vieni a vedere" nella pagina dello Studio — con due
     andature diverse e in due ordini diversi: la vetrina le mescola a ogni
     apertura, in modo indipendente nei due posti.

     Le descrizioni qui sotto sono facoltative e si legano al numero del
     file. Una fotografia senza la sua voce si vede lo stesso: prende una
     descrizione generica. Una voce senza la sua fotografia non crea niente,
     resta scritta e non la legge nessuno.

     La didascalia si vede solo nello Studio; nella home no, perche' li'
     l'unica cosa da leggere e' il titolo.
     ====================================================================== */
  fotoStudio: {
    cartella: "assets/img/studio",
    name: "Corso Arredi",
    id: "studio",
    altGenerico: "Una fotografia dello Studio di Corso Arredi a Pescantina",
    descrizioni: {
      "01": { didascalia: "Il soggiorno, visto dal banco da falegname",
              alt: "Lo Studio visto dal soggiorno: soffitto a travi di legno lamellare, anello luminoso sospeso, cucina sullo sfondo e un vecchio banco da falegname usato come isola" },
      "02": { didascalia: "Il monogramma, in legno di recupero",
              alt: "Il monogramma CA composto da forme in legno di recupero montate sulla facciata chiara, sopra un'aiuola di fiori rosa" },
      "03": { didascalia: "La cucina, con l'isola che era un banco",
              alt: "La cucina dello Studio con ante bianche a gola, pensili in rovere antico e un banco da falegname ottocentesco al posto dell'isola, con piano a induzione appoggiato" },
      "04": { didascalia: "Fuori, dove batte il sole a mezzogiorno",
              alt: "L'angolo esterno dello Studio con due lettini bianchi, ceppi di legno come tavolini e aiuole fiorite davanti alla vetrata scorrevole" },
      "05": { didascalia: "Il living e la scala verso la sala materiali",
              alt: "Il living dello Studio: divano chiaro, quadri colorati alle pareti, scala in acciaio verso il primo piano e struttura in legno lamellare a vista sul soffitto" },
      "06": { didascalia: "La parete delle essenze, in sala materiali",
              alt: "Parete espositiva della sala materiali con campionature di essenze e laminati appoggiate su mensole nere, dal rovere chiaro ai grigi e ai bruni" },
      "07": { didascalia: "Campionature in piedi, pronte da confrontare",
              alt: "Campionature di pannelli disposte in verticale in primo piano e, sullo sfondo, il tavolo della progettazione davanti alla vetrata a nastro" },
      "08": { didascalia: "Le pietre, una accanto all'altra",
              alt: "Espositore a ventaglio di lastre in pietra e quarzo con maniglie nere, dai bianchi venati ai grigi cemento" }
    }
  },

  /* ======================================================================
     9. SOSTENIBILITÀ
     ====================================================================== */
  sustainability: {
    label: "Sostenibilità",
    title: "La Terra è la nostra prima casa.",
    image: "assets/img/band-sostenibilita.jpg",
    imageAlt: "Edificio in legno al tramonto con impianto fotovoltaico sul tetto, alberi e colline sullo sfondo",
    text: "Il laboratorio si autoproduce l'energia con il fotovoltaico. I legni vengono da foreste a gestione controllata, le vernici sono all'acqua, e gli scarti di lavorazione rientrano nel ciclo invece di finire in discarica.",
    note: "Dati aggiornati ad agosto 2026",
    metrics: [
      { value: "129 MWh",  label: "Energia pulita autoprodotta" },
      { value: "1.510",    label: "Alberi equivalenti piantati" },
      /* Attenzione all'unità: 50,6k è in chilogrammi, non grammi.
         Il conto torna solo così — 129 MWh × 392 kg/MWh, lo stesso
         rapporto dei dati del 2021 (27,3 MWh → 10.710 kg). In grammi
         sarebbero 50 kg, quanto un viaggio in auto: sminuirebbe di
         mille volte un risultato vero. */
      { value: "50.600 kg", label: "CO₂ risparmiata" },
      { value: "100%",      label: "Legno certificato" }
    ]
  },

  /* ======================================================================
     10. CHIUSURA
     ====================================================================== */
  closing: {
    title: "Il progetto comincia<br>con una conversazione.",
    text: "Raccontaci lo spazio, il budget e i tempi. Ti diciamo subito se possiamo esserti utili.",
    actions: [
      { label: "Prenota una consulenza", href: "contatti.html", style: "filled" },
      { label: "045 715 1234",           href: "tel:+390457151234", style: "outline-invert" }
    ]
  },

  /* ======================================================================
     11. FOOTER
     ====================================================================== */
  footer: {
    columns: [
      {
        title: "Esplora",
        links: [
          { label: "Collezioni",    href: "collezioni.html" },
          { label: "Progettazione", href: "progettazione.html" },
          { label: "Smart Living",  href: "smart-living.html" },
          { label: "Lo Studio",     href: "studio.html" },
          { label: "Eventi",        href: "eventi.html" }
        ]
      },
      {
        title: "Azienda",
        links: [
          { label: "Storia",  href: "azienda.html" },
          { label: "Contattaci", href: "contatti.html" },
          { label: "Privacy", href: "privacy.html" }
        ]
      }
    ]
  }
};
