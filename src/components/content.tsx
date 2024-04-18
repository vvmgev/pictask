import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Content: FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};
export default Content;
