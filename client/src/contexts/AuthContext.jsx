import { createContext, useState, useEffect } from "react";
import { getLoggedUser } from "../utils/auth";

export const UserContext = createContext(null)

export default function AuthProvider ({children}) {
    const [loggedUser, setLoggedUser] = useState(null);
    
    useEffect(() => {
      const user = getLoggedUser();
      if (user) {
        setLoggedUser(user);
      }
    }, []);

     return (
        <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            {children}
        </UserContext.Provider>
     )
}