import { FC, PropsWithChildren, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = PropsWithChildren;

const Animate: FC<Props> = ({ children }) => {
  const container = useRef<any>();
  useGSAP(
    () => {
      gsap.to(".animate-content", { opacity: 1, duration: 1.5 });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div className="opacity-0 animate-content">{children}</div>
    </div>
  );
};

export default Animate;
