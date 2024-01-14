import { configureStore } from "@reduxjs/toolkit";

import SAPGeneralReducer from "sap/general/infraestructure/storage/SAPGeneralSlice";
import SystemReducer from "systems/infraestructure/storage/systemSlice";
import SAPTransportOrderReducer from "sap/transportOrder/infraestructure/storage/sapTransportOrderSlice";
import MessageManagerReducer from "messageManager/infraestructure/storage/messageManagerSlice";
import SAPTranslateReducer from "sap/translate/infraestructure/storage/sapTranslateSlice";
import ADTReducer from "sap/adt/infraestructure/storage/adtSlice";

// El middleware es para evitar el warning: A non-serializable value was detected in an action, in the path: `payload`
export const store = configureStore({
	reducer: {
		SAPGeneral: SAPGeneralReducer,
		System: SystemReducer,
		SAPTransportOrder: SAPTransportOrderReducer,
		MessageManager: MessageManagerReducer,
		SAPTranslate: SAPTranslateReducer,
		ADT: ADTReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
