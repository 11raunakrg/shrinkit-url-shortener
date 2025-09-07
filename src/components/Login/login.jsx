import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { BeatLoader } from "react-spinners";
import Error from "../error/error";
import * as Yup from "yup";
import { Button } from "../ui/button";

const Login = () => {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setError([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),

        password: Yup.string()
          .min(6, "Password must be minimum of 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      // TODO: api call
    } catch (error) {
      const newError = {};
      error?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      setError(newError);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-white font-semibold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your email below to login to <br />
            your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold ml-2">Email</h3>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email..."
              onChange={handleInputChange}
            />
            {error.email && <Error message={error.email} />}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold ml-2">Password</h3>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password..."
              onChange={handleInputChange}
            />
            {error.password && <Error message={error.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-red-600 text-white cursor-pointer"
            onClick={handleLogin}
          >
            {false ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
