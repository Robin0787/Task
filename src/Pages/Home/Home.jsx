import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="border bg-blue-600 text-white flex items-center justify-center h-screen text-3xl flex-col gap-5">
            <h2 className="">Welcome Dear!</h2>
            <Link to={'/signUp'} className="px-10 py-2 bg-blue-900 hover:bg-blue-800 duration-300 rounded-md text-base">Sign Up</Link>
        </div>
    );
};

export default Home;