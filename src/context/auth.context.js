import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      setIsLoggedIn(true);
      setUser(response.data);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
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

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
