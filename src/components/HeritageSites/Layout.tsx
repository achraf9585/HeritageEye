import React from "react";

import ReactChildrenProps from "types/ReactChildren";

const Layout: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <section
      id="sites"
      className="bg-secondary -scroll-mt-32 min-h-screen relative"
    >
      <div className="bg-pattern-light absolute -z-0" />
      {children}
    </section>
  );
};

export default Layout;
