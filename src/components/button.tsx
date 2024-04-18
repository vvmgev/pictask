import { ComponentProps, FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & ComponentProps<"button">;

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button className="bg-slate-500 hover:bg-slate-600 p-2 rounded-xl" {...props}>
      {children}
    </button>
  );
};

export default Button;
