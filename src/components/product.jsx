import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useState } from "react"

function product() {

    const [ProductSale, setProductSale] = useState([]);
    const [ShowData, setShowData] = useState("");

    function getData() {
        const response = fetch("");
        const data = response.json();
        console.log(data.data);
        setProductSale(data.data);
        setShowData(data.data);
    }

    return (
        <div>
            <div className="py-5 bg-white shadow">
                <div className="flex justify-between px-5">
                    <p className="text-lg font-medium">Product</p>
                    <select name="" id="" className="border p-1 rounded text-sm">
                        <option value="">Months</option>
                        <option value="">Jan</option>
                        <option value="">Feb</option>
                    </select>
                </div>

                <div className="pt-7 pr-2">
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart width={500} height={400} data={ProductSale}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="pv"></Area>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="py-3 mt-2 bg-white shadow">
                <div className="flex justify-between px-5">
                    <p className="text-lg font-medium">Products</p>
                    <div className="flex gap-5">
                        <div className="border rounded">
                            <i className="fa-solid fa-calendar-days p-1"></i>
                            <select name="" id="">
                                <option value="">Months</option>
                                <option value="">Jan</option>
                                <option value="">Feb</option>
                            </select>
                        </div>

                        <select name="" id="" className="border rounded">
                            <option value="">Category</option>
                            <option value="">1</option>
                            <option value="">2</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between pt-5 px-5">
                        <p>All</p>
                        <p>Food</p>
                        <p>Snacks</p>
                        <p>Drinks</p>
                    </div>
                    {/* {ShowData.map((item, index) => {
                        <div key={index} className="flex gap-2 px-5 py-5 m-1 rounded bg-white">
                            <img src={item.image} alt=""  className="border h-14 w-20"/>
                            <div className="flex justify-between gap-x-20">
                                <div>
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                </div>
                                <div>
                                    <button className="cursor-pointer">stock : {item.stockCount}</button>  
                                </div>
                            </div>
                        </div>
                    })} */}
                </div>
            </div>
        </div>
    )
}

export default product