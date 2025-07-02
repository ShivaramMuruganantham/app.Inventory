function Revenue() {
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
                            <tr>
                                <td>1</td>
                                <td>2022</td>
                                <td>1000000</td>
                                <td>950000</td>
                                <td>95%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
       </div>
    )
}

export default Revenue