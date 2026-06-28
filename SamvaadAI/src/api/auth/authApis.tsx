import type { LoginDataTypes } from "../../types/loginTypes";
import type { RegisterUserDataTypes } from "../../types/registerTypes";
import { api } from "./axiosInterseptor";

export const registerUser = async (userData: RegisterUserDataTypes) => {
    try {
        const response = await api.post('/auth/register', userData);
        return [response.data.token, response.data.username, "Registered Successfully"];
    } catch (error) {
        console.log(error);
        return [null, "", "Something went wrong!"];
    }
}

export const loginUser = async (userData: LoginDataTypes) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(userData.userInp.trim());

        if(isEmail){
            const response = await api.post('/auth/login', {email: userData.userInp, password: userData.password});
            return [response.data.token, response.data.username, "Logged In Successfully"]
        }
        else {
            const response = await api.post('/auth/login', {username: userData.userInp, password: userData.password});
            return [response.data.token, response.data.username, "Logged In Successfully"]
        }
    } catch (error) {
        console.log(error);
        return [null, "", "Something went wrong!"];
    }
}