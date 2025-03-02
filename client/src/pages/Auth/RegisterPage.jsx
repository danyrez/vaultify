import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md'>
        {registerErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white' key={i}>
            {error}
          </div>
        ))}
        <h2 className='text-2xl font-bold text-center'>Register</h2>
        <form className='space-y-4' onSubmit={onSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              {...register("name", { required: true })}
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
              placeholder='Username'
            />
            {errors.name && (
              <p className='text-red-500 flex justify-end'>
                Username is required
              </p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              {...register("email", { required: true })}
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
              placeholder='myemail@example.com'
            />
            {errors.email && (
              <p className='text-red-500 flex justify-end'>Email is required</p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
                placeholder='Password'
              />
              {errors.password && (
                <p className='text-red-500 flex justify-end'>
                  Password is required
                </p>
              )}
              <button
                type='button'
                onClick={toggleShowPassword}
                className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-600'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200'
          >
            Register
          </button>
          <div>
            <p className='text-sm text-gray-600 flex justify-between'>
              Already have an account?
              <Link to='/login' className='text-indigo-600'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
