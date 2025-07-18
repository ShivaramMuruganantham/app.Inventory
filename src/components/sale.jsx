import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { useFetch } from "../utils/mixin";
import { Link } from "react-router-dom";


function sale() {

    const [ProductSale, setProductSale] = useState([]);
    const [years, setYears] = useState([]);
    const [TableData, setTableData] = useState([]);
    const [Revenue, setRevenue] = useState([]);
    
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const _fetch = useFetch();

    useEffect(() => {
        const response = _fetch('GET', '/analysis/sale/year', {}, (resp) => {
            if (resp.status) {
                setYears(resp.years);

                if(resp.years.includes(currentYear)) {
                    setSelectedYear(currentYear);
                }
            }
        })
    }, []);

    useEffect(() => {
        if (selectedYear) {
            const response = _fetch('GET', `/analysis/sale/graph/${selectedYear}`, {}, (resp) => {
                if (resp.status) {
                    // console.log(resp.graph);
                    const formattedData = resp.graph.map((item) => ({
                        name: item.month_name || `Month ${item.month}`,
                        pv: item.total
                    }))
                    setProductSale(formattedData);
                }
            })
        }

        const response1 = _fetch('GET', `/analysis/sale/details/${selectedYear}`, {}, (resp) => {
            if (resp.status) {
                // console.log(resp);
                setTableData(resp.sales);
            }
        })

        const response2 = _fetch('GET', `/analysis/sale/revenue/${selectedYear}`, {}, (resp) => {
            if (resp.status) {
                // console.log(resp);
                setRevenue(resp.revenue[0]);
            }
        })
    }, [selectedYear]);

    return(
        <div className="">
            <div className="py-5 bg-white shadow">
                <div className="flex justify-between px-5">
                    <p className="text-lg font-medium">Sales</p>
                    <select value={selectedYear} name="" onChange={(e) => setSelectedYear(Number(e.target.value))} className="border p-1 rounded text-sm">
                        <option value="">Select Year</option>
                        {years.map((year, index) => (
                            <option value={year} key={index}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-7 pr-2">
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart width={500} height={400} data={ProductSale}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area key="pv" type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8"></Area>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <Link to="/revenue">
                <div>
                    <p className="my-1 pt-2 text-xl font-medium">Target Prediction</p>
                    <div className="p-4 rounded-lg shadow bg-white">
                        <p className="py-2 text-2xl font-bold text-center">&#8377; {Revenue.collected_amount}</p>
                        <div>
                            <div className="flex justify-between">
                                <p>{((Revenue.collected_amount / Revenue.expected_amount) * 100).toFixed(0)}%</p>
                                <p>&#8377; {Revenue.expected_amount}</p>
                            </div>
                            <meter value={((Revenue.collected_amount / Revenue.expected_amount) * 100).toFixed(0)} min="0" max="100" className="w-full rounded h-5 "></meter>
                        </div>
                    </div>
                </div>
            </Link>
            
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
                            {TableData?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.sold_date ? new Date(item.sold_date).toLocaleDateString() : "N/A"}</td>
                                    <td>{item.product_name || "N/A"}</td>
                                    <td>{item.quantity || "N/A"}</td>
                                    <td>{item.total_sale || "N/A"}</td>
                                    <td>{item.total_price || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default sale
