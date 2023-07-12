import { useGetUsersQuery } from "../users/usersApiSlice";
import NewTaskForm from "./NewTaskForm";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";

const NewTask = () => {
  const { isAdmin, isParent, username } = useAuth();
  const { users, user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
      user: Object.values(data?.entities).filter(
        (obj) => obj.username === username
      ),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  const content = <NewTaskForm users={isAdmin || isParent ? users : user} />;

  return content;
};
export default NewTask;
