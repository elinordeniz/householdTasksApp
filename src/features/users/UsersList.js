import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";


const UsersList = () => {
  const {t}=useTranslation();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: "160000",
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
 
  let content;
  if (isLoading) content = <CircularProgress style={{margin:"auto"}} />;

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <TableContainer component={Paper} sx={{ width: "80%", margin: "1rem" }}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("username")}</TableCell>
              <TableCell align="right">{t("roles")}</TableCell>
              <TableCell align="right">{t("edit")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  return content;
};

export default UsersList;
