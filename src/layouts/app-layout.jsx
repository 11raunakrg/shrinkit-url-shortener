import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        {<Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
