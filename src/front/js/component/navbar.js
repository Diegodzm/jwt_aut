import React from "react";
import { Link,useNavigate } from "react-router-dom";
import  { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate= useNavigate()
	const logout=()=>{
		actions.logout()
		if(!store.validation){navigate("/")}
		

	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="btn btn-success" onClick={()=>{navigate("/registro")}}>registro</div>
			<div className="btn btn-success" onClick={()=>{navigate("/")}}>ingreso</div>
			<div className="btn btn-success"onClick={()=>{navigate("/vistaprotegida")}}>vista protegida</div>
			<div className="btn btn-success"onClick={()=>{logout()}}>salir</div>

		</nav>
	);
};
