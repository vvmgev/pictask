import Button from "@components/button";
import TextInput from "@components/textInput";
import Loader from "@components/loader";
import SortableUserList from "@components/sortableUserList";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getUsers } from "@mockAPI/users";
import { User } from "@models/user";

const LOAD_LIMIT = 10;

const Users = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

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

  const onChangeSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter(({ firstName }) => firstName.toLowerCase().includes(searchValue.toLowerCase())),
    [searchValue, users]
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="animate-fade">
      <div className="flex items-center justify-between w-full p-2 mb-5">
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
      <SortableUserList users={filteredUsers} />
      {loading && <Loader />}
      <br />
      {hasMore && !loading && <Button onClick={onLoadUsers}>Load more</Button>}
      {!hasMore && <div className="pb-5 pl-2">No More Items to load</div>}
    </div>
  );
};

export default Users;
