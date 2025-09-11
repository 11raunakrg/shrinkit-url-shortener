import { getCurrentUser } from "@/db/apiAuth";
import UseFetch from "@/hooks/use-fetch";
import { createContext, useContext, useEffect } from "react";
import supabase from "@/db/supabase";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = UseFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      fetchUser(); // whenever login/logout/signup happens, update user
    });

    return () => subscription?.subscription.unsubscribe();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, isAuthenticated, loading }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
