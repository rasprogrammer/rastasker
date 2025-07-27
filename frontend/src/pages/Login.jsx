import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "@/redux/auth/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "@/redux/auth/selector";
import InputField from "@/components/Authentication/InputField";
import Submit from "@/components/Authentication/Submit";
import Loading from "@/components/Loader/Loading";
import GoogleOauth from "@/components/Authentication/GoogleOauth";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ formData }));
  };

  return (
    <>
      <Loading isLoad={isLoading}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <InputField
                type="email"
                label="Email"
                id="email"
                onChange={handleChange}
                value={formData.email}
              />

              <InputField
                type="password"
                label="Password"
                id="password"
                onChange={handleChange}
                value={formData.password}
              />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="vue-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href=""
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <Submit label="Sign in" />
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              I have no account{" "}
              <Link
                to={"/register"}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Register here
              </Link>
            </p>
            <div className="flex items-center justify-center">
              <GoogleOauth />
            </div>
          </div>
        </div>
      </Loading>
    </>
  );
}
