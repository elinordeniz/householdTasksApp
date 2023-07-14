import { useEffect, useState, useRef, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useTranslation } from "react-i18next";

import {
  LoginContainer,
  SigninButton,
  BackHomeButton,
  LoginHeader,
  ErrorHeader,
} from "../../config/theme/styles";
import {
  TextField,
  Checkbox,
  Input,
  CircularProgress,
  FormControl,
} from "@mui/material";

const Login = () => {
  const {t}=useTranslation();
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = (e) => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg(t("noserver"));
      } else if (err.status === 400) {
        setErrMsg(t("missingField"));
      } else if (err.status === 401) {
        setErrMsg(t("unauth"));
      } else {
        setErrMsg(err.data?.message || err.error);
      }
      errRef?.current?.focus();
    }
  };

  if (isLoading) return <LoginContainer><CircularProgress style={{margin:"auto"}}/></LoginContainer>;

  const content = (
    <LoginContainer>
      <header>
        <LoginHeader>
          <h1>{t('memberLogin')}</h1>
        </LoginHeader>
      </header>
      <main>
        {errMsg && (
          <ErrorHeader ref={errRef} aria-live="assertive">
            {errMsg}
          </ErrorHeader>
        )}
        <FormControl
          variant="outlined"
          fullWidth
          sx={{ width: "300px", m: 2, gap: 2 }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">{t('username')}: </label>
          <TextField
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            required
            autoComplete="true"
          />
          <label htmlFor="password">{t('password')}: </label>
          <TextField
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
            autoComplete="true"
            variant="outlined"
          />
          <label htmlFor="persist" >
            <Checkbox
              type="checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            {t('trustDevice')}:
          </label>
          <SigninButton onClick={(e) => handleSubmit(e)}>Sign In</SigninButton>
        </FormControl>
      </main>
      <footer>
        <BackHomeButton onClick={() => navigate("/")}>
        {t('backHome')}:
        </BackHomeButton>
      </footer>
    </LoginContainer>
  );
  return content;
};

export default Login;
