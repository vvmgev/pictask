import Animate from "@components/animate";
import Button from "@components/button";
import List from "@components/list/list";
import Loader from "@components/loader";
import { getUserById } from "@mockAPI/users";
import { User } from "@models/user";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Params = {
  id: string;
};

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>() as Params;
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const onBack = () => navigate("/users");

  const fetchUserById = async (id: string) => {
    const user: User = await getUserById(id);
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchUserById(id);
  }, []);

  return (
    <Animate>
      <div className="p-2">
        <div className="flex gap-5">
          <Button onClick={onBack}>Back</Button>
          <h1 className="text-3xl">User Details Page</h1>
        </div>
        {user && (
          <div className="flex flex-col gap-20 mt-20 sm:flex-row">
            <img className="w-40 h-40 rounded-full" src={user.avatar} alt="avatar" />
            <List className="space-y-4">
              <List.Item>
                Full Name: {user.firstName} {user.lastName}
              </List.Item>
              <List.Item>Email: {user.email}</List.Item>
              <List.Item>Age: {user.age}</List.Item>
              <List.Item>Address: {user.address}</List.Item>
            </List>
          </div>
        )}
        {loading && <Loader />}
      </div>
    </Animate>
  );
};

export default UserDetails;
