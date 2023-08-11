import { Store } from "@reduxjs/toolkit";
import {
  store,
  RootState,
  AppDispatch,
} from "shared/storage/storageConfiguration";

export default class AppStore {
  protected store: Store;
  protected dispatch: AppDispatch;

  constructor() {
    this.store = store;
    this.dispatch = this.store.dispatch;
  }
  getState(): RootState {
    return this.store.getState();
  }
}
