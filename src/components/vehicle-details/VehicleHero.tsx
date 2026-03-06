import React from "react";
import { type VehicleImage } from "@/types/vehicle-detail";

interface Props {
  images: VehicleImage[];
}

export const VehicleHero: React.FC<Props> = ({ images }) => {
  return (
    <div className="h-full w-full">
      <img
        src={images[0].url}
        alt="Vehicle"
        className="h-full w-full rounded-xl object-cover"
      />
    </div>
  );
};
