import Button from "@components/button";
import List from "@components/list/list";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUp } from "@assets/icons";
import { FC, memo, useMemo, useState } from "react";
import { User } from "@models/user";

enum Order {
  ASC,
  DESC,
}

enum SortableColumn {
  FIRSTNAME = "firstName",
  AGE = "age",
}

type Props = {
  users: User[];
};

const SortableUserList: FC<Props> = ({ users }) => {
  const [order, setOrder] = useState<Order>();
  const [column, setColumn] = useState<SortableColumn>();

  const onChangeOrder = (name: SortableColumn) => {
    let newOrder = order === Order.DESC || name !== column ? Order.ASC : Order.DESC;
    setColumn(name);
    setOrder(newOrder);
  };

  const sortedUsers = useMemo(() => {
    if (!column) {
      return users;
    }

    return [...users].sort((a, b) => {
      let firstUser = a;
      let secondUser = b;

      if (order === Order.DESC) {
        [firstUser, secondUser] = [secondUser, firstUser];
      }

      return column === SortableColumn.AGE
        ? firstUser[column] - secondUser[column]
        : firstUser[column].localeCompare(secondUser[column]);
    });
  }, [column, order, users]);

  const ArrowIcon = order === Order.ASC ? ArrowDown : ArrowUp;

  return (
    <>
      <div className="flex items-center gap-4 p-2 border-b-4 border-black flext dark:border-white">
        <div className="flex-1">
          <Button className="flex" onClick={() => onChangeOrder(SortableColumn.FIRSTNAME)}>
            Name
            {column === SortableColumn.FIRSTNAME && <ArrowIcon />}
          </Button>
        </div>
        <div className="flex-1">Email</div>
        <div className="flex-1">
          <Button className="flex" onClick={() => onChangeOrder(SortableColumn.AGE)}>
            Age
            {column === SortableColumn.AGE && <ArrowIcon />}
          </Button>
        </div>
        <div className="flex-1">Actions</div>
      </div>
      <List>
        {sortedUsers.map((user) => (
          <List.Item
            key={user.id}
            className="flex gap-4 p-2 border-b border-black dark:border-white"
          >
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {user.firstName}
            </div>
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {user.email}
            </div>
            <div className="flex-1">{user.age}</div>
            <Link className="flex-1 underline" to={user.id}>
              View
            </Link>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default memo(SortableUserList);
