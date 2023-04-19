import { Route, RouteTable } from './models';

export function routeToRouteTable(route: Route): RouteTable {
  return {
    airline: route.airline,
    code_share: route.codeShare,
    destination_airport: route.destinationAirport,
    source_airport: route.sourceAirport,
    stops: route.stops,
    equipment: route.equipment,
  };
}

export function mapRoutesToRouteTable(route: Route[]): RouteTable[] {
  return route.map((route) => routeToRouteTable(route));
}
