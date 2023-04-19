export interface Route {
  airline: string;
  sourceAirport: string;
  destinationAirport: string;
  codeShare: string;
  stops: number;
  equipment?: string;
}

export interface RouteTable {
  airline: string;
  source_airport: string;
  destination_airport: string;
  code_share: string;
  stops: number;
  equipment?: string;
}
