import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaStarOfLife } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../Provider/Provider";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [showEye, setShowEye] = useState(false);
    const [focused, setFocused] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {formLoading, setFormLoading, loginUser} = useContext(authContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    function formSubmit(data) {
        setFormLoading(true);
        loginUser(data.email, data.password)
        .then(res => {
            setFormLoading(false);
            setShowEye(false);
            reset();
            navigate(from, {replace: true});
        })
        .catch(err => {
            setFormLoading(false);
            console.log(err.message);
        })
    }

    function handlePassChange(e) {
        const pass = e.target.value;
        if (pass.length > 0) {
            setShowEye(true);
        } else {
            setShowEye(false);
        }
    }

    return (
        <section className="flex justify-center items-center h-full w-full">
            <form className="text-white px-6 text-sm flex flex-col gap-3 w-full" onSubmit={handleSubmit(formSubmit)}>
                <div className="space-y-1 relative">
                    <label htmlFor="email">Email</label>
                    {errors.email && <FaStarOfLife size={8} className="absolute top-[2px] left-10 text-red-500" />}
                    <br />
                    <input type="text" name="email"
                        autoComplete="off"
                        {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
                        className="w-full px-2 py-2 rounded-md border outline-0  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600 text-gray-100  focus:text-gray-600 focus:from-gray-100 focus:to-gray-100 duration-300"/>
                </div>
                <div className="space-y-1 relative">
                    <label htmlFor="password">Password</label>
                    {errors.password && <FaStarOfLife size={8} className="absolute top-[2px] left-16 text-red-500" />}
                    <br />
                    <div className="relative">
                        <input type={showPass ? 'text' : 'password'}
                            onFocus={() => { setFocused(true) }} name="password" className="w-full px-2 py-2 rounded-md border outline-0  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600 text-gray-100  focus:text-gray-600  focus:from-gray-100 focus:to-gray-100 duration-300 group"
                            {...register('password', { required: true, onChange: handlePassChange, onBlur: () => { setFocused(false) } })}
                        />
                        {showEye && (
                            showPass ?
                                <BsEye size={16} className={`absolute top-3 right-3 cursor-pointer ${focused ? 'text-blue-500' : 'text-gray-100'}`} onClick={() => { setShowPass(!showPass) }} />
                                :
                                <BsEyeSlash size={16} className={`absolute top-3 right-3 cursor-pointer ${focused ? 'text-blue-500' : 'text-gray-100'}`} onClick={() => { setShowPass(!showPass) }} />
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className=' w-full mt-2 py-2 flex justify-center items-center rounded-md border outline-0  border-gray-300 bg-gray-100 text-blue-600 hover:bg-transparent hover:text-gray-100 hover:bg-gray-100 duration-300  disabled:bg-transparent disabled:hover:bg-transparent disabled:text-blue-600 disabled:cursor-wait'
                    disabled={formLoading}
                >
                    {formLoading ? <ImSpinner9 size={20} className="text-white animate-spin duration-300 text-center" /> : 'Login'}
                </button>
            </form>
        </section>
    );
};

export default Login;