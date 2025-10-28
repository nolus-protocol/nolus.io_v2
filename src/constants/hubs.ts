import osmosisImage from "@/assets/images/hubs/osmosis.svg";
import astroportImage from "@/assets/images/hubs/astroport.svg";
import hydroImage from "@/assets/images/hubs/hydro.svg";

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
    shortName: "Osmosis",
    fullName: "Osmosis DEX",
    comingSoon: false,
    image: osmosisImage,
    link: "https://osmosis.zone/"
  },
  {
    id: 2,
    shortName: "Neutron",
    fullName: "Astroport",
    comingSoon: false,
    image: astroportImage,
    link: "https://astroport.finance/"
  },
  {
    id: 3,
    shortName: "Neutron",
    fullName: "Hydro",
    comingSoon: false,
    image: hydroImage,
    link: "https://hydro.cosmos.network/"
  }
];
