import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "../types";
import { useMutation } from "react-query";
import { z } from "zod";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerRequest } from "../api/features/SendRequest";
import { Dropdown } from "primereact/dropdown";


function Signup() {
  const [signup, setSignup] = useState<SignupType>({} as SignupType);
    const roles = [
        { name: '' },
        { name: 'BUYER' },
        { name: 'VENDOR' }
    ];
  const navigate = useNavigate();
  const { mutate } = useMutation(registerRequest<SignupType> , {
    onSuccess : (data) => {
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  });
  const schema = z.object({
    email: z.string().email('Invalid email format'),
    name: z.string().nonempty('Name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmationPassword: z.string().min(8, 'Password must be at least 8 characters').refine((data) => data === signup.password, { message : "Password and confirmation password must be same"}),
    // role : z.string().nonempty('Role is required')
  });
  
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };
  const sendRequest = async () => {
    console.log(signup);
    try {
        schema.parse(signup);    
        const data = {
          data:signup,
          url : "/users/signup"
        }
        await mutate(data);
      }
      catch (error) {
      if (error instanceof z.ZodError) {
        if (error.formErrors.fieldErrors.email?.length) {
          toast.error("Email : " + error.formErrors.fieldErrors.email[0]);
        }
        if (error.formErrors.fieldErrors.password?.length) {
          toast.error("Password : " + error.formErrors.fieldErrors.password[0]);
        }
        if (error.formErrors.fieldErrors.name?.length) {
          toast.error("name : " + error.formErrors.fieldErrors.name[0]);
        }
        if (error.formErrors.fieldErrors.confirmationPassword?.length) {
          console.log(error.formErrors.fieldErrors.confirmationPassword[0]);
          
          toast.error("confirmationPassword : " + error.formErrors.fieldErrors.confirmationPassword[0]);
        }
        if (error.formErrors.fieldErrors.role?.length) {
          toast.error("role : " + error.formErrors.fieldErrors.role[0]);
        }
      }
      else
        console.log(error);
    }
  }




  return (
    <div className="bg-gray-50 dark:bg-gray-900 mt-10">
      <div className="flex flex-col items-center justify-center px-6 py- mx-auto md:h-screen lg:py-0 ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={handleInputChange}
                  value={signup.email}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="yourname"
                  onChange={handleInputChange}
                  value={signup.name}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleInputChange}
                  value={signup.password}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmationPassword"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirmation Password
                </label>
                <input
                  type="password"
                  name="confirmationPassword"
                  id="confirmationPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleInputChange}
                  value={signup.confirmationPassword}
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <Dropdown value={{name:signup.role}} onChange={(e)=>setSignup({...signup, role:e.target.value.name})} options={roles} optionLabel="name" 
                        placeholder="Select a Role" className="w-full md:w-14rem" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={sendRequest}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account yet?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  login
                </Link>
              </p>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
