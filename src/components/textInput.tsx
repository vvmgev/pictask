import { ComponentProps, FC, HTMLInputTypeAttribute, memo } from "react";

type Props = {
  label?: string;
  type: HTMLInputTypeAttribute | "textarea";
};

const TextInput: FC<Props & ComponentProps<"textarea" | "input">> = ({ type, label, ...props }) => {
  const className = "w-full p-1 text-black border border-black rounded";
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

export default memo(TextInput);
