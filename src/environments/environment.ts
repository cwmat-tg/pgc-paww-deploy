// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: require('../../package.json').version + '-dev',
  esriApiKey: 'AAPK906c33edfc014bb58ad9eccf7243114d6wSECkZmaVfQ719ZvrMOReTtcPuSjk91PfM6KVbRNojvoO6wUSdgrI0SaKXnRf_E',
  // apiEndpoint: 'https://ghnl4dzvc0.execute-api.us-east-1.amazonaws.com/Prod',
  // apiEndpoint: 'http://localhost:8010/proxy/Prod',
  // apiEndpoint: 'http://localhost:3000/PAWWPublicFacing.svc',
  apiEndpoint: 'https://paww-49735-default-rtdb.firebaseio.com',
  useTestApi: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
