"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  X,
  MessageCircle,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Eye,
  Camera,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Box,
  RotateCcw,
  Compass,
  Sun,
  Moon,
  Upload,
  RefreshCw,
} from "lucide-react";
import "./app.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        "ios-src"?: string;
        alt?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "ar-scale"?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "shadow-intensity"?: string;
        "shadow-softness"?: string;
        exposure?: string;
        poster?: string;
        loading?: string;
        children?: React.ReactNode;
      };
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          src?: string;
          "ios-src"?: string;
          alt?: string;
          ar?: boolean;
          "ar-modes"?: string;
          "ar-scale"?: string;
          "camera-controls"?: boolean;
          "auto-rotate"?: boolean;
          "shadow-intensity"?: string;
          "shadow-softness"?: string;
          exposure?: string;
          poster?: string;
          loading?: string;
          children?: React.ReactNode;
        };
      }
    }
  }
}

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  note: string;
  featured: boolean;
  usdz?: string;
  glb?: string;
}

interface CartItem extends Product {
  qty: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Royal Emperor Teakwood Carved Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/teak-emperor-carved-king-cot.jpg",
    note: "Solid Teak / Hand-carved posts & headboard",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Regal_Slumber_0928015846_texture.usdz",
  },
  {
    id: 2,
    name: "Signature Emblem Diwan Daybed Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/modern-diwan-daybed-cot.jpg",
    note: "High-gloss lacquer / Textured linen mattress",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Luxury_Car_Emblem_Day_0928021416_texture.usdz",
  },
  {
    id: 3,
    name: "Maharaja Royal Carved Living Suite",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/maharaja-royal-carved-living-suite.jpg",
    note: "Handcrafted mahogany / Crystal tufted / Center table",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/maharaja-royal-carved-living-suite.usdz",
  },
  {
    id: 4,
    name: "Serene Curved Rosewood Living Suite",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/solid-wood-beige-living-suite.jpg",
    note: "Curved rosewood frame / Textured beige weave",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/solid-wood-beige-living-suite.usdz",
  },
  {
    id: 5,
    name: "Heritage Teak Dual-Tone Sofa Set",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/maroon-cream-teak-sofa-set.jpg",
    note: "Solid teakwood / Maroon & ivory velvet",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/maroon-cream-teak-sofa-set.usdz",
  },
  {
    id: 6,
    name: "Cloud Quilted Cushion Lounge Suite",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/powder-blue-quilted-recliner-suite.jpg",
    note: "Powder blue quilted upholstery / Ergonomic arms",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/powder-blue-quilted-recliner-suite.usdz",
  },
  {
    id: 7,
    name: "Turquoise Teak Slat Sofa Set",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/peacock-turquoise-teak-sofa-set.jpg",
    note: "Kiln-dried teak slats / Vibrant turquoise cushions",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/peacock-turquoise-teak-sofa-set.usdz",
  },
  {
    id: 8,
    name: "Channeled Box-Arm Teak Sofa",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/teak-box-arm-channeled-sofa.jpg",
    note: "Minimalist teak box arm / Vertical channel tufting",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/teak-box-arm-channeled-sofa.usdz",
  },
  {
    id: 9,
    name: "Emerald L-Shaped Sectional Sofa",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/emerald-green-sectional-sofa.jpg",
    note: "Deep emerald velvet / High-density modular comfort",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Emerald_Lounge_Sectio_0928021549_texture.usdz",
  },
  {
    id: 10,
    name: "Royal Walnut 6-Seater Dining Set",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/solid-walnut-6-seater-dining-set.jpg",
    note: "Solid walnut table / 6 lattice-back padded chairs",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Walnut_Crossback_Dini_0928021859_texture.usdz",
  },
  {
    id: 11,
    name: "Fanback Pedestal Round Dining Set",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/round-teak-fanback-dining-table.jpg",
    note: "Solid honey teak pedestal / 4 fanback chairs",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Classic_Round_Dining__0928020750_texture.usdz",
  },
  {
    id: 12,
    name: "Classic 4-Seater Teak Dining Suite",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/classic-lattice-4-seater-dining-set.jpg",
    note: "Kiln-dried teak / 4 upholstered chairs",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Classic_Ebony_Dining__0928020834_texture.usdz",
  },
  {
    id: 13,
    name: "Italian Onyx Marble Dining Table",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/italian-onyx-marble-dining-table.jpg",
    note: "Italian onyx marble slab / Polished gold accents",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Blossom_on_Mahogany_0928021949_texture.usdz",
  },
  {
    id: 14,
    name: "Emerald Green Marble Dining Suite",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/emerald-marble-dining-table.jpg",
    note: "Forest green marble top / Modern brass frame",
    featured: false,
  },
  {
    id: 15,
    name: "Aero-Mesh Ergonomic Study Chair",
    category: "Study",
    image: "/stores/royal-grand-furniture/products/ergonomic-breathable-mesh-study-chair.jpg",
    note: "Breathable high-tensile mesh / Chrome wheelbase",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Ergonomic_Mesh_Office_0928020947_texture.usdz",
  },
  {
    id: 16,
    name: "Presidential Diamond-Tufted Chair",
    category: "Study",
    image: "/stores/royal-grand-furniture/products/high-back-diamond-tufted-executive-chair.jpg",
    note: "Supple black leatherette / Polished chrome arms",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Executive_Noir_Chair_0928021135_texture.usdz",
  },
  {
    id: 17,
    name: "Cognac Tan Executive Swivel Chair",
    category: "Study",
    image: "/stores/royal-grand-furniture/products/cognac-tan-leather-executive-chair.jpg",
    note: "Italian cognac tan leather / Synchronous tilt lock",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Executive_Leather_Off_0928021113_texture.usdz",
  },
  {
    id: 18,
    name: "Executive Computer Study Desk",
    category: "Study",
    image: "/stores/royal-grand-furniture/products/executive-computer-study-desk.jpg",
    note: "Dark walnut finish / Lockable cabinet & CPU rack",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Classroom_Desk_Chair_0928020857_texture.usdz",
  },
  {
    id: 19,
    name: "Grand Workspace Counter & Desk",
    category: "Study",
    image: "/stores/royal-grand-furniture/products/commercial-reception-study-counter.jpg",
    note: "Dual-tone laminate / Lock drawer / Cash counter",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Industrial_Workstatio_0928022003_texture.usdz",
  },
  {
    id: 20,
    name: "Teal & Oak Vanity Dressing Unit",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/teal-wood-vanity-dressing-table.jpg",
    note: "Full mirror / Integrated warm spotlight / Shelves",
    featured: true,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Teal_and_Wood_Dressin_0928021444_texture.usdz",
  },
  {
    id: 21,
    name: "Heritage Teak Dressing Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/classic-wooden-mirrored-dressing-unit.jpg",
    note: "Solid teakwood / Full dressing mirror & drawers",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Floral_Wood_Vanity_0928021307_texture.usdz",
  },
  {
    id: 22,
    name: "Louvered Teak Shoe Storage Cabinet",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/ventilated-teak-shoe-cabinet.jpg",
    note: "Stainless steel ventilation louvers / Walnut grain",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Walnut_Locker_Cabinet_0928020811_texture.usdz",
  },
  {
    id: 23,
    name: "Matte Black Multi-Tier Tall Cabinet",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/matte-black-tall-dressing-cabinet.jpg",
    note: "Engineered matte black / Full-length mirror",
    featured: false,
    usdz: "/stores/royal-grand-furniture/models/Meshy_AI_Black_Vanity_Cabinet_0928020801_texture.usdz",
  },
  {
    id: 24,
    name: "Walnut Floral Relief Kitchen Stool",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_082757.png",
    note: "Reinforced polymer / Walnut finish / Floral relief",
    featured: false,
  },
  {
    id: 25,
    name: "Terracotta Utility Step Stool",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_084802.png",
    note: "Heavy-duty polymer / Terracotta matte / Stackable",
    featured: false,
  },
  {
    id: 26,
    name: "Desert Sand Accent Stool",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_090324.png",
    note: "Textured matte polymer / Desert sand hue",
    featured: false,
  },
  {
    id: 27,
    name: "Woven Rattan Terracotta Low Stool",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_193355.png",
    note: "All-weather polymer wicker / Terracotta finish",
    featured: false,
  },
  {
    id: 28,
    name: "Royal Filigree Teakwood King Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_194105.png",
    note: "Solid Teakwood / Floral arch filigree / Hand-carved",
    featured: false,
  },
  {
    id: 29,
    name: "Grand Crown Arch Teak Platform Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_194208.png",
    note: "Solid Teak / Crown arch headboard / Honey polish",
    featured: false,
  },
  {
    id: 30,
    name: "Heritage Carved Teakwood Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_194306.jpg",
    note: "Kiln-dried Teak / Classical floral crest / Gloss polish",
    featured: false,
  },
  {
    id: 31,
    name: "Classic Fluted Teak Double Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_194413.png",
    note: "Solid Teakwood / Fluted headboard / Natural wood grain",
    featured: false,
  },
  {
    id: 32,
    name: "Maharaja Crest Rosewood Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_194512.png",
    note: "Fine Rosewood / Deep luster polish / Ornate crest",
    featured: false,
  },
  {
    id: 33,
    name: "Lattice Arch Teak Storage Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_194633.png",
    note: "Solid Teak / Diamond lattice / Hydraulic storage option",
    featured: false,
  },
  {
    id: 34,
    name: "Diamond Trellis Carved Teak Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_194740.png",
    note: "Solid Teakwood / Diamond trellis frieze / Carved posts",
    featured: false,
  },
  {
    id: 35,
    name: "Royal Crown Spindle Teak Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_194916.png",
    note: "Solid Teak / Turned spindle rails / Crown finials",
    featured: false,
  },
  {
    id: 36,
    name: "Arch Baluster Teak King Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_195037.png",
    note: "Seasoned Teakwood / Turned balusters / Teak luster",
    featured: false,
  },
  {
    id: 37,
    name: "Carved Medallion Teak Double Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_195228.png",
    note: "Solid Teak / Central floral medallion / Slat support",
    featured: false,
  },
  {
    id: 38,
    name: "Royal Baluster Spindle Emperor Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_195558.png",
    note: "Solid Teak / Turned spherical finials / Spindle footboard",
    featured: false,
  },
  {
    id: 39,
    name: "Sovereign Carved Teakwood Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_195700.png",
    note: "Pure Teak / Dual-tone floral carving / Box storage",
    featured: false,
  },
  {
    id: 40,
    name: "Crown Filigree Teakwood King Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_195839.png",
    note: "Solid Teak / Pierced filigree crest / Hand joinery",
    featured: false,
  },
  {
    id: 41,
    name: "Imperial Panel Carved Teak Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_200028.png",
    note: "Solid Teakwood / Recessed panels / Antique finish",
    featured: false,
  },
  {
    id: 42,
    name: "High-Back Lattice Teakwood Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_200135.png",
    note: "Kiln-dried Teak / High lattice crest / Sturdy frame",
    featured: false,
  },
  {
    id: 43,
    name: "Champagne Velvet Quilted Luxury Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_200426.png",
    note: "Champagne velvet / Gold brass trim / Quilted headboard",
    featured: false,
  },
  {
    id: 44,
    name: "Cloud Grey Wingback Upholstered Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_205201.png",
    note: "Textured grey weave / Button tufted / Wingback silhouette",
    featured: false,
  },
  {
    id: 45,
    name: "Charcoal Velvet Tufted Platform Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_205304.png",
    note: "Charcoal plush velvet / Channel tufted / Low profile",
    featured: false,
  },
  {
    id: 46,
    name: "Pearl Beige Diamond Tufted King Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_205415.png",
    note: "Pearl beige velvet / Crystal diamond tuft / Padded rails",
    featured: false,
  },
  {
    id: 47,
    name: "Modern Vanity Dressing Unit with Oval Mirror",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_205513.png",
    note: "Engineered Teak / Oval vanity mirror / Dual drawers",
    featured: false,
  },
  {
    id: 48,
    name: "Minimalist Teak Dressing Table",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_205609.png",
    note: "Solid Teak frame / Full rectangular mirror / Concealed rack",
    featured: false,
  },
  {
    id: 49,
    name: "Walnut Arch Vanity Dressing Unit",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_205718.png",
    note: "Warm Walnut veneer / Arch mirror / Soft-close drawers",
    featured: false,
  },
  {
    id: 50,
    name: "Contemporary White & Oak Dressing Unit",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_205831.png",
    note: "Matte white & natural oak / Full-length mirror / Shelving",
    featured: false,
  },
  {
    id: 51,
    name: "Floating Drawer Wall Vanity Unit",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_205945.png",
    note: "Teak veneer / Beveled mirror / Floating shelf design",
    featured: false,
  },
  {
    id: 52,
    name: "Sleek Ebony Dressing Mirror Cabinet",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_210142.png",
    note: "Matte ebony finish / Full vanity mirror / Velvet jewelry tray",
    featured: false,
  },
  {
    id: 53,
    name: "Dual-Tier Teakwood Vanity Unit",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_210249.png",
    note: "Solid Teak / Twin tiers / Fluted drawer fronts",
    featured: false,
  },
  {
    id: 54,
    name: "Full-Length Mirror Teak Dressing Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_210348.png",
    note: "Kiln-dried Teak / Full mirror door / Interior locker",
    featured: false,
  },
  {
    id: 55,
    name: "Compact Oak Vanity Dressing Table",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_210505.png",
    note: "Natural Oak / High-clarity mirror / Brass knobs",
    featured: false,
  },
  {
    id: 56,
    name: "Artisan Rosewood Dressing Unit",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_210621.png",
    note: "Rosewood finish / Ornate mirror frame / Cabriole legs",
    featured: false,
  },
  {
    id: 57,
    name: "Grand Heritage Dressing Table with Stool",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_210653.png",
    note: "Solid Teakwood / Triple drawer / Includes matching stool",
    featured: false,
  },
  {
    id: 58,
    name: "High-Gloss Lacquer Vanity Dresser",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_211113.png",
    note: "Gloss ivory lacquer / Stainless steel handles / LED mirror",
    featured: false,
  },
  {
    id: 59,
    name: "Walnut Low-Profile Platform Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_211348.png",
    note: "American Walnut / Low platform frame / Floating effect",
    featured: false,
  },
  {
    id: 60,
    name: "Ebony Tufted Headboard Storage Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_211624.png",
    note: "Dark espresso finish / Cushioned headboard / Underbed storage",
    featured: false,
  },
  {
    id: 61,
    name: "Classic Mirrored Wooden Wardrobe",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_211749.png",
    note: "Solid Teak / Center mirror / Double hanging locker",
    featured: false,
  },
  {
    id: 62,
    name: "2-Door Teak Veneer Bedroom Wardrobe",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_211859.png",
    note: "Teak veneer / Dual hanging rails / Top shelf",
    featured: false,
  },
  {
    id: 63,
    name: "Ebony White-Floral Inlay Storage Cot",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_212105.png",
    note: "Ebony wood / White floral vine inlays / Box storage",
    featured: false,
  },
  {
    id: 64,
    name: "3-Door Solid Wood Wardrobe Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_212236.png",
    note: "Solid Teakwood / 3 doors / Lockable drawer chest",
    featured: false,
  },
  {
    id: 65,
    name: "Mahogany Vine Inlay Storage Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_212338.png",
    note: "Rich Mahogany / Artisanal vine inlay / Box storage",
    featured: false,
  },
  {
    id: 66,
    name: "Royal Walnut Floral Inlay King Bed",
    category: "Bedroom",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_212513.png",
    note: "Kiln-dried Walnut / Scrollwork inlays / Solid frame",
    featured: false,
  },
  {
    id: 67,
    name: "Heavy-Duty Dual-Lock Steel Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_212546.png",
    note: "Cold-rolled CRCA steel / Dual lock mechanism / Hanging rod",
    featured: false,
  },
  {
    id: 68,
    name: "Matte Olive Steel Storage Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_213013.png",
    note: "Powder-coated olive steel / Fluted legs / Internal safe",
    featured: false,
  },
  {
    id: 69,
    name: "Two-Tone Ivory & Brown Steel Wardrobe",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_213242.png",
    note: "CRCA Steel / Dual tone ivory & cocoa / Anti-corrosion",
    featured: false,
  },
  {
    id: 70,
    name: "Contemporary Grey Steel Locker Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_213725.png",
    note: "Heavy gauge steel / Modern slate grey / Adjustable shelves",
    featured: false,
  },
  {
    id: 71,
    name: "Classic Green Powder-Coated Steel Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_213915.png",
    note: "Vintage green finish / Chrome lever lock / Secret drawer",
    featured: false,
  },
  {
    id: 72,
    name: "Champagne Gold Steel Storage Wardrobe",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_214023.png",
    note: "Champagne metallic powder coat / Premium locks / Fluted base",
    featured: false,
  },
  {
    id: 73,
    name: "White & Bronze Multi-Compartment Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_214223.png",
    note: "CRCA steel / Dual lock compartments / Elevated legs",
    featured: false,
  },
  {
    id: 74,
    name: "Premium Wine Red Steel Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_214336.png",
    note: "Deep wine red gloss / Stainless steel accents / Heavy latch",
    featured: false,
  },
  {
    id: 75,
    name: "Lavender Purple Fluted Steel Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_214403.png",
    note: "Pastel lavender powder coat / Fluted column feet / Double key",
    featured: false,
  },
  {
    id: 76,
    name: "Royal Navy Blue 2-Door Steel Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_214717.png",
    note: "Deep navy metallic / Chrome handle / Full-length mirror option",
    featured: false,
  },
  {
    id: 77,
    name: "Pearl White Multi-Tier Steel Locker",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_214955.png",
    note: "Arctic white enamel / 4 internal shelves / Heavy door hinges",
    featured: false,
  },
  {
    id: 78,
    name: "Slate Metallic Security Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_215242.png",
    note: "Heavy gauge CRCA sheet / Textured slate / Steel lock box",
    featured: false,
  },
  {
    id: 79,
    name: "Desert Tan Commercial Storage Cabinet",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_215418.png",
    note: "Desert tan powder coat / Dual doors / Reinforced hinges",
    featured: false,
  },
  {
    id: 80,
    name: "Narrow-Profile Metal Locker Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_215519.png",
    note: "Slim CRCA steel / Single locker / Space-saving footprint",
    featured: false,
  },
  {
    id: 81,
    name: "Emerald Green Heavy Steel Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_215717.png",
    note: "Deep emerald powder coat / Triple bolt lock / Stainless handles",
    featured: false,
  },
  {
    id: 82,
    name: "Bronze Patina Double-Lock Steel Wardrobe",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_215756.png",
    note: "Bronze textured powder coat / High-security lock / Saree racks",
    featured: false,
  },
  {
    id: 83,
    name: "Arctic White Commercial File Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_215940.png",
    note: "Cold-rolled steel / Arctic white / Anti-tilt shelving",
    featured: false,
  },
  {
    id: 84,
    name: "Dual-Door Reinforced Security Almirah",
    category: "Storage",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_220043.png",
    note: "CRCA Heavy steel / Dual key entry / Double internal locker",
    featured: false,
  },
  {
    id: 85,
    name: "Cloud Grey 3-Seater Leatherette Recliner",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_220340.png",
    note: "High-density foam / Grey leatherette / Dual manual recliners",
    featured: false,
  },
  {
    id: 86,
    name: "Dual-Tone Cocoa & Slate Tufted Sofa",
    category: "Living",
    image: "/stores/royal-grand-furniture/products/IMG_20260927_220534.png",
    note: "Cocoa velvet & slate contrast / Crystal tuft / Headrest support",
    featured: false,
  },
  {
    id: 87,
    name: "Polished Italian Marble Dining Coffee Table",
    category: "Dining",
    image: "/stores/royal-grand-furniture/products/IMG_20260928_002254.png",
    note: "Italian onyx marble top / Solid teak turned legs / White frame",
    featured: false,
  },
];

