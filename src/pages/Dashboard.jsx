import js from "@eslint/js";
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { useFetch } from "../utils/mixin"

function Dashboard() {

    const [DashboardData, setDashboardData] = useState([]);

    const userName = JSON.parse(localStorage.getItem("user_data")); 
    
    const _fetch = useFetch();

    useEffect(() => {
        _fetch('GET', '/dashboard', {}, (resp) => {
            if(resp.status) {
                setDashboardData(resp.data);
            }
        })
    }, [])

    return (
        <div className="pb-14 bg-gray-50">
            <div className="flex justify-between items-center p-3 border-b-1 border-gray-300 bg-white shadow">
                <div className="flex gap-2 items-center">
                    <div>
                        <img src="./assets/images/Moong.png" alt="" className="w-16 h-16 border rounded-full"/>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Welcome Back</p>
                        <p className="text-lg font-medium">{userName.user}</p>
                    </div>
                </div>
                <div>
                    <Link to="/notification"><i className="icon ion-ios-notifications text-3xl px-3 py-1 rounded-full"></i></Link>
                </div>
            </div>
            <div className="m-4 p-4 pb-36 rounded-xl shadow bg-gradient-to-b from-[#FF8000] via-[#FF8000] to-[#F0D800] text-white">
                <p className="text-sm pt-0.5">Sale amount</p>
                <p className="text-2xl font-medium pt-0.5"><span>&#8377;</span> {DashboardData.total_sale_amount}</p>
                <p className="text-sm pt-0.5"><span className="text-green-600 bg-white border border-indigo-100 px-2 rounded-2xl text-xs">+15%</span> from the pervious month</p>
            </div>
            <div className="flex justify-around flex-wrap">
                <div className="m-2 p-3 rounded-xl bg-white shadow w-36">
                    <p className="text-sm"><span className="mr-1 px-1 py-1 rounded-full bg-amber-100"><i className="fa-solid fa-boxes-stacked text-[#FF8000] text-sm"></i></span> Total Products</p>
                    <div className="flex justify-between items-center">
                        <p className="text-xl px-3 py-5 font-medium">{DashboardData.total_product}</p>
                        <p className="text-xs bg-green-50 font-medium text-green-600 p-1 rounded-full">+ 10%</p>
                    </div>
                    <hr />
                    <p className="pt-2 text-xs text-left text-gray-400">Updated on 01/01/2023</p>
                </div>
                <div className="m-2 p-3 rounded-xl bg-white shadow w-36">
                    <p className="text-sm"><span className="mr-1 px-1 py-1 rounded-full bg-amber-100"><i className="fa-solid fa-layer-group text-[#FF8000]"></i></span> Category</p>
                    <div className="flex justify-between items-center">
                        <p className="text-xl px-3 py-5 font-medium">23</p>
                        <p className="text-xs bg-green-50 font-medium text-green-600 p-1 rounded-full">+ 10%</p>
                    </div>
                    <hr />
                    <p className="pt-2 text-xs text-left text-gray-400">Updated on 01/01/2023</p>
                </div>
                <div className="m-2 p-3 rounded-xl bg-white shadow w-36">
                    <p className="text-sm"><span className="mr-1 px-1 py-1 rounded-full bg-amber-100"><i className="fa-solid fa-truck-ramp-box text-[#FF8000]"></i></span> Total Sold</p>
                    <div className="flex justify-between items-center">
                        <p className="text-xl px-3 py-5 font-medium">{DashboardData.total_sold}</p>
                        <p className="text-xs bg-green-50 font-medium text-green-600 p-1 rounded-full">+ 10%</p>
                    </div>
                    <hr />
                    <p className="pt-2 text-xs text-left text-gray-400">Updated on 01/01/2023</p>
                </div>
                <div className="m-2 p-3 rounded-xl bg-white shadow w-36">
                    <p className="text-sm"><span className="mr-1 px-1 py-1 rounded-full bg-amber-100"><i className="fa-solid fa-cubes-stacked text-[#FF8000]"></i></span> Total Stock</p>
                    <div className="flex justify-between items-center">
                        <p className="text-xl px-3 py-5 font-medium">{DashboardData.total_stock}</p>
                        <p className="text-xs bg-green-50 font-medium text-green-600 p-1 rounded-full">+ 10%</p>
                    </div>
                    <hr />
                    <p className="pt-2 text-xs text-left text-gray-400">Updated on 01/01/2023</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
