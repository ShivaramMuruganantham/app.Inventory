import { useState } from "react"
import { FormValidateField } from "../utils/mixins/FormValidte"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Input from "../components/form/input"

function AdminLogin() {
    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    )

    const [formErrors, setformErrors] = useState({});

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const loginError = {
            email: FormValidateField("email", formData.email),
            password: FormValidateField("password", formData.password)
        }

        if (loginError.email || loginError.password) {
            setformErrors(loginError);
            return;
        }

        try {
            const response = await fetch("https://webhook.site/9571c062-4ba5-4775-9c6f-8f879c7af04b", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            // if(response.ok) {
                alert("Login Success");
                // console.log(response.data, "Login Success");
                return navigate("/dashboard");
            // }
        }
        catch (error) {
            console.log("Login Failed", error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label="Email" type="email" name="email" placeholder="Enter your email" className="border" onChange={handleChange} />
                {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

                <Input label="Password" type="password" name="password" placeholder="Enter your password" className="border" onChange={handleChange} />
                {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default AdminLogin
