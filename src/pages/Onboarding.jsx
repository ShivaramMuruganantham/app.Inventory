import { Link } from "react-router-dom"

import Input from "../components/form/input"

function Onboarding() {
    return (
        <div className="min-h-screen">
            <div>
                <p className="text-2xl font-bold text-center mb-4 p-2 border w-52 rounded">Welcome to App</p>
                <Link to="/shop-register" className="text-2xl font-bold mb-4 p-2 border w-52 rounded">New to the app</Link>
                <Link to="/user-login" className="text-2xl font-bold mb-4 p-2 border w-52 rounded">Already a user</Link>
            </div>
            {/* <div>
                <Link to="/admin-login" className="text-2xl font-bold text-center mb-4 p-2 border w-52 rounded">Admin Dashboard</Link>
                <Link to="/user-login" className="text-2xl font-bold text-center mb-4 p-2 border w-52 rounded">User Dashboard</Link>
            </div>
            <div>
                <p></p>
            </div> */}
        </div>
    )
}

export default Onboarding