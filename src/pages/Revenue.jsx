import { useEffect, useState } from "react";
import { useFetch } from "../utils/mixin";

import Input from "../components/form/input";

function Revenue() {

    const [revenue, setRevenue] = useState([]);
    const _fetch = useFetch();

    useEffect(() => {
        const response = _fetch('GET', '/revenue', {}, (resp) => {
            if (resp.status) {
                setRevenue(resp.revenues);
            }
        })
    }, [])

    return (
       <div>
            <div className="flex gap-28 items-center p-3">
                <p className=" cursor-pointer" onClick={() => window.history.back()}><i className="fa-solid fa-arrow-left-long text-2xl font-medium text-black"></i></p>
                <h1 className="text-2xl font-medium text-center text-black">Revenue</h1>
            </div>

            <div>
                <div className="flex justify-between p-2 px-4">
                    <p className="text-xl font-medium">History</p>
                    <button className="border px-2 p-0.5 rounded">New Target</button>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Year</th>
                                <th>Target</th>
                                <th>Revenue</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                        { revenue.map((items, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{items.year}</td>
                                <td>{items.expected_amount}</td>
                                <td>{items.collected_amount}</td>
                                <td>{((items.collected_amount / items.expected_amount) * 100).toFixed(0)}%</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <form>
                    <div>
                        <p>Year :</p>
                        <Input type="number" name="year" onChange={(e) => console.log(e.target.value)}/>
                    </div>
                    <div>
                        <p>Target Amount :</p>
                        <Input type="number" name="target" onChange={(e) => console.log(e.target.value)}/>
                    </div>
                </form>
            </div>
       </div>
    )
}

export default Revenue