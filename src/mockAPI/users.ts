import userData from "./users-data.json";

const users: User[] = userData;

export const getUsers = (
  offset: number = 0,
  limit: number = 10
): Promise<{ users: User[]; hasMore: boolean }> => {
  return new Promise((resolve) => {
    const hasMore: boolean = offset + limit < users.length;
    const data = {
      users: users.slice(offset, offset + limit),
      hasMore,
    };
    setTimeout(resolve, 2000, { ...data });
  });
};

export const getUserById = (id: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500, { ...users.find((user) => user.id === id) });
  });
};
