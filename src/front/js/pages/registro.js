import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Container } from "react-bootstrap";

export const Registro = () => {
    const { store, actions } = useContext(Context);

    return (
   
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input  name="email" onChange={(e)=>{actions.handleOnchange(e)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input name="password" onChange={(e)=>{actions.handleOnchange(e)}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                </div>
              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      
    );
};
