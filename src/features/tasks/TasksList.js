import { useGetTasksQuery } from "./tasksApiSlice";
import Task from "./Task";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";


const TasksList = () => {
  const {t}= useTranslation()
  const { isAdmin, isParent, username } = useAuth();
  const {
    data: tasks,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetTasksQuery("tasksList", {
    pollingInterval: "2160000",
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;

  if (isLoading) content = <CircularProgress style={{margin:"auto"}} />;

  if (isError) {
     if(error.status===400){
      content=t("noTasks");
     }else{
      content = <p>{error?.data?.message}</p>;

     }
  }

  if (isSuccess) {
    const { ids, entities } = tasks;

    let filteredIds;
    if (isAdmin || isParent) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (taskId) => entities[taskId].username === username
      );
    }
    const tableContent =
      ids?.length &&
      filteredIds.map((taskId) => <Task key={taskId} taskId={taskId} />);

    content = (
      <TableContainer component={Paper} sx={{ width: "80%", margin: "1rem" }}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('username')}</TableCell>
              <TableCell align="right">{t('created')}</TableCell>
              <TableCell align="right">{t('updated')}</TableCell>
              <TableCell align="right">{t('title')}</TableCell>
              <TableCell align="right">{t('owner')}</TableCell>
              <TableCell align="right">{t('edit')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  return content;
};

export default TasksList;
