import { useState } from "react"
import { RegisterValidate } from "../utils/mixins/FormValidte"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../utils/mixin"

import Input from "../components/form/input";

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [formErrors, setformErrors] = useState({});

    const navigate = useNavigate();
    
    const _fetch = useFetch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const loginError = {
            name: RegisterValidate("name", formData.name),
            email: RegisterValidate("email", formData.email),
            phone: RegisterValidate("phone", formData.phone),
            password: RegisterValidate("password", formData.password)
        }

        if (loginError.name || loginError.email || loginError.phone || loginError.password) {
            setformErrors(loginError);
            return;
        }

        try {
            const response = await _fetch('POST', '/user/register', formData, (resp) => {
                if(resp.status) {
                    console.log(resp);
                    alert(resp.message);
                    navigate("/user-login");
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
            <h1>Register</h1>
                <div>
                    <form onSubmit={handleSubmit} > 
                        <Input type="text" name="name" label="Name :" placeholder="Enter Name" onChange={handleChange} className="w-[300px] p-1 border"/>
                        {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
                        <Input type="mail" name="email" label="Email" placeholder="Enter Email" onChange={handleChange}  className="w-[300px] p-1 border"/>
                        {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
                        <Input type="number" name="phone" label="Phone Number" placeholder="Enter Phone Number" onChange={handleChange}  className="w-[300px] p-1 border"/>
                        {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
                        <Input type="password" name="password" label="Password" placeholder="Enter password" onChange={handleChange}  className="w-[300px] p-1 border"/>
                        {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
                        <button type="submit" className="p-2 border rounded bg-blue-300">Submit</button>
                    </form>
                </div>
        </div>
    )
}

export default Register