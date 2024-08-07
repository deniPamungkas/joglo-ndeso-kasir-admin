import { createContext, useEffect, useState } from "react";

export const Side = createContext();
const SideContext = ({ children }) => {
  const [position, setPosition] = useState(false);
  const [value, setValue] = useState(
    window.sessionStorage.getItem("side") || "Dashboard"
  );
  useEffect(() => {
    window.sessionStorage.setItem("side", value);
  }, [value]);
  return (
    <Side.Provider value={{ value, setValue, position, setPosition }}>
      {children}
    </Side.Provider>
  );
};

export default SideContext;
