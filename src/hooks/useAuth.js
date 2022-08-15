import { useContext } from "react";
import { AuthContext } from "../contexts";

export const useAuth = () => {
	const { storageAuth, setStorageAuth } = useContext(AuthContext);

	return { storageAuth, setStorageAuth };
};
