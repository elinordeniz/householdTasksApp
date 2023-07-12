import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetTasksQuery } from "./tasksApiSlice";
import { memo } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "react-i18next";

// import { useSelector } from 'react-redux'
// import { selectTaskById } from './tasksApiSlice'

const Task = ({ taskId }) => {
  // const task = useSelector(state => selectTaskById(state, taskId)) bunun yerine aşağıdaki
  const { t } = useTranslation();
  const { task } = useGetTasksQuery("tasksList", {
    selectFromResult: ({ data }) => ({
      task: data?.entities[taskId],
    }),
  });

  const navigate = useNavigate();

  if (task) {
    const created = new Date(task.createdAt).toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(task.updatedAt).toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/tasks/${taskId}`);

    let content = (
      <TableRow
        key={task.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {task.completed ? (
            <span>{t("completed")}</span>
          ) : (
            <span>{t("open")}</span>
          )}
        </TableCell>
        <TableCell align="right">{created}</TableCell>
        <TableCell align="right">{updated}</TableCell>
        <TableCell align="right">{task.title}</TableCell>
        <TableCell align="right">{task.username}</TableCell>
        <TableCell align="right">
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </TableCell>
      </TableRow>
    );

    return content;
  } else return null;
};

const memoTask = memo(Task);
export default memoTask;