const heroSlides = [
  {
    image: "/stores/royal-grand-furniture/hero/atelier-living-suite.jpg",
    eyebrow: "The new domestic landscape",
    heading: "Objects with presence.",
    subtitle: "Furniture for rooms that have something to say.",
    caption: "LIVING / VOL. 01 — Architectural Atelier Suite",
    note: "A study in quiet confidence",
    category: "Living",
  },
  {
    image: "/stores/royal-grand-furniture/products/teak-emperor-carved-king-cot.jpg",
    eyebrow: "Master bedroom suite",
    heading: "Sanctuary in solid teak.",
    subtitle: "Imperial 4-poster emperor cot with hand-carved crest.",
    caption: "BEDROOM / VOL. 02",
    note: "Solid kiln-dried timber & hand joinery",
    category: "Bedroom",
  },
  {
    image: "/stores/royal-grand-furniture/products/maharaja-royal-carved-living-suite.jpg",
    eyebrow: "Maharaja living collection",
    heading: "Royal heritage poise.",
    subtitle: "Handcrafted solid mahogany with crystal-tufted poise.",
    caption: "LIVING / VOL. 03",
    note: "Hand-carved accents & imperial silhouette",
    category: "Living",
  },
  {
    image: "/stores/royal-grand-furniture/products/solid-walnut-6-seater-dining-set.jpg",
    eyebrow: "Artisan dining spaces",
    heading: "Gatherings elevated daily.",
    subtitle: "Solid walnut dining table with 6 lattice-back padded chairs.",
    caption: "DINING / VOL. 04",
    note: "Kiln-dried walnut & tailored fabric",
    category: "Dining",
  },
  {
    image: "/stores/royal-grand-furniture/products/emerald-green-sectional-sofa.jpg",
    eyebrow: "Contemporary aesthetics",
    heading: "Form meets serenity.",
    subtitle: "Deep emerald velvet with high-density modular comfort.",
    caption: "LOUNGE / VOL. 05",
    note: "Tailored upholstery & architectural presence",
    category: "Living",
  },
  {
    image: "/stores/royal-grand-furniture/products/italian-onyx-marble-dining-table.jpg",
    eyebrow: "Italian marble collection",
    heading: "Sculpted stone luxury.",
    subtitle: "Natural cross-cut onyx marble seated on rich walnut timber.",
    caption: "DINING / VOL. 06",
    note: "Polished natural marble & solid timber foundation",
    category: "Dining",
  },
  {
    image: "/stores/royal-grand-furniture/products/solid-wood-beige-living-suite.jpg",
    eyebrow: "Rosewood atelier",
    heading: "Poetry in curvature.",
    subtitle: "Curved rosewood frame with textured cream weave cushions.",
    caption: "LIVING / VOL. 07",
    note: "Steam-bent timber contours & organic weave",
    category: "Living",
  },
  {
    image: "/stores/royal-grand-furniture/products/teal-wood-vanity-dressing-table.jpg",
    eyebrow: "Bespoke vanity suites",
    heading: "Artisan dressing poise.",
    subtitle: "Teal lacquer vanity station with illuminated oval mirror.",
    caption: "STORAGE / VOL. 08",
    note: "Concealed jewel organizers & solid timber frame",
    category: "Storage",
  },
];

