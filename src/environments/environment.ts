// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// https://172.25.180.162:12345/api-gateway/api/fleetmap/v0.1/grouphierarchy/v/latest/roots/allowed
// https://172.25.180.162:12345/api-gateway/api/gpsls/v0.1/positions/lastthree

export const environment = {
  production: false,
  apiUrl: 'https://172.25.180.162:12345/api-gateway/api/',
  apiVersion: 'v0.1/',
  fleetmapUrl: 'fleetmap/',
  dataExportUrl: 'data-export/',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
