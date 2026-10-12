/* ==========================================================================
   CORSO ARREDI — LO SCHELETRO DELLE PAGINE
   --------------------------------------------------------------------------
   Che cosa c'è dentro <main> in ogni pagina, più il titolo e l'indirizzo
   canonico. Sono poche righe perché le pagine di questo sito non contengono
   testo: contengono segnaposto vuoti che il JavaScript riempie leggendo
   content/site.js e content/pages.js. Il testo vero non è mai stato
   nell'HTML.

   PERCHÉ ESISTE QUESTO FILE

   Il cambio pagina animato deve costruire la pagina nuova. Fino a ieri se
   la andava a prendere con una richiesta di rete, e per questo non
   funzionava aprendo i file con un doppio clic: da disco il browser vieta a
   una pagina di leggerne altre.

   Ma non c'era niente da andare a prendere. Tutto quello che serve sono le
   tre righe qui sotto per ogni pagina — e possono stare in memoria fin
   dall'inizio, insieme ai testi. Quindi adesso ci stanno, la rete non
   serve più, e le animazioni funzionano ovunque: online, da disco, senza
   connessione.

   MANUTENZIONE

   Questo file rispecchia i file .html e deve restare allineato. Se aggiungi
   una pagina o cambi i segnaposto dentro <main>, aggiorna anche qui. La
   verifica automatica confronta le due cose e fallisce se divergono, quindi
   non è un allineamento affidato alla memoria di qualcuno.
   ========================================================================== */

/* IL TITOLO ESISTE IN DUE LINGUE

   "titolo" è quello italiano, "titoloEn" quello inglese. Il cambio pagina
   sceglie in base alla lingua attiva: il titolo della scheda del browser è
   la prima cosa che si legge di una pagina, e lasciarlo in italiano dentro
   il sito inglese si nota subito — anche solo guardando le schede aperte. */
