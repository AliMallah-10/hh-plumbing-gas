
import {
  CombiBoilerIcon,
  StandardBoilerIcon,
  SystemBoilerIcon,
  ElectricBoilerIcon,
  UnderfloorHeatingIcon,
  CylinderIcon,
  HeatPumpIcon,
  HybridHeatPumpIcon,
  InfoIcon,
} from "../components/icons/boiler-icons";

export const serviceTypes = [
  {
    id: "boiler-installation",
    name: "Boiler Installation",
    icon: <CombiBoilerIcon />,
  },
  {
    id: "heat-pump-installation",
    name: "Heat Pump Installation",
    icon: <HeatPumpIcon />,
  },
  {
    id: "underfloor-heating",
    name: "Underfloor Heating",
    icon: <UnderfloorHeatingIcon />,
  },
  {
    id: "cylinder-installation",
    name: "Cylinder Installation",
    icon: <CylinderIcon />,
  },
];

export const boilerTypes = [
  {
    id: "combi",
    name: "Combi",
    icon: <CombiBoilerIcon />,
    description: "Provides hot water on demand without a cylinder",
    startingPrice: 1800,
  },
  {
    id: "standard",
    name: "Standard",
    icon: <StandardBoilerIcon />,
    description: "Works with a hot water cylinder and cold water tank",
    startingPrice: 2000,
  },
  {
    id: "system",
    name: "System",
    icon: <SystemBoilerIcon />,
    description: "Works with a hot water cylinder but no cold water tank",
    startingPrice: 2200,
  },
  {
    id: "electric",
    name: "Electric",
    icon: <ElectricBoilerIcon />,
    description: "Uses electricity to heat water without gas",
    startingPrice: 1900,
  },
];

export const heatPumpTypes = [
  {
    id: "air-source",
    name: "Air Source",
    icon: <HeatPumpIcon />,
    description: "Extracts heat from the outside air",
    startingPrice: 3500,
  },
  {
    id: "ground-source",
    name: "Ground Source",
    icon: <HeatPumpIcon />,
    description: "Extracts heat from the ground via buried pipes",
    startingPrice: 6000,
  },
  {
    id: "hybrid",
    name: "Hybrid System",
    icon: <HybridHeatPumpIcon />,
    description: "Combines a heat pump with a traditional boiler",
    startingPrice: 4500,
  },
];

export const cylinderTypes = [
  {
    id: "direct",
    name: "Direct",
    icon: <CylinderIcon />,
    description: "Heated directly by an immersion heater",
    startingPrice: 1200,
  },
  {
    id: "indirect",
    name: "Indirect",
    icon: <CylinderIcon />,
    description: "Heated indirectly via a coil from your boiler",
    startingPrice: 1400,
  },
];

export const underfloorTypes = [
  {
    id: "wet",
    name: "Wet System",
    icon: <UnderfloorHeatingIcon />,
    description: "Uses hot water pipes under the floor",
    startingPrice: 3000,
  },
  {
    id: "electric",
    name: "Electric System",
    icon: <UnderfloorHeatingIcon />,
    description: "Uses electric heating elements under the floor",
    startingPrice: 2000,
  },
];

// Updated brands list - removed Ideal and Viessmann, added Main
export const brands = [
  {
    id: "vaillant",
    name: "Vaillant",
    logo: "/images/vaillant-logo-new.png",
    startingPrice: 2100,
    recommended: true,
  },
  {
    id: "worcester-bosch",
    name: "Worcester Bosch",
    logo: "/images/worcester-bosch-new.png",
    startingPrice: 2200,
  },
  {
    id: "baxi",
    name: "Baxi",
    logo: "/images/baxi-logo.png",
    startingPrice: 1900,
  },
  {
    id: "glow-worm",
    name: "Glow Worm",
    logo: "/images/glow-worm-logo.png",
    startingPrice: 1700,
  },
  {
    id: "main",
    name: "Main",
    logo: "/images/main-heating-logo.png",
    startingPrice: 1600,
  },
];

