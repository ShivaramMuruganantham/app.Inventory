import { useState } from "react";
import { LoginValidate } from "../utils/mixins/FormValidte";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../utils/mixin.js";

import axios from "axios";
import Input from "../components/form/input";

function UserLogin() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [formErrors, setformErrors] = useState({});

    const _fetch = useFetch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        const loginError = {
            email: LoginValidate("email", formData.email),
            password: LoginValidate("password", formData.password)
        }

        if (loginError.email || loginError.password) {
            setformErrors(loginError);
            return;
        }

        try {
            const response = await _fetch('POST', '/user/login', formData, (resp) => {
               if(resp.status) {
                    console.log(resp);
                    alert(resp.message);
                    localStorage.setItem("user_data", JSON.stringify({user: resp.user.name, token: resp.user.api_token}));
                    navigate("/dashboard");
               }
               else {
                    alert(resp.message);
               }
            })
        }
        catch(error) {
            console.log("Login Failed", error);
        }  
    }
    return (
        <div>
            <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-center mb-4 p-2 rounded">[Potti Kadai logo]</p>
                <p className="text-2xl font-bold text-center mb-4 p-2 rounded">Welcome Back!</p>
                <p className="text-xl font-bold text-center mb-4 p-2 rounded">User Login</p>
            </div>
            <div className="p-7">
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <p className="mb-1 ml-3 text-lg font-medium">Email</p>
                        <Input name="email" type="email" placeholder="Enter your email" onChange={handleChange} className="border w-full p-2 px-3 rounded-full" />
                        {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
                    </div>
                    <div className="mt-4">
                        <p className="mb-1 ml-3 text-lg font-medium">Password</p>
                        <Input name="password" type="password" placeholder="Enter your password" onChange={handleChange} className="border w-full p-2 px-3 rounded-full" />
                        {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
                    </div>
                    <div className="mt-4 flex justify-center p-5">
                        <button type="submit" className="py-1 px-7 text-lg font-medium border rounded-full">Login</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default UserLogin