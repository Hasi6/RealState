import CurrencyFormat from 'react-currency-format';
import { GrLocation } from 'react-icons/gr';
import { TbRuler } from 'react-icons/tb';

import { PropertyZ } from '@/models/property';
import { Text } from '@mantine/core';

interface Props {
  property: PropertyZ;
}

function PropertyCard({ property }: Props) {
  return (
    <div className="relative">
      <div className="bg-white absolute top-[10px] left-[10px] px-[10px] font-semibold rounded-full text-[12px]">
        {`For ${property.status}`}
      </div>
      <img src={property.image} className="w-[370px] h-[280px] rounded-lg" />
      <div className="mt-[10px] font-semibold poppins">{property.title}</div>
      <div className="flex my-[10px]">
        <GrLocation className="my-auto" />
        <Text className="my-auto text-[14px] mx-[5px]">
          {property.location}
        </Text>
      </div>
      <div>{property.type}</div>
      <div className="flex justify-between">
        <div className="font-bold my-[10px]">
          <CurrencyFormat
            value={parseFloat(property.price).toFixed(2)}
            thousandSeparator={true}
            prefix={'LKR. '}
          />
        </div>
        <div className="mr-[15px] font-semibold flex">
          <TbRuler className="mx-[10px] my-auto" />
          {property.areaSqFt}
          <span className="text-gray-500 font-normal mx-[10px] my-auto">
            sq ft
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
