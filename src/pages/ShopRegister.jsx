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
                    console.log(resp);
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
            <div className="flex gap-20 items-center p-3">
                <p className=" cursor-pointer" onClick={() => window.history.back()}><i className="fa-solid fa-arrow-left-long text-2xl font-medium text-black"></i></p>
                <h1 className="text-2xl font-medium text-center text-black">Shop Register</h1>
            </div>

            <div className="">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-around items-center p-3">
                        <div className="">
                            <p className="mb-1">Shop Name:</p>
                            <Input name="shopName" type="text" placeholder="Shop Name" onChange={handleChange} className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white"/>
                        </div>
                        <div className="">
                            <p className="mb-1 ">Owner Name:</p>
                            <Input name="ownerName" type="text" placeholder="Owner Name" onChange={handleChange} className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white"/>
                        </div>
                    </div>

                    <div className="flex justify-around items-center p-3">
                        <div className="">
                            <p className="mb-1 ">Shop Email:</p>
                            <Input name="shopEmail" type="email" placeholder="Email" onChange={handleChange} className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white"/>
                        </div>
                        <div className="">
                            <p className="mb-1 ">Shop Number:</p>
                            <Input name="shopPhone" type="number" placeholder="Number" onChange={handleChange} className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white"/>
                        </div>
                    </div>

                    <div className="flex justify-around p-3">
                        <div className="">
                            <p className="mb-1 ">GST Number (optional):</p>
                            <Input name="gstNumber" type="text" placeholder="Gst number" onChange={handleChange} className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white"/>
                        </div>
                        <div className="">
                            <p className="mb-1 ">Shop City:</p>
                            <Input name="city" type="text" placeholder="City" onChange={handleChange} className="max-w-44 border p-1 border-gray-400 outline-none focus:border-black bg-white"/>
                        </div>
                    </div>
                    <div className="p-3 px-7">
                        <div className="">
                            <p className="mb-1 ">Shop Address:</p>
                            <textarea name="address" placeholder="Address" cols="30" rows="3" onChange={handleChange} className="w-full border p-1 border-gray-400 outline-none focus:border-black bg-white"></textarea>
                        </div>
                    </div>
                    <div className="flex justify-center py-1">
                        <button className="border px-4 py-1 text-xl rounded shadow bg-blue-500 text-white">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ShopRegister