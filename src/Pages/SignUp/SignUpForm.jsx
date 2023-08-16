
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Provider/Provider";
const SignUpForm = () => {
    const navigate = useNavigate();
    const {signUpUser} = useContext(authContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [openLanguage, setOpenLanguage] = useState(false);
    const [language, setLanguage] = useState('');
    const [openCountry, setOpenCountry] = useState(false);
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [whatsapp, setWhatsapp] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPass, setShowPass] = useState(false);
    const [showEye, setShowEye] = useState(false);
    const [focused, setFocused] = useState(false);

    const [personalInfo, setPersonalInfo] = useState(true);
    const [contactInfo, setContactInfo] = useState(false);
    const [accountInfo, setAccountInfo] = useState(false);



    function handlePersonalInfo(e) {
        e.preventDefault();
        if (!firstName) {
            toast.error('Please Write First Name');
        }
        else if (!lastName) {
            toast.error('Please Write Last Name');
        }
        else if (!language) {
            toast.error('Please Select a Language');
        }
        else {
            showContactInfo()
        }
    }

    function handleContactInfo(e) {
        e.preventDefault();
        if (!country) {
            toast.error('Please Select a Country');
        }
        else if (!whatsapp || whatsapp.length < 6 || whatsapp.length > 11) {
            toast.error('Please Write Valid Whatsapp Number');
        }
        else if (!phone || phone.length < 6 || phone.length > 11) {
            toast.error('Please Write Valid Phone Number');
        }
        else {
            showAccountInfo();
        }
    }

    function handleAccountInfo(e) {
        e.preventDefault();
        if (!email) {
            toast.error('Please Write Your Email');
        }
        else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            toast.error('Email is not valid');
        }
        else if (!password) {
            toast.error('Please Write Your Password');
        }
        else if (password.length < 6) {
            toast.error('Password must include six characters.');
        }
        else {
            toast.success('Successful');
            signUpUser(email, password)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                toast.error('Something Wrong! Try Again');
                console.log(err);
            })
        }
    }

    function selectLanguage(lang) {
        setLanguage(lang);
        setOpenLanguage(!openLanguage);
    }
    function selectCountry(countryName) {
        setCountry(countryName);
        setOpenCountry(!openCountry);
    }

    function showPersonalInfo() {
        setPersonalInfo(true);
        setContactInfo(false);
        setAccountInfo(false);
    }
    function showContactInfo() {
        setPersonalInfo(false);
        setContactInfo(true);
        setAccountInfo(false);
    }
    function showAccountInfo() {
        setPersonalInfo(false);
        setContactInfo(false);
        setAccountInfo(true);
    }

    function handlePassChange(e) {
        const pass = e.target.value;
        setPassword(pass);
        if (pass.length > 0) {
            setShowEye(true);
        } else {
            setShowEye(false);
        }
    }

    return (
        <section className="flex justify-center items-center h-full w-full">
            <form className="text-white px-6 flex flex-col gap-3 w-full">
                {
                    personalInfo && (
                        <section className="space-y-5">
                            {/* First Name */}
                            <div className="space-y-2 relative">
                                <label htmlFor="name">First Name</label>
                                <br />
                                <input type="text" name="firstName"
                                    autoComplete="off"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                    className="w-full px-2 py-2 rounded-md border outline-0 text-gray-100 focus:text-gray-600  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600  focus:from-gray-100 focus:to-gray-100 duration-300" />

                            </div>
                            {/* Last Name */}
                            <div className="space-y-2 relative">
                                <label htmlFor="name">Last Name</label>
                                <br />
                                <input type="text" name="lastName"
                                    autoComplete="off"
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value) }}
                                    className="w-full px-2 py-2 rounded-md border outline-0 text-gray-100 focus:text-gray-600  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600  focus:from-gray-100 focus:to-gray-100 duration-300" />

                            </div>
                            <div className="relative space-y-2">
                                <label htmlFor="language">Language</label>
                                <div className={`flex justify-between items-center px-2 py-2 rounded-md ${openLanguage && 'rounded-b-none'}  border outline-0 text-gray-100 cursor-pointer relative`}
                                    onClick={() => { setOpenLanguage(!openLanguage) }}>
                                    <h1 className="">{language || 'Select Language'}</h1>
                                    <FaAngleDown size={16} />
                                </div>
                                {
                                    openLanguage && (
                                        <div className="absolute w-full top-16 left-0 flex flex-col text-white bg-blue-500 border rounded-md rounded-t-none border-opacity-60">
                                            <div className="px-2 py-2 border-b outline-0 cursor-pointer hover:bg-blue-600 duration-300 border-opacity-60"
                                                onClick={() => { selectLanguage('English') }}>
                                                <h1 className="">English</h1>
                                            </div>
                                            <div className="px-2 py-2 border-b outline-0 cursor-pointer hover:bg-blue-600 duration-300 border-opacity-60"
                                                onClick={() => { selectLanguage('Spanish') }}>
                                                <h1 className="">Spanish</h1>
                                            </div>
                                            <div className="px-2 py-2 outline-0 cursor-pointer hover:bg-blue-600 duration-300"
                                                onClick={() => { selectLanguage('Bangla') }}>
                                                <h1 className="">Bangla</h1>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <button
                                onClick={handlePersonalInfo}
                                className=' w-full mt-2 py-2 flex justify-center items-center rounded-md border outline-0  border-gray-300 bg-gray-100 text-blue-600 hover:bg-transparent hover:text-gray-100 hover:bg-gray-100 duration-300  disabled:bg-transparent disabled:hover:bg-transparent disabled:text-blue-600 disabled:cursor-wait'>
                                Next
                            </button>
                        </section>
                    )
                }

                {
                    contactInfo && (

                        <section className="space-y-5">
                            {/* Country Name */}
                            <div className="relative space-y-2">
                                <label htmlFor="language">Country</label>
                                <div className={`flex justify-between items-center px-2 py-2 rounded-md ${openCountry && 'rounded-b-none'}  border outline-0 text-gray-100 cursor-pointer relative`}
                                    onClick={() => { setOpenCountry(!openCountry) }}>
                                    <h1 className="">{country || 'Select Country'}</h1>
                                    <FaAngleDown size={16} />
                                </div>
                                {
                                    openCountry && (
                                        <div className="absolute z-20 w-full top-16 left-0 flex flex-col text-white bg-blue-500 border rounded-md rounded-t-none border-opacity-60">
                                            <div className="px-2 py-2 border-b outline-0 cursor-pointer hover:bg-blue-600 duration-300 border-opacity-60"
                                                onClick={() => { selectCountry('Bangladesh'); setCountryCode(+88) }}>
                                                <h1 className="">+88 Bangladesh</h1>
                                            </div>
                                            <div className="px-2 py-2 border-b outline-0 cursor-pointer hover:bg-blue-600 duration-300 border-opacity-60"
                                                onClick={() => { selectCountry('India'); setCountryCode(+91) }}>
                                                <h1 className="">+91 India</h1>
                                            </div>
                                            <div className="px-2 py-2  outline-0 cursor-pointer hover:bg-blue-600 duration-300 "
                                                onClick={() => { selectCountry('Spain'); setCountryCode(+34) }}>
                                                <h1 className="">+34 Spain</h1>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {/* Whatsapp Number */}
                            <div className="relative space-y-2">
                                <label htmlFor="whatsapp">Whatsapp Number</label>
                                <div className="flex items-center justify-between ">
                                    <input type="text" name="whatsapp"
                                        autoComplete="off"
                                        value={countryCode ? '+' + countryCode : ''}
                                        readOnly
                                        className="w-[14%] px-2 py-2 rounded-md border outline-0 text-gray-100  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600 duration-300" />
                                    <input type="number" name="whatsapp"
                                        autoComplete="off"
                                        value={whatsapp}
                                        onChange={(e) => { setWhatsapp(e.target.value) }}
                                        className="w-[80%] px-2 py-2 rounded-md border outline-0 text-gray-100 focus:text-gray-600  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600  focus:from-gray-100 focus:to-gray-100 duration-300" />

                                </div>
                            </div>
                            {/* phone Number */}
                            <div className="relative space-y-2">
                                <label htmlFor="Phone">Phone Number</label>
                                <div className="flex items-center justify-between ">
                                    <input type="text" name="Phone"
                                        autoComplete="off"
                                        value={countryCode ? '+' + countryCode : ''}
                                        readOnly
                                        className="w-[14%] px-2 py-2 rounded-md border outline-0 text-gray-100  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600 duration-300" />
                                    <input type="number" name="Phone"
                                        autoComplete="off"
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                        className="w-[80%] px-2 py-2 rounded-md border outline-0 text-gray-100 focus:text-gray-600  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600  focus:from-gray-100 focus:to-gray-100 duration-300" />

                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-5">
                                <div
                                    onClick={showPersonalInfo}
                                    className='w-1/3 mt-2 py-2 flex justify-center items-center rounded-md border outline-0  border-gray-300 bg-transparent hover:text-gray-100 bg-gray-100 duration-300 hover:bg-blue-700'>
                                    Previous
                                </div>
                                <button
                                    onClick={handleContactInfo}
                                    className='w-2/3 mt-2 py-2 flex justify-center items-center rounded-md border outline-0  border-gray-300 bg-gray-100 text-blue-600 hover:bg-transparent hover:text-gray-100 hover:bg-gray-100 duration-300'>
                                    Next
                                </button>
                            </div>
                        </section>
                    )
                }

                {
                    accountInfo && (
                        <section className="space-y-5">
                            {/* Email*/}
                            <div className="space-y-2 relative">
                                <label htmlFor="name">Your Email</label>
                                <br />
                                <input type="email" name="email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className="w-full px-2 py-2 rounded-md border outline-0 text-gray-100 focus:text-gray-600  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600  focus:from-gray-100 focus:to-gray-100 duration-300" />
                            </div>
                            {/* Password*/}
                                <div className="space-y-2 relative">
                                    <label htmlFor="password">Password</label>
                                    <br />
                                    <div className="relative">
                                        <input type={showPass ? 'text' : 'password'} name="password"
                                            autoComplete="off"
                                            value={password}
                                            onFocus={() => { setFocused(true) }}
                                            className="w-full px-2 py-2 rounded-md border outline-0  border-gray-300 bg-gradient-to-l from-blue-500 to-blue-600 text-gray-100  focus:text-gray-600  focus:from-gray-100 focus:to-gray-100 duration-300 group"
                                            onChange={handlePassChange}
                                            onBlur={() => { setFocused(false) }}
                                        />
                                        {
                                            showEye &&
                                            (
                                                showPass ?
                                                    <BsEye size={16} className={`absolute top-3 right-3 cursor-pointer ${focused ? 'text-blue-500' : 'text-gray-100'}`} onClick={() => { setShowPass(!showPass) }} />
                                                    :
                                                    <BsEyeSlash size={16} className={`absolute top-3 right-3 cursor-pointer ${focused ? 'text-blue-500' : 'text-gray-100'}`} onClick={() => { setShowPass(!showPass) }} />
                                            )
                                        }
                                    </div>
                                </div>
                            <div className="flex justify-between items-center gap-5">
                                <div
                                    onClick={showContactInfo}
                                    className='w-1/3 mt-2 py-2 flex justify-center items-center rounded-md border outline-0  border-gray-300 bg-transparent hover:text-gray-100 bg-gray-100 duration-300 hover:bg-blue-700'>
                                    Previous
                                </div>
                                <button
                                    onClick={handleAccountInfo}
                                    className='w-2/3 mt-2 py-2 flex justify-center items-center rounded-md border outline-0  border-gray-300 bg-gray-100 text-blue-600 hover:bg-transparent hover:text-gray-100 hover:bg-gray-100 duration-300'>
                                    Submit
                                </button>
                            </div>
                        </section>
                    )
                }
            </form>
        </section>

    );
};

export default SignUpForm;