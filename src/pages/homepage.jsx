import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [longUrl, setLongUrl] = useState(null);

  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl.trim()) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form
        onSubmit={(e) => handleShorten(e)}
        className="flex flex-col sm:flex-row w-full md:w-2/4 gap-3"
      >
        <Input
          type="url"
          placeholder="Enter long URL ...."
          value={longUrl}
          onChange={(event) => {
            setLongUrl(event.target.value);
          }}
          className="h-full flex-1 py-4 px-5 text-xl font-semibold border border-gray-400 focus:outline-none focus:ring-0 focus:shadow-none focus:border-none rounded-xl"
        />
        <Button
          type="submit"
          variant="destructive"
          className="text-md font-semibold px-3 py-4 mt-2 cursor-pointer bg-red-600"
        >
          Shorten URL
        </Button>
      </form>
      <div className="flex items-center justify-center">
        <img
          src="/Banner.png"
          alt="image!"
          className="h-[80vh] w-auto my-11 md:px-10"
        />
      </div>
      <Accordion type="multiple" collapsible="true" className="w-full md:px-10">
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer hover:no-underline">
            How does ShrinkIt URL Shortener Works?
          </AccordionTrigger>
          <AccordionContent>
            ShrinkIt turns your long, messy links into short, easy ones. Just
            share the short link, and it will take people to the right place.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="cursor-pointer hover:no-underline">
            Is ShrinkIt free to use?
          </AccordionTrigger>
          <AccordionContent>
            Yes, ShrinkIt is completely free for everyone.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="cursor-pointer hover:no-underline">
            Do ShrinkIt links expire?
          </AccordionTrigger>
          <AccordionContent>
            No, your short links stay active unless you delete them.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Homepage;
