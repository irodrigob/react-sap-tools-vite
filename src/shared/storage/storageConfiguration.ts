import { configureStore } from "@reduxjs/toolkit";

import SAPGeneralReducer from "sap/general/infraestructure/storage/SAPGeneralSlice";
import SystemReducer from "systems/infraestructure/storage/systemSlice";
import SAPTransportOrderReducer from "sap/transportOrder/infraestructure/storage/sapTransportOrderSlice";
import MessageManagerReducer from "messageManager/infraestructure/storage/messageManagerSlice";
// El middleware es para evitar el warning: A non-serializable value was detected in an action, in the path: `payload`
export const store = configureStore({
  reducer: {
    SAPGeneral: SAPGeneralReducer,
    System: SystemReducer,
    SAPTransportOrder: SAPTransportOrderReducer,
    MessageManager: MessageManagerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
