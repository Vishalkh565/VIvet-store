export interface Product {
  id: string;
  shopifyHandle: string;
  name: string;
  subName: string;
  price: string;
  category: string;
  description: string;
  imagePath: string;
  themeColor: string;
  textContrastColor: string;
  gradient: string;
  features: string[];
  sizes: string[];
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
  craftsmanshipSection: { title: string; description: string };
  buyNowSection: {
    price: string;
    unit: string;
    materialParams: string[];
    deliveryPromise: string;
    returnPolicy: string;
  };
}

export const products: Product[] = [
  {
    id: "maison-tropicale-shirt",
    shopifyHandle: "the-golden-fern-resort-shirt",
    name: "Maison Tropicale Shirt",
    subName: "The signature piece.",
    price: "₹3,500",
    category: "Apparel",
    description: "Gold palm embroidery - Camp collar - Est. 2024",
    imagePath: "/images/maison-shirt",
    themeColor: "#C8A84B",
    textContrastColor: "#8D732E",
    gradient: "linear-gradient(135deg, #F5EDD8 0%, #C8A84B 100%)",
    features: ["Gold Palm Embroidery", "Camp Collar", "Resort Fit"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stats: [
      { label: "Material", val: "100% Viscose" },
      { label: "Origin", val: "India" },
      { label: "Edition", val: "Limited" },
    ],
    section1: { title: "Maison Tropicale.", subtitle: "The signature piece." },
    section2: {
      title: "Gold embroidery on ivory.",
      subtitle:
        "Hand-stitched palm leaf motifs across an ivory camp-collar shirt. Resort dressing elevated.",
    },
    section3: {
      title: "Worn at the water's edge.",
      subtitle:
        "Designed for the Maldives, made for everywhere. Light, breathable, unforgettable.",
    },
    section4: { title: "Est. 2024. Limited edition.", subtitle: "" },
    detailsSection: {
      title: "The Signature Shirt",
      description:
        "The VIIVET Maison Tropicale shirt is our founding garment. Ivory viscose base with gold-thread palm leaf embroidery on the collar, pocket, and body. The camp collar and relaxed resort fit make it equally at home on a sun deck or at a private dinner. Every stitch is a deliberate statement of where craft meets tropical ease.",
      imageAlt: "Maison Tropicale Shirt Detail",
    },
    craftsmanshipSection: {
      title: "Made with intention",
      description:
        "Each Maison Tropicale shirt is cut and sewn in small batches. The gold embroidery is applied by hand by artisans in Jaipur, India. We do not mass produce. When a run sells out, it is gone. This is not a product — it is a moment in time you can wear.",
    },
    buyNowSection: {
      price: "₹3,500",
      unit: "per piece",
      materialParams: ["Hand Embroidered", "Small Batch", "Resort Fit"],
      deliveryPromise:
        "Ships within 3 business days. Delivered in VIIVET branded gift packaging with a wax-sealed card.",
      returnPolicy:
        "If it does not fit perfectly, we will exchange it. No questions asked within 14 days.",
    },
  },
  {
    id: "burgundy-shirt",
    shopifyHandle: "the-midnight-bordeaux-silk-shirt",
    name: "Burgundy Satin Shirt",
    subName: "Dressed without effort.",
    price: "₹3,500",
    category: "Apparel",
    description: "Satin finish - French cuffs - Gold cufflinks included",
    imagePath: "/images/burgundy-shirt",
    themeColor: "#6B1A2A",
    textContrastColor: "#F4C7CD",
    gradient: "linear-gradient(135deg, #8B2035 0%, #3D0A14 100%)",
    features: ["Satin Finish", "French Cuffs", "Cufflinks Included"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stats: [
      { label: "Fabric", val: "Satin Weave" },
      { label: "Cuffs", val: "French" },
      { label: "Finish", val: "Lustrous" },
    ],
    section1: { title: "Burgundy Satin.", subtitle: "Dressed without effort." },
    section2: {
      title: "Deep burgundy. High lustre.",
      subtitle:
        "A satin weave shirt that catches light the way it should — dramatically and elegantly.",
    },
    section3: {
      title: "Gold cufflinks. Included.",
      subtitle:
        "Every VIIVET Burgundy Shirt comes with a boxed set of gold VIIVET cufflinks. Ready to wear.",
    },
    section4: { title: "For evenings worth remembering.", subtitle: "" },
    detailsSection: {
      title: "The Evening Shirt",
      description:
        "Deep burgundy satin with a subtle sheen that elevates any occasion. French cuffs finished with VIIVET gold cufflinks, included in every order. The cut is slim through the chest and shoulders with a slight ease at the torso — tailored without being restrictive. This is the shirt you reach for when the evening matters.",
      imageAlt: "Burgundy Satin Shirt Detail",
    },
    craftsmanshipSection: {
      title: "Precision and polish",
      description:
        "The VIIVET Burgundy Shirt is cut from a high-thread-count satin weave fabric that drapes cleanly and resists creasing. French cuffs are interfaced for structure. Every shirt is finished with a hand-pressed collar and packed flat in tissue inside a VIIVET black gift box.",
    },
    buyNowSection: {
      price: "₹3,500",
      unit: "includes gold cufflinks",
      materialParams: ["Satin Weave", "French Cuff", "Gift Boxed"],
      deliveryPromise:
        "Arrives in VIIVET black gift box. Ships within 2 business days.",
      returnPolicy:
        "14-day exchange on sizing. Unworn and in original packaging.",
    },
  },
  {
    id: "camel-trousers",
    shopifyHandle: "the-riviera-pleated-trouser",
    name: "Camel Tailored Trousers",
    subName: "Refined ease.",
    price: "₹4,500",
    category: "Apparel",
    description: "Pleated front - Relaxed taper - VIIVET woven label",
    imagePath: "/images/camel-trousers",
    themeColor: "#A37B54",
    textContrastColor: "#3D2B1A",
    gradient: "linear-gradient(135deg, #C29B72 0%, #8B633C 100%)",
    features: ["Relaxed Taper", "Camel Wool Blend", "Single Pleat"],
    sizes: ["28", "30", "32", "34", "36"],
    stats: [
      { label: "Cut", val: "Relaxed Taper" },
      { label: "Front", val: "Pleated" },
      { label: "Waist", val: "Mid Rise" },
    ],
    section1: { title: "Camel Trousers.", subtitle: "Refined ease." },
    section2: {
      title: "The trouser that does everything.",
      subtitle:
        "A pleated camel trouser that moves between resort and dinner without changing.",
    },
    section3: {
      title: "Tailored but never stiff.",
      subtitle:
        "Relaxed through the seat and thigh, tapering to a clean ankle — the silhouette of confidence.",
    },
    section4: { title: "Wear them everywhere.", subtitle: "" },
    detailsSection: {
      title: "The Versatile Trouser",
      description:
        "Cut from a camel-toned wool-blend fabric with natural drape and texture. A single pleat at the front creates fullness through the thigh. The relaxed taper brings the leg in cleanly toward the ankle. Finished with a VIIVET woven label at the waistband and a leather-tipped drawcord inside.",
      imageAlt: "Camel Trousers Detail",
    },
    craftsmanshipSection: {
      title: "Cut to last",
      description:
        "VIIVET trousers are patterned and graded in-house for a fit that works across body types without compromising the silhouette. The camel fabric is sourced from a mill in Ludhiana known for its fine suiting cloths. Every pair is pressed flat and folded with tissue before packaging.",
    },
    buyNowSection: {
      price: "₹4,500",
      unit: "per pair",
      materialParams: ["Wool Blend", "Relaxed Taper", "Pleated Front"],
      deliveryPromise:
        "Ships folded flat in a VIIVET cream envelope box with a wax seal.",
      returnPolicy:
        "Free size exchange within 14 days. Must be unworn with original tags.",
    },
  },
  {
    id: "cable-knit-sweater",
    shopifyHandle: "the-espresso-heirloom-cable-knit",
    name: "Cable Knit Sweater",
    subName: "Warmth with character.",
    price: "₹15,000",
    category: "Apparel — Limited Edition",
    description: "Dark chocolate - Heavy cable knit - VIIVET chest logo",
    imagePath: "/images/cable-knit",
    themeColor: "#3E2723",
    textContrastColor: "#D6BCA2",
    gradient: "linear-gradient(135deg, #4E342E 0%, #21110B 100%)",
    features: ["Heavy Cable Knit", "VIIVET Logo", "Limited Edition"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stats: [
      { label: "Knit", val: "Heavy Cable" },
      { label: "Color", val: "Dark Choc" },
      { label: "Edition", val: "Limited" },
    ],
    section1: {
      title: "Cable Knit Sweater.",
      subtitle: "Warmth with character.",
    },
    section2: {
      title: "Dark chocolate. Heavy knit.",
      subtitle:
        "A sweater with real weight and real warmth. Cable knit texture that tells you it is made properly.",
    },
    section3: {
      title: "The VIIVET limited edition.",
      subtitle:
        "Comes gift-boxed with a VIIVET wax seal envelope. A purchase worth keeping.",
    },
    section4: { title: "Made to be worn for years.", subtitle: "" },
    detailsSection: {
      title: "The Heritage Knit",
      description:
        "The VIIVET Cable Knit Sweater is a limited edition piece. Dark chocolate in color, heavy in hand, and built to be the sweater you reach for on every cool evening. The VIIVET wordmark is embroidered in tonal thread on the left chest. It arrives in a VIIVET black gift box with gold tissue and a wax-sealed card.",
      imageAlt: "Cable Knit Sweater Detail",
    },
    craftsmanshipSection: {
      title: "Knitted in small batches",
      description:
        "This sweater is produced in very limited quantities each season. The heavy cable knit is worked on traditional flatbed machines for maximum stitch definition. Once this run is gone, there is no restock. If you are reading this and it is still available — that is your sign.",
    },
    buyNowSection: {
      price: "₹15,000",
      unit: "limited edition — per piece",
      materialParams: ["Heavy Cable Knit", "Gift Boxed", "Limited Run"],
      deliveryPromise:
        "Arrives in VIIVET black gift box with gold tissue. Ships within 3 business days.",
      returnPolicy:
        "Limited edition — exchanges on sizing only within 7 days of delivery.",
    },
  },
  {
    id: "cognac-belt",
    shopifyHandle: "the-burnished-chestnut-leather-belt",
    name: "Cognac Leather Belt",
    subName: "Crafted to last a lifetime.",
    price: "₹8,000",
    category: "Leather Goods",
    description: "Full grain leather - Brass buckle - VIIVET engraved",
    imagePath: "/images/cognac-belt",
    themeColor: "#8B4513",
    textContrastColor: "#F4CDA6",
    gradient: "linear-gradient(135deg, #A0522D 0%, #5C2E0A 100%)",
    features: ["Full Grain Leather", "Brass Buckle", "VIIVET Engraved"],
    sizes: ["32", "34", "36", "38", "40"],
    stats: [
      { label: "Leather", val: "Full Grain" },
      { label: "Buckle", val: "Solid Brass" },
      { label: "Origin", val: "India" },
    ],
    section1: {
      title: "Cognac Leather Belt.",
      subtitle: "Crafted to last a lifetime.",
    },
    section2: {
      title: "Full grain. Nothing hidden.",
      subtitle:
        "Full grain cognac leather that will age and patina with every wear — becoming more yours over time.",
    },
    section3: {
      title: "VIIVET brass. Solid and engraved.",
      subtitle:
        "A solid brass buckle with VIIVET engraved on the keeper. The kind of detail you notice up close.",
    },
    section4: { title: "The only belt you will need.", subtitle: "" },
    detailsSection: {
      title: "Full Grain Leather",
      description:
        "The VIIVET Cognac Belt is cut from a single piece of full grain leather — the highest grade available. No splitting, no correcting, no hiding. The natural surface marks and grain patterns are part of the story. The brass buckle is cast solid and engraved with the VIIVET name. This belt will outlast the clothes you wear it with.",
      imageAlt: "Cognac Belt Detail",
    },
    craftsmanshipSection: {
      title: "Built to age beautifully",
      description:
        "Full grain leather develops a patina over time — deepening in color and character the more it is worn. We finish the edges by hand and burnish them smooth. The stitching is saddle-stitched in waxed linen thread for strength that machine stitching cannot match.",
    },
    buyNowSection: {
      price: "₹8,000",
      unit: "per belt",
      materialParams: ["Full Grain Leather", "Saddle Stitched", "Brass Engraved"],
      deliveryPromise:
        "Rolled and delivered in a VIIVET kraft tube with branded tag. Ships within 2 business days.",
      returnPolicy:
        "If the sizing is wrong, we exchange it. One exchange per order within 14 days.",
    },
  },
  {
    id: "green-card-holder",
    shopifyHandle: "the-cypress-green-leather-card-case",
    name: "Forest Green Card Holder",
    subName: "Minimal. Essential. Perfect.",
    price: "₹4,500",
    category: "Leather Goods",
    description: "Forest green leather - 6 card slots - VIIVET debossed",
    imagePath: "/images/green-cardholder",
    themeColor: "#2C4A25",
    textContrastColor: "#A8D1A3",
    gradient: "linear-gradient(135deg, #3A6031 0%, #1A2F15 100%)",
    features: ["6 Card Slots", "VIIVET Debossed", "Slim Profile"],
    sizes: ["One Size"],
    stats: [
      { label: "Slots", val: "6 Cards" },
      { label: "Thickness", val: "6mm" },
      { label: "Leather", val: "Smooth" },
    ],
    section1: {
      title: "Forest Green Card Holder.",
      subtitle: "Minimal. Essential. Perfect.",
    },
    section2: {
      title: "Six cards. Zero bulk.",
      subtitle:
        "A slim forest green leather card holder that carries everything you need and nothing you do not.",
    },
    section3: {
      title: "VIIVET debossed in the leather.",
      subtitle:
        "The VIIVET name pressed into the face of the leather — subtle, permanent, unmistakable.",
    },
    section4: { title: "The card holder that gets noticed.", subtitle: "" },
    detailsSection: {
      title: "Slim and Considered",
      description:
        "The VIIVET Forest Green Card Holder is made from smooth vegetable-tanned leather in a deep forest green. Six card slots are cleanly divided — three per side — with a central access pocket for your most-used card. The VIIVET name is debossed into the front face without foil or paint. Pure leather impression.",
      imageAlt: "Forest Green Card Holder Detail",
    },
    craftsmanshipSection: {
      title: "Precision cut and finished",
      description:
        "Every card holder is cut from a single panel of leather — no joins, no seams on the face. The edges are painted and burnished to a smooth finish. The stitching is a single thread run in a matching forest green. It arrives in a VIIVET matchbox-style slide box with a branded card inside.",
    },
    buyNowSection: {
      price: "₹4,500",
      unit: "per card holder",
      materialParams: ["Vegetable Tanned", "Hand Finished", "Debossed Logo"],
      deliveryPromise:
        "Ships in VIIVET slide box. Ready to gift. Arrives within 3 business days.",
      returnPolicy:
        "Leather goods are non-returnable unless defective. Defects are replaced immediately.",
    },
  },
  {
    id: "camel-bifold",
    shopifyHandle: "the-heritage-pebbled-leather-bifold",
    name: "Camel Bifold Wallet",
    subName: "Quietly confident.",
    price: "₹8,000",
    category: "Leather Goods",
    description: "Camel leather - 8 card slots - Full cash compartment",
    imagePath: "/images/camel-bifold",
    themeColor: "#D4A345",
    textContrastColor: "#4E3711",
    gradient: "linear-gradient(135deg, #DEB887 0%, #A67623 100%)",
    features: ["8 Card Slots", "Full Cash Sleeve", "Gold Foil Logo"],
    sizes: ["One Size"],
    stats: [
      { label: "Slots", val: "8 Cards" },
      { label: "Style", val: "Bifold" },
      { label: "Leather", val: "Smooth Camel" },
    ],
    section1: { title: "Camel Bifold Wallet.", subtitle: "Quietly confident." },
    section2: {
      title: "Camel leather. Clean lines.",
      subtitle:
        "A full bifold wallet in smooth camel leather — structured, minimal, and built to carry everything with ease.",
    },
    section3: {
      title: "Eight cards. Full cash.",
      subtitle:
        "Eight card slots and a full-width cash compartment. Everything in its place, every time.",
    },
    section4: { title: "The wallet for every pocket.", subtitle: "" },
    detailsSection: {
      title: "The Classic Bifold",
      description:
        "The VIIVET Camel Bifold is the most versatile piece in our leather goods range. Smooth camel leather with clean topstitching and a structured fold. Eight card slots are organized into four-per-side sections. The cash compartment is full width. The VIIVET name is debossed on the front face and gold-foiled inside.",
      imageAlt: "Camel Bifold Wallet Detail",
    },
    craftsmanshipSection: {
      title: "Structured for daily use",
      description:
        "The VIIVET Bifold is reinforced at the spine fold with an additional leather layer — preventing the crease that ruins cheaper wallets over time. Card slots are pre-stretched during production so they open easily from day one. Arrives in a VIIVET white marble-effect gift box.",
    },
    buyNowSection: {
      price: "₹8,000",
      unit: "per wallet",
      materialParams: ["Smooth Leather", "Reinforced Spine", "Gift Boxed"],
      deliveryPromise:
        "Arrives in VIIVET marble gift box. Ships within 2 business days.",
      returnPolicy:
        "14-day exchange if sizing or color is not right. Unused and in original box.",
    },
  },
  {
    id: "tan-slim-wallet",
    shopifyHandle: "the-sandstone-calfskin-cardholder",
    name: "Tan Slim Card Wallet",
    subName: "Everything you need. Nothing more.",
    price: "₹5,500",
    category: "Leather Goods",
    description: "Pebbled tan leather - 5 slots - Slim carry",
    imagePath: "/images/tan-slim-wallet",
    themeColor: "#B8860B",
    textContrastColor: "#F8E4BC",
    gradient: "linear-gradient(135deg, #D4A017 0%, #8B6510 100%)",
    features: ["Pebbled Leather", "5 Card Slots", "Ultra Slim"],
    sizes: ["One Size"],
    stats: [
      { label: "Slots", val: "5 Cards" },
      { label: "Profile", val: "Ultra Slim" },
      { label: "Texture", val: "Pebbled" },
    ],
    section1: {
      title: "Tan Slim Wallet.",
      subtitle: "Everything you need. Nothing more.",
    },
    section2: {
      title: "Pebbled tan. Slim carry.",
      subtitle:
        "The pebbled texture gives grip and character. The slim form keeps your pocket clean.",
    },
    section3: {
      title: "Five slots. No compromise.",
      subtitle:
        "Five perfectly fitted card slots in a wallet that sits flat in any pocket — front or back.",
    },
    section4: { title: "The minimalist's choice.", subtitle: "" },
    detailsSection: {
      title: "The Slim Carry",
      description:
        "The VIIVET Tan Slim Wallet is for those who want the essentials and nothing more. Pebbled tan leather for grip and texture. Five card slots organized front-to-back. The profile at full capacity is under 8mm. VIIVET is gold-foiled on the interior. The wallet ships on a walnut display board with branded ribbon.",
      imageAlt: "Tan Slim Wallet Detail",
    },
    craftsmanshipSection: {
      title: "Slim by design",
      description:
        "The slim carry is harder to make than it looks. Slim wallets fail when the stitching adds bulk or the leather is too thick. VIIVET sources a 0.8mm pebbled leather specifically for this wallet. The stitching is inset — flush with the surface — so nothing adds thickness beyond the leather itself.",
    },
    buyNowSection: {
      price: "₹5,500",
      unit: "per wallet",
      materialParams: ["Pebbled Leather", "Inset Stitching", "Ultra Slim 8mm"],
      deliveryPromise:
        "Ships on walnut display board with VIIVET ribbon. Arrives within 2 business days.",
      returnPolicy:
        "Non-returnable unless defective. Defective pieces replaced immediately with no questions.",
    },
  },
];
