import osmosisImage from "@/assets/images/hubs/osmosis.svg";
import astroportImage from "@/assets/images/hubs/astroport.svg";
import jupiterImage from "@/assets/images/hubs/jupiter.svg";

export interface Hub {
  id: number;
  shortName: string;
  fullName: string;
  comingSoon: boolean;
  image: string;
  link: string;
}

export const HUBS: Hub[] = [
  {
    id: 1,
    shortName: "Solana",
    fullName: "Jupiter Exchange",
    comingSoon: true,
    image: jupiterImage,
    link: "https://jup.ag/"
  },
  {
    id: 2,
    shortName: "Osmosis",
    fullName: "Osmosis DEX",
    comingSoon: false,
    image: osmosisImage,
    link: "https://osmosis.zone/"
  },
  {
  id: 3,
  shortName: "Neutron",
  fullName: "Astroport",
  comingSoon: false,
  image: astroportImage,
  link: "https://astroport.fi"
  }
];
