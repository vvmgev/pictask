import { ComponentProps, FC, PropsWithChildren } from "react";
import Item from "./item";

type Props = PropsWithChildren & ComponentProps<"ul">;

const List: FC<Props> & { Item: typeof Item } = ({ children, ...props }) => {
  return <ul {...props}>{children}</ul>;
};

List.Item = Item;
export default List;
