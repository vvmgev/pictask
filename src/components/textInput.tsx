import { ComponentProps, FC } from "react";

type Props = {
  label?: string;
  type: "text" | "textarea";
};

const TextInput: FC<Props & ComponentProps<"textarea" | "input">> = ({ type, label, ...props }) => {
  const className = "w-full border border-black text-black rounded p-1";
  return (
    <>
      {label && <span>{label}</span>}
      {type === "textarea" ? (
        <textarea
          className={`${className} resize-none`}
          {...(props as ComponentProps<"textarea">)}
        />
      ) : (
        <input className={className} type={type} {...(props as ComponentProps<"input">)} />
      )}
    </>
  );
};

export default TextInput;
