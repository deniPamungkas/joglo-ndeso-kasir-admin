import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://joglo-ndeso-kasir-api-dev.vercel.app/auth/login",
        formikLogin.values,
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      setLoading(true);
      if (error.response?.status == 409) {
        navigate("/");
      } else {
        console.log(error);
        toast.error(error.response.data.error, {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    formikLogin.setFieldValue(e.target.name, e.target.value);
  };
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
  });

  return (
    <div className="bg-cyan-300 w-full h-screen flex justify-center items-center">
      <form
        action=""
        onSubmit={formikLogin.handleSubmit}
        className="w-[90%] md:w-[400px] flex flex-col gap-y-8"
      >
        <h1 className="font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Login First
        </h1>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={formikLogin.values.email}
            type="email"
            placeholder="email"
            id="email"
            name="email"
            className="h-[50px] px-3 rounded-md outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={formikLogin.values.password}
            type="password"
            placeholder="password"
            id="password"
            name="password"
            className="h-[50px] px-3 rounded-md outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className={`${
            loading
              ? "bg-gray-500"
              : "bg-gradient-to-r from-purple-400 to-pink-600"
          }  h-[50px] rounded-md font-semibold text-white flex gap-1 justify-center items-center`}
        >
          {loading && (
            <img
              src="/images/spinner.png"
              className="w-5 h-5 mr-2 animate-spin"
            />
          )}
          Login
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Flip
      />
    </div>
  );
};

export default Login;
