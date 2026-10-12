/* ==========================================================================
   CORSO ARREDI — I MICRO-TESTI DELL'INTERFACCIA
   --------------------------------------------------------------------------
   Le parole che non sono contenuto: "Apri il menu", "Fotografia precedente",
   "Mi piace", i messaggi d'errore del modulo, i nomi dei giorni.

   Stavano dentro i moduli, scritte in mezzo al codice. Finché il sito era
   in una lingua sola si poteva anche fare; con due lingue no, perché
   tradurre avrebbe voluto dire andare a cercarle una per una dentro nove
   file diversi — ed è il modo migliore per dimenticarne qualcuna e
   ritrovarsi un bottone in italiano dentro una pagina inglese.

   Adesso stanno qui, le due lingue una accanto all'altra. Una riga sola per
   voce: si vede subito se manca una traduzione, perché il posto è vuoto.

   COME SI USA

     CAUI.t('menu.apri')                   -> "Apri il menu" / "Open the menu"
     CAUI.t('cuore.metti', { x: 'Isola' }) -> le parti variabili in {x}

   Se una chiave non esiste torna la chiave stessa invece di una stringa
   vuota: un testo sbagliato si vede e si corregge, un testo assente no.

   MOLTO POCO DI QUESTO È TRADUZIONE LETTERALE

   "Parlane con noi" non è "talk about it with us": è "Let's talk about it".
   L'inglese di questo sito deve suonare come lo scriverebbe qualcuno che
   lavora in inglese, non come l'italiano ripiegato.
   ========================================================================== */

