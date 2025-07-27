import { useState } from "react";
import { Link } from "react-router-dom";
import { register, googleAuth } from "@/auth/service";
import GoogleOauth from "@/components/Authentication/GoogleOauth";
import InputField from "@/components/Authentication/InputField";
import Submit from "@/components/Authentication/Submit";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register({ formData });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 my-5 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <InputField
              type="text"
              label="Name"
              id="name"
              onChange={handleChange}
              value={formData.name}
            />

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

            <InputField
              type="text"
              label="Phone"
              id="phone"
              onChange={handleChange}
              value={formData.phone}
            />

            <Submit label="Sign up" />
          </form>

          <div>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              I have an account{" "}
              <Link
                to={"/login"}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Login here
              </Link>
            </p>
            <div className="flex items-center justify-center">
              <GoogleOauth />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