const categories = ["All pieces", "Living", "Bedroom", "Dining", "Study", "Storage"];

const categoryImages: Record<string, string> = {
  Living: "/stores/royal-grand-furniture/products/maharaja-royal-carved-living-suite.jpg",
  Bedroom: "/stores/royal-grand-furniture/products/teak-emperor-carved-king-cot.jpg",
  Dining: "/stores/royal-grand-furniture/products/solid-walnut-6-seater-dining-set.jpg",
  Study: "/stores/royal-grand-furniture/products/ergonomic-breathable-mesh-study-chair.jpg",
  Storage: "/stores/royal-grand-furniture/products/teal-wood-vanity-dressing-table.jpg",
};

interface HeaderProps {
  onWishlist: () => void;
  onNavigateCategory: (cat: string) => void;
  wishCount: number;
  mobileOpen: boolean;
  onMobile: () => void;
}

function Header({
  onWishlist,
  onNavigateCategory,
  wishCount,
  mobileOpen,
  onMobile,
}: HeaderProps) {
  return (
    <header className="site-header" data-testid="site-header">
      <button
        className="mobile-menu"
        onClick={onMobile}
        data-testid="mobile-menu-button"
        aria-label="Open menu"
      >
        <Menu size={19} />
      </button>

      <a className="wordmark" href="#top" data-testid="brand-home-link">
        <span>ROYAL GRAND</span>
        <b>FURNITURE</b>
      </a>

      <nav
        className={`main-nav ${mobileOpen ? "mobile-visible" : ""}`}
        data-testid="main-navigation"
      >
        <a
          href="#catalog"
          onClick={() => onNavigateCategory("All pieces")}
          data-testid="nav-products-link"
          style={{ fontWeight: 600, color: "var(--ink)" }}
        >
          Products
        </a>
        <a
          href="#catalog"
          onClick={() => onNavigateCategory("Living")}
          data-testid="nav-living-link"
        >
          Living
        </a>
        <a
          href="#catalog"
          onClick={() => onNavigateCategory("Bedroom")}
          data-testid="nav-bedroom-link"
        >
          Bedroom
        </a>
        <a
          href="#catalog"
          onClick={() => onNavigateCategory("Dining")}
          data-testid="nav-dining-link"
        >
          Dining
        </a>
        <a
          href="#catalog"
          onClick={() => onNavigateCategory("Study")}
          data-testid="nav-study-link"
        >
          Study
        </a>
        <a
          href="#catalog"
          onClick={() => onNavigateCategory("Storage")}
          data-testid="nav-storage-link"
        >
          Storage
        </a>
        <a href="#contact" data-testid="nav-contact-link">
          Contact
        </a>
      </nav>

      <div className="header-actions">
        <button
          onClick={onWishlist}
          data-testid="wishlist-open-button"
          aria-label="Wishlist"
          title="Wishlist"
        >
          <Heart size={18} />
          <span className="count">{wishCount}</span>
        </button>
      </div>
    </header>
  );
}

