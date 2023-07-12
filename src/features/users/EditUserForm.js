import { useState, useEffect, useRef } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { useTranslation } from "react-i18next";

import { AddUserContainer, ErrorHeader } from "../../config/theme/styles";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();

  const [deleteUser, { isSuccess: isDelSuccess, error: delerror }] =
    useDeleteUserMutation();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const errRef = useRef();
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <MenuItem key={role} value={role}>
        {" "}
        {role}
      </MenuItem>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <AddUserContainer>
      {error && (
        <ErrorHeader ref={errRef} aria-live="assertive">
          {errContent}
        </ErrorHeader>
      )}

      <FormControl
        sx={{ width: "300px", gap: 2 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2>{t("editUser")}</h2>
          <div>
            <Button
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
              style={!canSave ? { opacity: "0.4" } : null}
            >
              <FontAwesomeIcon icon={faSave} />
            </Button>
            <Button title="Delete" onClick={onDeleteUserClicked}>
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </div>
        </div>
        <label htmlFor="username">
          {t("username")}: <span>{t("320letters")}</span>
        </label>
        <TextField
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label htmlFor="password">
          {t("password")}: <span>{t("empty")}</span>{" "}
          <span>{t("412chars")}</span>
        </label>
        <TextField
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label htmlFor="user-active">
          {t("active")}:
          <input
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        <label htmlFor="roles">{t("assignedRoles")}:</label>
        <Select
          id="roles"
          name="roles"
          multiple={true}
          size="4"
          value={roles}
          onChange={(e) => onRolesChanged(e)}
        >
          {options}
        </Select>
      </FormControl>
    </AddUserContainer>
  );

  return content;
};
export default EditUserForm;
