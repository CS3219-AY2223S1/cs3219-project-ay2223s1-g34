import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { URL_USER_SVC } from "../../configs";
import { STATUS_CODE_SUCCESS } from "../../constants";
import LoadAnim from "./LoadAnim";

function ProtectedRoute({ children }) {
	const [isFetch, setIsFetch] = useState(true);
	const [isAuth, setIsAuth] = useState(false);

	const location = useLocation();

	const checkAuth = async () => {
		if (location.state && location.state.email) {
			const res = await axios
				.post(
					`${URL_USER_SVC}/checkauth/${location.state.email}`,
					{},
					{
						withCredentials: true,
						credentials: "include",
					}
				)

				.catch((err) => {
					console.log(err);
				});

			if (res && res.status === STATUS_CODE_SUCCESS) {
				setIsAuth(true);
				setIsFetch(false);
			} else {
				setIsAuth(false);
				setIsFetch(false);
			}
		} else {
			setIsAuth(false);
			setIsFetch(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await checkAuth();
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isAuth ? (
		children
	) : isFetch ? (
		<LoadAnim open={true} />
	) : (
		<Navigate to="/signin" />
	);
}

export default ProtectedRoute;
