import React from "react";
import { Link,useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate= useNavigate()
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="btn btn-success" onClick={()=>{navigate("/registro")}}>registro</div>
			<div className="btn btn-success" onClick={()=>{navigate("/")}}>ingreso</div>
			<div className="btn btn-success"onClick={()=>{navigate("/vistaprotegida")}}>vista protegida</div>

		</nav>
	);
};
