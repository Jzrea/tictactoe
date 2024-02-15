export enum Status {
  Idle,
  Pending,
  Fulfilled,
  Error,
}

export interface APPSTATE {
  AppStatus: Status;
}
