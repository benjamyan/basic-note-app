// / <reference path="./types.ts" />

/**
 * This files purpose is to act a mediator/router between our client and 
 * our workers.
 */

// import { UserActions } from './actions/UserActions';

// interface IProcessModule {
//     Token: ITokenHolder;
//     Service: IServiceWorkers;
// };


/**
 * https://devhints.io/web-workers
 * https://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker
 * 
 */
// export const Services: IServiceWorkers = {
//     auth: <AuthWorker> new Worker('./services/auth'),
//     user: <UserWorker> new Worker('./services/user'),
//     // user: <UserWorker> new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'}))),
//     note: <NoteWorker> new Worker('./services/note')
// };

// export class ProcessModule implements IProcessModule {
//     Token = <ITokenHolder> {};
//     Service = <IServiceWorkers> {};
//     constructor() {
//         this.Token = {};
//         this.Service = Services;
//     }
//     setNewModuleToken(newToken: ITokenHolder) {
//         if (!!newToken) {
//             // this.token.access = givenToken;
//         } else {
//             // delete this.token.access;
//         };
//     }
// }

// const UserActionsClass = require('./actions/UserActions').default;
// export const UserActions = new UserActionsClass()

// // export {
// //     UserActions
// // };
// export default this;

// export * from './ActionsHandler.old'

export default {}
 