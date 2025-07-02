function Shop() {

    return(
        <div className="min-h-screen bg-gray-50">
            <div className="p-5 bg-white border-b border-gray-300 shadow">
                <p className="text-2xl font-medium">Shop</p>
            </div>
            <div className="flex justify-between p-5">
                <input type="text" placeholder="Search" className="border w-[350px] px-1"/>
                <select name="" id="">
                    <option value="">Category</option>
                    <option value="">name</option>
                </select>
            </div>
            <div className="flex justify-around border p-3 bg-white">
                <img src="../assets/images/Moong.png" alt="" className="w-20 border"/>
                <div>
                    <p>name <span>1 Ltr</span></p>
                    <p>price</p>
                    <p>brand</p>
                </div>
                <div>
                    <p>stock</p>
                    <p>Add stock</p>
                </div>
            </div>
        </div>
    )
}

export default Shop
