export interface TravelReportInterface {
  name: string;
  pricePerPassenger: number;
  vehicleType: {
    name: string,
    maxPassengers: number,
  };
}
