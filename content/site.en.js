/* ==========================================================================
   CORSO ARREDI — SITE CONTENT, ENGLISH
   --------------------------------------------------------------------------
   The English twin of content/site.js. Same shape, same keys, same number
   of items in every list — a test checks that, and fails if the two drift
   apart. So: to add something here, add it there too.

   This is not a literal translation. "Produrre bene costa di più" is not
   "producing well costs more"; the tone has to survive, not the grammar.
   Direct, unhurried, no superlatives — a workshop that has been running
   since 1969 does not need adjectives to say so.

   A few things stay in Italian on purpose: the company name, the street
   address, the VAT number, and the collection names where they are also
   the name of a room in an Italian house. Translating an address is how
   post goes missing.
   ========================================================================== */

window.SITE_EN = {

  /* ======================================================================
     1. IDENTITY
     ====================================================================== */
  brand: {
    name: "Corso",
    nameBold: "Arredi",
    mark: "assets/logo.svg",
    tagline: "We design bespoke interiors and build them in our own workshop in Pescantina, near Verona. Since 1969.",
    vat: "VAT IT04496820236",
    copyright: "© Corso Arredi"
  },

  contact: {
    phoneLabel: "+39 045 715 1234",
    phoneHref: "tel:+390457151234",
    email: "info@corsoarredi.com",
    address: "Via Nassar, 42 — 37026 Pescantina, Verona, Italy"
  },

  social: [
    { name: "Instagram", url: "https://www.instagram.com/corso_arredi/" },
    { name: "Facebook",  url: "https://www.facebook.com/corsoarredi" },
    { name: "LinkedIn",  url: "https://it.linkedin.com/in/tiziano-corso-18762085" }
  ],

  /* ======================================================================
     2. NAVIGATION
     The addresses stay the same: they are the same pages, read in another
     language. Only the labels change.
     ====================================================================== */
  nav: {
    links: [
      { label: "Collections", href: "collezioni.html" },
      { label: "Design",      href: "progettazione.html" },
      { label: "Smart Living", href: "smart-living.html" },
      { label: "Company",     href: "azienda.html" },
      { label: "The Studio",  href: "studio.html" },
      { label: "Events",      href: "eventi.html" }
    ],
    cta: { label: "Get in touch", href: "contatti.html" }
  },

  /* ======================================================================
     3. HERO
     ====================================================================== */
  hero: {
    label: "Bespoke design since 1969 · Settimo di Pescantina, Verona",
    title: "Bespoke interiors,<br>from drawing to installation.",
    lede: "Three generations between a design studio and a cabinetmaking workshop. We listen to the space and to the people who live in it, then we draw, build and install: one point of contact, from the first survey to the aftercare.",
    image: "assets/img/studio/01.jpg",
    imageAlt: "The Corso Arredi studio seen from the living area: laminated timber beams, a suspended ring light and the kitchen behind",
    actions: [
      { label: "Collections", href: "collezioni.html" },
      { label: "Events", href: "eventi.html" }
    ]
  },

  /* ======================================================================
     4. STATEMENT
     ====================================================================== */
  statement: {
    title: "The drawing and the making<br>under one roof."
  },

  /* ======================================================================
     5. WHAT WE DO
     ====================================================================== */
  services: {
    label: "What we do",
    title: "Four trades, one workshop",
    items: [
      {
        name: "Design",
        text: "Measured survey, layout and lighting study, materials schedule. The design starts by listening to the space and arrives as a technical document, not a catalogue.",
        bullets: ["Site visit and survey", "Light and circulation studied", "Costings with nothing hidden"]
      },
      {
        name: "Rendering",
        text: "You see it before we make it. We give the project back as photorealistic images and walkthroughs: finishes get chosen by looking, not by imagining.",
        bullets: ["Photorealistic views", "Options side by side", "Revisions until you approve"]
      },
      {
        name: "Cabinetmaking",
        text: "Made in house since 1969. Doors, panelling, bookcases, walk-in wardrobes and counters drawn and built in our own workshop, a few metres from the table where they were thought up.",
        bullets: ["Bespoke to the millimetre", "Certified timber, water-based finishes", "Dry-assembled before installation"]
      },
      {
        name: "Smart living",
        text: "Home automation built into the furniture, not stuck on afterwards. Lighting, climate, blinds and security on a single logic, chosen alongside the materials rather than after them.",
        bullets: ["KNX and wireless systems", "Connected appliances", "Works offline too"]
      }
    ]
  },

  /* ======================================================================
     6. COLLECTIONS
     ====================================================================== */
  collections: {
    label: "Collections",
    title: "Projects built and installed",
    cta: { label: "All collections", href: "collezioni.html" },
    items: [
      {
        name: "Kitchens",
        meta: "Bespoke, with integrated appliances",
        href: "collezione-cucine.html",
        image: "assets/img/coll-cucine.jpg",
        imageAlt: "Bespoke kitchen with a stone island and vertical slatted oak doors"
      },
      {
        name: "Living",
        meta: "Panelling, bookcases, living areas",
        href: "collezione-living.html",
        image: "assets/img/coll-living.jpg",
        imageAlt: "Full-height bespoke oak bookcase with integrated linear lighting"
      },
      {
        name: "Bedrooms",
        meta: "Bedrooms, headboards, walk-in wardrobes",
        href: "collezione-notte.html",
        image: "assets/img/coll-notte.jpg",
        imageAlt: "Bedroom with a full-wall upholstered headboard and wall-hung oak bedside tables"
      },
      {
        name: "Bathrooms",
        meta: "Wall-hung units, basins, mirrors",
        href: "collezione-bagni.html",
        image: "assets/img/coll-bagni.jpg",
        imageAlt: "Bathroom with a wall-hung oak unit, stone basin and backlit mirror"
      },
      {
        name: "Cabinetmaking",
        meta: "Special work and restoration",
        href: "collezione-falegnameria.html",
        image: "assets/img/coll-falegnameria.jpg",
        imageAlt: "Close-up of a dovetail joint in solid oak with a chisel and a shaving"
      },
      {
        name: "Hospitality",
        meta: "Hotels, restaurants, shops and boutiques",
        href: "collezione-hospitality.html",
        image: "assets/img/coll-hospitality.jpg",
        imageAlt: "Hotel reception with a curved counter in vertical oak slats and a stone top"
      }
    ]
  },

  /* ======================================================================
     7. METHOD
     ====================================================================== */
  method: {
    label: "Method",
    title: "Six stages, no grey areas",
    text: "You always know where we are, who is working on it and what happens next. We deal with surprises in the workshop, not on your site.",
    image: "assets/img/progettazione.jpg",
    imageAlt: "Work table with plan drawings, timber and stone samples, a square and a tape measure",
    steps: [
      "Understanding what you need",
      "Design and rendering",
      "Made in the workshop",
      "Progress check",
      "Delivery, fittings and lighting",
      "Aftercare"
    ],
    cta: { label: "The method in detail", href: "progettazione.html" }
  },

  /* ======================================================================
     8. SMART LIVING
     ====================================================================== */
  smart: {
    label: "Smart living · IoT and AIoT",
    title: "The best technology<br>is the kind you never look at.",
    text: "We build home automation and connected appliances into the furniture design itself. No switch added afterwards, no little box on show.",
    items: [
      { label: "Environmental control", text: "Lights, climate, curtains and blinds on scenes that follow your day." },
      { label: "Connected appliances",  text: "Ovens, extractors and wine cabinets from our partners, built into the unit and into the same app." },
      { label: "Efficiency you can measure", text: "Consumption monitored and regulated automatically: the house switches off what nobody is using." },
      { label: "Works offline",         text: "Every scene keeps running locally. If the line goes down, the house still answers." }
    ],
    cta: { label: "About smart living", href: "smart-living.html" }
  },

  /* ======================================================================
     8-bis. THE COMPANY PHOTOGRAPHS

     Not a list: a folder. The site counts the files in assets/img/studio
     on its own — see the Italian file for the full explanation, it is the
     same folder and the same mechanism. Only the captions live here.
     ====================================================================== */
  fotoStudio: {
    cartella: "assets/img/studio",
    name: "Corso Arredi",
    id: "studio",
    altGenerico: "A photograph of the Corso Arredi studio in Pescantina, near Verona",
    descrizioni: {
      "01": { didascalia: "The living area, seen from the workbench",
              alt: "The studio seen from the living area: laminated timber roof beams, a suspended ring light, the kitchen behind and an old cabinetmaker's bench used as an island" },
      "02": { didascalia: "The monogram, in reclaimed timber",
              alt: "The CA monogram made from reclaimed timber shapes mounted on the pale façade, above a bed of pink flowers" },
      "03": { didascalia: "The kitchen, with a bench for an island",
              alt: "The studio kitchen with white handleless doors, antique oak wall units and a nineteenth-century cabinetmaker's bench in place of an island, with an induction hob set into it" },
      "04": { didascalia: "Outside, where the midday sun falls",
              alt: "The outdoor corner of the studio with two white loungers, timber blocks as side tables and flower beds in front of the sliding glazing" },
      "05": { didascalia: "The living room and the stair to the materials room",
              alt: "The studio living room: a pale sofa, colourful paintings on the walls, a steel stair to the first floor and exposed laminated timber structure overhead" },
      "06": { didascalia: "The wall of veneers, in the materials room",
              alt: "Display wall in the materials room with veneer and laminate samples resting on black shelves, from pale oak through greys to browns" },
      "07": { didascalia: "Samples standing up, ready to compare",
              alt: "Panel samples standing upright in the foreground and, behind them, the design table in front of the ribbon window" },
      "08": { didascalia: "The stones, side by side",
              alt: "Fan display of stone and quartz slabs with black handles, from veined whites to cement greys" }
    }
  },

  /* ======================================================================
     9. SUSTAINABILITY
     ====================================================================== */
  sustainability: {
    label: "Sustainability",
    title: "The Earth is our first home.",
    image: "assets/img/band-sostenibilita.jpg",
    imageAlt: "Timber building at sunset with solar panels on the roof, trees and hills behind",
    text: "The workshop generates its own electricity from the solar array on the roof. The timber comes from responsibly managed forests, the finishes are water-based, and offcuts go back into the cycle instead of into landfill.",
    note: "Figures as of August 2026",
    metrics: [
      { value: "129 MWh",   label: "Clean energy generated" },
      { value: "1,510",     label: "Equivalent trees planted" },
      { value: "50,600 kg", label: "CO₂ avoided" },
      { value: "100%",      label: "Certified timber" }
    ]
  },

  /* ======================================================================
     10. CLOSING
     ====================================================================== */
  closing: {
    title: "A project starts<br>with a conversation.",
    text: "Tell us about the space, the budget and the timing. We will tell you straight away whether we can be useful to you.",
    actions: [
      { label: "Book a consultation", href: "contatti.html", style: "filled" },
      { label: "+39 045 715 1234",    href: "tel:+390457151234", style: "outline-invert" }
    ]
  },

  /* ======================================================================
     11. FOOTER
     ====================================================================== */
  footer: {
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Collections", href: "collezioni.html" },
          { label: "Design",      href: "progettazione.html" },
          { label: "Smart Living", href: "smart-living.html" },
          { label: "The Studio",  href: "studio.html" },
          { label: "Events",      href: "eventi.html" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "Our story",   href: "azienda.html" },
          { label: "Get in touch", href: "contatti.html" },
          { label: "Privacy",     href: "privacy.html" }
        ]
      }
    ]
  }
};
