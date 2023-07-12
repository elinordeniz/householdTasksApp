import { useNavigate } from "react-router-dom";
import {
  PublicContainer,
  PublicHeader,
  PublicMain,
  PublicLoginButton,
  PublicFooter,
  PublicMainList,
} from "../config/theme/styles";
import { useTranslation } from "react-i18next";

const Public = () => {
  const navigate = useNavigate();
  const {t, i18n}=useTranslation();

  const content = (
    <PublicContainer>
      <PublicHeader>
        <header>
          <h1>{t("welcomePublic")}</h1>
        </header>
      </PublicHeader>
      <main>
        <PublicMain>
          <PublicMainList>
            <ul>
              <li>
               {t("li1")}
              </li>
              <li>
              {t("li2")}
              </li>
              <li>
              {t("li3")}
              </li>
              <li>{t("li4")}</li>
              <li>
              {t("li5")}
              </li>
              <li>
              {t("li6")}
              </li>
            </ul>
          </PublicMainList>

          <PublicLoginButton onClick={() => navigate("/login")}>
           {t("memberLogin")}
          </PublicLoginButton>
        </PublicMain>
      </main>
      <footer>
        <PublicFooter>
          <p>
            {" "}
            <span>{t("parents")};</span> Şaban, Aysel{" "}
          </p>
          <p>
            {" "}
            <span>{t("members")};</span> Sema, Elif, Beyza, Sultan
          </p>

          <br />
          <p>
            <span>{t("admin")}:</span> Elif Nur Deniz
          </p>
        </PublicFooter>
      </footer>
    </PublicContainer>
  );
  return content;
};
export default Public;
