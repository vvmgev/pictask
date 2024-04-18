import { ComponentProps, FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & ComponentProps<"li">;

const Item: FC<Props> = ({ children, ...props }) => <li {...props}>{children}</li>;

export default Item;
