import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../utils/slices/cartSlice";
import { useFetch } from "../utils/mixin";

import Input from "../components/form/input"
import images from "../assets/images/Moong.png";

function cart() {

    const _fetch = useFetch();

    const [checkout, setCheckout] = useState({
        "number" : "",
    });
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const {totalPrice, totalTax, subTotal} = cartItems.reduce((acc, item) => {
        const priceTotal = item.price * item.cartQuantity;
        const gstAmount = priceTotal * (item.gst_percent / 100);
        const itemTotal = priceTotal + gstAmount;

        acc.totalPrice += priceTotal;
        acc.totalTax += gstAmount;
        acc.subTotal += itemTotal;

        return acc;
    }, {
        totalPrice: 0,
        totalTax: 0,
        subTotal: 0
    });

    const handleCheckout = () => {

        const orderItems = cartItems.map(item => ({
            "product_id": item.id,
            "quantity": item.cartQuantity,
            "price": item.price,
        }));

        const payload = {
            "number": checkout.number,
            "items": orderItems,
            "total": subTotal,
        }

        const response = _fetch('POST', '/shop/product/checkout', payload, (resp) => {
            if (resp.status) {
                console.log(resp);
                alert(resp.message);
            }
        })
    }

    return (
        <div className="bg-gray-100 pb-14">
            <div className="flex gap-32 items-center p-3 bg-white shadow">
                <button className="float-left" onClick={() => window.history.back()}><i className="fa-solid fa-arrow-left-long text-2xl font-medium text-black"></i></button>
                <p className="text-2xl font-medium">Cart</p>
            </div>

            {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 py-5 shadow m-3 rounded-lg bg-white">
                    <div className="flex gap-5 items-center">
                        <div className="flex justify-center flex-col border border-gray-400 py-1 rounded w-10">
                            <button className="cursor-pointer" onClick={() => dispatch(decrementQuantity(item))}>
                                <i className="icon ion-md-remove text-gray-400 hover:text-gray-600"></i>
                            </button>
                            <p className="text-center text-lg font-medium">{ item.cartQuantity }</p>
                            <button className="cursor-pointer" onClick={() => dispatch(incrementQuantity(item))}>
                                <i className="icon ion-md-add text-gray-400 hover:text-gray-600"></i>
                            </button>
                        </div>
                        <div>
                            <img src={images} alt="" className="w-18 h-14 shadow"/>
                        </div>
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="pb-1">qty : {item.quantity}</p>
                            <p className=" font-medium text-blue-500">&#8377; {(item.cartQuantity * item.price)}</p>
                        </div>
                    </div>
                    <div className="">
                        <button className="px-3 py-1 rounded shadow hover:bg-red-200" onClick={() => dispatch(removeFromCart(item.id))}>
                            <i className="icon ion-md-trash text-2xl text-red-600"></i>
                        </button>
                    </div>
                </div>
            ))}

            <div className="">
                <div className="m-3 bg-white shadow p-3 rounded-lg">
                    <p className="text-lg font-medium mb-1">Customer Number:</p>
                    <Input type="number" name="number" placeholder="Mobile Number" className="w-full p-1 outline-none" onChange={(e) => setCheckout({...checkout, "number": e.target.value})}></Input>
                </div>

                <div className="m-1 p-3 rounded-lg">
                    <div className="flex justify-between px-5 py-2 font-medium text-gray-600">
                        <p>Cart total</p>
                        <p>&#8377; {totalPrice.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between px-5 py-2 font-medium text-gray-600">
                        <p>Tax</p>
                        <p>&#8377; {totalTax.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between mx-5 py-3 border-t font-bold text-gray-700">
                        <p className="text-xl">Subtotal</p>
                        <p>&#8377; {subTotal.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-center m-2 my-6">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleCheckout()  }>Procced to Checkout</button>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default cart;