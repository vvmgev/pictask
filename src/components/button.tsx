import { ComponentProps, FC, PropsWithChildren, memo } from "react";

type Props = PropsWithChildren & ComponentProps<"button">;

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button className="p-2 bg-slate-500 hover:bg-slate-600 rounded-xl" {...props}>
      {children}
    </button>
  );
};

export default memo(Button);
