import { useState } from "react"

import Sale from "../components/sale"
import Product from "../components/product"

function Analysis() {

    const [activeTable, setActiveTable] = useState('sales');


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-5 bg-white border-b border-gray-300 shadow">
                <p className="text-2xl font-medium">Analysis</p>
            </div>
            <div className="pb-14 m-3">
                <div className="flex justify-around py-2 rounded-lg shadow bg-white my-3">
                    <button className={`text-lg font-medium cursor-pointer py-2 px-14 rounded ${ activeTable === 'sales' ? "bg-gradient-to-b from-[#FF8000] via-[#FF8000] to-[#F0D800] text-white" : ''}`} onClick={() => setActiveTable('sales')}>Sales</button>
                    <button className={`text-lg font-medium cursor-pointer py-2 px-14 rounded ${ activeTable === 'products' ? "bg-gradient-to-b from-[#FF8000] via-[#FF8000] to-[#F0D800] text-white" : '' }`} onClick={() => setActiveTable('products')}>Products</button>
                </div>

                <div>
                    {activeTable === 'sales' && <Sale/>}
                    {activeTable === 'products' && <Product/>}
                </div>
            </div>
        </div>

    )
}

export default Analysis