import List from "@components/list/list";
import Button from "@components/button";
import Loader from "@components/loader";
import Animate from "@components/animate";
import NewTask from "@components/newTask";
import { useEffect, useState } from "react";
import { addNewTask, getTasks, removeTaskById } from "@mockAPI/tasks";
import { Task } from "@models/task";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTasks = async (): Promise<void> => {
    const tasks = await getTasks();
    setTasks(tasks);
    setLoading(false);
  };

  const addTask = async (task: Omit<Task, "id">): Promise<void> => {
    const newTask = await addNewTask(task);
    setTasks([...tasks, newTask]);
  };

  const onRemoveById = async (id: string) => {
    await removeTaskById(id);
    setTasks([...tasks.filter((task) => task.id !== id)]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Animate>
      <h1 className="pl-2 my-5 text-3xl">Task List Page</h1>
      <hr />
      <div className="flex">
        <div className="w-1/2 border-r border-black dark:border-white">
          <List>
            {tasks.map((task) => {
              return (
                <List.Item
                  className="flex flex-col gap-2 p-2 border-b border-black dark:border-white"
                  key={task.id}
                >
                  <h2 className="text-2xl capitalize">{task.title}</h2>
                  <p>{task.desc}</p>
                  <div className="self-end">
                    <Button onClick={() => onRemoveById(task.id)}>Remove</Button>
                  </div>
                </List.Item>
              );
            })}
          </List>
          {loading && <Loader />}
        </div>
        <div className="w-1/2 p-2">
          <NewTask onSave={addTask} />
        </div>
      </div>
    </Animate>
  );
};

export default Home;
