import Button from "@components/button";
import List from "@components/list/list";
import TextInput from "@components/textInput";
import Animate from "@components/animate";
import Loader from "@components/loader";
import arrowDown from "@assets/icons/arrowDown.svg";
import arrowUp from "@assets/icons/arrowUp.svg";
import { getUsers } from "@mockAPI/users";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LOAD_LIMIT = 10;

enum SortOrder {
  ASC,
  DESC,
}

enum SortableColumn {
  FIRSTNAME = "firstName",
  AGE = "age",
}

const Users = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [order, setOrder] = useState<SortOrder>();
  const [column, setColumn] = useState<SortableColumn>();

  const fetchUsers = async () => {
    const { users: newUsers, hasMore } = await getUsers(offset, LOAD_LIMIT);
    setOffset(offset + newUsers.length);
    setUsers([...users, ...newUsers]);
    setLoading(false);
    if (!hasMore) {
      setHasMore(hasMore);
    }
  };

  const onLoadUsers = () => {
    setLoading(true);
    fetchUsers();
  };

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onChangeOrder = (name: SortableColumn) => {
    let newOrder = order === SortOrder.DESC || name !== column ? SortOrder.ASC : SortOrder.DESC;
    setColumn(name);
    setOrder(newOrder);
    setUsers(getSortedUsers(name, newOrder));
  };

  const getSortedUsers = (column: SortableColumn, order: SortOrder) => {
    return [...users].sort((a, b) => {
      [a, b] = order === SortOrder.ASC ? [a, b] : [b, a];
      return column === SortableColumn.AGE
        ? a[column] - b[column]
        : a[column].localeCompare(b[column]);
    });
  };

  const filteredUsers = users.filter(({ firstName }) =>
    firstName.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Animate>
      <div className="w-full flex justify-between mb-5 items-center p-2">
        <h1 className="text-3xl">User List Page</h1>
        <div>
          <TextInput
            label="Search By Name"
            type="text"
            value={searchValue}
            onChange={onChangeSearch}
            placeholder="Example John"
          />
        </div>
      </div>
      <hr />
      <div className="flext items-center border-b-4 border-black dark:border-white p-2 flex gap-4">
        <div className="flex-1">
          <Button className="flex" onClick={() => onChangeOrder(SortableColumn.FIRSTNAME)}>
            Name
            {column === SortableColumn.FIRSTNAME && (
              <img src={order === SortOrder.ASC ? arrowDown : arrowUp} className="w-6 h-6" />
            )}
          </Button>
        </div>
        <div className="flex-1">Email</div>
        <div className="flex-1">
          <Button className="flex" onClick={() => onChangeOrder(SortableColumn.AGE)}>
            Age
            {column === SortableColumn.AGE && (
              <img src={order === SortOrder.ASC ? arrowDown : arrowUp} className="w-6 h-6" />
            )}
          </Button>
        </div>
        <div className="flex-1">Actions</div>
      </div>
      <List>
        {filteredUsers.map((user) => (
          <List.Item
            key={user.id}
            className="border-b border-black dark:border-white p-2 flex gap-4"
          >
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {user.firstName}
            </div>
            <div className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
              {user.email}
            </div>
            <div className="flex-1">{user.age}</div>
            <Link className="flex-1 underline" to={user.id}>
              View
            </Link>
          </List.Item>
        ))}
      </List>
      {loading && <Loader />}
      <br />
      {hasMore && !loading && <Button onClick={onLoadUsers}>Load more</Button>}
      {!hasMore && <div className="pl-2 pb-5">No More Items to load</div>}
    </Animate>
  );
};

export default Users;
