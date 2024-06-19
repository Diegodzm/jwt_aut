import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Vistaprotegida = () => {
	const { store, actions } = useContext(Context);
	useEffect(()=>{
		actions.getAutvalidation()
	},[])

	return (
		<div className="container">
			vistaprotegida
		</div>
	);
};
