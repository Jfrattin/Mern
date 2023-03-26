import React from 'react';
import axios from '../utils/config/axios.config';
/**
 * Login
 * @param email email  user
 * @param password password user
 * @param name  name user
 * @param age age user
 * @returns     
 */




export const login = (email:string, password:string ) => {
    //declare  body post 
    //send request
    //http://localhost:8000/api/auth/login
    let body = {email: email,
            password: password}

    return axios.post("/auth/login", body, {withCredentials: true});
}       

/**
 * Login
 * @param email email  user
 * @param password password user
 * @param name  name user
 * @param age age user
 * @returns 
 */

export const register = (name:string, email:string ,password:string, age:number  ) => {
    //declare  body post 
    
    

    
    let body = {
        name: name,
        email:email,
        password: password,
        age: age
    }
    //send request
    //http://localhost:8000/api/auth/register
    return axios.post('/auth/register', body, {withCredentials: true});
}