import { Link } from "react-router-dom"

function footer() {
    return (
        <div className="fixed inset-x-0 z-20 flex justify-around items-center p-3 h-12 bg-white bottom-0 mx-auto max-w-[500px] shadow">
            <Link to="/dashboard"><i className="fa-solid fa-house text-2xl"></i></Link>
            <Link to="/Analysis"><i className="fa-solid fa-chart-simple text-2xl"></i></Link>
            <Link to="/products"><i className="fa-solid fa-shop text-2xl"></i></Link>
        </div>
    )
}

export default footer