import ThemeSwitcher from "@components/themeSwitcher";
import List from "@components/list/list";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between border-b border-black p-4 dark:border-white">
      <div className="flex gap-5 items-center">
        <h1
          className="text-sm tracking-tightest font-bold pr-2 border-r border-red-600 sm:text-3xl
              bg-clip-text text-transparent block bg-gradient-to-r from-purple-600 via-green-500 to-red-500 
              dark:bg-gradient-to-r dark:from-purple-600 dark:via-green-400 dark:to-red-600"
        >
          <Link to="/">Welcome To React Task</Link>
        </h1>
        <nav>
          <List className="flex gap-5 flex-row">
            <List.Item>
              <Link to="/">Home</Link>
            </List.Item>
            <List.Item>
              <Link to="/users">Users</Link>
            </List.Item>
          </List>
        </nav>
      </div>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
