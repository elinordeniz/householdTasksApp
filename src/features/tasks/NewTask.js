import { useGetUsersQuery } from "../users/usersApiSlice";
import NewTaskForm from "./NewTaskForm";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";

const NewTask = () => {
  const { isAdmin, isParent, username } = useAuth();
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    
    }),
  });
  const user=users?.filter((user)=>user.username===username)
 console.log(user)
  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  const content = <NewTaskForm users={isAdmin || isParent ? users : user} />;

  return content;
};
export default NewTask;
