import { useEffect, useState } from "react";
import { useFetch } from "../../utils/mixin";

import Input from "../form/input";

function NewProductModal({ onSuccess, onClose }) {

    const [category, setCategory] = useState([]);
    const [form, setForm] = useState({
        name: "",
        quantity: "",
        price: "",
        stock: "",
        category_id: "",
        barcode: "",
        gst: "",
    });

    const _fetch = useFetch();

    useEffect(() => {
        const response = _fetch("GET", '/shop/product/category', {}, (resp) => {
            if (resp.status) {
                console.log(resp.categories);
                setCategory(resp.categories);
            }
        })
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

          try {
            const response = await _fetch("POST", '/shop/product/new', form, (resp) => {
                if(resp.status) {
                    alert(resp.message);
                    onSuccess();
                }
            });
        
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }; 


    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-white p-2 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold p-3">Add New Product</p>
                    <button className="pb-1 mr-3" onClick={onClose}><i className="icon ion-md-close text-2xl font-medium"></i></button>
                </div>
                <div className="flex justify-center">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="flex justify-start gap-x-3 items-center flex-wrap">
                            <div className="my-2">
                                <p className="mb-1">Product Name:</p>
                                <Input type="text" name="name" placeholder="Product Name" className="w-44 border p-1 outline-none" onChange={handleChange}></Input>
                            </div>
                            <div className="my-2">
                                <p className="mb-1">Quantity:</p>
                                <Input type="text" name="quantity" placeholder="Product quantity" className="w-44 border p-1 outline-none" onChange={handleChange}></Input>
                            </div>
                            <div className="my-2">
                                <p className="mb-1">Price:</p>
                                <Input type="number" name="price" placeholder="Product price" className="w-44 border p-1 outline-none" onChange={handleChange}></Input>
                            </div>
                            <div className="my-2">
                                <p className="mb-1">Stock:</p>
                                <Input type="number" name="stock" placeholder="Product stock" className="w-44 border p-1 outline-none" onChange={handleChange}></Input>
                            </div>
                            <div className="my-2">
                                <p className="mb-1">Category:</p>
                                <select className="border p-1 w-44" name="category_id" onChange={handleChange}>
                                    <option value="">-- Select Category --</option>
                                    {category.map((cat, index) => (
                                        <option value={cat.id} key={index}>{ cat.category_name }</option>
                                    ))}
                                </select> 
                            </div>
                            <div className="my-2">
                                <p className="mb-1">Barcode: (optional)</p>
                                <Input type="text" name="barcode" placeholder="Barcode" className="w-44 border p-1 outline-none" onChange={handleChange}></Input>
                            </div>
                            <div className="my-2">
                                <p className="mb-1">Gst percentage :</p>
                                <Input type="number" name="gst" placeholder="Gst percentage" className="w-44 border p-1 outline-none" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="flex justify-end gap-5 m-2 py-4">
                            <button type="button" className="bg-gray-500 text-white px-4 py-1 rounded" onClick={onClose}>Cancel</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewProductModal;
