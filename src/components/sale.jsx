import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function sale() {

    const [ProductSale, setProductSale] = useState([]);
    const [TableData, setTableData] = useState("");

    async function getData() {
        const response = await fetch("");
        const data = await response.json();
        setProductSale(data.data);
        setTableData(data.data);
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div className="">
            <div className="py-5 bg-white shadow">
                <div className="flex justify-between px-5">
                    <p className="text-lg font-medium">Sales</p>
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

           <div>
                <p className="my-1 pt-2 text-xl font-medium">Target Prediction</p>
                <div className="p-4 rounded-lg shadow bg-white">
                    <p className="py-2 text-2xl font-bold text-center">&#8377; 10,00,000</p>
                    <div>
                        <div className="flex justify-between">
                            <p>53%</p>
                            <p>&#8377; 5,00,000</p>
                        </div>
                        <meter value="52" min="0" max="100" className="w-full rounded h-5 "></meter>
                    </div>
                </div>
           </div>
            
            <div>
                <p className="my-1 pt-2 text-xl font-medium">Total sales</p>
                <div className="p-4 bg-white rounded shadow">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Sales</th>
                                <th>Total amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {TableData.map((item, index) => ( */}
                                {/* <tr key={index}>
                                    <td>{item.date || "N/A"}</td>
                                    <td>{item.name || "N/A"}</td>
                                    <td>{item.quantity || "N/A"}</td>
                                    <td>{item.sales || "N/A"}</td>
                                    <td>{item.amount || "N/A"}</td>
                                    </tr> */}
                            {/* ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default sale