// Cylinder brands remain the same
export const cylinderBrands = [
  {
    id: "vaillant",
    name: "Vaillant",
    logo: "/images/vaillant-logo-new.png",
    startingPrice: 1600,
    recommended: true,
  },
  {
    id: "megaflo",
    name: "Megaflo",
    logo: "/images/megaflo-logo.png",
    startingPrice: 1500,
  },
  {
    id: "gledhill",
    name: "Gledhill",
    logo: "/images/gledhill-logo.png",
    startingPrice: 1400,
  },
];

// Updated heat pump brands - removed Nibe, LG, Samsung, added Baxi and Bosch
export const heatPumpBrands = [
  {
    id: "vaillant",
    name: "Vaillant",
    logo: "/images/vaillant-logo-new.png",
    startingPrice: 4100,
    recommended: true,
  },
  {
    id: "mitsubishi",
    name: "Mitsubishi Electric",
    logo: "/images/mitsubishi-logo.png",
    startingPrice: 4000,
  },
  {
    id: "daikin",
    name: "Daikin",
    logo: "/images/daikin-logo.png",
    startingPrice: 4200,
  },
  {
    id: "baxi",
    name: "Baxi",
    logo: "/images/baxi-logo.png",
    startingPrice: 3900,
  },
  {
    id: "bosch",
    name: "Bosch",
    logo: "/images/worcester-bosch-new.png",
    startingPrice: 4300,
  },
];

// Updated underfloor brands to Warmup and Aumix
export const underfloorBrands = [
  {
    id: "warmup-wet",
    name: "Warmup",
    logo: "/images/warmup-logo.png",
    startingPrice: 3900,
    recommended: true,
    type: "wet",
  },
  {
    id: "aumix-wet",
    name: "Aumix",
    logo: "/images/aumix-logo.png",
    startingPrice: 3500,
    type: "wet",
  },
  {
    id: "warmup-electric",
    name: "Warmup",
    logo: "/images/warmup-logo.png",
    startingPrice: 2200,
    recommended: true,
    type: "electric",
  },
];

