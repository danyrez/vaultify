import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md'>
        {loginErrors.map((error, index) => (
          <div
            key={index}
            className='bg-red-500 p-2 text-white text-center my-2'
          >
            {error}
          </div>
        ))}
        <h2 className='text-2xl font-bold text-center'>Login</h2>
        <form className='space-y-4' onSubmit={onSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              {...register("email", { required: true })}
              placeholder='myemail@example.com'
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
            />
            {errors.email && (
              <p className='text-red-500 flex justify-end'>email is required</p>
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
                placeholder='********'
                className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
              />
              {errors.password && (
                <p className='text-red-500 flex justify-end'>
                  password is required
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
            Login
          </button>
          <div>
            <p className='text-sm text-gray-600 flex justify-between'>
              Dont have an account?
              <Link to='/register' className='text-indigo-600'>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
