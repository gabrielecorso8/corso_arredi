/* ==========================================================================
   CORSO ARREDI — CONTENUTI DELLE PAGINE INTERNE
   Un blocco per pagina. Modifica solo i testi tra virgolette.
   La home sta in site.js: questo file riguarda tutto il resto.
   ========================================================================== */

window.PAGES_IT = {

  /* ======================================================================
     COLLEZIONI
     ====================================================================== */
  collezioni: {
    crumb: "Collezioni",
    title: "Sei ambiti di lavoro",
    lede: "Ogni categoria raccoglie progetti realizzati e consegnati. Nessuna immagine da catalogo: quello che vedi è uscito dal nostro laboratorio.",
    headImage: "assets/img/head-collezioni.jpg",
    headImageAlt: "Parete attrezzata in rovere a doghe verticali con nicchie e libreria integrata, luce radente su muro chiaro",
    tone: "light",
    categories: [
      {
        id: "cucine",
        href: "collezione-cucine.html",
        name: "Cucine",
        text: "Progettiamo la cucina intorno a come cucini davvero: altezze del piano sulla tua statura, profondità dei cassetti sulle pentole che possiedi, presa d'aria della cappa calcolata sul volume della stanza. Gli elettrodomestici arrivano integrati e collegati, non appoggiati.",
        image: "assets/img/coll-cucine.jpg",
        imageAlt: "Cucina su misura con isola in pietra a spessore generoso e ante a doghe verticali in rovere",
        cartella: "assets/img/collezioni/cucine",
        /* Le fotografie le trova da solo il sito, contando i file
           nella cartella qui sopra. Qui ci sono solo le parole: la
           chiave è il numero del file. Una fotografia senza voce
           compare lo stesso, con una descrizione generica. */
        descrizioni: {
          "01": { titolo: "Cucina a telaio, angolo pieno",
                 testo: "Ante a telaio laccate e vetrine con reticella: la casa era classica e la cucina non doveva litigarci. L'angolo è sfruttato per intero, con base sagomata dove il muro rientra.",
                 alt: "Cucina angolare a telaio laccata bianca con vetrine, pensili fino al soffitto e maniglie in metallo brunito" },
          "02": { titolo: "Colonne a filo, forno incassato",
                 testo: "Doghe verticali continue su due pareti: il disegno gira l'angolo senza interrompersi. Il forno è incassato a filo, senza cornice a vista, e le ante non hanno maniglia.",
                 alt: "Colonne a tutta altezza in rovere a doghe verticali con forno incassato a filo, in un angolo di stanza" },
          "03": { titolo: "Isola nera, colonne in rovere",
                 testo: "Il piano dell'isola in nero opaco fa da contrappunto alle colonne in rovere. Il lavello va sotto la finestra a nastro, perché lì c'è la luce; la cottura resta sull'isola, verso chi sta seduto.",
                 alt: "Cucina con isola dal piano nero, sgabelli scuri, colonne in rovere a tutta altezza e finestra a nastro sul lavello" },
          "04": { titolo: "Compatta, con mensole a vista",
                 testo: "Poco spazio, quindi niente pensili su tutta la parete: due mensole in rovere tengono quello che si usa ogni giorno e la stanza resta respirabile.",
                 alt: "Cucina lineare bianca compatta con mensole in rovere a parete, piano cottura a gas e piccoli elettrodomestici in vista" },
          "05": { titolo: "Quarzite e induzione a filo",
                 testo: "Piano in quarzite naturale: nessuna lastra è uguale a un'altra, e la venatura si sceglie dal blocco prima del taglio. L'induzione è integrata a filo, così il piano si pulisce con un gesto.",
                 alt: "Piano di lavoro in quarzite naturale venata con piano a induzione nero integrato a filo e ante bianche a gola" },
          "06": { titolo: "Il cassetto, dentro",
                 testo: "I divisori sono fatti sulle posate che hai, non su una misura standard. È la parte che nessuno fotografa e che usi dieci volte al giorno.",
                 alt: "Cassetto attrezzato aperto con divisori in legno su misura, posate e utensili da cucina ordinati" },
          "07": { titolo: "Marmo a spessore sulla penisola",
                 testo: "Spessore pieno sul bordo, non un pannello incollato: il marmo si vede per quello che è. Lo sbalzo è calcolato per stare seduti senza le ginocchia contro il fianco.",
                 alt: "Dettaglio di una penisola con piano in marmo bianco venato a forte spessore e sgabelli in pelle nera" },
          "08": { titolo: "Isola in ebano macassar",
                 testo: "La parete sparisce nel bianco, l'isola diventa il pezzo di legno prezioso al centro della stanza. Le vetrine scure chiudono la composizione in alto senza appesantirla.",
                 alt: "Cucina lineare bianca con isola rivestita in ebano macassar, pensili a vetro scuro e pavimento in rovere" },
          "09": { titolo: "Aperta sul soggiorno",
                 testo: "La penisola è il confine fra cucinare e stare insieme: da un lato si lavora, dall'altro ci si siede. La cappa è a soffitto per non tagliare la vista.",
                 alt: "Cucina bianca aperta sul soggiorno con penisola attrezzata, sgabelli e cappa a soffitto integrata" },
          "10": { titolo: "Il passavivande come finestra",
                 testo: "Un'apertura orizzontale nel muro portante, bordata e illuminata: la cucina resta una stanza a sé ma smette di essere un ripostiglio.",
                 alt: "Apertura passavivande a nastro fra cucina e sala da pranzo, con bordo illuminato e cucina visibile in fondo" },
          "11": { titolo: "Luce sotto i pensili",
                 testo: "Il LED corre per tutta la lunghezza dentro una gola ricavata nel fondo del pensile: illumina il piano e non ti abbaglia mai quando sei in piedi davanti.",
                 alt: "Cucina lineare bianca con LED continuo sotto i pensili, penisola e mazzo di fiori sul piano" },
          "12": { titolo: "Bianco sul rosso, sotto le travi",
                 testo: "Il colore era già lì, e le travi pure. Il mobile si è fatto neutro apposta: in una stanza che parla forte, la cucina fa da fondo.",
                 alt: "Cucina bianca ad angolo su parete rossa, con soffitto a travi in legno e tavolo con sedie" },
          "13": { titolo: "Isola scura, nicchie a muro",
                 testo: "Frontali scuri e nicchie ricavate nello spessore del muro, non applicate sopra. Il blocco cottura sta sull'isola, tutto il resto sparisce nella parete.",
                 alt: "Isola di cucina con frontali scuri, cappa a soffitto e nicchie ricavate nella parete bianca" },
          "14": { titolo: "Lavello sottopiano nella pietra",
                 testo: "Lavello sottopiano: il bordo della pietra scende dentro la vasca senza scalino. Sembra un dettaglio, ma è la differenza fra passare la spugna e raccogliere le briciole a mano.",
                 alt: "Dettaglio di un piano in pietra naturale venata con lavello nero integrato sottopiano e miscelatore" },
          "15": { titolo: "Dietro la vetrata, il soggiorno",
                 testo: "Una vetrata scorrevole separa la cucina dal soggiorno: si chiude quando si frigge, si apre quando si è in tanti. Le due stanze restano una sola quando serve.",
                 alt: "Vista dalla cucina verso il soggiorno attraverso una vetrata scorrevole, con divano e mobili classici" },
          "16": { titolo: "Gola in rovere, piano nero",
                 testo: "Nessuna maniglia: la gola è fresata nel frontale e corre per tutta la fila. Si apre con le dita, anche con le mani bagnate.",
                 alt: "Dettaglio ravvicinato di ante in rovere con gola orizzontale continua e piano nero sopra" }
        },
        specs: [
          ["Piani",         "Pietra naturale, Dekton, Silestone, laminato stratificato, rovere massello"],
          ["Ante",          "Rovere, noce, frassino, laccato opaco, vetro reeded"],
          ["Ferramenta",    "Blum con garanzia a vita su cerniere e guide"],
          ["Elettrodomestici", "Gaggenau, Neff e altri partner, integrati a filo"],
          ["Tempi",         "8–12 settimane dalla firma del progetto"]
        ]
      },
      {
        id: "living",
        href: "collezione-living.html",
        name: "Living",
        text: "Boiserie, librerie, pareti attrezzate e contenimento a scomparsa. Lavoriamo sul pieno e sul vuoto: quanto contenere, quanto lasciare respirare. L'illuminazione lineare è integrata nei montanti in fase di costruzione, non aggiunta dopo.",
        image: "assets/img/coll-living.jpg",
        imageAlt: "Libreria su misura a tutta altezza in rovere con illuminazione lineare integrata nei montanti",
        cartella: "assets/img/collezioni/living",
        /* Le fotografie le trova da solo il sito, contando i file
           nella cartella qui sopra. Qui ci sono solo le parole: la
           chiave è il numero del file. Una fotografia senza voce
           compare lo stesso, con una descrizione generica. */
        descrizioni: {
          "01": { titolo: "Parete TV e scala a giorno",
                 testo: "Il pannello in rovere raccoglie schermo, mensole e cavi in un solo gesto. Sotto, il mobile è sospeso: si vede il pavimento continuare e la stanza sembra più larga.",
                 alt: "Soggiorno con pannello TV in rovere, mobile bianco sospeso, scala a giorno con gradini in legno e soffitto a travi" },
          "02": { titolo: "Parete in legno antico e nicchie",
                 testo: "Tavole di recupero, spazzolate e oliate, con le nicchie ricavate dentro lo spessore. Il tavolo di famiglia è rimasto: la parete è stata pensata attorno a lui.",
                 alt: "Sala da pranzo con parete rivestita in legno antico, nicchie contenitore e tavolo con sedie classiche" },
          "03": { titolo: "Ingresso, scuro e rovere",
                 testo: "Ingresso stretto: la boiserie scura da un lato, il rovere dall'altro, e in mezzo uno specchio a tutta altezza che raddoppia il passaggio.",
                 alt: "Ingresso con boiserie scura e pannellatura in rovere, consolle sospesa con lavabo e specchio a tutta altezza" },
          "04": { titolo: "Libreria con luce nei montanti",
                 testo: "Il LED è dentro i montanti, montato in fase di costruzione: nessun profilo aggiunto dopo, nessun cavo a vista. La luce lava i libri dall'alto verso il basso.",
                 alt: "Soggiorno con libreria su misura a tutta parete, LED lineare integrato nei montanti, TV incassata e tappeto" },
          "05": { titolo: "La scala sul muro rosso",
                 testo: "Gradini in massello e ringhiera in ferro a bacchette: due materiali, nessuna decorazione. Il colore della parete fa tutto il resto.",
                 alt: "Scala con gradini in legno chiaro e ringhiera in ferro a bacchette orizzontali su parete rossa" },
          "06": { titolo: "Gradini a sbalzo, montanti neri",
                 testo: "Ogni gradino è un massello a sbalzo sul montante in ferro. Sotto il primo corre una riga di luce: di notte la scala si vede senza accendere niente.",
                 alt: "Scala con gradini in legno a sbalzo su montanti neri, con LED sotto il primo gradino e pavimento scuro" },
          "07": { titolo: "Il gradino, da vicino",
                 testo: "Il taglio è pulito su tutti e quattro i lati e il LED è annegato nel bordo inferiore. Un pezzo così si vede solo quando ci passi accanto, ed è lì che deve reggere lo sguardo.",
                 alt: "Dettaglio ravvicinato di un gradino in noce a sbalzo con illuminazione LED radente sotto il piano" },
          "08": { titolo: "Biblioteca a tutta parete",
                 testo: "Moduli su misura fino al soffitto con fondi verdi per staccare i dorsi dei libri. Il divano è stato scelto dopo, sul colore del fondo.",
                 alt: "Grande libreria classica a tutta parete con fondi verdi, ripiani carichi di libri e divano azzurro" },
          "09": { titolo: "Mensole illuminate in corridoio",
                 testo: "Un corridoio è spazio perso finché non gli dai una funzione. Le mensole a spessore con LED integrato lo trasformano in una vetrina di casa.",
                 alt: "Corridoio con mensole in rovere a spessore illuminate da LED integrato e porta a filo muro" }
        },
        specs: [
          ["Strutture",  "Rovere, noce, frassino, impiallacciature su misura"],
          ["Luce",       "LED lineare integrato, temperatura 2700–3000K"],
          ["Impianti",   "Cablaggio e prese predisposti dentro la struttura"],
          ["Finiture",   "Olio naturale, vernice all'acqua, laccato opaco"],
          ["Tempi",      "6–10 settimane dalla firma del progetto"]
        ]
      },
      {
        id: "notte",
        href: "collezione-notte.html",
        name: "Zona notte",
        text: "Testate a tutta parete, comodini sospesi integrati nella struttura, cabine armadio che seguono la geometria reale della stanza. Dove il muro è fuori squadro, il mobile lo asseconda: nessun fianco tagliato a forza.",
        image: "assets/img/coll-notte.jpg",
        imageAlt: "Camera da letto con testata imbottita a tutta parete, comodini sospesi in rovere e luce lineare",
        cartella: "assets/img/collezioni/notte",
        /* Le fotografie le trova da solo il sito, contando i file
           nella cartella qui sopra. Qui ci sono solo le parole: la
           chiave è il numero del file. Una fotografia senza voce
           compare lo stesso, con una descrizione generica. */
        descrizioni: {
          "01": { titolo: "Cabina armadio, aperta",
                 testo: "Nessuna anta: se lo spazio c'è, la cabina aperta è più veloce da usare e costa meno. Le altezze delle appenderie sono decise sui capi che possiedi.",
                 alt: "Cabina armadio con ripiani e cassettiere color tortora, appenderia e illuminazione lineare a soffitto" },
          "02": { titolo: "Armadiatura d'angolo a specchio",
                 testo: "L'angolo era fuori squadro di tre centimetri. Il mobile lo asseconda: nessun fianco tagliato a forza, nessuna fuga aperta contro il muro.",
                 alt: "Armadiatura d'angolo con anta a specchio, controsoffitto in rovere illuminato e pavimento in rovere" },
          "03": { titolo: "Testata in noce a tutta parete",
                 testo: "Doghe di noce a tutta parete con due tagli di luce alla giusta altezza per leggere. La testata continua oltre il letto: la parete diventa il letto.",
                 alt: "Camera da letto con testata a doghe di noce a tutta parete, due tagli di luce lineare e comodino bianco" },
          "04": { titolo: "Ante a filo muro",
                 testo: "L'armadio finisce esattamente dove finisce il muro, senza cornici di raccordo. È la parte che richiede il rilievo fatto bene, non il preventivo più basso.",
                 alt: "Armadio a quattro ante battenti in rovere a filo muro con maniglie verticali in metallo" }
        },
        specs: [
          ["Testate",     "Lino, bouclé, pelle, tessuti del cliente"],
          ["Armadiature", "Ante battenti, scorrevoli, a filo muro, walk-in"],
          ["Interni",     "Cassettiere, portacravatte, illuminazione a sensore"],
          ["Luce",        "LED dietro testata con dimmer e scenario notte"],
          ["Tempi",       "6–10 settimane dalla firma del progetto"]
        ]
      },
      {
        id: "bagni",
        href: "collezione-bagni.html",
        name: "Bagni",
        text: "Mobili sospesi su misura, lavabi integrati, specchi retroilluminati e nicchie ricavate nel muro. Lavoriamo con essenze trattate per l'umidità e ferramenta in acciaio inox: il legno in bagno regge solo se lo si prepara.",
        image: "assets/img/coll-bagni.jpg",
        imageAlt: "Bagno con mobile sospeso a doghe verticali in rovere, lavabo integrato in pietra, specchio retroilluminato e nicchia con asciugamani",
        cartella: "assets/img/collezioni/bagni",
        /* Le fotografie le trova da solo il sito, contando i file
           nella cartella qui sopra. Qui ci sono solo le parole: la
           chiave è il numero del file. Una fotografia senza voce
           compare lo stesso, con una descrizione generica. */
        descrizioni: {
          "01": { titolo: "Bagno classico, mobile sagomato",
                 testo: "Il piano in marmo segue la sagoma curva del mobile, tagliato su dima presa in loco. In un bagno stretto la curva serve a passare, non a decorare.",
                 alt: "Bagno classico con mobile sagomato color tortora, piano in marmo, lavabo integrato e specchio con cornice dorata" },
          "02": { titolo: "Cassettoni in noce su gambe",
                 testo: "Mobile su gambe, staccato da terra: si lava sotto e il pavimento si vede tutto. Il noce è trattato per l'umidità prima del montaggio, non dopo.",
                 alt: "Mobile da bagno in noce a tre cassettoni su gambe metalliche, lavabo a bacinella, scaldasalviette e specchio" },
          "03": { titolo: "Mensola in massello, lavabo appoggiato",
                 testo: "Una tavola sola, a spessore pieno, con il portasciugamani ricavato dentro il massello. Nessuna struttura sotto: regge la mensola stessa.",
                 alt: "Mensola in noce massello a forte spessore con lavabo a bacinella bianco, portasciugamani ricavato nel legno" },
          "04": { titolo: "Sottotetto con doccia in cristallo",
                 testo: "In mansarda ogni centimetro sotto la falda va contrattato. La doccia sta dove il tetto è alto, il mobile dove è basso, e lo specchio contenitore recupera la profondità del muro.",
                 alt: "Bagno in sottotetto con box doccia in cristallo, mobile sospeso scuro a due cassetti e specchio contenitore" },
          "05": { titolo: "Zebrano su base bianca",
                 testo: "Il top in zebrano è l'unico pezzo caldo del bagno, e basta. Sotto, la base laccata bianca sparisce; il lavabo è semincassato, a filo del legno.",
                 alt: "Dettaglio di un top in legno zebrato su base sospesa bianca con lavabo semincasso" },
          "06": { titolo: "Sospeso, con lampade a sospensione",
                 testo: "Mobile bianco sospeso e specchio dorato ereditato dalla nonna: la cornice antica era il punto di partenza, tutto il resto è stato tenuto muto apposta.",
                 alt: "Bagno con mobile bianco sospeso a due cassetti, lavabo da appoggio, specchio con cornice dorata e lampade a sospensione" }
        },
        specs: [
          ["Mobili",       "Rovere termotrattato, laccato poliuretanico, HPL"],
          ["Lavabi",       "Pietra, Dekton, ceramica Cielo integrata"],
          ["Rubinetteria", "Bronzo spazzolato, acciaio, nero opaco"],
          ["Specchi",      "Retroilluminati, antiappannamento, contenitori"],
          ["Tempi",        "5–8 settimane dalla firma del progetto"]
        ]
      },
      {
        id: "hospitality",
        href: "collezione-hospitality.html",
        name: "Hospitality",
        text: "Hotel, ristoranti, uffici e retail. Reception, banconi curvati, boiserie di corridoio, arredo camere in serie ripetibile. Produciamo su capitolato e rispettiamo le classi di reazione al fuoco richieste dalla destinazione d'uso.",
        image: "assets/img/coll-hospitality.jpg",
        imageAlt: "Reception di hotel con bancone curvo a doghe verticali in rovere, piano in pietra, nicchie illuminate e ulivo accanto alla vetrata",
        cartella: "assets/img/collezioni/hospitality",
        /* Le fotografie le trova da solo il sito, contando i file
           nella cartella qui sopra. Qui ci sono solo le parole: la
           chiave è il numero del file. Una fotografia senza voce
           compare lo stesso, con una descrizione generica. */
        descrizioni: {
          "01": { titolo: "Tavola con vista sull'Arena",
                 testo: "L'appartamento guarda l'Arena: l'arredo si è fatto da parte. Tavolo rotondo, sedie basse, niente sopra il davanzale che tagli la vista.",
                 alt: "Sala da pranzo di un appartamento con tavolo rotondo apparecchiato e finestre affacciate sull'Arena di Verona" },
          "02": { titolo: "Camera con vasca a vista",
                 testo: "Vasca dentro la camera, sotto la falda. Il letto capitonné e la vasca condividono la stessa luce: è una scelta di posizionamento della struttura, non un vezzo.",
                 alt: "Camera mansardata con vasca idromassaggio accanto al letto capitonné, sotto travi bianche" },
          "03": { titolo: "Camera, poltrona e consolle",
                 testo: "Consolle bassa in rovere per tutta la larghezza: fa da scrittoio, da portabagagli e da base per il televisore. Una serie ripetibile su tutte le camere del piano.",
                 alt: "Camera d'albergo con poltrona chiara, consolle bassa in rovere, lampada da terra e TV a parete" },
          "04": { titolo: "Monolocale, tutto in sei metri",
                 testo: "Angolo cottura, armadio e zona notte in un unico volume bianco. Nel breve periodo conta che tutto si pulisca in fretta e non si rompa: il progetto parte da lì.",
                 alt: "Monolocale per affitto breve con angolo cottura bianco, armadio a filo, mensole e letto in primo piano" },
          "05": { titolo: "Colazione sulla penisola",
                 testo: "Cucina da appartamento turistico: pochi pezzi, tutti resistenti, e una penisola che fa da tavolo. Il vassoio della colazione ha uno spazio suo.",
                 alt: "Cucina compatta bianca con penisola, sgabelli e colazione servita su vassoi" },
          "06": { titolo: "Il tavolino che scompare",
                 testo: "Un tavolino su ruote che scorre sotto il letto: serve la colazione, poi sparisce. In una camera piccola il mobile migliore è quello che si toglie di mezzo.",
                 alt: "Dettaglio di un letto con tavolino servente scorrevole, cuscini e caraffa d'acqua sul piano" },
          "07": { titolo: "Loft su due livelli",
                 testo: "Doppia altezza, scala che collega i due livelli, colore diverso per ogni parete. L'arredo è fisso e ancorato: in un affitto breve niente deve potersi spostare.",
                 alt: "Loft con zona pranzo, scala di collegamento, soppalco e pareti colorate su doppia altezza" },
          "08": { titolo: "Soggiorno rosso, luce di taglio",
                 testo: "Un solo pezzo forte, il divano, e tutto il resto neutro. Le tende filtrano la luce del pomeriggio senza spegnerla.",
                 alt: "Soggiorno di appartamento con divano rosso, tende chiare, tavolo da pranzo e quadri alle pareti" },
          "09": { titolo: "Cucina con schienale in legno",
                 testo: "Lo schienale in legno scalda una cucina altrimenti tutta chiara. La cappa è a incasso nel pensile: si tira fuori quando serve.",
                 alt: "Cucina di appartamento con schienale in legno, cappa a incasso, pensili chiari e isola" },
          "10": { titolo: "Scala rivestita, vetro e luce",
                 testo: "Rivestimento in legno su struttura esistente, parapetto in vetro per non chiudere la vista, luce nel bordo dei primi gradini. Si sale anche al buio.",
                 alt: "Scala rivestita in legno con parapetto in vetro e LED integrato nel bordo dei gradini" }
        },
        specs: [
          ["Settori",      "Hotel, ristorazione, uffici, retail"],
          ["Certificazioni", "Classi di reazione al fuoco su richiesta"],
          ["Serie",        "Da 1 a 120 unità ripetibili"],
          ["Cantiere",     "Posa a fasi con struttura in esercizio"],
          ["Tempi",        "Su capitolato, definiti in fase di offerta"]
        ]
      },
      {
        id: "falegnameria",
        href: "collezione-falegnameria.html",
        name: "Falegnameria",
        text: "Lavorazioni speciali, pezzi unici, restauro e riparazione. Scale, curvature, incastri a vista, ripristino di mobili di famiglia. È il reparto che ci permette di dire sì quando gli altri dicono che non si può fare.",
        image: "assets/img/coll-falegnameria.jpg",
        imageAlt: "Dettaglio di un incastro a coda di rondine in rovere massello con scalpello e truciolo sul banco",
        cartella: "assets/img/collezioni/falegnameria",
        /* Le fotografie le trova da solo il sito, contando i file
           nella cartella qui sopra. Qui ci sono solo le parole: la
           chiave è il numero del file. Una fotografia senza voce
           compare lo stesso, con una descrizione generica. */
        descrizioni: {
          "01": { titolo: "Piano in massello sagomato",
                 testo: "Il bordo segue la sagoma naturale della tavola. Sagomare a mano costa più che tagliare dritto: si fa quando la tavola merita di restare com'è.",
                 alt: "Piano in legno massello grezzo con bordo sagomato a mano, montato su parete rivestita in legno antico" },
          "02": { titolo: "Tavolo in noce a doghe",
                 testo: "Doghe di noce accostate una a una, scelte per venatura. La base in acciaio è arretrata perché le gambe stiano dove servono, non dove capita.",
                 alt: "Tavolo in noce composto da doghe accostate su base in acciaio, con panca a muro rivestita" },
          "03": { titolo: "Sotto il piano di pietra",
                 testo: "Il mobile entra sotto la pietra senza toccarla: fra i due c'è un giunto elastico. La pietra lavora, il legno lavora, e non si spaccano a vicenda.",
                 alt: "Dettaglio dell'incasso di un mobile in rovere sotto un piano in pietra, con cassettiera e piedino a vista" },
          "04": { titolo: "Comodino sospeso in legno antico",
                 testo: "Un cassetto sospeso col frontale in legno antico recuperato. Il fissaggio è passante nel muro: regge il peso senza staffe a vista.",
                 alt: "Comodino sospeso con cassetto frontale in legno antico accanto a una testata imbottita multicolore" },
          "05": { titolo: "Boiserie antica, mensola nuova",
                 testo: "Le tavole antiche vanno a parete, il pezzo nuovo è bianco e sospeso. Contrasto voluto: se il nuovo imita il vecchio, perdono tutti e due.",
                 alt: "Boiserie in legno antico a tavole orizzontali con mensola-comodino bianca sospesa e testata colorata" },
          "06": { titolo: "Gola illuminata nel rovere",
                 testo: "La gola serve ad aprire e nasconde la riga di luce. Due funzioni nello stesso taglio, fresato prima della finitura.",
                 alt: "Dettaglio di una cassettiera in rovere con gola orizzontale illuminata da LED integrato" },
          "07": { titolo: "Cabina armadio, legno su tutti i lati",
                 testo: "Pareti, fondo e ripiani nella stessa essenza: dentro la cabina non si vede un centimetro di muro. Le barre sono in ferro verniciato, calcolate sul peso reale dei cappotti.",
                 alt: "Cabina armadio interamente rivestita in legno con barre appendiabiti in metallo nero e ripiani" },
          "08": { titolo: "Frontali con gole orizzontali",
                 testo: "Le gole sono allineate su tutta la fila: se un cassetto è fuori di un millimetro, si vede. È il tipo di verifica che facciamo in premontaggio, in laboratorio.",
                 alt: "Dettaglio di frontali di cassetti in rovere con gole orizzontali continue fresate nel legno" },
          "09": { titolo: "L'angolo alto della cabina",
                 testo: "Anche il soffitto della cabina è rivestito. È lo spazio che nessuno guarda, ed è quello che dice se il lavoro è stato fatto o solo finito.",
                 alt: "Angolo superiore di una cabina armadio rivestita in legno con barra appendiabiti e soffitto in essenza" },
          "10": { titolo: "Cassettiera e ripiani nella cabina",
                 testo: "Ripiani di profondità diversa: le maglie stanno strette, le scatole vogliono spazio. Le altezze si decidono con te davanti all'armadio vecchio.",
                 alt: "Cabina armadio con cassettiera in rovere, ripiani a diverse profondità e luce naturale dall'alto" },
          "11": { titolo: "Legno chiaro, seduta compresa",
                 testo: "Una seduta bassa dentro la cabina: serve per allacciarsi le scarpe, e nessuno la chiede mai finché non la prova.",
                 alt: "Cabina armadio in legno chiaro con ripiani, appenderia e seduta bassa integrata nella struttura" },
          "12": { titolo: "Un pezzo solo, sul muro",
                 testo: "Ricavata da un pezzo di legno antico, arrotondata e oliata a mano. Sono le lavorazioni che chiudono un progetto e che nessun catalogo può fornire.",
                 alt: "Dettaglio di una placca in legno antico sagomata e arrotondata, montata a parete accanto a un tessuto" }
        },
        specs: [
          ["Lavorazioni", "Curvature, incastri a vista, intarsi, tornitura"],
          ["Restauro",    "Consolidamento, sostituzione, rifinitura a mano"],
          ["Essenze",     "Rovere, noce, frassino, ciliegio, castagno"],
          ["Su disegno",  "Anche da disegno di terzi o da campione fisico"],
          ["Tempi",       "Su preventivo, in base alla lavorazione"]
        ]
      }
    ]
  },

  /* ======================================================================
     PROGETTAZIONE
     ====================================================================== */
  progettazione: {
    crumb: "Progettazione",
    title: "Come lavoriamo",
    lede: "Sei fasi, ognuna con un esito verificabile. Sai sempre a che punto siamo, chi sta lavorando e cosa succede dopo.",
    headImage: "assets/img/head-progettazione.jpg",
    headImageAlt: "Tavolo di progettazione con planimetria a matita, campionature di legno e pietra, tessuti e penna tecnica",
    tone: "light",
    image: "assets/img/progettazione.jpg",
    imageAlt: "Tavolo da lavoro con disegni tecnici in pianta, campionature di legno e pietra, squadra e metro a nastro",
    steps: [
      {
        name: "Analisi delle esigenze",
        text: "Veniamo da te. Misuriamo, fotografiamo, verifichiamo impianti e fuori squadro. Ti chiediamo come vivi lo spazio: dove appoggi le chiavi, quante persone cucinano insieme, se lavori da casa.",
        out: "Rilievo metrico quotato e report fotografico"
      },
      {
        name: "Progetto e rendering",
        text: "Disegno tecnico, viste tridimensionali, capitolato materiali e preventivo voce per voce. Rivediamo insieme finché il progetto non torna. Le revisioni sono incluse: non le contiamo.",
        out: "Progetto esecutivo, render e preventivo dettagliato"
      },
      {
        name: "Produzione in falegnameria",
        text: "Il progetto entra in falegnameria. Ordiniamo materiali ed elettrodomestici, tagliamo, assembliamo, finiamo. Ti aggiorniamo con foto dell'avanzamento reale, non con date generiche.",
        out: "Aggiornamenti fotografici a cadenza settimanale"
      },
      {
        name: "Controllo dello stato lavori",
        text: "Montiamo tutto in laboratorio prima di portarlo a casa tua, e ti facciamo vedere a che punto siamo. È la fase che ci distingue: gli imprevisti li scopriamo e li risolviamo qui, dove abbiamo gli attrezzi, non nel tuo soggiorno.",
        out: "Verifica dimensionale e collaudo delle movimentazioni"
      },
      {
        name: "Consegna, accessori e luce",
        text: "Installazione, collegamento degli elettrodomestici, configurazione della domotica, regolazione di ante e cassetti. Verifichiamo ambiente per ambiente insieme a te prima di chiudere.",
        out: "Verbale di consegna firmato e scenari domotici configurati"
      },
      {
        name: "Post vendita",
        text: "Registrazione delle ante dopo il primo assestamento, ricambi, aggiornamenti dei sistemi smart. Il rapporto non finisce con la fattura: siamo qui anche dopo cinque anni.",
        out: "Interventi su chiamata e ricambi garantiti nel tempo"
      }
    ]
  },

  /* ======================================================================
     SMART LIVING
     ====================================================================== */
  smart: {
    crumb: "Smart Living",
    title: "Domotica dentro il mobile,<br>non sopra il muro",
    lede: "Integriamo controllo ambientale ed elettrodomestici connessi dentro il progetto d'arredo. Se la tecnologia si vede, l'abbiamo montata male.",
    headImage: "assets/img/head-smart-living.jpg",
    headImageAlt: "Forno da incasso acceso con display di cottura e piano a induzione integrati in una cucina in rovere in penombra",
    tone: "dark",
    blocks: [
      {
        name: "Controllo ambientale",
        text: "Luci, clima, tende, tapparelle e irrigazione governati da un'unica logica. Gli scenari seguono le tue giornate: sveglia, uscita, cena, notte. Si impostano una volta e poi funzionano.",
        specs: [
          ["Protocolli", "KNX su cavo, Zigbee e Matter su wireless"],
          ["Comandi",    "Pulsanti a filo muro, display incassati, app, voce"],
          ["Scenari",    "Illimitati, modificabili in autonomia"]
        ]
      },
      {
        name: "Elettrodomestici connessi",
        text: "Forni, cappe, cantine, lavastoviglie e piani a induzione dei nostri partner, integrati nel mobile e raggiungibili dalla stessa interfaccia. La cappa che si accende quando accendi il piano è un dettaglio banale che nessuno configura mai.",
        specs: [
          ["Marchi",      "Gaggenau, Neff e altri partner del gruppo"],
          ["Integrazione","Incasso a filo, cablaggio nascosto nella struttura"],
          ["Automatismi", "Cappa-piano, preriscaldo, avvio in fascia economica"]
        ]
      },
      {
        name: "Efficienza misurabile",
        text: "Consumi monitorati per circuito e regolazione automatica. La casa spegne quello che non serve e sposta i carichi nelle fasce più convenienti. Se hai il fotovoltaico, autoconsuma prima di prelevare dalla rete.",
        specs: [
          ["Misura",      "Consumi per circuito, storico e confronto mensile"],
          ["Ottimizzazione", "Spostamento carichi in fascia e autoconsumo"],
          ["Clima",       "Termostati per zona con programmazione oraria"]
        ]
      },
      {
        name: "Funziona anche offline",
        text: "Ogni scenario resta operativo in locale. Se cade la linea, o se il produttore chiude il server cloud tra cinque anni, la casa continua a rispondere. È il motivo per cui preferiamo KNX dove il budget lo consente.",
        specs: [
          ["Logica",      "Elaborazione locale, cloud solo per accesso remoto"],
          ["Continuità",  "Comandi fisici sempre funzionanti"],
          ["Durata",      "Nessuna dipendenza da abbonamenti per le funzioni base"]
        ]
      }
    ]
  },

  /* ======================================================================
     AZIENDA
     ====================================================================== */
  azienda: {
    crumb: "Azienda",
    title: "Tre generazioni<br>nella stessa falegnameria",
    lede: "Agostino ha aperto il laboratorio a Pescantina nel 1969. Da allora sono cambiati i macchinari, i materiali e i clienti. Il metodo no.",
    headImage: "assets/img/head-azienda.jpg",
    storyImage: "assets/img/story-azienda.jpg",
    storyImageAlt: "Tre momenti sovrapposti: il laboratorio con banco e utensili, un disegno tecnico a matita, lo studio finito con materiali sul tavolo",
    headImageAlt: "Dal banco da falegname con pialla e trucioli alle campionature di essenze fino alla cucina finita: il passaggio dal laboratorio alla casa",
    tone: "light",
    chapters: [
      {
        year: "1932",
        title: "Agostino",
        text: "Agostino Corso nasce a Verona e mostra da subito una manualità fuori misura. Impara il mestiere in bottega, come si faceva allora: guardando, sbagliando e rifacendo."
      },
      {
        year: "1969",
        title: "Il laboratorio",
        text: "Apre la falegnameria a Pescantina. Lavora su commessa per famiglie della zona: infissi, credenze, scale. La reputazione si costruisce casa per casa, senza pubblicità."
      },
      {
        year: "1990",
        title: "Tiziano, seconda generazione",
        text: "Il figlio Tiziano, architetto, rileva l'attività dopo aver passato l'infanzia fra i trucioli. Porta il disegno tecnico e l'idea che il progetto valga tanto quanto l'esecuzione: da falegnameria a studio che progetta e produce."
      },
      {
        year: "2004",
        title: "Dal mobile all'ambiente",
        text: "L'azienda smette di vendere pezzi e comincia a progettare ambienti interi. Nasce la collaborazione strutturata con i marchi del design italiano che ancora oggi affianchiamo alla produzione interna."
      },
      {
        year: "2017",
        title: "Elisabetta, terza generazione",
        text: "Entra in azienda la prima nipote di Agostino, interior designer. Porta lo sguardo di chi è cresciuta con il mestiere in casa ma lo guarda da fuori: il progetto raccontato al cliente, non solo disegnato, e l'attenzione a come si vive davvero uno spazio."
      },
      {
        year: "2017",
        title: "Lo studio",
        text: "Nello stesso anno trasformiamo una parte del laboratorio in uno spazio dove i clienti possono vedere, toccare e decidere. È anche la prova del nostro modo di progettare: l'abbiamo fatto per noi con lo stesso metodo che usiamo per te."
      },
      {
        year: "2019",
        title: "Clienti per cena",
        text: "Cominciamo a invitare clienti per divertenti cene dimostrative nello Studio, con chef che cucinano con i vostri futuri elettrodomestici spiegandone, con la pratica, tutte le novità e comodità. Un forno si giudica usandolo, non da una scheda tecnica. E si scopre che il modo migliore per conoscere un progetto è passarci dentro una serata in compagnia."
      },
      {
        year: "2021",
        title: "Fotovoltaico",
        text: "Installiamo l'impianto sul tetto del laboratorio: da qui lo stabilimento si autoproduce l'energia. Insieme al resto — legni da foreste a gestione controllata, vernici all'acqua, scarti che rientrano nel ciclo — costa più che fare altrimenti, e lo facciamo comunque. La Terra è la nostra prima casa."
      },
      {
        year: "Oggi",
        title: "Sguardo al futuro",
        text: "Progettazione, falegnameria, rendering e domotica sotto lo stesso tetto. Un solo interlocutore dal primo sopralluogo all'assistenza, senza intermediari e senza scaricare responsabilità su altri."
      }
    ],
    values: [
      { label: "Nessun intermediario",  text: "Progettiamo, produciamo e installiamo noi. Se qualcosa non torna, sai a chi chiedere." },
      { label: "Preventivo leggibile",  text: "Voce per voce, senza forfait opachi. Quello che è escluso è scritto che è escluso." },
      { label: "Premontaggio",          text: "Montiamo in laboratorio prima di venire da te. Gli imprevisti li paghiamo noi, in tempo." },
      { label: "Diciamo anche no",      text: "Se il budget non regge il progetto, lo diciamo prima. Preferiamo perdere un lavoro che consegnarne uno mediocre." }
    ]
  },

  /* ======================================================================
     LO STUDIO
     ====================================================================== */
  studio: {
    crumb: "Lo Studio",
    title: "Lo spazio dove si decide",
    lede: "Nel 2017 abbiamo trasformato una parte del laboratorio in un open space a doppia altezza. Non è uno showroom: è il posto dove ci si siede a guardare i materiali con la luce giusta.",
    headImage: "assets/img/head-studio.jpg",
    headImageAlt: "Tavolo dello Studio con campionature di legno, pietra e tessuto accostate accanto a un disegno tecnico, luce radente dalla vetrata",
    /* Fotografia in penombra calda, testo chiaro: è la luce vera di quella
       stanza nel pomeriggio, e schiarirla la farebbe sembrare un'altra. */
    tone: "dark",
    blocks: [
      {
        name: "L'interno",
        text: "Open space a carattere industriale ricavato aprendo il soffitto esistente. Una scala a forma di compasso collega il piano terra al primo, dove stanno la progettazione e la sala materiali. Il pieno e il vuoto sono studiati per lasciare entrare la luce fino in fondo."
      },
      {
        name: "La sala materiali",
        text: "Campionature di essenze, pietre, laminati e tessuti su superfici ampie, non in cataloghi da sfogliare. Un legno si giudica su un metro quadro con la luce naturale addosso, non su un francobollo sotto un neon."
      },
      {
        name: "L'esterno",
        text: "L'area verde è curata con fiori di stagione e essenze locali. Il nuovo ingresso principale ha spostato l'accesso e dato all'azienda un volto riconoscibile dalla strada."
      }
    ],
    visit: {
      title: "Vieni a vedere",
      text: "Lo studio si visita su appuntamento, anche il sabato mattina. Portati le planimetrie se le hai: si ragiona meglio con i disegni sul tavolo.",

      /* Le fotografie non sono elencate da nessuna parte: stanno nella
         cartella assets/img/studio e il sito le conta da solo. Sono le
         stesse che si vedono dietro il titolo della home, in un altro
         ordine. Le didascalie facoltative sono in content/site.js, sotto
         fotoStudio. */
    }
  },

  /* ======================================================================
     EVENTI E INIZIATIVE

     ATTENZIONE — QUESTA SEZIONE VA RIEMPITA.

     Le voci in "prossimi" e "passati" sono ESEMPI: servono a far vedere
     come si impagina la sezione, non sono appuntamenti veri. Finché hanno
     scritto "esempio: true" il sito le mostra con un'etichetta gialla e
     avvisa in cima alla pagina, così non possono passare per veri.

     Per metterne una vera: cambia i testi e togli la riga "esempio: true".
     Per toglierne una: cancella il blocco fra parentesi graffe, virgola
     compresa. Se non ne resta nessuna, la sezione sparisce da sola invece
     di lasciare un vuoto.

     Le "iniziative" invece sono vere: vengono dalla presentazione
     aziendale e non hanno bisogno di date.

     Il formato della data: "data" è quello che si legge a schermo,
     "dataISO" serve ai motori di ricerca e va scritto anno-mese-giorno.
     ====================================================================== */
  eventi: {
    crumb: "Eventi",
    title: "Quello che succede<br>fuori dal progetto",
    lede: "Serate dimostrative, porte aperte, incontri con chi produce quello che installiamo. E le cose che portiamo avanti tutto l'anno, senza data.",
    headImage: "assets/img/head-azienda.jpg",
    headImageAlt: "Il tavolo della progettazione dello Studio apparecchiato per una serata dimostrativa, con campionature e disegni ancora appoggiati di lato",
    tone: "dark",

    avviso: "Gli appuntamenti qui sotto sono esempi di impaginazione, non date reali. Si sostituiscono in content/pages.js.",

    prossimi: {
      label: "In arrivo",
      title: "Prossimi appuntamenti",
      vuoto: "Non ci sono appuntamenti in calendario in questo momento. Lo Studio resta visitabile su appuntamento, anche il sabato mattina.",
      voci: [
        {
          esempio: true,
          data: "Venerdì 18 settembre, ore 19",
          dataISO: "2026-09-18",
          titolo: "Cena dimostrativa nello Studio",
          luogo: "Studio Corso Arredi, Via Nassar 42",
          testo: "Uno chef cucina con i forni e i piani che potresti avere in casa, e mentre cucina spiega cosa cambia davvero fra un modello e l'altro. Un forno si giudica usandolo, non da una scheda tecnica."
        },
        {
          esempio: true,
          data: "Sabato 10 ottobre, dalle 9 alle 13",
          dataISO: "2026-10-10",
          titolo: "Porte aperte in falegnameria",
          luogo: "Laboratorio, Settimo di Pescantina",
          testo: "Il laboratorio aperto a chi vuole vedere come nasce un'anta: le macchine, i pannelli, il premontaggio. Senza appuntamento, si entra e si guarda."
        }
      ]
    },

    iniziative: {
      label: "Tutto l'anno",
      title: "Iniziative senza data",
      testo: "Non sono eventi e non finiscono: sono impegni che l'azienda si è presa e che continuano.",
      voci: [
        { name: "Energia autoprodotta",
          text: "Il fotovoltaico sul tetto rende lo stabilimento autosufficiente. L'energia con cui costruiamo i tuoi mobili la produciamo noi." },
        { name: "Economia circolare",
          text: "Gli scarti di lavorazione rientrano nel ciclo produttivo invece di finire in discarica. Un approccio produttivo responsabile, non una dichiarazione." },
        { name: "Formazione continua",
          text: "Il team si aggiorna sulle tecniche e sui materiali nuovi. Una falegnameria che smette di imparare diventa un archivio." },
        { name: "Studio sempre aperto",
          text: "Su appuntamento, anche il sabato mattina. Portati le planimetrie se le hai: si ragiona meglio con i disegni sul tavolo." }
      ]
    },

    passati: {
      label: "Archivio",
      title: "È già successo",
      voci: [
        {
          esempio: true,
          data: "Maggio 2026",
          titolo: "Serata sulle pietre naturali",
          testo: "Quaranta persone, un espositore a ventaglio di lastre e due ore a discutere di venature. Le pietre si scelgono guardandole intere, non su un campione da dieci centimetri."
        },
        {
          esempio: true,
          data: "Novembre 2025",
          titolo: "Incontro sulla domotica che non si vede",
          testo: "Cosa vuol dire davvero integrare gli impianti nel mobile, e cosa succede quando cade la linea."
        }
      ]
    }
  },

  /* ======================================================================
     CONTATTI
     ====================================================================== */
  contatti: {
    crumb: "Contattaci",
    title: "Parliamo del tuo progetto",
    lede: "Rispondi a quello che vuoi e salta il resto: basta un recapito. Più cose ci dici, più la prima risposta è utile invece che generica.",
    headImage: "assets/img/head-contatti.jpg",
    headImageAlt: "Scrivania in pietra chiara con taccuino e penna, tazza in ceramica, portatile aperto e pianta accanto alla vetrata",
    tone: "light",
    hours: [
      { days: "Lunedì — Venerdì", time: "8:30 – 12:30 · 14:30 – 19:00" },
      { days: "Sabato",           time: "8:30 – 12:30 su appuntamento" },
      { days: "Domenica",         time: "Chiuso" }
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Via+Nassar+42+37026+Pescantina+VR",

    /* ====================================================================
       IL CONFIGURATORE
       Ogni passo è una domanda con risposte pronte. Tutto facoltativo
       tranne l'ultimo, dove servono nome ed email.

       "riepilogo" è il pezzo di frase che quella risposta aggiunge al
       testo finale: %s viene sostituito dall'etichetta scelta. È così che
       il modulo compone da solo una descrizione leggibile del progetto.
       ==================================================================== */
    steps: [
      {
        id: "ambito",
        label: "Di cosa si tratta",
        question: "Su cosa vorresti lavorare?",
        hint: "Scegline anche più di uno.",
        multi: true,
        options: [
          { v: "cucina",    l: "Cucina",              r: "una cucina" },
          { v: "living",    l: "Living o libreria",    r: "un living" },
          { v: "notte",     l: "Zona notte",           r: "una zona notte" },
          { v: "bagno",     l: "Bagno",                r: "un bagno" },
          { v: "casa",      l: "Casa intera",          r: "una casa intera" },
          { v: "hospitality", l: "Hotel o ristorante", r: "uno spazio hospitality" },
          { v: "ufficio",   l: "Ufficio o negozio",    r: "un ufficio o un negozio" },
          { v: "speciale",  l: "Lavorazione speciale", r: "una lavorazione speciale" }
        ],
        riepilogo: "Stai pensando a %s"
      },
      {
        id: "stato",
        label: "L'immobile",
        question: "A che punto è lo spazio?",
        options: [
          { v: "nuovo",       l: "Nuova costruzione",              r: "in una nuova costruzione" },
          { v: "ristruttura", l: "In ristrutturazione",            r: "in un immobile in ristrutturazione" },
          { v: "abitato",     l: "Già abitato, si cambia l'arredo", r: "in una casa già abitata" },
          { v: "trattativa",  l: "Non ancora mio",                 r: "in un immobile non ancora tuo" }
        ],
        riepilogo: "%s"
      },
      {
        id: "superficie",
        label: "Dimensione",
        question: "Quanto misura, circa?",
        hint: "Una stima basta: serve solo a inquadrare il lavoro.",
        options: [
          { v: "fino20",   l: "Fino a 20 m²",  r: "di una ventina di metri quadri" },
          { v: "20-50",    l: "20 – 50 m²",    r: "fra i 20 e i 50 m²" },
          { v: "50-100",   l: "50 – 100 m²",   r: "fra i 50 e i 100 m²" },
          { v: "100-200",  l: "100 – 200 m²",  r: "fra i 100 e i 200 m²" },
          { v: "oltre200", l: "Oltre 200 m²",  r: "oltre i 200 m²" }
        ],
        /* Chi conosce il numero esatto lo scrive: una fascia è comoda per
           chi non lo sa, e diventa un'imprecisione per chi lo sa. */
        libero: {
          label: "Oppure scrivi la misura",
          placeholder: "esempio: 68 m² più terrazzo",
          r: "di %s"
        },
        riepilogo: "%s"
      },
      {
        id: "budget",
        label: "Budget",
        question: "Che ordine di grandezza hai in mente?",
        hint: "Dircelo ora evita di farci perdere tempo a entrambi.",
        options: [
          { v: "aperto",   l: "Ancora da capire",     r: "con un budget ancora da definire" },
          { v: "fino15",   l: "Fino a 15.000 €",      r: "con un budget entro i 15.000 €" },
          { v: "15-35",    l: "15.000 – 35.000 €",    r: "con un budget fra 15.000 e 35.000 €" },
          { v: "35-70",    l: "35.000 – 70.000 €",    r: "con un budget fra 35.000 e 70.000 €" },
          { v: "70-150",   l: "70.000 – 150.000 €",   r: "con un budget fra 70.000 e 150.000 €" },
          { v: "oltre150", l: "Oltre 150.000 €",      r: "con un budget oltre i 150.000 €" }
        ],
        libero: {
          label: "Oppure dillo a modo tuo",
          placeholder: "esempio: 40.000 € per la cucina, il resto dopo",
          r: "con un budget di %s"
        },
        riepilogo: "%s"
      },
      {
        id: "tempi",
        label: "Tempi",
        question: "Entro quando vorresti finire?",
        options: [
          { v: "3mesi",   l: "Entro tre mesi",  r: "da chiudere entro tre mesi" },
          { v: "6mesi",   l: "Entro sei mesi",  r: "da chiudere entro sei mesi" },
          { v: "anno",    l: "Entro l'anno",    r: "da chiudere entro l'anno" },
          { v: "nofretta", l: "Nessuna fretta", r: "senza una scadenza stretta" }
        ],
        libero: {
          label: "Oppure indica una data",
          placeholder: "esempio: pronto per il trasloco di marzo",
          r: "%s"
        },
        riepilogo: "%s"
      },
      {
        id: "interessi",
        label: "Cosa ti interessa",
        question: "C'è qualcosa a cui tieni in particolare?",
        hint: "Facoltativo, ma ci aiuta a preparare la risposta giusta.",
        multi: true,
        options: [
          { v: "smart",     l: "Smart living",              r: "lo smart living" },
          { v: "elettro",   l: "Elettrodomestici integrati", r: "gli elettrodomestici integrati" },
          { v: "materiali", l: "Materiali e finiture",       r: "la scelta dei materiali" },
          { v: "sumisura",  l: "Lavorazioni su misura",      r: "le lavorazioni su misura" },
          { v: "luce",      l: "Illuminazione integrata",    r: "l'illuminazione integrata" },
          { v: "sostenibile", l: "Scelte sostenibili",       r: "le scelte sostenibili" }
        ],
        riepilogo: "con un occhio di riguardo per %s"
      }
    ],

    /* Ultimo passo: gli unici campi obbligatori */
    contatto: {
      question: "Come ti rispondiamo?",
      hint: "Basta un recapito, email o telefono. Rispondiamo entro un giorno lavorativo e non facciamo newsletter.",
      /* Un riquadro solo per tutto ciò che non serve: dirlo una volta è
         più chiaro che ripetere "facoltativo" accanto a ogni campo. */
      opzionaliTitolo: "Il resto è facoltativo",
      opzionaliNota: "Serve solo a risponderti con maggiore accuratezza."
    },

    /* ====================================================================
       L'APPUNTAMENTO
       Si può inviare la richiesta, prenotare, o fare tutte e due. Un'ora
       è la durata di un primo incontro: il tempo di guardare le
       planimetrie, toccare i materiali e capire se ci si intende.
       ==================================================================== */
    appuntamento: {
      titolo: "Vieni a trovarci",
      testo: "Un'ora nello Studio, senza impegno: si guardano le planimetrie, si toccano i materiali e si capisce se ci si intende. Scegli quando ti fa comodo.",
      durataMinuti: 60,
      luoghi: [
        { v: "studio",  l: "Nel nostro Studio", r: "nello Studio di Pescantina" },
        { v: "cantiere", l: "A casa tua",       r: "a casa tua" },
        { v: "video",   l: "In videochiamata",  r: "in videochiamata" }
      ],
      nessunOrario: "Quel giorno siamo al completo. Prova un altro giorno: si libera spesso.",
      confermaTitolo: "Appuntamento scelto",
      annulla: "Cambia",
      question: "Quando ci vediamo?"
    },

    riepilogoTitolo: "Ecco cosa abbiamo capito",
    riepilogoVuoto: "Compila almeno un passo e qui comparirà il riassunto della tua richiesta, nelle parole che useremo per rispondere.",

    form: {
      /* Endpoint del modulo. Il vecchio contatti.php è riutilizzabile:
         metti "contatti.php" quando è pronto. */
      action: "",
      note: "I dati servono solo a risponderti. Non facciamo newsletter e non cediamo indirizzi a nessuno.",
      success: "Messaggio inviato. Ti rispondiamo entro un giorno lavorativo.",
      offline: "Il modulo non è ancora collegato al server. Nel frattempo scrivi a info@corsoarredi.com o chiama lo 045 715 1234.",

      /* Le due schermate di chiusura. Sono due perché sono due cose
         diverse: una richiesta scritta si legge quando si può, un
         appuntamento occupa un'ora dell'agenda di qualcuno. */
      esito: {
        richiesta: {
          titolo: "Richiesta pronta",
          testo: "Ti rispondiamo entro un giorno lavorativo, nel merito di quello che ci hai raccontato."
        },
        appuntamento: {
          titolo: "Appuntamento richiesto",
          testo: "Ti confermiamo il posto per email o telefono. Se nel frattempo cambia qualcosa, basta un messaggio."
        },
        /* Finché non c'è un server dietro, il modo più onesto di non
           perdere una richiesta è consegnarla al cliente già scritta. */
        mailtoLabel: "Aprilo nella tua email",
        mailtoNota: "Il modulo non è ancora collegato al server: questo bottone prepara la stessa email nel tuo programma di posta, già compilata. Basta premere invio.",
        ricomincia: "Compila un'altra richiesta"
      }
    }
  },

  /* ======================================================================
     PRIVACY
     ====================================================================== */
  privacy: {
    crumb: "Privacy",
    title: "Privacy policy",
    lede: "Questa pagina spiega quali dati raccogliamo e perché. È una bozza da far validare a un legale prima della pubblicazione.",
    sections: [
      {
        h: "Titolare del trattamento",
        p: ["Corso Arredi, Via Nassar 42, 37026 Pescantina (VR), P.IVA 04496820236. Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a info@corsoarredi.com."]
      },
      {
        h: "Quali dati raccogliamo",
        p: ["Raccogliamo solo i dati che ci fornisci compilando il form contatti: nome, email, telefono se lo indichi, e il contenuto del messaggio."],
        ul: ["Nessun cookie di profilazione", "Nessun tracciamento pubblicitario", "Nessuna cessione a terzi per finalità commerciali"]
      },
      {
        h: "Perché li usiamo",
        p: ["Per risponderti e, se il rapporto prosegue, per gestire il preventivo e la commessa. Base giuridica: tuo consenso per il primo contatto, esecuzione del contratto per le fasi successive."]
      },
      {
        h: "Per quanto tempo",
        p: ["Se il contatto non prosegue, cancelliamo i dati entro 24 mesi. Se diventi cliente, li conserviamo per il tempo richiesto dagli obblighi fiscali e di garanzia."]
      },
      {
        h: "I tuoi diritti",
        p: ["Puoi chiedere in qualsiasi momento di accedere ai tuoi dati, correggerli, cancellarli o limitarne il trattamento, e puoi opporti al trattamento stesso. Scrivi a info@corsoarredi.com: rispondiamo entro 30 giorni."]
      },
      {
        h: "Servizi di terze parti",
        p: ["Il sito carica il font Inter da Google Fonts, che comporta una connessione ai server Google. Se preferisci evitarla, il font può essere ospitato in locale: è una modifica di pochi minuti."]
      }
    ]
  }
};
