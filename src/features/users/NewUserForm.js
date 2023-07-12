import { useState, useEffect, useRef } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
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

const NewUserForm = () => {
  const { t } = useTranslation();
  const [addNewUser, { isLoading, isSuccess, error }] = useAddNewUserMutation();

  const navigate = useNavigate();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Member"]);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  useEffect(() => {
    if (!canSave && password && username) {
      setErrMsg("Please fill required areas correctly");
    }
  }, [password, username, canSave]);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (event) => {
    // const values = Array.from(
    //   event.target.selectedOptions, //HTMLCollection
    //   (option) => option.value
    // );
    // setRoles(values);
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <MenuItem key={role} value={role}>
        {" "}
        {role}
      </MenuItem>
    );
  });
  const content = (
    <AddUserContainer>
      {errMsg && (
        <ErrorHeader ref={errRef} aria-live="assertive">
          {errMsg || error}
        </ErrorHeader>
      )}

      <FormControl
        variant="outlined"
        fullWidth
        sx={{ width: "300px", gap: 2 }}
        onSubmit={onSaveUserClicked}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2>{t("newUser")}</h2>

          <Button
            type="button"
            title="Save"
            disabled={!canSave}
            style={!canSave ? { opacity: "0.4" } : null}
            onClick={onSaveUserClicked}
          >
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </div>
        <label htmlFor="username">
          {t("username")}: <span>{t("320letters")}</span>
        </label>
        <span>
          <TextField
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
            fullWidth
          />
        </span>
        <label htmlFor="password">
          {t("password")}: <span>{t("412chars")}</span>
        </label>
        <span>
          <TextField
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
            fullWidth
          />
        </span>

        <label htmlFor="roles">{t("assignedRoles")}: </label>
        <span>
          <Select
            id="roles"
            name="roles"
            multiple
            size="3"
            value={roles}
            onChange={onRolesChanged}
            fullWidth
          >
            {options}
          </Select>
        </span>
      </FormControl>
    </AddUserContainer>
  );

  return content;
};
export default NewUserForm;
