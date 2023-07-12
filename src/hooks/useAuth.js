import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isParent = false;
  let status = "Member";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;
    isAdmin = roles.includes("Admin");
    isParent = roles.includes("Parent");

    if (isParent) status = "Parent";
    if (isAdmin) status = "Admin";

    return { username, roles, isAdmin, isParent, status };
  }
  return { username: "", roles: [], isAdmin, isParent, status };
};

export default useAuth;
