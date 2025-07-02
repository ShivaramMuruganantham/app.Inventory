import { useState } from "react"
import { LoginValidate } from "../utils/mixins/FormValidte"
import { useFetch } from "../utils/mixin"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Input from "../components/form/input"

function AdminRegister() {
    const [FormData, setFormData] = useState(
        {   
            shopName: "",
            shopEmail: "",
            userName: "",
            userEmail: "",
            phone: "",
            userRole: "",
            password: "",
            confirmPassword: ""
        }
    )

    const [formErrors, setformErrors] = useState({});

    const _fetch = useFetch();

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(FormData);
        
        const loginError = {
            shopName: LoginValidate("name", FormData.shopName),
            shopEmail: LoginValidate("email", FormData.shopEmail),
            userName: LoginValidate("name", FormData.userName),
            userEmail: LoginValidate("email", FormData.userEmail),
            phone: LoginValidate("phone", FormData.phone),
            role: LoginValidate("name", FormData.role),
            password: LoginValidate("password", FormData.password),
            confirmPassword: LoginValidate("password", FormData.confirmPassword)
        }

        if (loginError.password !== loginError.confirmPassword) {
            loginError.confirmPassword = "Password does not match";
        }


        try {
            const response = await _fetch('POST', '/admin/register', FormData, (resp) => {
                if (resp.status) {
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
        <div className="min-h-screen bg-gray-50">
            <div className="flex gap-32 items-center py-3">
                <p className="text-2xl font-bold" onClick={() => window.history.back()}><i className="fa-solid fa-arrow-left-long text-2xl"></i></p>
                <p className="text-2xl font-bold">Admin Register</p>
            </div>
            <div className="m-1 rounded-xl bg-white shadow">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-around items-center py-3">
                        <div>
                            <p className="mb-1">Shop Name:</p>
                            <Input type="text" name="shopName" placeholder="Enter your shop name" onChange={handleChange}  className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white" />
                            {formErrors.shopName && <p className="text-red-500">{formErrors.shopName}</p>}
                        </div>

                        <div>
                            <p className="mb-1">Shop Email:</p>
                            <Input type="email" name="shopEmail" placeholder="Enter your shop email" onChange={handleChange}  className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white" />
                            {formErrors.shopEmail && <p className="text-red-500">{formErrors.shopEmail}</p>}
                        </div>
                    </div>
                    <div className="flex justify-around items-center py-3">
                        <div>
                            <p className="mb-1">User Name:</p>
                            <Input type="text" name="userName" placeholder="Enter your name" onChange={handleChange}  className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white" />
                            {formErrors.userName && <p className="text-red-500">{formErrors.userName}</p>}
                        </div>
                        
                        <div>
                            <p className="mb-1">User Email:</p>
                            <Input type="email" name="userEmail" placeholder="Enter your email" onChange={handleChange}  className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white" />
                            {formErrors.userEmail && <p className="text-red-500">{formErrors.userEmail}</p>}
                        </div>
                    
                    </div> 
                    <div className="flex justify-around items-center py-3">
                        <div>
                            <p className="mb-1">Phone Number:</p>
                            <Input type="number" name="phone" placeholder="Enter your phone number" onChange={handleChange}  className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white" />
                            {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
                        </div>

                        <div>
                            <p className="mb-1">User Role:</p>
                            <select name="userRole" onChange={handleChange}  className="w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white" >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            {formErrors.role && <p className="text-red-500">{formErrors.role}</p>}
                        </div>
                    </div>               
                    <div className="flex justify-around items-center py-3">
                        <div>
                            <p className="mb-1">Password:</p>
                            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}  className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white" />
                            {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
                        </div>

                        <div>
                            <p className="mb-1">Confirmed Password:</p>
                            <Input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleChange}  className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white" />
                            {formErrors.confirmPassword && <p className="text-red-500">{formErrors.confirmPassword}</p>}
                        </div>
                    </div>
                    <div className="flex justify-center py-5">
                        <button type="submit" className="border px-5 py-2 bg-blue-400 shadow rounded text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminRegister
