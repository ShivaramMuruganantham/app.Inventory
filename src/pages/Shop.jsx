import { useState, useEffect } from "react"
import { useFetch } from "../utils/mixin"
import { Link } from "react-router-dom";

import AddStockModal from "../components/modal/addStock";
import NewProductModal from "../components/modal/newProduct";

function Shop() {

    const [products, setProducts] = useState([]);
    const [filter, setfilter] = useState("");
    const [updateStock, setUpdateStock] = useState(false);
    const [newProduct, setNewProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const _fetch = useFetch();

    useEffect(() => {
        const response = _fetch('GET', '/shop/product', {}, (resp) => {
            if (resp.status) {
                setProducts(resp.products);
            }
        })
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            const response = _fetch('GET', `/shop/product/search?name=${filter}`, {}, (resp) => {
                if (resp.status) {
                    setProducts(resp.products);
                }  
            })
        }, 600);

        return () => clearTimeout(timeout);
    }, [filter]);

    function fetchProducts() {
        const response = _fetch('GET', '/shop/product', {}, (resp) => {
            if (resp.status) {
                setProducts(resp.products);
            }
        })
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return(
        <div className="min-h-screen bg-gray-50 pb-14">
            <div className="p-5 bg-white border-b border-gray-300 shadow">
                <p className="text-2xl font-medium">Shop</p>
            </div>
            <div className="flex justify-between p-5">
                <input type="text" placeholder="Search" onChange={(e) => setfilter(e.target.value)} className="border w-[250px] p-1 bg-white"/>
                <button className="border px-3 py-1 text-sm cursor-pointer" onClick={() => setNewProduct(true)}>New</button>
            </div>
            {products.map((product, index) => (
                <div className="flex justify-around border p-3 m-5 bg-white" key={index}>
                    <img src="../assets/images/Moong.png" alt="" className="w-20 border"/>
                    <div>
                        <p>{product.name} <span>({ product.quantity })</span></p>
                        <p>{ product.price }</p>
                        <p>{ product.brand } </p>
                    </div>
                    <div>
                        <p>{ product.inventory[0].stock_qty }</p>
                        <button className="border px-3 py-1 text-sm cursor-pointer" onClick={() => {
                            setSelectedProduct(product);
                            setUpdateStock(true);
                        }}>Add +</button>
                    </div>
                </div>
            ))}

            {updateStock && (
                <AddStockModal
                    product={selectedProduct}
                    onClose={() => {
                        setUpdateStock(false);
                        setSelectedProduct(null);
                    }}
                />
            )}

            {newProduct && (
                <NewProductModal
                    onClose={() => setNewProduct(false)}
                    onSuccess={() => {
                        setNewProduct(false);
                        fetchProducts();
                    }}
                />
            )}
        </div>
    )
}

export default Shop       
