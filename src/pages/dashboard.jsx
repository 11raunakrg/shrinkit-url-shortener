import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { UrlState } from "@/context/context";
import UseFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import LinkCard from "@/components/Link-Card/link-card";

const DashBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    loading,
    error: urlError,
    data: urls,
    fn: fnUrls,
  } = UseFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicksData,
    fn: fnClicks,
  } = UseFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrlsData = urls?.Filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {loadingClicks ||
        (loading && <BarLoader width={"100%"} color="#36d7b7" />)}
      <div className="grid grid-cols-2 gap-3 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls ? urls.length : 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicksData ? clicksData.length : 0}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button className="text-md font-bold cursor-pointer">
          Create Link
        </Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links..."
          className="text-lg px-3 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {/* {urlError && <Error message={urlError} />} */}
      {(filteredUrlsData || []).map((url, id) => {
        return <LinkCard key={id} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
};

export default DashBoard;