window.PAGINE = {
  "azienda.html": {
    titolo: "L'azienda — Tre generazioni di falegnameria dal 1969 | Corso Arredi",
    titoloEn: "The company — Three generations of cabinetmaking since 1969 | Corso Arredi",
    canonical: "https://www.corsoarredi.com/azienda.html",
    page: "azienda",
    main: "<div id=\"page-head\"></div> <div id=\"story\"></div> <div id=\"closing\"></div>"
  },
  "collezione-bagni.html": {
    titolo: "Bagni su misura — progetti realizzati | Corso Arredi",
    titoloEn: "Bespoke bathrooms — completed projects | Corso Arredi",
    canonical: "https://www.corsoarredi.com/collezione-bagni.html",
    page: "collezione",
    collezione: "bagni",
    main: "<div id=\"page-head\"></div> <div id=\"collezione\"></div> <div id=\"closing\"></div>"
  },
  "collezione-cucine.html": {
    titolo: "Cucine su misura — progetti realizzati | Corso Arredi",
    titoloEn: "Bespoke kitchens — completed projects | Corso Arredi",
    canonical: "https://www.corsoarredi.com/collezione-cucine.html",
    page: "collezione",
    collezione: "cucine",
    main: "<div id=\"page-head\"></div> <div id=\"collezione\"></div> <div id=\"closing\"></div>"
  },
  "collezione-falegnameria.html": {
    titolo: "Falegnameria su misura — progetti realizzati | Corso Arredi",
    titoloEn: "Cabinetmaking — special work and restoration | Corso Arredi",
    canonical: "https://www.corsoarredi.com/collezione-falegnameria.html",
    page: "collezione",
    collezione: "falegnameria",
    main: "<div id=\"page-head\"></div> <div id=\"collezione\"></div> <div id=\"closing\"></div>"
  },
  "collezione-hospitality.html": {
    titolo: "Hospitality su misura — progetti realizzati | Corso Arredi",
    titoloEn: "Contract and hospitality — completed projects | Corso Arredi",
    canonical: "https://www.corsoarredi.com/collezione-hospitality.html",
    page: "collezione",
    collezione: "hospitality",
    main: "<div id=\"page-head\"></div> <div id=\"collezione\"></div> <div id=\"closing\"></div>"
  },
  "collezione-living.html": {
    titolo: "Living su misura — progetti realizzati | Corso Arredi",
    titoloEn: "Living spaces — completed projects | Corso Arredi",
    canonical: "https://www.corsoarredi.com/collezione-living.html",
    page: "collezione",
    collezione: "living",
    main: "<div id=\"page-head\"></div> <div id=\"collezione\"></div> <div id=\"closing\"></div>"
  },
  "collezione-notte.html": {
    titolo: "Zona notte su misura — progetti realizzati | Corso Arredi",
    titoloEn: "Bedrooms and walk-in wardrobes — completed projects | Corso Arredi",
    canonical: "https://www.corsoarredi.com/collezione-notte.html",
    page: "collezione",
    collezione: "notte",
    main: "<div id=\"page-head\"></div> <div id=\"collezione\"></div> <div id=\"closing\"></div>"
  },
  "collezioni.html": {
    titolo: "Collezioni — Cucine, living, zona notte, bagni, contract | Corso Arredi",
    titoloEn: "Collections — Kitchens, living, bedrooms, bathrooms, contract | Corso Arredi",
    canonical: "https://www.corsoarredi.com/collezioni.html",
    page: "collezioni",
    main: "<div id=\"page-head\"></div> <div id=\"categories\"></div> <div id=\"closing\"></div>"
  },
  "contatti.html": {
    titolo: "Contattaci — Parliamo del tuo progetto | Corso Arredi",
    titoloEn: "Get in touch — Let’s talk about your project | Corso Arredi",
    canonical: "https://www.corsoarredi.com/contatti.html",
    page: "contatti",
    main: "<div id=\"page-head\"></div> <div id=\"contact\"></div>"
  },
  "eventi.html": {
    titolo: "Eventi e iniziative | Corso Arredi",
    titoloEn: "Events and initiatives | Corso Arredi",
    canonical: "https://www.corsoarredi.com/eventi.html",
    page: "eventi",
    main: "<div id=\"page-head\"></div> <div id=\"eventi\"></div> <div id=\"closing\"></div>"
  },
  "index.html": {
    titolo: "Corso Arredi — Interni su misura e falegnameria a Verona",
    titoloEn: "Corso Arredi — Bespoke interiors, from drawing to installation",
    canonical: "https://www.corsoarredi.com/",
    page: "",
    main: "<div id=\"hero\"></div> <div id=\"statement\"></div> <div id=\"sustainability\"></div> <div id=\"collections\"></div> <div id=\"method\"></div> <div id=\"smart\"></div> <div id=\"services\"></div> <div id=\"closing\"></div>"
  },
  "privacy.html": {
    titolo: "Privacy policy | Corso Arredi",
    titoloEn: "Privacy policy | Corso Arredi",
    canonical: "https://www.corsoarredi.com/privacy.html",
    page: "privacy",
    main: "<div id=\"page-head\"></div> <div id=\"policy\"></div>"
  },
  "progettazione.html": {
    titolo: "Come progettiamo — Le sei fasi del metodo | Corso Arredi",
    titoloEn: "Design and method — Six stages, no grey areas | Corso Arredi",
    canonical: "https://www.corsoarredi.com/progettazione.html",
    page: "progettazione",
    main: "<div id=\"page-head\"></div> <div id=\"steps\"></div> <div id=\"closing\"></div>"
  },
  "smart-living.html": {
    titolo: "Smart living — Domotica integrata nell'arredo | Corso Arredi",
    titoloEn: "Smart living — Home automation built into the furniture | Corso Arredi",
    canonical: "https://www.corsoarredi.com/smart-living.html",
    page: "smart",
    main: "<div id=\"page-head\"></div> <div id=\"blocks\"></div> <div id=\"closing\"></div>"
  },
  "studio.html": {
    titolo: "Lo Studio — Lo spazio dove si decide | Corso Arredi",
    titoloEn: "The studio — Where decisions get made | Corso Arredi",
    canonical: "https://www.corsoarredi.com/studio.html",
    page: "studio",
    main: "<div id=\"page-head\"></div> <div id=\"studio\"></div> <div id=\"closing\"></div>"
  }
};
