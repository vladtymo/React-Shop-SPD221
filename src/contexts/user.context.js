import { createContext, useState } from "react";

export const UserContext = createContext({
    // read-only properties...
    isAuth: null,
    email: null,

    // methods (setters)...
    setIsAuth: () => { },
    setEmail: (email) => { }
});

export const UserProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false);
    const [email, setEmail] = useState(null);

    const value = { isAuth, setIsAuth, email, setEmail }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}