interface ProductCardProps {
  product: Product;
  wished: boolean;
  onWish: (id: number) => void;
  onOpen: (product: Product) => void;
  onEnquire: (product: Product) => void;
  onTryHome: (product: Product) => void;
}

function ProductCard({
  product,
  wished,
  onWish,
  onOpen,
  onEnquire,
  onTryHome,
}: ProductCardProps) {
  const canonicalShareUrl = `https://shopmirror.store/furniture-hub#product-${product.id}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Hello Royal Grand Furniture, I am interested in knowing more about "${product.name}" (${product.category}): ${canonicalShareUrl}`
  )}`;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const liveOrigin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://shopmirror.store";
    const liveUrl = `${liveOrigin}/furniture-hub#product-${product.id}`;
    const text = `Hello Royal Grand Furniture, I am interested in knowing more about "${product.name}" (${product.category}): ${liveUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.article
      className="product-card"
      id={`product-${product.id}`}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-testid={`product-card-${product.id}`}
    >
      <div className="product-image-wrap" onClick={() => onOpen(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        {product.usdz && (
          <span className="badge-3d-ar" title="3D Augmented Reality Model Available">
            <Box size={10} /> 3D AR
          </span>
        )}
        <button
          className={`wish-btn ${wished ? "is-wished" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onWish(product.id);
          }}
          data-testid={`wishlist-toggle-${product.id}`}
          aria-label={`Wishlist ${product.name}`}
        >
          <Heart size={16} fill={wished ? "currentColor" : "none"} />
        </button>
        <button
          className="quick-view"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(product);
          }}
          data-testid={`quick-view-${product.id}`}
        >
          Quick view <ArrowRight size={13} />
        </button>
      </div>

      <div className="product-meta">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3 data-testid={`product-name-${product.id}`}>{product.name}</h3>
          <p className="product-note">{product.note}</p>
        </div>

        <div className="product-card-actions">
          <button
            className="btn-enquire"
            onClick={() => onEnquire(product)}
            data-testid={`enquire-button-${product.id}`}
          >
            Enquire
          </button>
          <a
            className="btn-whatsapp"
            href={whatsappUrl}
            onClick={handleWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`whatsapp-share-${product.id}`}
            aria-label={`Share ${product.name} on WhatsApp`}
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </a>
        </div>
        {product.usdz && (
          <div style={{ marginTop: 8 }}>
            <a
              href={product.usdz}
              rel="ar"
              className="btn-card-try-home full-btn"
              style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}
              onClick={(e) => {
                if (typeof navigator !== "undefined" && !/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                  e.preventDefault();
                  e.stopPropagation();
                  onTryHome(product);
                } else {
                  e.stopPropagation();
                }
              }}
              data-testid={`try-home-card-${product.id}`}
              title="Experience in Your Home via 3D AR"
            >
              <img src={product.image} alt={product.name} style={{ display: "none" }} />
              <Box size={13} /> Try in Home
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  testId: string;
  wide?: boolean;
}

