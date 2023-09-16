import { useCallback } from "react";
import axios from "axios";
import { useSession } from "auth/authProvider";

export default function useGoogle() {
	const { clientId, loginError, loginSuccess } = useSession();

	const googleInitialize = useCallback(
		(clientID: string, onCallBack: (response: any) => void) => {
			console.log("llega al google init");
			window.google.accounts.id.initialize({
				client_id: clientID,
				auto_select: true,
				cancel_on_tap_outside: false,

				callback: async (response: any) => {
					onCallBack(response);
				},
			});
			window.google.accounts.id.prompt();
		},
		[]
	);

	/**
	 * Función que muestra el login para cambiar el usuario.
	 */
	const promptLogin = useCallback(() => {
		window.google?.accounts.oauth2
			.initTokenClient({
				client_id: clientId,
				scope: "openid profile email",
				callback: async (response: any) => {
					if (response.access_token) {
						const userInfo = await axios
							.get("https://www.googleapis.com/oauth2/v3/userinfo", {
								headers: {
									Authorization: `Bearer ${response.access_token}`,
								},
							})
							.then((res) => res.data)
							.catch((error) => {
								loginError(error);
							});
						loginSuccess(userInfo);
					} else {
						loginError();
					}
				},
			})
			.requestAccessToken();
	}, []);

	return { promptLogin, googleInitialize };
}
