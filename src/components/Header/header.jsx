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

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = true;

  return (
    <>
      <nav className="p-4 flex justify-between items-center bg-blue-400">
        <Link to="/">
          <img src="/logo.png" alt="ShrinkIt logo" className="h-20 rounded" />
        </Link>
        <div>
          {!isLoggedIn ? (
            <Button
              onClick={() => navigate("/auth")}
              className="cursor-pointer"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-15 rounded outline-0 overflow-hidden cursor-pointer">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>RG</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Raunak Gupta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon />
                  <span>My Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 font-bold">
                  <LogOut className="mr-1 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
