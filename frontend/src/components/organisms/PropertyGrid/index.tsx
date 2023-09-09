import PropertyCard from '@/components/molecules/PropertyCard';
import { PropertyZ } from '@/models/property';

interface Props {
  properties: PropertyZ[];
}

function PropertyGrid(props: Props) {
  return (
    <div className="grid grid-cols-3 gap-[10px] mt-[50px] max-w-[1200px] mx-auto">
      {props.properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
}

export default PropertyGrid;
