import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Ingreso = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			ingreso
		</div>
	);
};