// Brand-specific models
export const brandModels = {
  // Boiler models
  "vaillant-boiler": [
    {
      id: "ecotec-pro",
      name: "ecoTEC pro",
      description: "High efficiency combi boiler",
      startingPrice: 2100,
    },
    {
      id: "ecotec-plus",
      name: "ecoTEC plus",
      description: "Premium combi boiler with higher flow rates",
      startingPrice: 2400,
    },
    {
      id: "ecotec-exclusive",
      name: "ecoTEC exclusive",
      description: "Top of the range with smart features",
      startingPrice: 2800,
    },
  ],
  "worcester-bosch-boiler": [
    {
      id: "greenstar-i",
      name: "Greenstar i",
      description: "Compact and reliable combi boiler",
      startingPrice: 2200,
    },
    {
      id: "greenstar-cdi",
      name: "Greenstar CDi",
      description: "High performance combi boiler",
      startingPrice: 2500,
    },
    {
      id: "greenstar-life",
      name: "Greenstar Life",
      description: "Smart connectivity and high efficiency",
      startingPrice: 2700,
    },
  ],
  "baxi-boiler": [
    {
      id: "duo-tec",
      name: "Duo-tec",
      description: "Easy to use combi boiler",
      startingPrice: 1900,
    },
    {
      id: "platinum",
      name: "Platinum",
      description: "Premium range with extended warranty",
      startingPrice: 2200,
    },
  ],
  "glow-worm-boiler": [
    {
      id: "energy",
      name: "Energy",
      description: "Reliable and affordable combi boiler",
      startingPrice: 1700,
    },
    {
      id: "ultimate",
      name: "Ultimate",
      description: "Premium range with higher output",
      startingPrice: 2000,
    },
  ],
  "main-boiler": [
    {
      id: "eco-compact",
      name: "Eco Compact",
      description: "Compact and efficient combi boiler",
      startingPrice: 1600,
    },
    {
      id: "eco-elite",
      name: "Eco Elite",
      description: "High performance with excellent efficiency",
      startingPrice: 1800,
    },
  ],

  // Heat pump models
  "vaillant-heat": [
    {
      id: "arotherm-plus",
      name: "aroTHERM plus",
      description: "High efficiency air source heat pump",
      startingPrice: 4100,
    },
    {
      id: "flexotherm",
      name: "flexoTHERM",
      description: "Ground source heat pump with high performance",
      startingPrice: 6500,
    },
    {
      id: "arotherm-hybrid",
      name: "aroTHERM Hybrid",
      description: "Hybrid system with integrated boiler",
      startingPrice: 4800,
    },
  ],
  "mitsubishi-heat": [
    {
      id: "ecodan",
      name: "Ecodan",
      description: "Market-leading air source heat pump",
      startingPrice: 4000,
    },
    {
      id: "ecodan-monobloc",
      name: "Ecodan Monobloc",
      description: "Compact all-in-one unit",
      startingPrice: 4300,
    },
    {
      id: "ecodan-hybrid",
      name: "Ecodan Hybrid",
      description: "Combined heat pump and boiler system",
      startingPrice: 4600,
    },
  ],
  "daikin-heat": [
    {
      id: "altherma",
      name: "Altherma",
      description: "Efficient air-to-water heat pump",
      startingPrice: 4200,
    },
    {
      id: "altherma-hybrid",
      name: "Altherma Hybrid",
      description: "Hybrid heat pump with gas boiler backup",
      startingPrice: 4700,
    },
  ],
  "baxi-heat": [
    {
      id: "assure",
      name: "Assure",
      description: "Reliable air source heat pump",
      startingPrice: 3900,
    },
    {
      id: "assure-hybrid",
      name: "Assure Hybrid",
      description: "Hybrid system with Baxi boiler",
      startingPrice: 4500,
    },
  ],
  "bosch-heat": [
    {
      id: "compress-3000",
      name: "Compress 3000",
      description: "Entry-level air source heat pump",
      startingPrice: 4300,
    },
    {
      id: "compress-7000i",
      name: "Compress 7000i",
      description: "Premium heat pump with smart controls",
      startingPrice: 4800,
    },
    {
      id: "hybrid-7000i",
      name: "Hybrid 7000i",
      description: "Hybrid system with Greenstar boiler",
      startingPrice: 5200,
    },
  ],

  // Cylinder models
  "vaillant-cylinder": [
    {
      id: "unistor",
      name: "uniSTOR",
      description: "High quality hot water cylinder",
      startingPrice: 1600,
    },
    {
      id: "actostore",
      name: "actoSTOR",
      description: "Advanced cylinder with faster recovery",
      startingPrice: 1900,
    },
  ],
  "megaflo-cylinder": [
    {
      id: "eco",
      name: "Megaflo Eco",
      description: "Market-leading unvented cylinder",
      startingPrice: 1500,
    },
    {
      id: "eco-plus",
      name: "Megaflo Eco Plus",
      description: "Enhanced model with faster recovery",
      startingPrice: 1700,
    },
  ],

  // Underfloor heating models
  "warmup-wet-underfloor": [
    {
      id: "total-16",
      name: "Total-16",
      description: "Low profile wet underfloor heating system",
      startingPrice: 3900,
    },
    {
      id: "clypso",
      name: "Clypso System",
      description: "Traditional screed-based system",
      startingPrice: 4200,
    },
  ],
  "aumix-wet-underfloor": [
    {
      id: "standard",
      name: "Standard System",
      description: "Quality wet underfloor heating system",
      startingPrice: 3500,
    },
    {
      id: "premium",
      name: "Premium System",
      description: "Enhanced system with zoning controls",
      startingPrice: 3800,
    },
  ],
  "warmup-electric-underfloor": [
    {
      id: "dcm-pro",
      name: "DCM-PRO",
      description: "Membrane system for fast installation",
      startingPrice: 2200,
    },
    {
      id: "sticky-mat",
      name: "StickyMat System",
      description: "Self-adhesive mat for easy installation",
      startingPrice: 2000,
    },
    {
      id: "loose-wire",
      name: "Loose Wire System",
      description: "Flexible system for irregular spaces",
      startingPrice: 1800,
    },
  ],
};
