import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  LoginContainer,
  LinkCard,
  WelcomeGrid,
} from "../../config/theme/styles";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const Welcome = () => {
  const {t}=useTranslation();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const { username, isAdmin, isParent } = useAuth();

  const content = (
    <LoginContainer>
      <p>{today}</p>

      <h3 style={{marginTop:"1.3rem"}}> { t('welcome')}{`${" "}`}{ username} </h3>

      <WelcomeGrid>
        <Grid container spacing={8} sx={{display:"flex", justifyContent:"center",  alignItems:"center"}} >
          <Grid item sx={{xs:1, sm:4, md:6 }}>
            <LinkCard component={Link} to={"/dash/tasks"}>
              { t('viewTasks')}
            </LinkCard>
          </Grid>

          <Grid item sx={{xs:1, sm:4, md:6 }}>
            <LinkCard component={Link} to={"/dash/tasks/new"}>
            { t('addNewTask')}
            </LinkCard>
          </Grid>
          {(isAdmin || isParent) && (
            <Grid item sx={{xs:1, sm:4, md:6 }}>
              <LinkCard component={Link} to={"/dash/users"}>
              { t('viewUserSettings')}
              </LinkCard>
            </Grid>
          )}
          {(isAdmin || isParent) && (
            <Grid item sx={{xs:1, sm:4, md:6 }}>
              <LinkCard component={Link} to="/dash/users/new">
              { t('addNewUser')}
              </LinkCard>
            </Grid>
          )}
        </Grid>
      </WelcomeGrid>
    </LoginContainer>
  );

  return content;
};
export default Welcome;
