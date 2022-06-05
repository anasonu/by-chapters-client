import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import ClipLoader from "react-spinners/ClipLoader";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = async () => {
    setIsLoading(true);
    try {
      const response = await verifyService();
      setIsLoggedIn(true);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (isLoading) {
    return <ClipLoader color={"black"} />;
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
