import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserContextProvider(props) {
 
  const [userToken, setUserToken] = useState(null);

  return (
    <UserContext.Provider value={{ userToken , setUserToken}}>
      {props.children}
    </UserContext.Provider>
  );
}
