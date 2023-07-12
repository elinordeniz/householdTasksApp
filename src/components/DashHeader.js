import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import {
  HeaderButton,
  DashHeaderContainer,
  LogoLink,
} from "../config/theme/styles";
import { useTranslation } from "react-i18next";

const TASKS_REGEX = /^\/dash\/tasks(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isParent, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  const [sendLogout, { isLoading, isSuccess, error }] = useSendLogoutMutation();
  const [language, selectLanguage] = useState(i18n.language);
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewTaskClicked = () => navigate("/dash/tasks/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onTasksClicked = () => navigate("/dash/tasks");
  const onUsersClicked = () => navigate("/dash/users");

  const onLogoutClick = () => sendLogout();

  const selectLang = (e) => {
    selectLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  const changeLanguageButton = (
    <HeaderButton sx={{ marginLeft: "35px" }}>
      <Select
        value={language}
        onChange={selectLang}
        sx={{ fontSize: "12px", padding: "1px" }}
      >
        <MenuItem value="en-US">{t("english")}</MenuItem>
        <MenuItem selected value="tr-TR">
          {t("turkish")}
        </MenuItem>
      </Select>
    </HeaderButton>
  );

  let newTaskButton = null;
  if (TASKS_REGEX.test(pathname)) {
    newTaskButton = (
      <HeaderButton title="New Task" onClick={onNewTaskClicked}>
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </HeaderButton>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <HeaderButton title="New User" onClick={onNewUserClicked}>
        <FontAwesomeIcon icon={faUserPlus} />
      </HeaderButton>
    );
  }

  let userButton = null;
  if (isParent || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <HeaderButton title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </HeaderButton>
      );
    }
  }

  let tasksButton = null;
  if (!TASKS_REGEX.test(pathname) && pathname.includes("/dash")) {
    tasksButton = (
      <HeaderButton title="Tasks" onClick={onTasksClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </HeaderButton>
    );
  }
  const logoutButton = (
    <HeaderButton title="Logout" onClick={onLogoutClick}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </HeaderButton>
  );

  let buttonContent;
  if (isLoading) {
    buttonContent = <CircularProgress />;
  } else {
    buttonContent = (
      <>
        {newTaskButton}
        {newUserButton}
        {tasksButton}
        {userButton}
        {logoutButton}
        {changeLanguageButton}
      </>
    );
  }

  const content = (
    <>
      <p>{error?.data?.message}</p>

      <header>
        <DashHeaderContainer>
          <LogoLink style={{ textDecoration: "none" }} to={"/dash"}>
            <h1>{t("household")}</h1>
          </LogoLink>
          <div>{buttonContent}</div>
        </DashHeaderContainer>
      </header>
    </>
  );

  return content;
};
export default DashHeader;
