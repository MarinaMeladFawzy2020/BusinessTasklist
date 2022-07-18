// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
 
// 'https://173.249.22.91:8083/'; //Cloud
// 'https://192.168.0.9:8083/'; //local
// 'http://192.168.0.89:8080/EUBusiness/' ; //89

//'http://161.97.81.241:8083/'


export const environment = {
  production: false ,
  urlAddress: 'http://192.168.0.89:8080/EUBusiness/'  
 // urlAddress: 'https://192.168.0.110:8083/'  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
