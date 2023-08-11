import type { TypedUseSelectorHook } from "react-redux";
import { RootState } from "./storageConfiguration";
import { useSelector } from "react-redux";

//export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
