import Button from "@components/button";
import TextInput from "@components/textInput";
import { Task } from "@models/task";
import { ChangeEvent, FC, FormEvent, memo, useState } from "react";

type Props = {
  onSave: (task: Omit<Task, "id">) => void;
};

const NewTaskForm: FC<Props> = ({ onSave }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangeDesc = (event: ChangeEvent<HTMLTextAreaElement>) => setDesc(event.target.value);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitle("");
    setDesc("");
    onSave({ title, desc });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <TextInput
        label="Task Title*"
        type="text"
        required
        value={title}
        onChange={onChangeTitle}
        placeholder="Title"
      />
      <TextInput
        label="Task Description*"
        type="textarea"
        required
        value={desc}
        onChange={onChangeDesc}
        placeholder="Description"
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default memo(NewTaskForm);
