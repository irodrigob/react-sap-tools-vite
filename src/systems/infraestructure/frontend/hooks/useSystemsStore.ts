import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "shared/storage/useStore";
import System from "systems/domain/entities/system";
import {
	setSystemSelected,
	setConnectedToSystem,
	setURL2ConnectSystem,
	setOpenEditSystem,
	setOperationEdit,
	setSystemEdit,
} from "systems/infraestructure/storage/systemSlice";

export default function useSystemStore() {
	const { URL2ConnectSystem, systemSelected } = useAppSelector(
		(state) => state.System
	);
	const dispatch = useDispatch();
	const setSystemSelectedAction = useCallback((systemSelected: System) => {
		dispatch(setSystemSelected(systemSelected));
	}, []);
	const setConnectedToSystemAction = useCallback((value: boolean) => {
		dispatch(setConnectedToSystem(value));
	}, []);
	const setURL2ConnectSystemAction = useCallback((url: string) => {
		dispatch(setURL2ConnectSystem(url));
	}, []);

	return {
		URL2ConnectSystem,
		systemSelected,
		setSystemSelectedAction,
		setConnectedToSystemAction,
		setURL2ConnectSystemAction,
	};
}
