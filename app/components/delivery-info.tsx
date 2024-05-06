import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}
const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (

    < Card className="flex justify-around py-2 mt-6 rounded-sm  shadow-none" >
      <div className="flex flex-col items-center">
        {/* custo */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <BikeIcon size={14} />
          <span className="text-xs">Entrega</span>
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : <p className="text-xs font-semibold"> Grátis</p>
        }
      </div>
      {/* tempo */}
      <div className="flex flex-col items-center">
        {/* custo */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <TimerIcon size={14} />
          <span className="text-xs">Entrega</span>
        </div>
        <p className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </p>

      </div>


    </Card >
  );
}

export default DeliveryInfo;