import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "shared/storage/useStore";
import System from "systems/domain/entities/system";
import {
	setConnectedToSystem,
	setURL2ConnectSystem,
	setOpenEditSystem,
	setOperationEdit,
	setSystemEdit,
	setSystemSelected,
} from "systems/infraestructure/storage/systemSlice";
import { OperationEdit } from "systems/infraestructure/types/system";

export default function useSystemStore() {
	const {
		URL2ConnectSystem,
		systemSelected,
		openEditSystem,
		systemEdit,
		operationEdit,
	} = useAppSelector((state) => state.System);
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
	const setOpenEditSystemAction = useCallback((value: boolean) => {
		dispatch(setOpenEditSystem(value));
	}, []);
	const setOperationEditAction = useCallback((value: OperationEdit) => {
		dispatch(setOperationEdit(value));
	}, []);
	const setSystemEditAction = useCallback((value: System | null) => {
		dispatch(setSystemEdit(value));
	}, []);

	return {
		URL2ConnectSystem,
		systemSelected,
		setSystemSelectedAction,
		setConnectedToSystemAction,
		setURL2ConnectSystemAction,
		setOpenEditSystemAction,
		setOperationEditAction,
		setSystemEditAction,
		openEditSystem,
		systemEdit,
		operationEdit,
	};
}
