import React, { MouseEvent, ReactNode } from "react";

const CustomToggle = React.forwardRef<
  HTMLSpanElement,
  { children: ReactNode; onClick: (event: MouseEvent<HTMLSpanElement>) => void }
>(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      onClick(e);
    }}
    className="kebab"
  >
    {children}
  </span>
));

export default CustomToggle;
