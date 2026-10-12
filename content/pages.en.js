/* ==========================================================================
   CORSO ARREDI — INNER PAGE CONTENT, ENGLISH
   --------------------------------------------------------------------------
   The English twin of content/pages.js. One block per page, same keys, same
   number of entries — a test compares the two and fails if they drift.

   The photo captions are keyed by file number, exactly as in the Italian
   file: "07" here describes the same photograph as "07" there. Add a photo
   to a folder and it shows up in both languages with a generic description
   until someone writes it two lines of its own.

   On the collection names: "Cucine" becomes "Kitchens" and "Zona notte"
   becomes "Bedrooms", because those are rooms and rooms have English names.
   "Hospitality" stays as it is — it is the same word in the trade — and so
   does every street address.
   ========================================================================== */

window.PAGES_EN = {

  /* ======================================================================
     COLLECTIONS
     ====================================================================== */
  collezioni: {
    crumb: "Collections",
    title: "Six fields of work",
    lede: "Every category gathers projects that were built and installed. No catalogue photography: what you are looking at came out of our own workshop.",
    headImage: "assets/img/head-collezioni.jpg",
    headImageAlt: "Fitted oak wall in vertical slats with recesses and an integrated bookcase, raking light across a pale wall",
    tone: "light",
    categories: [
      {
        id: "cucine",
        href: "collezione-cucine.html",
        name: "Kitchens",
        text: "We design the kitchen around how you actually cook: worktop heights set to your build, drawer depths set to the pans you own, extraction calculated on the volume of the room. Appliances arrive built in and connected, not stood on the counter.",
        image: "assets/img/coll-cucine.jpg",
        imageAlt: "Bespoke kitchen with a generously thick stone island and vertical slatted oak doors",
        cartella: "assets/img/collezioni/cucine",
        descrizioni: {
          "01": { titolo: "Framed doors, corner used in full",
                 testo: "Lacquered framed doors and glass cabinets with mesh: the house was traditional and the kitchen was not there to argue with it. The corner is used end to end, with a base cut to follow the recess in the wall.",
                 alt: "White lacquered corner kitchen with framed doors, glazed cabinets, wall units to the ceiling and burnished metal handles" },
          "02": { titolo: "Flush tall units, built-in oven",
                 testo: "Continuous vertical slats across two walls: the pattern turns the corner without breaking. The oven sits perfectly flush, no visible trim, and the doors have no handles at all.",
                 alt: "Full-height oak tall units in vertical slats with a flush built-in oven, in the corner of a room" },
          "03": { titolo: "Black island, oak tall units",
                 testo: "The matt black island top plays against the oak tall units. The sink goes under the ribbon window, because that is where the light is; the hob stays on the island, facing whoever is sitting down.",
                 alt: "Kitchen with a black-topped island, dark stools, full-height oak units and a ribbon window above the sink" },
          "04": { titolo: "Compact, with open shelves",
                 testo: "Not much room, so no wall units across the whole wall: two oak shelves hold what gets used every day and the room can still breathe.",
                 alt: "Compact white galley kitchen with oak wall shelves, a gas hob and small appliances on show" },
          "05": { titolo: "Quartzite and a flush hob",
                 testo: "A natural quartzite worktop: no two slabs are alike, and the veining is chosen from the block before it is cut. The induction hob is set perfectly flush, so the whole surface wipes down in one movement.",
                 alt: "Veined natural quartzite worktop with a black induction hob set flush, and white handleless doors" },
          "06": { titolo: "The drawer, inside",
                 testo: "The dividers are made for the cutlery you own, not to a standard size. It is the part nobody photographs and that you use ten times a day.",
                 alt: "Open fitted drawer with bespoke timber dividers, cutlery and kitchen tools laid out in order" },
          "07": { titolo: "Thick marble on the peninsula",
                 testo: "Full thickness at the edge, not a bonded panel: the marble reads as what it is. The overhang is worked out so you can sit without your knees against the side.",
                 alt: "Close-up of a peninsula with a thick veined white marble top and black leather stools" },
          "08": { titolo: "Macassar ebony island",
                 testo: "The wall disappears into white and the island becomes the one precious piece of timber in the middle of the room. Dark glass cabinets close the composition at the top without weighing it down.",
                 alt: "White galley kitchen with an island clad in macassar ebony, dark glass wall units and an oak floor" },
          "09": { titolo: "Open to the living room",
                 testo: "The peninsula is the border between cooking and being together: you work on one side, you sit on the other. The extractor is in the ceiling so it does not cut across the view.",
                 alt: "White kitchen open to the living room with a fitted peninsula, stools and a ceiling-integrated extractor" },
          "10": { titolo: "The hatch as a window",
                 testo: "A horizontal opening cut into the structural wall, edged and lit: the kitchen stays a room of its own but stops being a cupboard.",
                 alt: "Ribbon serving hatch between kitchen and dining room, with a lit edge and the kitchen visible beyond" },
          "11": { titolo: "Light under the wall units",
                 testo: "The LED runs the full length inside a channel cut into the underside of the unit: it lights the worktop and never glares at you when you are standing in front of it.",
                 alt: "White galley kitchen with continuous LED under the wall units, a peninsula and flowers on the worktop" },
          "12": { titolo: "White on red, under the beams",
                 testo: "The colour was already there, and so were the beams. The furniture was kept deliberately neutral: in a room that speaks loudly, the kitchen is the background.",
                 alt: "White corner kitchen against a red wall, with a timber beamed ceiling and a table with chairs" },
          "13": { titolo: "Dark island, recesses in the wall",
                 testo: "Dark fronts and recesses cut into the thickness of the wall rather than applied on top. The hob block sits on the island; everything else disappears into the wall.",
                 alt: "Kitchen island with dark fronts, a ceiling extractor and recesses cut into the white wall" },
          "14": { titolo: "Undermounted in the stone",
                 testo: "An undermounted sink: the edge of the stone runs down into the bowl with no lip. It sounds like a detail, but it is the difference between wiping crumbs away and picking them up by hand.",
                 alt: "Close-up of a veined natural stone worktop with a black undermounted sink and mixer tap" },
          "15": { titolo: "Behind the glazing, the living room",
                 testo: "A sliding glazed screen separates kitchen from living room: closed when something is frying, open when there are people. The two rooms are still one when they need to be.",
                 alt: "View from the kitchen towards the living room through a sliding glazed screen, with a sofa and classic furniture" },
          "16": { titolo: "Oak channel, black top",
                 testo: "No handles: the channel is milled into the front and runs the length of the row. It opens with your fingertips, wet hands included.",
                 alt: "Close-up of oak doors with a continuous horizontal finger channel and a black worktop above" }
        },
        specs: [
          ["Worktops",   "Natural stone, Dekton, Silestone, compact laminate, solid oak"],
          ["Doors",      "Oak, walnut, ash, matt lacquer, reeded glass"],
          ["Hardware",   "Blum, with a lifetime guarantee on hinges and runners"],
          ["Appliances", "Gaggenau, Neff and other partners, flush fitted"],
          ["Lead time",  "8–12 weeks from sign-off"]
        ]
      },
      {
        id: "living",
        href: "collezione-living.html",
        name: "Living",
        text: "Panelling, bookcases, fitted walls and concealed storage. We work on solid and void: how much to hold, how much to leave breathing. Linear lighting goes into the uprights while they are being built, not added afterwards.",
        image: "assets/img/coll-living.jpg",
        imageAlt: "Full-height bespoke oak bookcase with linear lighting built into the uprights",
        cartella: "assets/img/collezioni/living",
        descrizioni: {
          "01": { titolo: "Media wall and open stair",
                 testo: "The oak panel gathers screen, shelves and cables into a single move. Below it the unit is wall-hung: you can see the floor carry on, and the room reads wider.",
                 alt: "Living room with an oak media panel, a wall-hung white unit, an open stair with timber treads and a beamed ceiling" },
          "02": { titolo: "Antique boards and recesses",
                 testo: "Reclaimed boards, brushed and oiled, with the recesses cut into their thickness. The family table stayed: the wall was designed around it.",
                 alt: "Dining room with a wall clad in antique timber, storage recesses and a table with classic chairs" },
          "03": { titolo: "Entrance hall, dark and oak",
                 testo: "A narrow hall: dark panelling on one side, oak on the other, and a full-height mirror in between that doubles the passage.",
                 alt: "Entrance hall with dark panelling and oak boarding, a wall-hung console with basin and a full-height mirror" },
          "04": { titolo: "Bookcase with light in the uprights",
                 testo: "The LED sits inside the uprights, fitted while they were being built: no profile added later, no cable on show. The light washes the books from the top down.",
                 alt: "Living room with a bespoke full-wall bookcase, linear LED built into the uprights, a recessed TV and a rug" },
          "05": { titolo: "The stair on the red wall",
                 testo: "Solid treads and a steel balustrade of horizontal bars: two materials, no decoration. The colour of the wall does everything else.",
                 alt: "Stair with pale timber treads and a steel balustrade of horizontal bars against a red wall" },
          "06": { titolo: "Cantilevered treads, black stringers",
                 testo: "Each tread is a solid section cantilevered off the steel stringer. A line of light runs under the first one: at night you can see the stair without switching anything on.",
                 alt: "Stair with cantilevered timber treads on black stringers, LED under the first tread and a dark floor" },
          "07": { titolo: "The tread, close up",
                 testo: "The cut is clean on all four sides and the LED is buried in the lower edge. A piece like this is only seen when you walk past it, and that is exactly where it has to hold up.",
                 alt: "Close-up of a cantilevered walnut tread with raking LED light beneath it" },
          "08": { titolo: "Library across the wall",
                 testo: "Bespoke modules to the ceiling with green backs, to lift the spines off the wall. The sofa was chosen afterwards, against the colour of the backs.",
                 alt: "Large classic full-wall library with green backs, shelves full of books and a pale blue sofa" },
          "09": { titolo: "Lit shelves in a corridor",
                 testo: "A corridor is wasted space until you give it a job. Thick shelves with integrated LED turn it into a display case inside the house.",
                 alt: "Corridor with thick oak shelves lit by integrated LED and a flush door" }
        },
        specs: [
          ["Structures", "Oak, walnut, ash, bespoke veneers"],
          ["Lighting",   "Integrated linear LED, 2700–3000K"],
          ["Services",   "Cabling and sockets planned inside the structure"],
          ["Finishes",   "Natural oil, water-based lacquer, matt lacquer"],
          ["Lead time",  "6–10 weeks from sign-off"]
        ]
      },
      {
        id: "notte",
        href: "collezione-notte.html",
        name: "Bedrooms",
        text: "Full-wall headboards, wall-hung bedside tables built into the structure, walk-in wardrobes that follow the real geometry of the room. Where a wall is out of square, the furniture goes with it: no side panel forced straight.",
        image: "assets/img/coll-notte.jpg",
        imageAlt: "Bedroom with a full-wall upholstered headboard, wall-hung oak bedside tables and linear lighting",
        cartella: "assets/img/collezioni/notte",
        descrizioni: {
          "01": { titolo: "Walk-in wardrobe, open",
                 testo: "No doors: if the space is there, an open dressing room is quicker to use and costs less. The hanging heights are decided on the clothes you actually own.",
                 alt: "Open walk-in wardrobe with timber shelves, hanging rails and clothes on display" },
          "02": { titolo: "Corner wardrobe, mirrored door",
                 testo: "A mirrored door on the corner unit and a lit oak bulkhead above. The mirror is where the room is narrowest — that is the point of putting it there.",
                 alt: "Corner wardrobe with a mirrored door, a lit oak bulkhead and an oak floor" },
          "03": { titolo: "Full-wall walnut headboard",
                 testo: "Walnut slats across the whole wall with two slots of light at the right height for reading. The headboard carries on past the bed: the wall becomes the bed.",
                 alt: "Bedroom with a full-wall walnut slatted headboard, two slots of linear light and a white bedside table" },
          "04": { titolo: "Doors flush to the wall",
                 testo: "The wardrobe ends exactly where the wall ends, with no filler trim. This is the part that needs the survey done properly, not the cheapest quote.",
                 alt: "Four-door oak wardrobe flush to the wall with vertical metal handles" }
        },
        specs: [
          ["Headboards", "Linen, bouclé, leather, your own fabrics"],
          ["Wardrobes",  "Hinged, sliding, flush to wall, walk-in"],
          ["Interiors",  "Drawer units, tie racks, sensor lighting"],
          ["Lighting",   "LED behind the headboard, dimmable, night scene"],
          ["Lead time",  "6–10 weeks from sign-off"]
        ]
      },
      {
        id: "bagni",
        href: "collezione-bagni.html",
        name: "Bathrooms",
        text: "Bespoke wall-hung units, integrated basins, backlit mirrors and recesses cut into the wall. We use timber treated for humidity and stainless hardware: wood survives in a bathroom only if you prepare it.",
        image: "assets/img/coll-bagni.jpg",
        imageAlt: "Bathroom with a wall-hung unit in vertical oak slats, an integrated stone basin, a backlit mirror and a recess with towels",
        cartella: "assets/img/collezioni/bagni",
        descrizioni: {
          "01": { titolo: "Classic bathroom, shaped unit",
                 testo: "The marble top follows the curve of the unit, cut to a template taken on site. In a narrow bathroom the curve is there so you can get past, not for decoration.",
                 alt: "Classic bathroom with a shaped taupe unit, marble top, integrated basin and a gilt-framed mirror" },
          "02": { titolo: "Walnut drawers on legs",
                 testo: "A unit on legs, lifted off the floor: you can clean underneath and the floor reads whole. The walnut is treated for humidity before assembly, not after.",
                 alt: "Walnut bathroom unit with three deep drawers on metal legs, a countertop basin, a towel rail and a mirror" },
          "03": { titolo: "Solid shelf, basin on top",
                 testo: "A single board at full thickness, with the towel rail cut into the solid timber itself. No structure underneath: the shelf carries itself.",
                 alt: "Thick solid walnut shelf with a white countertop basin and a towel rail cut into the timber" },
          "04": { titolo: "Loft bathroom with a glass shower",
                 testo: "Under a sloping roof every centimetre has to be negotiated. The shower goes where the roof is high, the unit where it is low, and the mirror cabinet reclaims the depth of the wall.",
                 alt: "Loft bathroom with a glass shower enclosure, a dark two-drawer wall-hung unit and a mirror cabinet" },
          "05": { titolo: "Zebrano on a white base",
                 testo: "The zebrano top is the only warm piece in the bathroom, and that is enough. Below it the white lacquered base disappears; the basin is semi-recessed, flush with the timber.",
                 alt: "Close-up of a zebrano timber top on a wall-hung white base with a semi-recessed basin" },
          "06": { titolo: "Wall-hung, with pendants",
                 testo: "A white wall-hung unit and a gilt mirror inherited from a grandmother: the antique frame was the starting point, and everything else was kept deliberately quiet.",
                 alt: "Bathroom with a white two-drawer wall-hung unit, a countertop basin, a gilt-framed mirror and pendant lights" }
        },
        specs: [
          ["Units",      "Heat-treated oak, polyurethane lacquer, HPL"],
          ["Basins",     "Stone, Dekton, integrated Cielo ceramic"],
          ["Brassware",  "Brushed bronze, steel, matt black"],
          ["Mirrors",    "Backlit, demisting, cabinet"],
          ["Lead time",  "5–8 weeks from sign-off"]
        ]
      },
      {
        id: "hospitality",
        href: "collezione-hospitality.html",
        name: "Hospitality",
        text: "Hotels, restaurants, offices and retail. Receptions, curved counters, corridor panelling, room furniture in repeatable series. We build to specification and meet the fire reaction classes the use of the building requires.",
        image: "assets/img/coll-hospitality.jpg",
        imageAlt: "Hotel reception with a curved counter in vertical oak slats, a stone top, lit recesses and an olive tree by the glazing",
        cartella: "assets/img/collezioni/hospitality",
        descrizioni: {
          "01": { titolo: "A table looking at the Arena",
                 testo: "The flat looks onto the Arena, so the furniture stepped aside. A round table, low chairs, and nothing above the sill to cut across the view.",
                 alt: "Dining room of a flat with a laid round table and windows facing the Verona Arena" },
          "02": { titolo: "Bedroom with the bath in it",
                 testo: "The bath sits in the bedroom, under the slope. The buttoned bed and the bath share the same light: that is a decision about where the structure goes, not an affectation.",
                 alt: "Attic bedroom with a whirlpool bath beside a buttoned bed, under white beams" },
          "03": { titolo: "Room, armchair and console",
                 testo: "A low oak console the full width of the wall: it works as a desk, a luggage rest and a base for the television. One repeatable series across every room on the floor.",
                 alt: "Hotel room with a pale armchair, a low oak console, a floor lamp and a wall-mounted TV" },
          "04": { titolo: "Studio flat, everything in six metres",
                 testo: "Kitchenette, wardrobe and sleeping area in a single white volume. For short lets what matters is that everything cleans quickly and does not break: the design starts there.",
                 alt: "Short-let studio flat with a white kitchenette, a flush wardrobe, shelves and a bed in the foreground" },
          "05": { titolo: "Breakfast on the peninsula",
                 testo: "A holiday-let kitchen: few pieces, all of them hard-wearing, and a peninsula that doubles as a table. The breakfast tray has a place of its own.",
                 alt: "Compact white kitchen with a peninsula, stools and breakfast served on trays" },
          "06": { titolo: "The table that disappears",
                 testo: "A small table on castors that slides under the bed: it serves breakfast, then it is gone. In a small room the best piece of furniture is the one that gets out of the way.",
                 alt: "Close-up of a bed with a sliding serving table, cushions and a water carafe on top" },
          "07": { titolo: "Loft on two levels",
                 testo: "Double height, a stair linking the two levels, a different colour on every wall. The furniture is fixed and anchored: in a short let nothing should be movable.",
                 alt: "Loft with a dining area, a connecting stair, a mezzanine and coloured walls across a double height space" },
          "08": { titolo: "Red living room, raking light",
                 testo: "One strong piece, the sofa, and everything else neutral. The curtains filter the afternoon light without putting it out.",
                 alt: "Living room of a flat with a red sofa, pale curtains, a dining table and pictures on the walls" },
          "09": { titolo: "Kitchen with a timber back",
                 testo: "The timber back panel warms up a kitchen that is otherwise all pale. The extractor is built into the wall unit: it pulls out when it is needed.",
                 alt: "Flat kitchen with a timber back panel, a pull-out extractor, pale wall units and an island" },
          "10": { titolo: "Clad stair, glass and light",
                 testo: "Timber cladding over the existing structure, a glass balustrade so the view stays open, light in the edge of the first few treads. You can go up in the dark.",
                 alt: "Timber-clad stair with a glass balustrade and LED built into the edge of the treads" }
        },
        specs: [
          ["Sectors",        "Hotels, restaurants, offices, retail"],
          ["Certification",  "Fire reaction classes on request"],
          ["Series",         "From 1 to 120 repeatable units"],
          ["On site",        "Phased installation with the building in use"],
          ["Lead time",      "To specification, agreed at tender stage"]
        ]
      },
      {
        id: "falegnameria",
        href: "collezione-falegnameria.html",
        name: "Cabinetmaking",
        text: "Special work, one-off pieces, restoration and repair. Stairs, curved work, exposed joinery, bringing family furniture back to life. This is the department that lets us say yes when everyone else says it cannot be done.",
        image: "assets/img/coll-falegnameria.jpg",
        imageAlt: "Close-up of a dovetail joint in solid oak with a chisel and a shaving on the bench",
        cartella: "assets/img/collezioni/falegnameria",
        descrizioni: {
          "01": { titolo: "Solid top, shaped edge",
                 testo: "The edge follows the natural shape of the board. Shaping by hand costs more than cutting straight: you do it when the board deserves to stay as it is.",
                 alt: "Rough solid timber top with a hand-shaped edge, mounted on a wall clad in antique timber" },
          "02": { titolo: "Walnut table in slats",
                 testo: "Walnut slats laid one against the next, chosen for their grain. The steel base is set back so the legs are where you need them, not where they happen to fall.",
                 alt: "Walnut table made of laid slats on a steel base, with an upholstered bench against the wall" },
          "03": { titolo: "Under the stone top",
                 testo: "The unit sits under the stone without touching it: there is a flexible joint between the two. Stone moves, timber moves, and this way they do not break each other.",
                 alt: "Close-up of an oak unit fitted under a stone top, with a drawer stack and a visible foot" },
          "04": { titolo: "Wall-hung bedside in antique timber",
                 testo: "A wall-hung drawer with a front in reclaimed antique timber. The fixing goes right through the wall: it takes the weight with no visible brackets.",
                 alt: "Wall-hung bedside drawer with an antique timber front, next to a multicoloured upholstered headboard" },
          "05": { titolo: "Antique panelling, new shelf",
                 testo: "The antique boards go on the wall, the new piece is white and wall-hung. The contrast is deliberate: when the new imitates the old, both of them lose.",
                 alt: "Horizontal antique timber panelling with a white wall-hung shelf-bedside and a coloured headboard" },
          "06": { titolo: "Lit channel in the oak",
                 testo: "The channel is there to open the drawer and it hides the line of light. Two jobs in the same cut, milled before the finish went on.",
                 alt: "Close-up of an oak drawer stack with a horizontal channel lit by integrated LED" },
          "07": { titolo: "Walk-in wardrobe, timber all round",
                 testo: "Walls, backs and shelves in the same species: inside the wardrobe you cannot see a centimetre of plaster. The rails are painted steel, sized for the real weight of winter coats.",
                 alt: "Walk-in wardrobe entirely clad in timber with black metal hanging rails and shelves" },
          "08": { titolo: "Fronts with horizontal channels",
                 testo: "The channels line up across the whole run: if one drawer is a millimetre out, you can see it. That is the kind of check we do at dry assembly, in the workshop.",
                 alt: "Close-up of oak drawer fronts with continuous horizontal channels milled into the timber" },
          "09": { titolo: "The high corner of the wardrobe",
                 testo: "Even the ceiling of the wardrobe is clad. It is the part nobody looks at, and it is the part that says whether the work was done or merely finished.",
                 alt: "Upper corner of a timber-clad walk-in wardrobe with a hanging rail and a matching ceiling" },
          "10": { titolo: "Drawers and shelves inside",
                 testo: "Shelves at different depths: knitwear can be tight, boxes want room. The heights get decided with you, standing in front of the old wardrobe.",
                 alt: "Walk-in wardrobe with an oak drawer stack, shelves at different depths and daylight from above" },
          "11": { titolo: "Pale timber, seat included",
                 testo: "A low seat inside the wardrobe: it is for doing up your shoes, and nobody ever asks for one until they have tried it.",
                 alt: "Pale timber walk-in wardrobe with shelves, hanging rail and a low seat built into the structure" },
          "12": { titolo: "One piece, on the wall",
                 testo: "Cut from a piece of antique timber, rounded and oiled by hand. These are the pieces that finish a project, and no catalogue can supply them.",
                 alt: "Close-up of a shaped and rounded antique timber plate mounted on a wall beside a fabric" }
        },
        specs: [
          ["Techniques", "Curved work, exposed joints, inlay, turning"],
          ["Restoration","Consolidation, replacement, hand finishing"],
          ["Species",    "Oak, walnut, ash, cherry, chestnut"],
          ["To drawing", "Including someone else's drawing, or a physical sample"],
          ["Lead time",  "By quotation, depending on the work"]
        ]
      }
    ]
  },

  /* ======================================================================
     DESIGN AND METHOD
     ====================================================================== */
  progettazione: {
    crumb: "Design",
    title: "How we work",
    lede: "Six stages, each one ending in something you can check. You always know where we are, who is working on it and what happens next.",
    headImage: "assets/img/head-progettazione.jpg",
    headImageAlt: "Design table with a pencil floor plan, timber and stone samples, fabrics and a technical pen",
    tone: "light",
    image: "assets/img/progettazione.jpg",
    imageAlt: "Work table with plan drawings, timber and stone samples, a square and a tape measure",
    steps: [
      {
        name: "Understanding what you need",
        text: "We come to you. We measure, photograph, check the services and how far out of square things are. And we ask how you live in the space: where you put your keys down, how many people cook at once, whether you work from home.",
        out: "Dimensioned survey and photographic report"
      },
      {
        name: "Design and rendering",
        text: "Technical drawings, three-dimensional views, materials schedule and a costing line by line. We review it together until the design is right. Revisions are included: we do not count them.",
        out: "Working drawings, renders and a detailed quotation"
      },
      {
        name: "Made in the workshop",
        text: "The design goes into the workshop. We order materials and appliances, cut, assemble and finish. We keep you posted with photographs of real progress, not with vague dates.",
        out: "Photographic updates every week"
      },
      {
        name: "Progress check",
        text: "We assemble everything in the workshop before it comes to your house, and we show you where we are. This is the stage that sets us apart: surprises get found and solved here, where we have the tools, not in your living room.",
        out: "Dimensional check and testing of every moving part"
      },
      {
        name: "Delivery, fittings and lighting",
        text: "Installation, connecting the appliances, configuring the automation, adjusting doors and drawers. We go through it room by room with you before we close the job.",
        out: "Signed handover and automation scenes configured"
      },
      {
        name: "Aftercare",
        text: "Adjusting doors after the first settling, spare parts, updates to the smart systems. The relationship does not end with the invoice: we are still here five years later.",
        out: "Call-out visits and spare parts guaranteed over time"
      }
    ]
  },

  /* ======================================================================
     SMART LIVING
     ====================================================================== */
  smart: {
    crumb: "Smart Living",
    title: "Automation inside the furniture,<br>not on top of the wall",
    lede: "We build environmental control and connected appliances into the furniture design. If you can see the technology, we installed it badly.",
    headImage: "assets/img/head-smart-living.jpg",
    headImageAlt: "A built-in oven lit up with its cooking display, and an induction hob, set into an oak kitchen in low light",
    tone: "dark",
    blocks: [
      {
        name: "Environmental control",
        text: "Lights, climate, curtains, blinds and irrigation on a single logic. The scenes follow your day: waking, leaving, dinner, night. You set them once and then they work.",
        specs: [
          ["Protocols", "KNX over cable, Zigbee and Matter over wireless"],
          ["Controls",  "Flush wall switches, recessed displays, app, voice"],
          ["Scenes",    "Unlimited, and you can change them yourself"]
        ]
      },
      {
        name: "Connected appliances",
        text: "Ovens, extractors, wine cabinets, dishwashers and induction hobs from our partners, built into the furniture and reachable from the same interface. An extractor that comes on when you turn on the hob is a trivial detail that nobody ever bothers to configure.",
        specs: [
          ["Brands",       "Gaggenau, Neff and other partners in the group"],
          ["Integration",  "Flush fitted, cabling hidden inside the structure"],
          ["Automations",  "Hob-to-extractor, pre-heating, off-peak start"]
        ]
      },
      {
        name: "Efficiency you can measure",
        text: "Consumption monitored circuit by circuit and regulated automatically. The house switches off what nobody needs and moves loads into the cheaper hours. If you have solar, it uses your own power before drawing from the grid.",
        specs: [
          ["Metering",     "Consumption per circuit, history and monthly comparison"],
          ["Optimisation", "Load shifting and self-consumption"],
          ["Climate",      "Zoned thermostats with time programming"]
        ]
      },
      {
        name: "It works offline too",
        text: "Every scene keeps running locally. If the line goes down, or if the manufacturer shuts its cloud server five years from now, the house still answers. That is why we prefer KNX wherever the budget allows.",
        specs: [
          ["Logic",        "Processed locally, cloud only for remote access"],
          ["Continuity",   "Physical controls always work"],
          ["Longevity",    "No subscription needed for the basic functions"]
        ]
      }
    ]
  },

  /* ======================================================================
     THE COMPANY
     ====================================================================== */
  azienda: {
    crumb: "Company",
    title: "Three generations<br>in the same workshop",
    lede: "Agostino opened the workshop in Pescantina in 1969. The machines have changed since then, and so have the materials and the clients. The method has not.",
    headImage: "assets/img/head-azienda.jpg",
    storyImage: "assets/img/story-azienda.jpg",
    storyImageAlt: "Three moments overlaid: the workshop with its bench and tools, a pencil technical drawing, the finished studio with materials on the table",
    headImageAlt: "From the cabinetmaker's bench with plane and shavings, through timber samples, to the finished kitchen: the journey from workshop to home",
    tone: "light",
    chapters: [
      {
        year: "1932",
        title: "Agostino",
        text: "Agostino Corso is born in Verona and shows an unusual pair of hands from the start. He learns the trade in a workshop, the way it was learned then: by watching, getting it wrong and doing it again."
      },
      {
        year: "1969",
        title: "The workshop",
        text: "He opens the cabinetmaking workshop in Pescantina. He works to commission for families in the area: windows, dressers, stairs. The reputation gets built house by house, without advertising."
      },
      {
        year: "1990",
        title: "Tiziano, second generation",
        text: "His son Tiziano, an architect, takes the business over after a childhood spent among the shavings. He brings technical drawing and the idea that the design is worth as much as the making: from a workshop to a studio that designs and builds."
      },
      {
        year: "2004",
        title: "From furniture to rooms",
        text: "The company stops selling pieces and starts designing whole rooms. This is when the structured partnerships with the Italian design brands begin — the ones we still work alongside our own production today."
      },
      {
        year: "2017",
        title: "Elisabetta, third generation",
        text: "Agostino's eldest granddaughter joins the company as an interior designer. She brings the eye of someone who grew up with the trade at home but looks at it from outside: the project explained to the client, not only drawn, and attention to how a space is really lived in."
      },
      {
        year: "2017",
        title: "The studio",
        text: "In the same year we turn part of the workshop into a place where clients can see, touch and decide. It is also the proof of how we design: we did it for ourselves with the same method we use for you."
      },
      {
        year: "2019",
        title: "Clients for dinner",
        text: "We start inviting clients to demonstration dinners in the studio, with chefs cooking on the appliances they are about to own and explaining, hands on, what they actually do. You judge an oven by using it, not from a spec sheet. And it turns out the best way to get to know a project is to spend an evening inside it, in company."
      },
      {
        year: "2021",
        title: "Solar",
        text: "We install the array on the workshop roof: from here the plant generates its own electricity. Together with the rest of it — timber from responsibly managed forests, water-based finishes, offcuts going back into the cycle — it costs more than doing otherwise, and we do it anyway. The Earth is our first home."
      },
      {
        year: "Today",
        title: "Looking ahead",
        text: "Design, cabinetmaking, rendering and automation under one roof. One point of contact from the first survey to the aftercare, with no middlemen and nobody else to blame."
      }
    ],
    values: [
      { label: "No middlemen",       text: "We design, build and install it ourselves. If something is not right, you know who to ask." },
      { label: "A quote you can read", text: "Line by line, no opaque lump sums. What is excluded is written down as excluded." },
      { label: "Dry assembly",       text: "We assemble it in the workshop before we come to you. Surprises get paid for by us, in time." },
      { label: "We also say no",     text: "If the budget will not carry the project, we say so first. We would rather lose a job than hand over a mediocre one." }
    ]
  },

  /* ======================================================================
     THE STUDIO
     ====================================================================== */
  studio: {
    crumb: "The Studio",
    title: "Where decisions get made",
    lede: "In 2017 we turned part of the workshop into a double-height open space. It is not a showroom: it is the place where you sit down and look at materials in the right light.",
    headImage: "assets/img/head-studio.jpg",
    headImageAlt: "The studio table with timber, stone and fabric samples laid side by side next to a technical drawing, raking light from the glazing",
    tone: "dark",
    blocks: [
      {
        name: "Inside",
        text: "An industrial open space made by opening up the existing ceiling. A stair shaped like a pair of compasses links the ground floor to the first, where the design office and the materials room are. Solid and void are worked out so the light reaches all the way in."
      },
      {
        name: "The materials room",
        text: "Samples of timber, stone, laminate and fabric laid out on generous surfaces, not in catalogues to leaf through. You judge a timber over a square metre with daylight on it, not on a postage stamp under a fluorescent tube."
      },
      {
        name: "Outside",
        text: "The garden is kept with seasonal flowers and local species. The new main entrance moved the way in and gave the company a face you can recognise from the road."
      }
    ],
    visit: {
      title: "Come and see",
      text: "The studio is open by appointment, Saturday mornings included. Bring your floor plans if you have them: it is easier to think with the drawings on the table.",

      /* The photographs are not listed anywhere: they live in the folder
         assets/img/studio and the site counts them itself. They are the
         same ones behind the home page title, in a different order. The
         optional captions are in content/site.en.js, under fotoStudio. */
    }
  },

  /* ======================================================================
     EVENTS AND INITIATIVES

     Same warning as the Italian file: the entries under "prossimi" and
     "passati" are SAMPLES. While they carry "esempio: true" the site marks
     them in yellow and warns at the top of the page, so they cannot pass
     for real dates. Change the text and delete that line to make one real.

     The "iniziative" are real: they come from the company presentation and
     they do not need dates.
     ====================================================================== */
  eventi: {
    crumb: "Events",
    title: "What happens<br>outside the project",
    lede: "Demonstration evenings, open days, meetings with the people who make what we install. And the things we keep going all year, with no date on them.",
    headImage: "assets/img/head-azienda.jpg",
    headImageAlt: "The design table in the studio laid for a demonstration evening, with samples and drawings still resting to one side",
    tone: "dark",

    avviso: "The appointments below are layout samples, not real dates. They are replaced in content/pages.en.js.",

    prossimi: {
      label: "Coming up",
      title: "Next appointments",
      vuoto: "Nothing in the diary at the moment. The studio is still open to visit by appointment, Saturday mornings included.",
      voci: [
        {
          esempio: true,
          data: "Friday 18 September, 7pm",
          dataISO: "2026-09-18",
          titolo: "Demonstration dinner in the studio",
          luogo: "Studio Corso Arredi, Via Nassar 42",
          testo: "A chef cooks on the ovens and hobs you might end up with at home, and explains as he goes what really changes from one model to the next. You judge an oven by using it, not from a spec sheet."
        },
        {
          esempio: true,
          data: "Saturday 10 October, 9am to 1pm",
          dataISO: "2026-10-10",
          titolo: "Open workshop",
          luogo: "Workshop, Settimo di Pescantina",
          testo: "The workshop open to anyone who wants to see how a door is made: the machines, the panels, the dry assembly. No appointment, just come and look."
        }
      ]
    },

    iniziative: {
      label: "All year round",
      title: "Initiatives without a date",
      testo: "These are not events and they do not end: they are commitments the company has made and keeps.",
      voci: [
        { name: "Our own electricity",
          text: "The solar array on the roof makes the plant self-sufficient. The energy we build your furniture with is energy we generate ourselves." },
        { name: "Circular economy",
          text: "Offcuts go back into production instead of into landfill. A responsible way of making things, not a statement about one." },
        { name: "Continuous training",
          text: "The team keeps up with new techniques and new materials. A workshop that stops learning becomes an archive." },
        { name: "The studio is always open",
          text: "By appointment, Saturday mornings included. Bring your floor plans if you have them: it is easier to think with the drawings on the table." }
      ]
    },

    passati: {
      label: "Archive",
      title: "Already happened",
      voci: [
        {
          esempio: true,
          data: "May 2026",
          titolo: "An evening on natural stone",
          testo: "Forty people, a fan display of slabs and two hours spent arguing about veining. You choose stone by looking at whole slabs, not at a ten-centimetre sample."
        },
        {
          esempio: true,
          data: "November 2025",
          titolo: "A talk on automation you cannot see",
          testo: "What it really means to build the systems into the furniture, and what happens when the line goes down."
        }
      ]
    }
  },

  /* ======================================================================
     GET IN TOUCH
     ====================================================================== */
  contatti: {
    crumb: "Get in touch",
    title: "Let’s talk about your project",
    lede: "Answer what you like and skip the rest: one contact detail is enough. The more you tell us, the more useful our first reply will be instead of generic.",
    headImage: "assets/img/head-contatti.jpg",
    headImageAlt: "Pale stone desk with a notebook and pen, a ceramic cup, an open laptop and a plant beside the glazing",
    tone: "light",
    hours: [
      { days: "Monday — Friday", time: "8:30 – 12:30 · 14:30 – 19:00" },
      { days: "Saturday",        time: "8:30 – 12:30 by appointment" },
      { days: "Sunday",          time: "Closed" }
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Via+Nassar+42+37026+Pescantina+VR",

    /* Each step is a question with ready answers. "riepilogo" is the
       fragment that answer adds to the final sentence: %s is replaced by
       the label chosen. English needs its own fragments — the Italian
       ones are built around a different word order. */
    steps: [
      {
        id: "ambito",
        label: "What it is",
        question: "What would you like to work on?",
        hint: "Pick more than one if you need to.",
        multi: true,
        options: [
          { v: "cucina",    l: "Kitchen",            r: "a kitchen" },
          { v: "living",    l: "Living or bookcase", r: "a living room" },
          { v: "notte",     l: "Bedroom",            r: "a bedroom" },
          { v: "bagno",     l: "Bathroom",           r: "a bathroom" },
          { v: "casa",      l: "A whole house",      r: "a whole house" },
          { v: "hospitality", l: "Hotel or restaurant", r: "a hospitality space" },
          { v: "ufficio",   l: "Office or shop",     r: "an office or a shop" },
          { v: "speciale",  l: "Special work",       r: "a special commission" }
        ],
        riepilogo: "You are thinking about %s"
      },
      {
        id: "stato",
        label: "The property",
        question: "What stage is the space at?",
        options: [
          { v: "nuovo",       l: "New build",                 r: "in a new build" },
          { v: "ristruttura", l: "Being renovated",           r: "in a property being renovated" },
          { v: "abitato",     l: "Lived in, changing the furniture", r: "in a house already lived in" },
          { v: "trattativa",  l: "Not mine yet",              r: "in a property that is not yours yet" }
        ],
        riepilogo: "%s"
      },
      {
        id: "superficie",
        label: "Size",
        question: "Roughly how big is it?",
        hint: "An estimate is fine: it is only to get the scale of the job.",
        options: [
          { v: "fino20",   l: "Up to 20 m²",   r: "of around twenty square metres" },
          { v: "20-50",    l: "20 – 50 m²",    r: "between 20 and 50 m²" },
          { v: "50-100",   l: "50 – 100 m²",   r: "between 50 and 100 m²" },
          { v: "100-200",  l: "100 – 200 m²",  r: "between 100 and 200 m²" },
          { v: "oltre200", l: "Over 200 m²",   r: "over 200 m²" }
        ],
        libero: {
          label: "Or write the measurement",
          placeholder: "for example: 68 m² plus a terrace",
          r: "of %s"
        },
        riepilogo: "%s"
      },
      {
        id: "budget",
        label: "Budget",
        question: "What order of magnitude do you have in mind?",
        hint: "Telling us now saves both of us time.",
        options: [
          { v: "aperto",   l: "Still working it out",  r: "with a budget still to be set" },
          { v: "fino15",   l: "Up to €15,000",         r: "with a budget under €15,000" },
          { v: "15-35",    l: "€15,000 – €35,000",     r: "with a budget between €15,000 and €35,000" },
          { v: "35-70",    l: "€35,000 – €70,000",     r: "with a budget between €35,000 and €70,000" },
          { v: "70-150",   l: "€70,000 – €150,000",    r: "with a budget between €70,000 and €150,000" },
          { v: "oltre150", l: "Over €150,000",         r: "with a budget over €150,000" }
        ],
        libero: {
          label: "Or say it your own way",
          placeholder: "for example: €40,000 for the kitchen, the rest later",
          r: "with a budget of %s"
        },
        riepilogo: "%s"
      },
      {
        id: "tempi",
        label: "Timing",
        question: "When would you like it finished?",
        options: [
          { v: "3mesi",   l: "Within three months", r: "to be finished within three months" },
          { v: "6mesi",   l: "Within six months",   r: "to be finished within six months" },
          { v: "anno",    l: "Within the year",     r: "to be finished within the year" },
          { v: "nofretta", l: "No rush",            r: "with no tight deadline" }
        ],
        libero: {
          label: "Or give a date",
          placeholder: "for example: ready for the move in March",
          r: "%s"
        },
        riepilogo: "%s"
      },
      {
        id: "interessi",
        label: "What matters to you",
        question: "Is there anything you particularly care about?",
        hint: "Optional, but it helps us prepare the right answer.",
        multi: true,
        options: [
          { v: "smart",     l: "Smart living",         r: "smart living" },
          { v: "elettro",   l: "Integrated appliances", r: "integrated appliances" },
          { v: "materiali", l: "Materials and finishes", r: "the choice of materials" },
          { v: "sumisura",  l: "Bespoke work",         r: "bespoke work" },
          { v: "luce",      l: "Integrated lighting",  r: "integrated lighting" },
          { v: "sostenibile", l: "Sustainable choices", r: "sustainable choices" }
        ],
        riepilogo: "with particular attention to %s"
      }
    ],

    contatto: {
      question: "How should we reply?",
      hint: "One contact detail is enough, email or phone. We answer within one working day and we do not run a newsletter.",
      opzionaliTitolo: "The rest is optional",
      opzionaliNota: "It only helps us answer you more precisely."
    },

    appuntamento: {
      titolo: "Come and see us",
      testo: "An hour in the studio, with no obligation: we look at the plans, handle the materials and work out whether we understand each other. Choose whenever suits you.",
      durataMinuti: 60,
      luoghi: [
        { v: "studio",   l: "At our studio",   r: "at the studio in Pescantina" },
        { v: "cantiere", l: "At your place",   r: "at your place" },
        { v: "video",    l: "By video call",   r: "by video call" }
      ],
      nessunOrario: "We are fully booked that day. Try another one: slots open up often.",
      confermaTitolo: "Appointment chosen",
      annulla: "Change",
      question: "When shall we meet?"
    },

    riepilogoTitolo: "Here is what we understood",
    riepilogoVuoto: "Answer at least one step and your enquiry will appear here, in the words we will use to reply.",

    form: {
      action: "",
      note: "Your details are only used to reply to you. We do not run a newsletter and we do not pass addresses to anyone.",
      success: "Message sent. We will reply within one working day.",
      offline: "The form is not connected to the server yet. In the meantime write to info@corsoarredi.com or call +39 045 715 1234.",

      esito: {
        richiesta: {
          titolo: "Your enquiry is ready",
          testo: "We will reply within one working day, to what you have actually told us."
        },
        appuntamento: {
          titolo: "Appointment requested",
          testo: "We will confirm your slot by email or phone. If anything changes in the meantime, a message is enough."
        },
        mailtoLabel: "Open it in your email",
        mailtoNota: "The form is not connected to the server yet: this button prepares the same email in your mail programme, already written. All you have to do is send it.",
        ricomincia: "Fill in another enquiry"
      }
    }
  },

  /* ======================================================================
     PRIVACY
     ====================================================================== */
  privacy: {
    crumb: "Privacy",
    title: "Privacy policy",
    lede: "This page explains what data we collect and why. It is a draft, to be checked by a lawyer before publication.",
    sections: [
      {
        h: "Data controller",
        p: ["Corso Arredi, Via Nassar 42, 37026 Pescantina (VR), Italy. VAT IT04496820236. For anything concerning your data, write to info@corsoarredi.com."]
      },
      {
        h: "What we collect",
        p: ["We only collect what you give us through the contact form: your name, your email, your phone number if you provide it, and the content of your message."],
        ul: ["No profiling cookies", "No advertising trackers", "Nothing passed to third parties for commercial purposes"]
      },
      {
        h: "Why we use it",
        p: ["To reply to you and, if the relationship continues, to manage the quotation and the job. Legal basis: your consent for the first contact, performance of the contract for what follows."]
      },
      {
        h: "For how long",
        p: ["If the contact goes no further, we delete the data within 24 months. If you become a client, we keep it for as long as tax and warranty obligations require."]
      },
      {
        h: "Your rights",
        p: ["At any time you can ask to see your data, correct it, delete it or restrict how it is processed, and you can object to the processing itself. Write to info@corsoarredi.com: we answer within 30 days."]
      },
      {
        h: "Third-party services",
        p: ["The site loads the Inter typeface from Google Fonts, which means a connection to Google's servers. If you would rather avoid it, the font can be hosted locally: it is a few minutes' work."]
      }
    ]
  }
};
