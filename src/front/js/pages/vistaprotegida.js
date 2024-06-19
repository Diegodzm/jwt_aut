import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Vistaprotegida = () => {
	const { store, actions } = useContext(Context);
	const navigate= useNavigate()
	

	useEffect(()=>{
		actions.getAutvalidation()
		if(!store.validation){navigate("/")}
		
	},[])

	return (
		<div className="container">
			vistaprotegida
		</div>
	);
};
