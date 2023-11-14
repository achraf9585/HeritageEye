import React from "react";

import ReactChildrenProps from "types/ReactChildren";

const Layout: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <section id="partners" className="bg-secondary relative">
      <div className="bg-pattern-light absolute -z-0" />
      {children}
    </section>
  );
};

export default Layout;
