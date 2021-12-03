// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: require('../../package.json').version + '-dev',
  esriApiKey: 'AAPK906c33edfc014bb58ad9eccf7243114d6wSECkZmaVfQ719ZvrMOReTtcPuSjk91PfM6KVbRNojvoO6wUSdgrI0SaKXnRf_E',
  apiEndpoint: 'https://paww-49735-default-rtdb.firebaseio.com',
  // apiEndpoint: 'http://pgc-mobileapps.beta.pa.gov/PAWWAPI/api/paww',
  useTestApi: false,
  captchaSiteKey: '6LdUuXMdAAAAAFMniF2loADC2sANfLGmkByoDB3u',
  // tokenApi: 'https://pgcapigw.pa.gov/token',
  tokenApi: 'http://localhost:8010/proxy/token',
  clientAccess: '',
  clientSec: '',
  pawwU: 'pawwapp',
  pawwP: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
