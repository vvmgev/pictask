import ThemeSwitcher from "@components/themeSwitcher";
import List from "@components/list/list";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between p-4 border-b border-black dark:border-white">
      <div className="flex items-center gap-5">
        <h1 className="block pr-2 text-sm font-bold text-transparent border-r border-red-600 tracking-tightest sm:text-3xl bg-clip-text bg-gradient-to-r from-purple-600 via-green-500 to-red-500 dark:bg-gradient-to-r dark:from-purple-600 dark:via-green-400 dark:to-red-600">
          <Link to="/">Welcome To React Task</Link>
        </h1>
        <nav>
          <List className="flex flex-row gap-5">
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
