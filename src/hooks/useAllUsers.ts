/*全ユーザー情報の返却*/
import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/UserProfile";
import { User } from "../types/api/user";

export const useAllUsers = () => {
  const [userProfiles, setuserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setloading(true);
    setError(false);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setuserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setloading(false);
      });
  };
  return { getUsers, userProfiles, loading, error };
};
