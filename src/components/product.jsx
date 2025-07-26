import { Bar, Legend, BarChart, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"
import { useFetch } from "../utils/mixin"
 
import AddStockModal from "../components/modal/addStock";
import image from "../assets/images/Moong.png";

function product() {

    const [ProductSale, setProductSale] = useState([]);
    const [ShowData, setShowData] = useState([]);
    const [Years, setYears] = useState([]);
    const [category, setCategory] = useState([]);

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [filterProduct, setFilterProduct] = useState([]);

    const [updateStock, setUpdateStock] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const _fetch = useFetch();

    useEffect(() => {
        const response = _fetch('GET', '/analysis/product/years', {}, (resp) => {
            if (resp.status) {
                setYears(resp.years);

                if (resp.years.includes(currentYear)) {
                    setSelectedYear(currentYear);
                }
            }
        })

        const response2 = _fetch('GET', '/shop/product/category', {}, (resp) => {
            if (resp.status) {
                console.log("Categories", resp.categories);
                setCategory(resp.categories);
            }
        })
    }, []);

    useEffect(() => {
        if (selectedYear) {
            const response = _fetch('GET', `/analysis/product/graph/${selectedYear}`, {}, (resp) => {
                if (resp.status) {
                    // console.log("Graph Data", resp.graph);
                    setProductSale(resp.graph);

                }
            })
        }
    }, [selectedYear]);

    function fetchProducts() {
        const response = _fetch('GET', '/shop/product', {}, (resp) => {
            if (resp.status) {
                setShowData(resp.products);
            }
        })
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    function getColor(index) {
        const colors = [
            "#0b00df", "#00ee59", "#ffa800", "#ff4400", "#00cbfb",
            "#78f400", "#c5f402", "#ff0c00", "#8724ff", "#ff3525",
            "#02e15d", "#0bcece", "#0722bb", "#f2d49e", "#c90076"
        ];
        return colors[index % colors.length];
    }

    useEffect(() => {
        if (selectedCategory) {
            const response = _fetch('GET', `/analysis/product/category/${selectedCategory}`, {}, (resp) => {
                if (resp.status) {
                    console.log("products", resp.products);
                    setFilterProduct(resp.products);
                }
            });
        }
        else {
            fetchProducts();
            setFilterProduct([]);
        }
    }, [selectedCategory]);

    return (
        <div className="relative">
            <div className="py-5 bg-white shadow">
                <div className="flex justify-between px-5">
                    <p className="text-lg font-medium">Product</p>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="border p-1 rounded text-sm outline-none">
                        <option value="">Select year</option>
                        {Years.map((year, index) => (
                            <option value={year} key={index}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-7 pr-2">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart width={500} height={400} data={ProductSale}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */} for hide the category names
                            {category.map((item, index) => (
                                <Bar key={item.category_name} dataKey={item.category_name} stackId="a" fill={getColor(index)} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className=" py-3 mt-2 bg-white shadow ">
                <div className="flex justify-between px-5">
                    <p className="text-lg font-medium">Products</p>
                    <div className="flex gap-5">
                        <select name="" id="" className="border rounded outline-none" onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">Category</option>
                            {category.map((item, index) => (
                                <option value={item.id} key={index}>{item.category_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div className="divide-y">
                        {(selectedCategory && filterProduct.length === 0) ? (<p className="text-center p-5 text-gray-400 text-xl">No products found</p>) : 
                            ((filterProduct.length > 0 ? filterProduct : ShowData).map((product, index) => (
                            <div className="flex justify-between items-center p-3 m-5 text-slate-800" key={index}>
                                <div className="flex gap-5">
                                    <img src={image} alt="" className="w-20"/>
                                    <div className="text-sm">
                                        <p>{product.name} <span>({ product.quantity })</span></p>
                                        <p>&#8377; {Number(product.price).toFixed(2) }</p>
                                        <p>{ product.brand } Maan mark</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="mb-3 text-sm text-black">
                                        Qty: <span className="font-semibold">{product.inventory[0].stock_qty}</span>
                                    </p>
                                    <button className="bg-gray-200 text-gray-800 text-sm px-3 leading-none py-1 rounded-full border border-gray-300" onClick={() => {
                                        setSelectedProduct(product);
                                        setUpdateStock(true);
                                    }}
                                    >Add</button>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
                <div className="">
                    {updateStock && (
                        <AddStockModal
                            product={selectedProduct}
                            onClose={() => {
                                setUpdateStock(false);
                                fetchProducts();
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default product