import { useState } from "react";
import { useFetch } from "../utils/mixin";
import { useNavigate } from "react-router-dom"

import Input from "../components/form/input"
import { configureStore } from "@reduxjs/toolkit";

function ShopRegister() {

    const [FormData, setFormData] = useState({
        shopName: "",
        ownerName: "",
        shopEmail: "",
        shopPhone: "",
        gstNumber: "",
        city: "",
        address: "",
    });

    const _fetch = useFetch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        console.log(FormData);

        try {
            const response = await _fetch('POST', '/shop/register', FormData, (resp) => {
                if (resp.status) {
                    // console.log(resp);
                    alert(resp.message);
                    navigate("/admin-register");
                }
            })
        }
        catch(error) {
            alert("Login Failed", error);
        }
    }

    return(
        <div className="min-h-screen bg-gray-50">
            <div className="flex justify-between items-center p-3 bg-white border-b border-gray-300 shadow">
                <p className=" cursor-pointer" onClick={() => window.history.back()}><i className="fa-solid fa-arrow-left-long text-2xl font-medium text-black"></i></p>
                <h1 className="text-2xl font-medium text-center text-black">Shop Register</h1>
                <div className="w-10"></div>
            </div>

            <div className="mt-5 px-3">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center gap-2">
                        <div className="w-full">
                            <p className="mb-2 text-sm">Shop Name:</p>
                            <Input name="shopName" type="text" placeholder="Shop Name" onChange={handleChange} className="outline-none bg-white py-1 shadow px-2 w-full rounded-full"/>
                        </div>
                        <div className="w-full">
                            <p className="mb-2 text-sm">Owner Name:</p>
                            <Input name="ownerName" type="text" placeholder="Owner Name" onChange={handleChange} className="outline-none bg-white py-1 shadow px-2 w-full rounded-full"/>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-2 mt-5">
                        <div className="w-full">
                            <p className="mb-2 text-sm">Shop Email:</p>
                            <Input name="shopEmail" type="email" placeholder="Email" onChange={handleChange} className="outline-none bg-white py-1 shadow px-2 w-full rounded-full"/>
                        </div>
                        <div className="w-full">
                            <p className="mb-2 text-sm">Shop Number:</p>
                            <Input name="shopPhone" type="number" placeholder="Number" onChange={handleChange} className="outline-none bg-white py-1 shadow px-2 w-full rounded-full"/>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-2 mt-5">
                        <div className="w-full">
                            <p className="mb-2 text-sm">GST Number (optional):</p>
                            <Input name="gstNumber" type="text" placeholder="Gst number" onChange={handleChange} className="outline-none bg-white py-1 shadow px-2 w-full rounded-full"/>
                        </div>
                        <div className="w-full">
                            <p className="mb-2 text-sm">Shop City:</p>
                            <Input name="city" type="text" placeholder="City" onChange={handleChange} className="outline-none bg-white py-1 shadow px-2 w-full rounded-full"/>
                        </div>
                    </div>
                    
                    <div className="mt-5">
                        <div className="">
                            <p className="mb-2 text-sm">Shop Address:</p>
                            <textarea name="address" placeholder="Address" cols="30" rows="3" onChange={handleChange} className="outline-none bg-white py-1 shadow px-2 w-full rounded-2xl"></textarea>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button className="border px-4 py-1 text-xl rounded-full shadow bg-blue-500 text-white">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ShopRegister