import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { Bike } from "@shared/schema";

interface BikeSelectorProps {
  selectedBike: Bike | null;
  onBikeSelect: (bike: Bike) => void;
}

export function BikeSelector({ selectedBike, onBikeSelect }: BikeSelectorProps) {
  const { data: bikes, isLoading } = useQuery<Bike[]>({
    queryKey: ["/api/bikes"],
  });

  if (isLoading) {
    return <div>Loading bikes...</div>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Select
          value={selectedBike?.productCode}
          onValueChange={(code) => {
            const bike = bikes?.find((b) => b.productCode === code);
            if (bike) onBikeSelect(bike);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a bike model" />
          </SelectTrigger>
          <SelectContent>
            {bikes?.map((bike) => (
              <SelectItem key={bike.productCode} value={bike.productCode}>
                {bike.model} - ₹{bike.price.toLocaleString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
