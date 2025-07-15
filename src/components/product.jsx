import { Bar, Legend, BarChart, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"
import { useFetch } from "../utils/mixin"
 
import AddStockModal from "../components/modal/addStock";

function product() {

    const [ProductSale, setProductSale] = useState([]);
    const [ShowData, setShowData] = useState([]);
    const [Years, setYears] = useState([]);
    const [category, setCategory] = useState([]);

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [selectedCategory, setSelectedCategory] = useState("");
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
                // console.log("Categories", resp.categories);
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
                        <select name="" id="" className="border rounded outline-none" onChange={(e) => setSelectedCategory()}>
                            <option value="">Category</option>
                            {category.map((item, index) => (
                                <option value={item.id} key={index}>{item.category_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <p>{selectedCategory}</p>
                    </div>
                    {ShowData.map((product, index) => (
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