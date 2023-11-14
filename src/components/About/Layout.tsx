import React from "react";

import ReactChildrenProps from "types/ReactChildren";

const Layout: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <section id="about" className="bg-primary relative">
      <div className="bg-pattern-dark absolute -z-0" />
      {children}
    </section>
  );
};

export default Layout;
