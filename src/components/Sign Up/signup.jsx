import React, { useEffect, useState } from "react";
import {
  Card,
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
import UseFetch from "@/hooks/use-fetch";
import { signUp } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

const Signup = () => {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    data,
    loading,
    error: SignUpError,
    fn: fnSignUp,
  } = UseFetch(signUp, formData);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    fetchUser();
  }, [SignUpError, loading]);

  const handleSignUp = async () => {
    setError([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be minimum of 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile Pic is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignUp();
    } catch (err) {
      const newError = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          newError[e.path] = e.message;
        });
      }
      setError(newError);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-white font-semibold">
            Sign Up to your account
          </CardTitle>

          <CardDescription className="text-gray-400">
            <p className="text-sm text-gray-300 mt-[-5px] mb-1 ml-3">
              create a new account if you don't have yet
            </p>
          </CardDescription>
          {SignUpError && <Error message={SignUpError.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold ml-2">Name</h3>
            <Input
              name="name"
              type="text"
              placeholder="Enter your Full Name"
              onChange={handleInputChange}
            />
            {error?.name && <Error message={error.name} />}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold ml-2">Email</h3>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email address..."
              onChange={handleInputChange}
            />
            {error?.email && <Error message={error.email} />}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold ml-2">Password</h3>
            <Input
              name="password"
              type="password"
              placeholder="password must be atleast 6 characters long"
              onChange={handleInputChange}
            />
            {error?.password && <Error message={error.password} />}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold ml-2">Profile Picture</h3>
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={handleInputChange}
            />
            {error?.profile_pic && <Error message={error.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-green-600 text-white cursor-pointer"
            onClick={handleSignUp}
          >
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
