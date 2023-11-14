import React from "react";

import ReactChildrenProps from "types/ReactChildren";

const Layout: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <footer id="footer" className="bg-primary relative">
      <div className="bg-pattern-dark absolute -z-0" />
      {children}
    </footer>
  );
};

export default Layout;
