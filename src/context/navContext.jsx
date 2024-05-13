import { createContext, useState } from "react";

export const NavContext = createContext();
const NavContextComp = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <NavContext.Provider value={{ open, setOpen }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContextComp;
