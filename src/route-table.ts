export function getTableName(tableSuffix: string) {
  return `ROUTES_${tableSuffix}`;
}

export function getCreateRouteTableQuery(tableSuffix: string) {
  return /* sql */ `
    CREATE TABLE "${getTableName(tableSuffix)}" (
    AIRLINE VARCHAR(50),
    SOURCE_AIRPORT VARCHAR(50),
    DESTINATION_AIRPORT VARCHAR(50),
    CODE_SHARE VARCHAR(50),
    STOPS NUMERIC,
    EQUIPMENT VARCHAR(50),
    PRIMARY KEY (AIRLINE, SOURCE_AIRPORT, DESTINATION_AIRPORT, CODE_SHARE, EQUIPMENT, STOPS)
  );
  `;
}
