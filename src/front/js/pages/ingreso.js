import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Container } from "react-bootstrap";

export const Ingreso = () => {
    const { store, actions } = useContext(Context);
    const loginusuario=(event)=>{
        event.preventDefault()
        actions.handleSubmitLogin()
        
    }

    return (
   
            <form className="col-4 d-flex-block mx-auto mt-5">
                <h1 className="d-flex justify-content-center">Ingreso</h1>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input  name="email" onChange={(e)=>{actions.handleOnchange(e)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input name="password" onChange={(e)=>{actions.handleOnchange(e)}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                </div>
              
                <button onClick={(e)=>{loginusuario(e)}} type="submit" className="btn btn-primary">Submit</button>
            </form>
      
    );
};
