import { Link } from "react-router-dom"

function Onboarding() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <Link to="/admin-login" className="text-2xl font-bold text-center mb-4 p-2 border w-60 rounded">Admin Dashboard</Link>
                <Link to="/user-login" className="text-2xl font-bold text-center mb-4 p-2 border w-60 rounded">User Dashboard</Link>
            </div>
            <div>
                <p></p>
            </div>
        </div>
    )
}

export default Onboarding