import { UrlState } from "@/context/context";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as Yup from "yup";
import UseFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("must be a valid URL")
      .required("Long Url is required"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = UseFetch(createUrl, { ...formValues, user_id: user.id });

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div>
        <Dialog
          defaultOpen={longLink}
          onOpenChange={(res) => {
            if (!res) setSearchParams({});
          }}
        >
          <DialogTrigger>
            <Button variant="destructive" className="bg-red-700 cursor-pointer">
              Create New Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md gap-5">
            <DialogHeader>
              <DialogTitle className={"font-bold text-2xl mb-4"}>
                Create new link
              </DialogTitle>
            </DialogHeader>
            <Input
              id="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="short Link's title"
            />
            {/* <Error message="some error" /> */}

            <Input
              id="longUrl"
              value={formValues.longUrl}
              onChange={handleChange}
              placeholder="Enter your Long Url"
            />
            {/* <Error message="some error" /> */}

            <Input
              id="customUrl"
              value={formValues.customUrl}
              onChange={handleChange}
              placeholder="custom Url (optional)"
            />
            {/* <Error message="some error" /> */}

            <DialogFooter>
              <Button
                type="destructive"
                onClick={createNewLink}
                className={
                  "bg-green-600 text-white cursor-pointer hover:bg-green-800"
                }
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateLink;