function Modal({
  children,
  onClose,
  testId,
  wide = false,
}: ModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className={`modal-panel ${wide ? "modal-wide" : ""}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ x: 380, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 380, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        data-testid={testId}
      >
        <button
          className="modal-close"
          onClick={onClose}
          data-testid="modal-close-button"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
        {children}
      </motion.div>
    </div>
  );
}

interface DeepZoomModalProps {
  product: Product;
  onClose: () => void;
}

function DeepZoomModal({ product, onClose }: DeepZoomModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(2.0);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });
  const stageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(3.8, prev + 0.4));
      }
      if (e.key === "-" || e.key === "_") {
        setZoomLevel((prev) => Math.max(1.0, prev - 0.4));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setCoords({ x, y });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.3 : -0.3;
    setZoomLevel((prev) => Math.max(1.0, Math.min(3.8, Number((prev + delta).toFixed(1)))));
  };

  const vpWidth = Math.min(100, Math.round(100 / zoomLevel));
  const vpHeight = Math.min(100, Math.round(100 / zoomLevel));
  const vpLeft = Math.max(0, Math.min(100 - vpWidth, Math.round(coords.x * 100 - vpWidth / 2)));
  const vpTop = Math.max(0, Math.min(100 - vpHeight, Math.round(coords.y * 100 - vpHeight / 2)));

  const translateX = (0.5 - coords.x) * (zoomLevel - 1) * 65;
  const translateY = (0.5 - coords.y) * (zoomLevel - 1) * 65;

  return (
    <div className="deep-zoom-overlay" onClick={onClose} data-testid="deep-zoom-modal">
      <div className="deep-zoom-header" onClick={(e) => e.stopPropagation()}>
        <div className="zoom-header-info">
          <span>{product.category} • High-Precision Texture Inspection</span>
          <h3>{product.name}</h3>
        </div>

        <div className="zoom-controls-toolbar">
          <button
            className="zoom-ctrl-btn"
            onClick={() => setZoomLevel((z) => Math.max(1.0, Number((z - 0.5).toFixed(1))))}
            disabled={zoomLevel <= 1.0}
            title="Zoom out (-)"
          >
            <ZoomOut size={14} />
          </button>
          <span className="zoom-level-text">{Math.round(zoomLevel * 100)}%</span>
          <button
            className="zoom-ctrl-btn"
            onClick={() => setZoomLevel((z) => Math.min(3.8, Number((z + 0.5).toFixed(1))))}
            disabled={zoomLevel >= 3.8}
            title="Zoom in (+)"
          >
            <ZoomIn size={14} />
          </button>

          <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 4px" }}>|</span>

          <button
            className={`zoom-ctrl-btn ${zoomLevel === 1.0 ? "active" : ""}`}
            onClick={() => setZoomLevel(1.0)}
          >
            1x Fit
          </button>
          <button
            className={`zoom-ctrl-btn ${zoomLevel === 2.0 ? "active" : ""}`}
            onClick={() => setZoomLevel(2.0)}
          >
            2x Texture
          </button>
          <button
            className={`zoom-ctrl-btn ${zoomLevel === 3.5 ? "active" : ""}`}
            onClick={() => setZoomLevel(3.5)}
          >
            3.5x Carving
          </button>
        </div>

        <div className="zoom-header-actions">
          {product.usdz && (
            <a
              rel="ar"
              href={product.usdz}
              className="zoom-btn-usdz"
              title="Open in Apple AR Quick Look"
            >
              <img src={product.image} alt={product.name} style={{ display: "none" }} />
              <Box size={14} /> 3D AR (.USDZ)
            </a>
          )}
          <button className="zoom-close-btn" onClick={onClose} aria-label="Close inspection">
            <X size={20} />
          </button>
        </div>
      </div>

      <div
        className="zoom-stage"
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="zoom-image-layer"
          style={{
            transform: `translate(${translateX}%, ${translateY}%) scale(${zoomLevel})`,
          }}
        >
          <img src={product.image} alt={product.name} />
        </div>

        <div className="zoom-minimap" title="Minimap Viewport Navigator">
          <img src={product.image} alt="Thumbnail preview" />
          <div
            className="zoom-minimap-viewport"
            style={{
              width: `${vpWidth}%`,
              height: `${vpHeight}%`,
              left: `${vpLeft}%`,
              top: `${vpTop}%`,
            }}
          />
        </div>

        <div className="zoom-stage-hint">
          <span>🔍 Move cursor to pan across details</span>
          <span>•</span>
          <span>Scroll mouse wheel to zoom (100% – 380%)</span>
          <span>•</span>
          <span>Press ESC or (X) to exit</span>
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product>(products[0]);
  const [enquiryProduct, setEnquiryProduct] = useState<Product>(products[0]);
  const [tryHomeProduct, setTryHomeProduct] = useState<Product>(products[0]);
  const getProductGlb = (product: Product): string => {
    if (product.glb) return product.glb;
    if (product.usdz) return product.usdz.replace(/\.usdz$/i, ".glb");
    return "";
  };

  const getSceneViewerIntentUrl = (product: Product, origin: string): string => {
    const glbPath = getProductGlb(product);
    if (!glbPath) return "";
    const fullGlbUrl = `${origin}${glbPath}`;
    const webFallback = `https://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
      fullGlbUrl
    )}&mode=ar_preferred&title=${encodeURIComponent(product.name)}&resizable=true`;
    return `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
      fullGlbUrl
    )}&mode=ar_preferred&title=${encodeURIComponent(
      product.name
    )}&resizable=true#Intent;scheme=https;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      webFallback
    )};end;`;
  };

  const handleLaunchAndroidAR = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof navigator === "undefined") return;
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (!isAndroid) {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        toast.info("Please use the 'Open in Apple QuickLook AR' button below on your iPhone/iPad.");
        e.preventDefault();
        return;
      }
      toast.info("To view in real Camera AR, scan the QR code above with your Android phone's camera!");
      e.preventDefault();
      return;
    }

    // Try model-viewer's activateAR() first for native WebXR / Scene Viewer dispatch
    const mv = document.querySelector("model-viewer") as any;
    if (mv && typeof mv.activateAR === "function") {
      e.preventDefault();
      toast.success("Opening AR Camera...");
      try {
        mv.activateAR();
        return;
      } catch (err) {
        console.warn("model-viewer activateAR fallback", err);
      }
    }

    toast.success("Opening Google AR Camera...");
    e.preventDefault();
    const intentUrl = getSceneViewerIntentUrl(tryHomeProduct, activeOrigin);
    window.location.href = intentUrl;
  };
  const [detailHoverZoom, setDetailHoverZoom] = useState(false);
  const [detailLensCoords, setDetailLensCoords] = useState({ x: 0.5, y: 0.5, px: 150, py: 150 });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([1, 3, 10]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeOrigin, setActiveOrigin] = useState("https://shopmirror.store");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically register Google's standalone model-viewer web component
      if (!customElements.get("model-viewer")) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "/js/model-viewer.min.js";
        document.head.appendChild(script);
      }

      if (window.location.origin) {
        setActiveOrigin(window.location.origin);
      }
      const params = new URLSearchParams(window.location.search);
      const arParam = params.get("ar");
      if (arParam) {
        const found = products.find((p) => String(p.id) === arParam);
        if (found && found.usdz) {
          setTryHomeProduct(found);
          setModal("try-home");
        }
      }
    }
  }, []);

  // Auto-scrolling Hero Slides (Every 3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[heroIndex];

  // Catalog filter states
  const [catalogCategory, setCatalogCategory] = useState<string>("All pieces");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);

  // Enquiry form fields
  const [enqName, setEnqName] = useState("");
  const [enqPhone, setEnqPhone] = useState("");
  const [enqNotes, setEnqNotes] = useState("");

  // Contact section email form fields
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const toggleWish = (id: number) => {
    const exists = wishlist.includes(id);
    setWishlist((list) =>
      exists ? list.filter((i) => i !== id) : [...list, id]
    );
    toast(exists ? "Removed from saved items" : "Added to saved items");
  };

  const addToCart = (product: Product) => {
    setCart((items) => {
      const found = items.find((i) => i.id === product.id);
      if (found) {
        return items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...items, { ...product, qty: 1 }];
    });
    toast.success(`${product.name} added to your enquiry shortlist`);
  };

  const removeFromCart = (id: number) =>
    setCart((items) => items.filter((item) => item.id !== id));

  const openProduct = (product: Product) => {
    setSelected(product);
    setModal("product");
  };

  const openEnquiry = (product: Product) => {
    setEnquiryProduct(product);
    setModal("enquire");
  };

  const openTryInHome = (product: Product) => {
    setTryHomeProduct(product);
    setModal("try-home");
  };

  const navigateToCatalog = (cat: string) => {
    setCatalogCategory(cat);
    setMobileOpen(false);
    setTimeout(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Filtered Catalog
  const catalogFiltered = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        catalogCategory === "All pieces" || p.category === catalogCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.note.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFeatured = !featuredOnly || p.featured;
      return matchCat && matchSearch && matchFeatured;
    });
  }, [catalogCategory, searchQuery, featuredOnly]);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { "All pieces": products.length };
    categories.forEach((c) => {
      if (c !== "All pieces") {
        map[c] = products.filter((p) => p.category === c).length;
      }
    });
    return map;
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleSendEnquiryWhatsApp = () => {
    const currentOrigin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://shopmirror.store";
    const productUrl = `${currentOrigin}/furniture-hub#product-${enquiryProduct.id}`;
    const text = `Hello Royal Grand Furniture,\nI would like to enquire about:\n• Product: ${enquiryProduct.name} (${enquiryProduct.category})\n• Specifications: ${enquiryProduct.note}\n• Link: ${productUrl}\n\nClient Name: ${enqName || "Valued Customer"}\nPhone: ${enqPhone || "Not provided"}\nMessage/Notes: ${enqNotes || "Please share pricing, dimensions, and availability."}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    toast.success("Redirecting to WhatsApp to send enquiry...");
    setModal(null);
  };

  const handleCallbackEnquiry = () => {
    if (!enqPhone && !enqName) {
      toast.error("Please enter your name or phone number");
      return;
    }
    toast.success(`Thank you ${enqName || ""}! Our showroom team will reach out to you shortly.`);
    setModal(null);
  };

  const handleSendContactEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || (!contactEmail.trim() && !contactPhone.trim())) {
      toast.error("Please provide your name and contact number/email");
      return;
    }
    const subject = encodeURIComponent(`Royal Grand Furniture Inquiry - ${contactName}`);
    const body = encodeURIComponent(
      `Customer Name: ${contactName}\nPhone/WhatsApp: ${contactPhone}\nEmail: ${contactEmail || "Not specified"}\n\nInquiry Details:\n${contactMessage || "I would like to inquire about showroom pieces and custom ordering."}`
    );
    window.open(`mailto:royalgrandfurniture@gmail.com?subject=${subject}&body=${body}`, "_blank");
    toast.success("Opening your email client to send your message...");
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setContactMessage("");
  };

  return (
    <div className="storefront" id="top">
      <Toaster
        position="bottom-right"
        toastOptions={{ className: "atelier-toast" }}
      />
      <Header
        onWishlist={() => setModal("wishlist")}
        onNavigateCategory={navigateToCatalog}
        wishCount={wishlist.length}
        mobileOpen={mobileOpen}
        onMobile={() => setMobileOpen((value) => !value)}
      />
      <main>
        {/* Hero Section with Auto-Scrolling Luxury Showroom Slides */}
        <section className="hero" data-testid="hero-section">
          <div className="hero-slider">
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.image}
                className={`hero-slide ${idx === heroIndex ? "active" : ""}`}
              >
                <img src={slide.image} alt={slide.heading} />
              </div>
            ))}
          </div>

          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="eyebrow light">{currentSlide.eyebrow}</p>
            <h1>
              {currentSlide.heading.split(" ")[0]} {currentSlide.heading.split(" ")[1]}
              <br />
              <i>{currentSlide.heading.split(" ").slice(2).join(" ")}</i>
            </h1>
            <p className="hero-copy">{currentSlide.subtitle}</p>
            <a
              className="light-link"
              href="#catalog"
              onClick={() => navigateToCatalog(currentSlide.category)}
              data-testid="hero-shop-link"
            >
              Explore {currentSlide.category} <ArrowRight size={16} />
            </a>
          </div>

          <div className="hero-index">
            0{heroIndex + 1} <span /> 0{heroSlides.length}
          </div>

          <div className="hero-caption">
            {currentSlide.caption}
            <br />
            {currentSlide.note}
          </div>

          <div className="hero-scroll-note">
            Scroll to enter <span>↓</span>
          </div>

          {/* Slide Navigation Dots (No Arrow Buttons, Pure Smooth Auto-Scrolling) */}
          <div className="hero-controls">
            <div className="hero-slide-indicators">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  className={`hero-indicator-dot ${i === heroIndex ? "active" : ""}`}
                  onClick={() => setHeroIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="intro" id="story" data-testid="intro-section">
          <p className="eyebrow">A considered point of view</p>
          <h2>
            Make space for
            <br />
            <i>the remarkable.</i>
          </h2>
          <div className="intro-bottom">
            <p>
              Royal Grand Furniture curates hand-carved Teakwood, polished Italian marble, and bespoke ergonomic suites. Nothing mass-produced. Nothing temporary. Just heirloom pieces tailored for grand interiors.
            </p>
            <a className="text-link" href="#catalog" data-testid="story-link">
              Our showroom catalog <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* Category Strip - Shop by Feeling */}
        <section
          className="category-strip"
          id="collections"
          data-testid="category-section"
        >
          <div className="section-heading">
            <p className="eyebrow">Shop by feeling</p>
            <h2>Find your form.</h2>
            <p className="section-note">
              A room begins with one remarkable object.
            </p>
          </div>
          <div className="category-list">
            {["Living", "Bedroom", "Dining", "Study", "Storage"].map(
              (item, i) => (
                <a
                  key={item}
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToCatalog(item);
                  }}
                  className="category-tile"
                  data-testid={`category-${item.toLowerCase()}-link`}
                >
                  <img src={categoryImages[item]} alt={`${item} furniture`} />
                  <div className="category-tile-shade" />
                  <span>0{i + 1}</span>
                  <strong>{item}</strong>
                  <ArrowRight size={16} />
                </a>
              )
            )}
          </div>
        </section>

        {/* Showroom 2-Column Catalog Section */}
        <section className="catalog-section" id="catalog" data-testid="catalog-section">
          <div className="catalog-header">
            <div>
              <p className="eyebrow">Royal Grand Showroom Edit</p>
              <h2>
                {catalogCategory === "All pieces"
                  ? "Complete Furniture Catalog."
                  : `${catalogCategory} Collection.`}
              </h2>
            </div>
            <p className="section-note" style={{ margin: 0, maxWidth: 360 }}>
              Direct factory craftsmanship from Vijjeswaram, AP. Click Enquire or WhatsApp to request instant showroom quotes.
            </p>
          </div>

          <div className="catalog-layout">
            {/* Left Filter Sidebar */}
            <aside className="catalog-sidebar">
              <div className="sidebar-search">
                <Search size={14} />
                <input
                  type="text"
                  placeholder="Search cots, sofas, desks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="catalog-search-input"
                />
              </div>

              <div className="sidebar-block">
                <div className="sidebar-title">
                  <span>Categories</span>
                  <SlidersHorizontal size={13} />
                </div>
                <div className="category-filter-list">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`category-filter-item ${
                        catalogCategory === cat ? "active" : ""
                      }`}
                      onClick={() => setCatalogCategory(cat)}
                      data-testid={`filter-cat-${cat.toLowerCase().replace(" ", "-")}`}
                    >
                      <span>{cat}</span>
                      <span className="count-badge">{categoryCounts[cat] || 0}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sidebar-block">
                <div className="sidebar-title">
                  <span>Showroom Highlights</span>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--ink)", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                  />
                  Featured showpieces only
                </label>
              </div>

              <div className="sidebar-block">
                <div className="showroom-card">
                  <strong>Royal Grand Assistance</strong>
                  <p>Need custom sizes, wood polish selection, or showroom visits?</p>
                  <a
                    href="https://wa.me/?text=Hello%20Royal%20Grand%20Furniture%2C%20I%20need%20assistance%20with%20custom%20furniture"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={13} /> Chat with Showroom
                  </a>
                </div>
              </div>

              {(searchQuery || catalogCategory !== "All pieces" || featuredOnly) && (
                <button
                  className="plain-btn"
                  style={{ width: "100%", textAlign: "center" }}
                  onClick={() => {
                    setSearchQuery("");
                    setCatalogCategory("All pieces");
                    setFeaturedOnly(false);
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </aside>

            {/* Right Product Grid */}
            <div className="catalog-main">
              <div className="catalog-toolbar">
                <span>
                  Showing <b>{catalogFiltered.length}</b> furniture pieces
                </span>
                {catalogCategory !== "All pieces" && (
                  <span style={{ fontSize: 10, background: "#ebe7df", padding: "3px 8px", borderRadius: 3 }}>
                    Category: <b>{catalogCategory}</b>
                  </span>
                )}
              </div>

              {catalogFiltered.length > 0 ? (
                <div className="catalog-grid">
                  {catalogFiltered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      wished={wishlist.includes(product.id)}
                      onWish={toggleWish}
                      onOpen={openProduct}
                      onEnquire={openEnquiry}
                      onTryHome={openTryInHome}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ background: "#fff", padding: "80px 20px", borderRadius: 6 }}>
                  <p>No furniture pieces match your search query.</p>
                  <button
                    className="dark-btn"
                    style={{ margin: "20px auto 0" }}
                    onClick={() => {
                      setSearchQuery("");
                      setCatalogCategory("All pieces");
                    }}
                  >
                    View All Pieces
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Dedicated Showroom Authenticity & Contact Section */}
        <section className="contact-authenticity-section" id="contact" data-testid="contact-section">
          <div className="authenticity-header">
            <p className="eyebrow">Direct Factory Atelier • Heirloom Standards</p>
            <h2>Authentic Craftsmanship & Proven Quality.</h2>
            <p className="authenticity-intro">
              At Royal Grand Furniture in Vijjeswaram, Andhra Pradesh, each masterpiece is created with seasoned timbers, hand-turned posts, and precision joinery. We do not use paper veneers or mass-produced pressboard — only genuine heirloom solid wood built to last generations.
            </p>
          </div>

          {/* 3 Authenticity Images Grid */}
          <div className="authenticity-gallery">
            <div className="authenticity-card">
              <div className="authenticity-img-wrap">
                <img
                  src="/stores/royal-grand-furniture/products/round-teak-fanback-dining-table.jpg"
                  alt="Authentic Kiln-Dried Teak Fanback Dining Table"
                />
              </div>
              <div className="authenticity-card-content">
                <span className="authenticity-tag">100% Solid Teakwood</span>
                <h3>Artisan Radial Pedestal Joinery</h3>
                <p>
                  Hand-lathed central teak pedestal with solid radiate grain matching and hand-slotted fanback chairs. Built to endure decades of family gatherings.
                </p>
              </div>
            </div>

            <div className="authenticity-card">
              <div className="authenticity-img-wrap">
                <img
                  src="/stores/royal-grand-furniture/products/teak-emperor-carved-king-cot.jpg"
                  alt="Imperial Hand-Carved Teak King Cot"
                />
              </div>
              <div className="authenticity-card-content">
                <span className="authenticity-tag">Heirloom Hand-Carving</span>
                <h3>Royal Emperor Teak Crest</h3>
                <p>
                  Sculpted by master Andhra woodcarvers with pineapple finials, dual-crested floral archways, and reinforced mortise-and-tenon bedrock rails.
                </p>
              </div>
            </div>

            <div className="authenticity-card">
              <div className="authenticity-img-wrap">
                <img
                  src="/stores/royal-grand-furniture/products/maharaja-royal-carved-living-suite.jpg"
                  alt="Maharaja Royal Carved Living Suite"
                />
              </div>
              <div className="authenticity-card-content">
                <span className="authenticity-tag">Bespoke Living Suites</span>
                <h3>Solid Mahogany & Tufted Luxury</h3>
                <p>
                  Seasoned hardwood framing paired with crystal-tufted gold damask upholstery and high-resilience ergonomic core support.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Details, Direct Email & Live Location Map */}
          <div className="contact-main-grid">
            {/* Left: Contact Info & Email Form */}
            <div className="contact-card">
              <div className="contact-card-header">
                <p className="eyebrow">Connect with Royal Grand</p>
                <h3>Showroom Concierge & Inquiries</h3>
                <p className="contact-sub">
                  Have questions about custom sizing, wood polish, or pricing? Reach out directly to our Vijjeswaram factory atelier.
                </p>
              </div>

              {/* Direct Contact Badges */}
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon-bubble">
                    <Phone size={18} />
                  </div>
                  <div>
                    <strong>Direct Showroom Contact</strong>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "6px", flexWrap: "wrap" }}>
                      <a href="tel:7702220693" className="contact-phone-link">
                        +91 77022 20693
                      </a>
                      <a
                        href="https://wa.me/917702220693?text=Hello%20Royal%20Grand%20Furniture%2C%20I%20would%20like%20to%20inquire%20about%20your%20furniture%20collection."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp-compact"
                      >
                        <MessageCircle size={14} /> WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-bubble">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong>Physical Showroom Address</strong>
                    <p className="contact-address-text">
                      WPH9+7FC, Vijjeswaram Nidadavolu Rd, Chigurulanka, Andhra Pradesh 534302
                    </p>
                  </div>
                </div>
              </div>

              {/* Send Email Form */}
              <form className="contact-email-form" onSubmit={handleSendContactEmail}>
                <div className="contact-form-title">
                  <Mail size={16} />
                  <span>Send Direct Email Inquiry</span>
                </div>
                <div className="contact-form-row">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    className="contact-input"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone / WhatsApp *"
                    className="contact-input"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="contact-input"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
                <textarea
                  placeholder="Tell us what you are looking for (e.g. Emperor Cot, 6-Seater Dining Set, Custom Living Suite)..."
                  className="contact-textarea"
                  rows={3}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                />
                <button type="submit" className="dark-btn full-btn">
                  <Mail size={14} /> Send Email Inquiry <ArrowRight size={14} />
                </button>
              </form>
            </div>

            {/* Right: Embedded Google Map */}
            <div className="map-card">
              <div className="map-card-header">
                <div>
                  <p className="eyebrow">Showroom Location</p>
                  <h3>Visit Our Factory Atelier</h3>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=WPH9%2B7FC%2C+Vijjeswaram+Nidadavolu+Rd%2C+Chigurulanka%2C+Andhra+Pradesh+534302"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-directions-btn"
                >
                  <ExternalLink size={13} /> Get Directions
                </a>
              </div>
              <div className="map-frame-wrap">
                <iframe
                  title="Royal Grand Furniture Location"
                  src="https://maps.google.com/maps?q=WPH9%2B7FC%2C%20Vijjeswaram%20Nidadavolu%20Rd%2C%20Chigurulanka%2C%20Andhra%20Pradesh%20534302&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="map-card-footer">
                <span>📍 Vijjeswaram Nidadavolu Rd, Chigurulanka, AP 534302</span>
                <span className="map-badge">Open Monday - Sunday</span>
              </div>
            </div>
          </div>
        </section>

        {/* Showroom Newsletter */}
        <section className="newsletter" data-testid="newsletter-section">
          <p className="eyebrow">Royal Grand Concierge</p>
          <h2>Exclusive Showroom Catalogs.</h2>
          <div className="email-form">
            <input
              placeholder="Enter your WhatsApp or email"
              data-testid="newsletter-email-input"
              type="text"
            />
            <button
              onClick={() => toast.success("Thank you! Our catalog will be sent to you shortly.")}
              data-testid="newsletter-submit-button"
            >
              Request Catalog <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>

      {/* Redesigned Stately Footer */}
      <footer className="site-footer">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <a className="wordmark footer-wordmark" href="#top" data-testid="footer-brand-link">
              <span>ROYAL GRAND</span>
              <b>FURNITURE</b>
            </a>
            <p className="footer-brand-desc">
              Direct factory craftsmanship & heirloom architectural furniture from Vijjeswaram, Andhra Pradesh. Built with pure solid teakwood, rosewood, and Italian marble.
            </p>
            <div className="footer-contact-pill">
              <Phone size={13} /> +91 77022 20693
            </div>
          </div>

          <div className="footer-nav-col">
            <h4>Collections</h4>
            <a href="#catalog" onClick={() => navigateToCatalog("Living")}>Living Suites</a>
            <a href="#catalog" onClick={() => navigateToCatalog("Bedroom")}>Bedroom King Cots</a>
            <a href="#catalog" onClick={() => navigateToCatalog("Dining")}>Dining Tables & Sets</a>
            <a href="#catalog" onClick={() => navigateToCatalog("Study")}>Study & Executive</a>
            <a href="#catalog" onClick={() => navigateToCatalog("Storage")}>Storage & Vanity</a>
          </div>

          <div className="footer-nav-col">
            <h4>Showroom & Factory</h4>
            <a href="#contact">Authentic Craftsmanship</a>
            <a href="#contact">Factory Location & Map</a>
            <a href="tel:7702220693">Direct Call: 7702220693</a>
            <a
              href="https://wa.me/917702220693?text=Hello%20Royal%20Grand%20Furniture"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Concierge
            </a>
          </div>

          <div className="footer-nav-col">
            <h4>Showroom Address</h4>
            <p className="footer-address">
              WPH9+7FC, Vijjeswaram Nidadavolu Rd,<br />
              Chigurulanka, Andhra Pradesh 534302
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=WPH9%2B7FC%2C+Vijjeswaram+Nidadavolu+Rd%2C+Chigurulanka%2C+Andhra+Pradesh+534302"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-link"
            >
              <ExternalLink size={12} /> View on Google Maps
            </a>
          </div>
        </div>

        {/* Bottom Bar: All rights reserved to shopmirror © 2026 */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            All rights reserved to shopmirror<sup style={{ fontSize: "0.6em", verticalAlign: "super", marginLeft: 3, marginRight: 5 }}>©</sup> 2026
          </p>
        </div>
      </footer>

      {/* Dedicated Enquiry Modal */}
      {modal === "enquire" && (
        <Modal onClose={() => setModal(null)} testId="enquiry-modal">
          <p className="eyebrow">Showroom Price & Order Enquiry</p>
          <h2>Enquire Now.</h2>
          <div className="enquiry-product-preview">
            <img src={enquiryProduct.image} alt={enquiryProduct.name} />
            <div>
              <h4>{enquiryProduct.name}</h4>
              <p>{enquiryProduct.category} • {enquiryProduct.note}</p>
            </div>
          </div>
          <div>
            <input
              className="field"
              placeholder="Your Full Name"
              value={enqName}
              onChange={(e) => setEnqName(e.target.value)}
              data-testid="enquiry-name-input"
            />
            <input
              className="field"
              placeholder="Your Mobile / WhatsApp Number"
              value={enqPhone}
              onChange={(e) => setEnqPhone(e.target.value)}
              data-testid="enquiry-phone-input"
            />
            <input
              className="field"
              placeholder="Custom size requirements or questions (optional)"
              value={enqNotes}
              onChange={(e) => setEnqNotes(e.target.value)}
              data-testid="enquiry-notes-input"
            />
          </div>
          <div className="enquiry-form-actions">
            <button
              className="btn-whatsapp-full"
              onClick={handleSendEnquiryWhatsApp}
              data-testid="submit-enquiry-whatsapp-button"
            >
              <MessageCircle size={16} /> Send Enquiry via WhatsApp
            </button>
            <button
              className="dark-btn full-btn"
              onClick={handleCallbackEnquiry}
              data-testid="submit-enquiry-callback-button"
            >
              Request Showroom Callback <ArrowRight size={14} />
            </button>
          </div>
        </Modal>
      )}

      {/* Quick View Product Modal */}
      {modal === "product" && (
        <Modal onClose={() => setModal(null)} testId="product-modal" wide>
          <div className="detail-layout">
            <div>
              <div
                className="detail-image-wrap"
                onClick={() => setModal("zoom")}
                title="Click image to zoom & inspect full resolution"
                style={{ position: "relative", cursor: "zoom-in" }}
              >
                <img
                  src={selected.image}
                  alt={selected.name}
                  style={{ transition: "opacity 0.2s" }}
                />
                {selected.usdz && (
                  <span className="badge-3d-ar" style={{ zIndex: 10 }}>
                    <Box size={10} /> 3D AR USDZ Ready
                  </span>
                )}
              </div>
            </div>

            <div className="detail-copy">
              <p className="eyebrow">
                {selected.category} / 2026 Collection
              </p>
              <h2>{selected.name}</h2>
              <p className="modal-subcopy">
                A signature architectural piece from Royal Grand Furniture. Crafted with traditional joinery, premium kiln-dried timber, and tailored finishes.
              </p>
              <div className="material-row">
                <span>Specifications</span>
                <b>{selected.note}</b>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button
                  className="dark-btn"
                  style={{ flex: 1 }}
                  onClick={() => openEnquiry(selected)}
                  data-testid="detail-enquire-button"
                >
                  Enquire Now <ArrowRight size={15} />
                </button>
                <a
                  className="btn-whatsapp"
                  style={{ padding: "16px 18px", fontSize: 11 }}
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hello Royal Grand Furniture, I am looking for details on ${selected.name} (${selected.category})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="detail-whatsapp-button"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>

              {/* Try in Home (AR) button & Wishlist Heart button right below Enquire */}
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                {selected.usdz ? (
                  <a
                    href={selected.usdz}
                    rel="ar"
                    className="btn-try-home"
                    style={{ flex: 1, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    onClick={(e) => {
                      if (typeof navigator !== "undefined" && !/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                        e.preventDefault();
                        openTryInHome(selected);
                      }
                    }}
                    data-testid="detail-try-home-button"
                    title="Place this 3D model in your room with AR"
                  >
                    <img src={selected.image} alt={selected.name} style={{ display: "none" }} />
                    <Box size={15} /> Try in Home
                  </a>
                ) : (
                  <button
                    className="btn-try-home"
                    style={{ flex: 1 }}
                    onClick={() => openEnquiry(selected)}
                  >
                    <MessageCircle size={15} /> Request Consultation
                  </button>
                )}
                <button
                  className={`btn-detail-wish ${wishlist.includes(selected.id) ? "is-wished" : ""}`}
                  onClick={() => toggleWish(selected.id)}
                  data-testid="detail-wishlist-button"
                  aria-label={wishlist.includes(selected.id) ? "Remove from wishlist" : "Add to wishlist"}
                  title={wishlist.includes(selected.id) ? "Saved in wishlist" : "Save to wishlist"}
                >
                  <Heart
                    size={18}
                    fill={wishlist.includes(selected.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Deep Inspection Zoom Lightbox */}
      {modal === "zoom" && (
        <DeepZoomModal
          product={selected}
          onClose={() => setModal("product")}
        />
      )}

      {/* Augmented Reality Camera Studio Modal (Native Android Scene Viewer & iOS QuickLook) */}
      {modal === "try-home" && (
        <Modal onClose={() => setModal(null)} testId="try-home-modal" wide>
          <div className="try-home-ar-studio">
            <div className="try-home-header">
              <div>
                <p className="eyebrow">Interactive 3D Studio • 100% True Scale (1:1)</p>
                <h2>Inspect {tryHomeProduct.name} in 3D</h2>
                <p className="try-home-subtitle">
                  Explore <b>{tryHomeProduct.name}</b> in full 360° 3D with authentic wood grain, fabric textures, and calibrated physical proportions.
                </p>
              </div>
              <div className="try-home-badge">
                <Box size={14} /> 100% True Scale (1:1)
              </div>
            </div>

            <div className="try-home-ar-grid">
              <div className="try-home-preview-card">
                <div className="try-home-img-box" style={{ minHeight: 320, position: "relative", padding: 0 }}>
                  {/* @ts-ignore */}
                  <model-viewer
                    src={getProductGlb(tryHomeProduct) ? `${activeOrigin}${getProductGlb(tryHomeProduct)}` : undefined}
                    ios-src={tryHomeProduct.usdz ? `${activeOrigin}${tryHomeProduct.usdz}` : undefined}
                    alt={tryHomeProduct.name}
                    camera-controls
                    auto-rotate
                    rotation-per-second="25deg"
                    shadow-intensity="1"
                    shadow-softness="0.8"
                    exposure="1.1"
                    poster={tryHomeProduct.image}
                    loading="eager"
                    style={{ width: "100%", height: "100%", minHeight: 320, background: "#faf8f5" }}
                  >
                    <div slot="poster" className="model-viewer-poster">
                      <img src={tryHomeProduct.image} alt={tryHomeProduct.name} />
                      <div className="model-loading-indicator">
                        <RefreshCw size={13} className="spin-icon" /> Interactive 3D Model Loading...
                      </div>
                    </div>
                  </model-viewer>
                  <span className="badge-3d-ar" style={{ position: "absolute", top: 12, right: 12, zIndex: 5 }}>
                    <Box size={10} /> Certified 3D Mesh (1:1 Scale)
                  </span>
                </div>
                <div className="try-home-specs-box">
                  <div className="spec-item">
                    <span>Category</span>
                    <b>{tryHomeProduct.category} Collection</b>
                  </div>
                  <div className="spec-item">
                    <span>Craftsmanship</span>
                    <b>{tryHomeProduct.note}</b>
                  </div>
                  <div className="spec-item">
                    <span>AR Engine</span>
                    <b>Google Scene Viewer (Android) • Apple QuickLook (iOS)</b>
                  </div>
                  <div className="spec-item">
                    <span>Physical Scale</span>
                    <b>100% Millimeter-Accurate Physical Scale</b>
                  </div>
                </div>
              </div>

              <div className="try-home-qr-card">
                <div className="qr-container">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                      `${activeOrigin}/furniture-hub?ar=${tryHomeProduct.id}`
                    )}`}
                    alt="Scan for AR Camera Placement"
                    className="qr-code-img"
                  />
                  <p className="qr-hint">
                    Scan with your smartphone camera to view and inspect this piece in 3D on your phone
                  </p>
                </div>

                <div className="ar-actions-stack">
                  {/* Apple QuickLook AR for iOS */}
                  {tryHomeProduct.usdz && (
                    <a
                      href={tryHomeProduct.usdz}
                      rel="ar"
                      className="btn-ar-launch"
                      title="Launch Apple AR Quick Look on iPhone or iPad"
                    >
                      <img
                        src={tryHomeProduct.image}
                        alt={tryHomeProduct.name}
                        style={{ display: "none" }}
                      />
                      <Box size={16} /> Open in Apple QuickLook AR (iPhone / iPad)
                    </a>
                  )}

                  <a
                    className="btn-whatsapp-outline"
                    href={`https://wa.me/917702220693?text=${encodeURIComponent(
                      `Hello Royal Grand Furniture, I am trying "${tryHomeProduct.name}" in Camera AR and would like to confirm custom room sizing and delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={15} /> Chat with Showroom Concierge
                  </a>

                  <button
                    className="plain-btn"
                    onClick={() => {
                      setModal(null);
                      openEnquiry(tryHomeProduct);
                    }}
                  >
                    Request Showroom Callback & Delivery Quote →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Cart / Shortlist Drawer */}
      {modal === "cart" && (
        <Modal onClose={() => setModal(null)} testId="cart-drawer">
          <div className="drawer-heading">
            <p className="eyebrow">Selected pieces</p>
            <h2>
              Shortlist <em>({cartCount})</em>
            </h2>
          </div>
          {cart.length === 0 ? (
            <div className="empty-state">
              <p>Your shortlist is empty.</p>
              <a href="#catalog" onClick={() => setModal(null)}>
                Explore Catalog <ArrowRight size={14} />
              </a>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} style={{ objectFit: "contain", background: "#fff" }} />
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>{item.category} • {item.note}</p>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                      data-testid={`remove-from-cart-${item.id}`}
                      aria-label="Remove item"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 30 }}>
                <a
                  className="btn-whatsapp-full"
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hello Royal Grand Furniture, I would like to get a quote for my shortlisted items:\n` +
                      cart.map((c, i) => `${i + 1}. ${c.name} (${c.category})`).join("\n")
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} /> Enquire All on WhatsApp
                </a>
              </div>
            </>
          )}
        </Modal>
      )}

      {/* Wishlist Modal */}
      {modal === "wishlist" && (
        <Modal onClose={() => setModal(null)} testId="wishlist-modal">
          <p className="eyebrow">Saved inspirations</p>
          <h2>Your Wishlist.</h2>
          {wishlist.length === 0 ? (
            <div className="empty-state small">
              <p>No saved pieces yet.</p>
            </div>
          ) : (
            <div className="wishlist-list">
              {products
                .filter((p) => wishlist.includes(p.id))
                .map((product) => (
                  <div key={product.id} className="wishlist-row">
                    <img src={product.image} alt={product.name} style={{ objectFit: "contain", background: "#fff" }} />
                    <span onClick={() => openProduct(product)} style={{ cursor: "pointer" }}>
                      {product.name}
                      <small>{product.category}</small>
                    </span>
                    <button
                      className="btn-enquire"
                      style={{ padding: "6px 12px", fontSize: 9 }}
                      onClick={() => openEnquiry(product)}
                    >
                      Enquire
                    </button>
                  </div>
                ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
