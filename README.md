# PGC PAWW Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.8.

See the project's Teams wiki for more details on the app.

PGC PAWW (app name changed to WHS - Wildlife Health Survey) is a public (anonymous access) animal observation app.  The app is PWA enabled and has several offline features.  It collects a location point from the user and a series of dropdown questions.

It works in conjunction with an API and a companion internal only review app maintained by PGC.

Access to this API requires an implicit grant type OAuth 2.0 request in order to pass through the API gateway.  This token access routine is already established so no further edits are needed unless there are changes to that system.

Request LastPass access in order to get access to OAuth credentials and Google Account access for Google's RECaptcha.

The app uses an Esri AGOL API key for geocoding and basemaps.  Make a temporary one for local dev and utilzie one provided by PGC for production.  This key must be obtianed from the client or LastPass.

No VPN access is required to access the API but VPN access is required to access the internal app/PGC's TFS repo.  You do not need access to the internal app to develop for this app though.

## Get started

There is a local mock dev API (outlined below in `Code Review` section) but it is out of date at this point.  For local dev, would instead recommend, pointing to the (already set in the `environment.ts` file) PGC QA API.  You may also see reference to a dummy firebase API.  This API is no longer fucntional but is a good alternative to the local DB method if you need to make quick edits and the PGC API is unavailable or currently under development.  A firebase realtime database API can be stood up using JSON and a free account.

Run `npm install` to gather dependencies.

Add overrides.json as seen below.

Run `npm start` to boot the web server and access on `http://localhost:4200/`.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Testing PWA locally

The Webpack dev server above will not work with the PWA service worker.  To test offline/PWA feautures locally you must build the project locally and then serve the build out.  

Recommend the node package `http-server` for this.

For more info on working with Ng PWAs:
https://angular.io/guide/service-worker-getting-started

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.  npm scripts will auto-increment minor app version on `npm build`.

To build for QA run `npm run build-qa`.

To build for PROD run `npm run build-prod`.

Builds are provided in a zipped folder via basecamp to the client to be deployed to the respective environment (IIS server).

## Contributing

Use bitbucket as the primary repo:
https://bitbucket.org/timmonsgroup/pgc-paww-frontend/src/master/

Generally follows a gitflow workflow but there is no CI/CD.  Builds are produced manually with npm and sent to PGC as zip files.

Backup any builds in PGC's TFS repo.  Will require VPN access to PGC.

## Running unit tests - No tests beyond the boilerplate were added

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests - No tests beyond the boilerplate were added

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Code Overview

### Shared

`src\app\_shared`

Contains shared components/services/directives/etc. That can be used across apps.

Be sure to register entities in `src\app\_shared\modules\shared.module.ts`.

### Page views

Each route is broken up into a main view which is then composed of specific and shared components.

Views can be foudn here:
`src\app\views`

with routes found here:

`src\app\app-routing.module.ts`

### GIS Data

GIS data for offline maps and for state spatial validaiton can be found in:

`src\assets\gis`

###

PWA config can be modified here:

`ngsw-config.json`

### Local mock API

Deprecated - just use PGC API or a firebase API if needed.  However, content for this can be found in:

`local/`

and a mock API server can be started with:

`npm start api`

Note, if using a firebase API, will need to make `useTestApi` = true in the environemnts.ts file.

This will make requests skip an HTTP intercept token routine (needed for the actual API) and append ".json" to the end of API reuqests (required by firebase).

## Overrides

`src/assets/overrides.json`

data: Check LastPass

format:

```
{
    "clientAccess": "",
    "clientSec": "",
    "pawwU": "",
    "pawwP": ""
}
```
