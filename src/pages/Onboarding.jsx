import { Link } from "react-router-dom"

import Input from "../components/form/input"

function Onboarding() {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-5">
            <div className="bg-white p-8 rounded-xl shadow text-center">
                <p className="text-2xl font-medium mb-4">Welcome to App</p>
                <p className="text-gray-500 mb-6">Get started by creating a new account or logging in.</p>
                <div className="flex justify-center gap-6 mt-4">
                    <Link to="/shop-register" className="text-sm bg-gray-200 py-2 px-5 rounded-full">New to the app</Link>
                    <Link to="/user-login" className="text-sm bg-gray-200 py-2 px-5 rounded-full">Already a user</Link>
                </div>
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