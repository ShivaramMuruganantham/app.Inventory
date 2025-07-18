import { useState, useEffect } from "react"
import { useFetch } from "../../utils/mixin"

import Input from "../form/input"

function addStock({product, onClose}) {

    const _fetch = useFetch();

    const [FormData, setFormData] = useState({

        name: product.name,
        stock: 0,
        notes: ""
        
    });

    const handleChange = (e) => {
        setFormData({...FormData, [e.target.name]: e.target.value});
    };

    const handeleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await _fetch('POST', '/shop/inventory/update', FormData, (resp) => {
                if (resp.status) {
                    alert(resp.message);
                    onClose();
                }
            })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-md ">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold mb-3">Add Stock</p>
                    <button onClick={onClose}><i className="icon ion-md-close text-2xl font-medium"></i></button>
                </div>
                <form action="" onSubmit={handeleSubmit}>
                    <div className="">
                        <div className="my-3">
                            <p className="text-sm font-medium mb-1">Product Name :</p>
                            <Input type="text" name="name" value={product.name} readOnly={true} onChange={handleChange} className="bg-gray-100 border outline-none p-1 w-full"/>
                        </div>
    
                        <div className="my-3">
                            <p className="text-sm font-medium mb-1">Add Stock</p>
                            <Input type="number" name="stock" onChange={handleChange} className="border outline-none p-1 w-full" />
                        </div>

                        <div className="my-3">
                            <p className="text-sm font-medium mb-1">Notes</p>
                            <textarea name="notes" rows='3' onChange={handleChange} className="w-full border outline-none px-1"></textarea>
                        </div>

                        <div className="flex justify-center">
                            <button type="button" className="px-3 py-1 mr-3 bg-gray-600 text-white rounded" onClick={onClose}>Cancel</button>
                            <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">Add Stock</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default addStock
