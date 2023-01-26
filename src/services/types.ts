export interface ITokenHolder {
    access?: string;
    refresh?: string;
    // setToken?: ()=> void;
};
export interface NoteWorker extends Worker {
    //
}
export interface UserWorker extends Worker {
    put_UserAccount: Promise<void>
}
export interface AuthWorker extends Worker {
    //
}
export interface IServiceWorkers {
    note: NoteWorker;
    user: UserWorker;
    auth: AuthWorker;
};
 
