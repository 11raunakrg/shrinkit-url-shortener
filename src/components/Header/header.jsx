import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context/context";
import supabase from "@/db/supabase";
import UseFetch from "@/hooks/use-fetch";
import { logOut } from "@/db/apiAuth";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = UseFetch(logOut);

  return (
    <nav className="p-4 w-full flex justify-between items-center bg-blue-400 rounded-lg">
      {/* Logo */}
      <Link to="/">
        <img src="/logo.png" alt="ShrinkIt logo" className="h-20 rounded" />
      </Link>

      {/* Right Side */}
      <div>
        {!user ? (
          <Button
            onClick={() => navigate("/auth")}
            className="bg-green-800 text-white border border-white cursor-pointer hover:bg-gray-700"
          >
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={
                    user?.user_metadata?.profile_pic || "/default-avatar.png"
                  }
                />
                <AvatarFallback>
                  {user?.user_metadata?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* My Links */}
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <Link to="/dashboard" className="flex">
                  <LinkIcon className="mr-2 h-4 w-4" />
                </Link>
                <span>My Links</span>
              </DropdownMenuItem>

              {/* Logout Button */}
              <DropdownMenuItem
                onClick={() => {
                  fnLogout().then(() => {
                    navigate("/");
                  });
                }}
                className="text-red-600 font-bold cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
