// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // url: 'https://us-central1-click-warriors.cloudfunctions.net/api',
  url: 'http://localhost:5001/click-warriors/us-central1/api',
  firebase: {
    apiKey: 'AIzaSyDuYZFbKui2fpm8Xwm2SqPAgaDZSvpsCxs',
    authDomain: 'click-warriors.firebaseapp.com',
    databaseURL: 'https://click-warriors-default-rtdb.firebaseio.com/',
    projectId: 'click-warriors',
    storageBucket: 'click-warriors.appspot.com',
    messagingSenderId: '1054630153409',
    appId: '1:1054630153409:web:27733f32d599606beb9840',
    measurementId: 'G-JYM6172Q21',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