window.CAUI = (function () {
  'use strict';

  var VOCI = {

    /* ---------- navigazione e struttura ---------- */
    'nav.home':            { it: 'Corso Arredi — home',        en: 'Corso Arredi — home' },
    'menu.apri':           { it: 'Apri il menu',               en: 'Open the menu' },
    'menu.chiudi':         { it: 'Chiudi il menu',             en: 'Close the menu' },
    'menu.principale':     { it: 'Menu principale',            en: 'Main menu' },
    'percorso':            { it: 'Percorso',                   en: 'Breadcrumb' },
    'crumb.home':          { it: 'Home',                       en: 'Home' },
    'lingua.scegli':       { it: 'Lingua',                     en: 'Language' },
    'lingua.it':           { it: 'Italiano',                   en: 'Italian' },
    'lingua.en':           { it: 'Inglese',                    en: 'English' },
    'lingua.passa':        { it: 'Leggi il sito in inglese',   en: 'Read this site in Italian' },

    /* ---------- il cuore e i preferiti ---------- */
    'cuore.questa':        { it: 'questa foto',                en: 'this photo' },
    'cuore.metti':         { it: 'Mi piace: “{x}”',            en: 'Like “{x}”' },
    'cuore.togli':         { it: 'Togli “{x}” dai preferiti',  en: 'Remove “{x}” from your picks' },
    'cuore.dentro':        { it: 'Nei preferiti',              en: 'Picked' },
    'cuore.fuori':         { it: 'Mi piace',                   en: 'Like' },
    'cuore.pieno':         { it: 'Hai già segnato {n} fotografie: è abbastanza per farci capire.',
                             en: 'You have already picked {n} photos — that is plenty for us to understand.' },
    'segna.una':           { it: 'Una fotografia segnata: vai alla richiesta',
                             en: 'One photo picked: go to your enquiry' },
    'segna.molte':         { it: '{n} fotografie segnate: vai alla richiesta',
                             en: '{n} photos picked: go to your enquiry' },

    /* ---------- la giostra dentro una collezione ---------- */
    'giostra.vaiA':        { it: 'Vai alla fotografia',        en: 'Go to photo' },
    'giostra.prec':        { it: 'Fotografia precedente',      en: 'Previous photo' },
    'giostra.succ':        { it: 'Fotografia successiva',      en: 'Next photo' },
    'giostra.ruolo':       { it: 'carosello',                  en: 'carousel' },
    'giostra.etichetta':   { it: 'Fotografie della collezione {x}',
                             en: 'Photos from the {x} collection' },
    'giostra.posizione':   { it: 'Fotografia {i} di {n}: {t}', en: 'Photo {i} of {n}: {t}' },
    'giostra.istruzioni':  { it: 'Metti mi piace agli articoli di tutte le collezioni che ti interessano. Così potremo rispondere con maggiore accuratezza alla tua richiesta.',
                             en: 'Like anything you are drawn to, in any collection. It lets us answer you with something specific instead of something generic.' },
    'giostra.nessuna':     { it: 'Non hai ancora segnato niente.',
                             en: 'You have not picked anything yet.' },
    'giostra.una':         { it: 'Una fotografia segnata. Ce ne dici due parole?',
                             en: 'One photo picked. Tell us a little about it?' },
    'giostra.molte':       { it: '{n} fotografie segnate. Ci stai già dicendo molto.',
                             en: '{n} photos picked. That already tells us a lot.' },
    'giostra.parlane':     { it: 'Parlane con noi',            en: 'Let’s talk about it' },
    'giostra.continua':    { it: 'Continua: parliamone',       en: 'Carry on: let’s talk' },
    'giostra.segnata':     { it: 'Segnata. La ritrovi già in “Parliamo del tuo progetto”.',
                             en: 'Picked. You will find it waiting in “Let’s talk about your project”.' },

    /* ---------- la vetrina ---------- */
    'vetrina.scegli':      { it: 'Scegli la fotografia',       en: 'Choose a photo' },
    'vetrina.ruolo':       { it: 'galleria',                   en: 'gallery' },
    'vetrina.etichetta':   { it: 'Fotografie',                 en: 'Photos' },
    'vetrina.numero':      { it: 'Fotografia {n}',             en: 'Photo {n}' },

    /* ---------- collezioni ---------- */
    'coll.guarda':         { it: 'Guarda la collezione',       en: 'View the collection' },
    'coll.parlane':        { it: 'Parlane con noi',            en: 'Let’s talk about it' },
    'coll.altre':          { it: 'Le altre collezioni',        en: 'The other collections' },
    'coll.altGenerico':    { it: 'Un lavoro della collezione {x} realizzato e consegnato da Corso Arredi',
                             en: 'A piece from the {x} collection, made and installed by Corso Arredi' },
    'img.mancante':        { it: 'Immagine non disponibile',   en: 'Image unavailable' },

    /* ---------- il configuratore ---------- */
    'cfg.riepilogoAria':   { it: 'Il riassunto della tua richiesta: puoi modificarlo',
                             en: 'A summary of your enquiry: you can edit it' },
    'cfg.ricomincia':      { it: 'Ricomincia dal riassunto automatico',
                             en: 'Start again from the automatic summary' },
    'cfg.scegliQuando':    { it: 'Scegli quando',              en: 'Choose a time' },
    'cfg.dalleFoto':       { it: 'Compilato dalle fotografie che hai segnato. Cambialo pure.',
                             en: 'Written from the photos you picked. Feel free to change it.' },
    'cfg.scegliGiorno':    { it: 'Scegli il giorno',           en: 'Choose a day' },
    'cfg.scegliOra':       { it: 'Scegli l’ora',               en: 'Choose a time' },
    'cfg.vincolo':         { it: 'Un vincolo, un’idea, una planimetria che hai già.',
                             en: 'A constraint, an idea, a floor plan you already have.' },
    'cfg.invia':           { it: 'Invia la richiesta',         en: 'Send the enquiry' },
    'cfg.prenota':         { it: 'Prenota un appuntamento',    en: 'Book an appointment' },
    'cfg.scegliVoce':      { it: 'Scegli una voce, oppure usa Salta',
                             en: 'Pick an option, or use Skip' },
    'cfg.scegliPrima':     { it: 'Scegli prima un giorno e un orario',
                             en: 'Choose a day and a time first' },
    'cfg.leFoto':          { it: 'Le fotografie che ti piacciono',
                             en: 'The photos you liked' },
    'cfg.err.recapito':    { it: 'Lasciaci almeno un recapito: email o telefono.',
                             en: 'Leave us at least one way to reach you: email or phone.' },
    'cfg.err.email':       { it: 'Controlla l’indirizzo: manca la @ o il dominio.',
                             en: 'Check the address: the @ or the domain is missing.' },
    'cfg.err.telefono':    { it: 'Il numero sembra incompleto.',
                             en: 'That number looks incomplete.' },
    'cfg.err.consenso':    { it: 'Serve il consenso per poter usare i tuoi dati.',
                             en: 'We need your consent before we can use your details.' },

    'cfg.e':               { it: ' e ',                        en: ' and ' },
    'cfg.campo.email':     { it: 'Email',                      en: 'Email' },
    'cfg.campo.emailHint': { it: 'dove ti rispondiamo',        en: 'where we reply' },
    'cfg.campo.tel':       { it: 'Telefono',                   en: 'Phone' },
    'cfg.campo.telHint':   { it: 'se preferisci una chiamata', en: 'if you would rather we called' },
    'cfg.campo.nome':      { it: 'Nome o azienda',             en: 'Name or company' },
    'cfg.campo.nomeHint':  { it: 'come ti chiami',             en: 'what to call you' },
    'cfg.campo.luogo':     { it: 'Città o zona',               en: 'Town or area' },
    'cfg.campo.luogoHint': { it: 'dove si trova il progetto',  en: 'where the project is' },
    'cfg.campo.note':      { it: 'Note',                       en: 'Notes' },
    'cfg.campo.progetto':  { it: 'Il progetto',                en: 'The project' },
    'cfg.campo.segnate':   { it: 'Fotografie segnate',         en: 'Photos picked' },
    'cfg.campo.app':       { it: 'Appuntamento',               en: 'Appointment' },
    'cal.liberi':          { it: 'Gli orari già occupati non compaiono: quello che vedi è libero.',
                             en: 'Slots already taken are not shown: what you see is free.' },
    'cal.nonCollegata':    { it: 'Ti confermiamo l’orario per email o telefono: l’agenda dello Studio non è ancora collegata a questa pagina.',
                             en: 'We will confirm the time by email or phone: the studio diary is not connected to this page yet.' },
    'cfg.indietro':        { it: 'Indietro',                   en: 'Back' },
    'cfg.avanti':          { it: 'Avanti',                     en: 'Next' },
    'cfg.salta':           { it: 'Salta',                      en: 'Skip' },
    'cfg.conferma':        { it: 'Conferma l’appuntamento',    en: 'Confirm the appointment' },
    'cfg.passo':           { it: 'Passo {i} di {n}',           en: 'Step {i} of {n}' },
    'cfg.oreLibere':       { it: '{d}, {n} orari liberi',      en: '{d}, {n} slots free' },
    'cfg.oggettoApp':      { it: 'Richiesta di appuntamento dal sito',
                             en: 'Appointment request from the website' },
    'cfg.oggetto':         { it: 'Richiesta dal sito',         en: 'Enquiry from the website' },
    'cfg.pref.vuoto':      { it: 'Nessuna ancora. Sfoglia le <a href="collezioni.html">collezioni</a> e segna col cuore quello che ti piace: lo troverai qui.',
                             en: 'None yet. Browse the <a href="collezioni.html">collections</a> and tap the heart on anything you like: it will be waiting here.' },
    'cfg.pref.altre':      { it: 'Aggiungine altre dalle collezioni →',
                             en: 'Add more from the collections →' },
    'cfg.pref.titolo':     { it: 'Le fotografie che ti piacciono',
                             en: 'The photos you liked' },
    'cfg.pref.una':        { it: 'Una fotografia che ti piace',
                             en: 'One photo you liked' },
    'cfg.pref.molte':      { it: '{n} fotografie che ti piacciono',
                             en: '{n} photos you liked' },
    'cfg.pref.togli':      { it: 'Togli “{x}” dalle fotografie che ti piacciono',
                             en: 'Remove “{x}” from the photos you liked' },

    /* ---------- l'agenda ---------- */
    'giorni':              { it: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
                             en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    'mesi':                { it: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
                                  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
                             en: ['January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 'December'] },

    /* ---------- titoli di sezione che vivono nel codice ---------- */
    'coll.vaiA':           { it: 'Vai alla collezione',        en: 'Go to a collection' },
    'coll.entra':          { it: 'Entra in una collezione',    en: 'Step into a collection' },
    'coll.comeFatta':      { it: 'Come è fatta',               en: 'How it is made' },
    'prog.rilievo':        { it: 'Tutto comincia da un rilievo fatto bene',
                             en: 'It all starts with a survey done properly' },
    'prog.leFasi':         { it: 'Le sei fasi',                en: 'The six stages' },
    'prog.esito':          { it: 'Ogni fase ha un esito verificabile',
                             en: 'Every stage ends in something you can check' },
    'azienda.storia':      { it: 'La storia',                  en: 'The story' },
    'azienda.dal1969':     { it: 'Dal 1969 a oggi',            en: 'From 1969 to today' },
    'azienda.impegni':     { it: 'Quattro impegni, non slogan',
                             en: 'Four commitments, not slogans' },
    'studio.vetrinaHome':  { it: 'Lo Studio di Corso Arredi',  en: 'The Corso Arredi studio' },
    'studio.vetrina':      { it: 'Lo Studio, dentro e fuori',  en: 'The studio, inside and out' },
    'prog.partenza':       { it: 'Il punto di partenza',       en: 'The starting point' },
    'prog.rilievoTesto':   { it: 'Un progetto sbagliato in fase di misura si paga in cantiere, e lo paghi tu. Per questo il sopralluogo lo facciamo noi, con lo strumento in mano, e non ci fidiamo delle planimetrie catastali.',
                             en: 'A project that goes wrong at the measuring stage gets paid for on site — and you are the one paying. So we do the survey ourselves, instrument in hand, and we do not trust land registry plans.' },

    /* ---------- etichette brevi di pagina ---------- */
    'crumb.collezioni':    { it: 'Collezioni',                 en: 'Collections' },
    'info.telefono':       { it: 'Telefono',                   en: 'Phone' },
    'info.email':          { it: 'Email',                      en: 'Email' },
    'info.dove':           { it: 'Dove siamo',                 en: 'Where we are' },
    'info.orari':          { it: 'Orari',                      en: 'Opening hours' },
    'prog.cosaRicevi':     { it: 'Cosa ricevi',                en: 'What you get' },
    'azienda.comportiamo': { it: 'Come ci comportiamo',        en: 'How we work' },
    'studio.appuntamento': { it: 'Su appuntamento',            en: 'By appointment' },
    'studio.fissa':        { it: 'Fissa un appuntamento',      en: 'Book an appointment' },

    /* ---------- eventi ---------- */
    'eventi.esempio':      { it: 'esempio',                    en: 'sample' }
  };

  function lingua() {
    return (window.CALingua && window.CALingua.attiva()) || 'it';
  }

  function t(chiave, dati) {
    var v = VOCI[chiave];
    if (!v) return chiave;
    var s = v[lingua()];
    if (s === undefined || s === null) s = v.it;
    if (typeof s !== 'string') return s;
    if (!dati) return s;
    return s.replace(/\{(\w+)\}/g, function (tutto, k) {
      return dati[k] !== undefined ? String(dati[k]) : tutto;
    });
  }

  /* La data scritta per esteso, nella lingua attiva. In italiano si dice
     "Venerdì 18 settembre", in inglese "Friday 18 September": stesso
     ordine, maiuscole diverse — il mese inglese vuole la maiuscola. */
  function giorno(d)  { return t('giorni')[d.getDay()]; }
  function giornoBreve(d) { return t('giorni')[d.getDay()].slice(0, 3); }
  function mese(d)    { return t('mesi')[d.getMonth()]; }
  function dataEstesa(d) { return giorno(d) + ' ' + d.getDate() + ' ' + mese(d); }

  return {
    t: t,
    giorno: giorno,
    giornoBreve: giornoBreve,
    mese: mese,
    dataEstesa: dataEstesa,
    VOCI: VOCI
  };
})();
