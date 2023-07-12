import { useParams } from "react-router-dom";
import EditTaskForm from "./EditTaskForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetTasksQuery } from "./tasksApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import { useTranslation } from "react-i18next";


const EditTask = () => {
  const {t}=useTranslation();
  const { id } = useParams();
  const { isAdmin, isParent, username } = useAuth();

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]), // because entitites is noncount
    }),
  });

  const { task } = useGetTasksQuery("tasksList", {
    selectFromResult: ({ data }) => ({
      task: data?.entities[id],
    }),
  });

  if (!task || !users) return <PulseLoader color={"orange"} />;

  if (!isAdmin && !isParent) {
    if (username !== task.username) {
      return <p >{t("noAccess")}</p>;
    }
  }

  const content = <EditTaskForm task={task} users={users} />;

  return content;
};
export default EditTask;
