import React from "react";

const Mock = ({ children, content }: any) => (
  <div>
    {children}
    {content && <span>{content}</span>}
  </div>
);

export default Mock;
