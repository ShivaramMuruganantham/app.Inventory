import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useFetch } from "../utils/mixin"
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../utils/slices/cartSlice";

import NewProductModal from "../components/modal/newProduct";
import Daal_img from "../assets/images/Moong.png";

function Shop() {

    const [products, setProducts] = useState([]);
    const [filter, setfilter] = useState("");
    const [newProduct, setNewProduct] = useState(false);

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const _fetch = useFetch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            const response = _fetch('GET', `/shop/product/search?name=${filter}`, {}, (resp) => {
                if (resp.status) {
                    setProducts(resp.products);
                }  
            })
        }, 500);

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

    const handleAdd = (product) => {
        dispatch(addToCart(product));
    }

    const handleRemove = (product) => {
        dispatch(removeFromCart(product));
    }

    const totalQty = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

    return(
        <div className="relative min-h-screen bg-gray-50 pb-14">

            <div className="p-3 bg-white border-b border-gray-300 shadow">
                <p className="text-2xl font-medium">Shop</p>
            </div>

            <div className="flex justify-between p-5">
                <input type="text" placeholder="Search" onChange={(e) => setfilter(e.target.value)} className="border w-[250px] p-1 bg-white"/>
                <button className="border px-3 py-1 text-sm cursor-pointer" onClick={() => setNewProduct(true)}>New</button>
            </div>

            <div className="flex justify-around gap-5 p-5 flex-wrap mb-5">
                {products.map((product, index) => (
                    <div key={index} className=" rounded-xl shadow p-3 bg-white w-36 h-56">
                        <div className="">
                            <img src={Daal_img} alt="Daal" className="w-40 h-32"/>
                        </div>
                        <div className="flex justify-between items-end p-1">
                            <div>
                                <p className="text-sm p-1 font-bold">{product.name}</p>
                                <p className="text-xs px-1">{product.quantity}</p>
                                <p className="text-xs px-1 pt-1 font-bold">Price : &#8377;{product.price}</p>
                            </div>
                            <div className="float-right">
                                <button onClick={() => {
                                    handleAdd(product);
                                }} className="bg-yellow-500 shadow rounded px-2 py-0.5 cursor-pointer"><i className="icon ion-md-add font-bold text-sm"></i></button>
                            </div>
                        </div>
                    </div>   
                ))}
                <div className="w-36"></div>
            </div>
            
            {totalQty > 0 && (
                <div className="fixed left-0 bottom-12 w-full bg-[#feb600] shadow text-white p-2 px-5 rounded-t-2xl transition-all duration-500 ease-in-out">
                    <Link to="/cart" className="text-center">{cart.length} item{cart.length > 1 ? 's' : ''} added <span><i className="icon ion-ios-arrow-dropright-circle"></i></span></Link>
                    <button className="float-right" onClick={() => handleRemove(cart)}>
                        <i className="icon ion-ios-trash text-black text-xl"></i>
                    </button>
                </div>
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
