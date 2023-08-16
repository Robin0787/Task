import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion";
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import logo from "../../assets/logo.png";
import SignUpForm from './SignUpForm';
AOS.init();



const SignUp = () => {

    return (
        <section className="flex justify-center items-center min-h-screen md:h-screen w-full">
            <article className="rounded-lg bg-gradient-to-l from-blue-500 to-blue-800 text-blue-500 
            w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-[90%] md:h-[50%] lg:h-[65%]">
                <article className="md:flex justify-between items-center gap-4 sm:p-5 py-5 h-full space-y-5">
                    <div className="rounded-lg md:w-1/2 flex flex-col gap-5">
                        <div className='flex justify-center items-center '>
                            <img src={logo} alt="" className='w-32 h-32 p-5 bg-white rounded-full' />
                        </div>
                        <div className='flex-grow-1'>
                            <SocialLogin />
                        </div>
                    </div>
                    <div className="md:h-full md:w-1/2 px-0 sm:px-20 md:px-0 lg:px-4">
                        <motion.div transition={{
                            ease: "linear",
                            duration: 2,
                            x: { duration: 1 }
                        }} data-aos='fade-right' data-aos-duration={600}
                            className={`h-full w-full flex justify-center items-center`}>
                            <SignUpForm />
                        </motion.div>
                    </div>
                </article>
            </article>
        </section>
    );
};

export default SignUp;