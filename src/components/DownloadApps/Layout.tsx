import React from "react";

import ReactChildrenProps from "types/ReactChildren";

const Layout: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <section id="downloadApps" className="bg-secondary relative pb-16 md:pb-32">
      <div className="bg-pattern-light absolute -z-0" />
      {children}
    </section>
  );
};

export default Layout;
