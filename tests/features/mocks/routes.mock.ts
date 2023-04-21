import { Route } from '../../../src/models';

export const getRouteMock1 = (): Route => ({
  codeShare: '',
  sourceAirport: 'ASF',
  equipment: 'CR2',
  stops: 0,
  airline: '2B',
  destinationAirport: 'MRV',
});

export const getRouteMock2 = (): Route => ({
  codeShare: '',
  sourceAirport: 'NJC',
  equipment: 'CR2',
  stops: 0,
  airline: '2B',
  destinationAirport: 'UUA',
});
