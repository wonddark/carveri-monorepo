import React from "react";
import { type VehicleImage } from "@carveri/shared/types/vehicle-detail";

interface Props {
  images: VehicleImage[];
}

export const VehicleHero: React.FC<Props> = ({ images }) => {
  if (images.length === 0) return <p>No image received</p>;
  return (
    <div className="h-80 w-full lg:h-full">
      <img
        src={images[0].url}
        alt="Vehicle"
        className="h-full w-full rounded-xl object-cover"
      />
    </div>
  );
};
