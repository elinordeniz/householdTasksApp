import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { DashFooterContainer } from "../config/theme/styles"
import { useTranslation } from "react-i18next";


const DashFooter = () => {
  const {t}=useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { username, status } = useAuth();
  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button title="Home" onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <DashFooterContainer>
      {goHomeButton}
      <p>{t('currentUser')}: {username}</p>
      <p> {t('status')}: {status}</p>
    </DashFooterContainer>
  );
  return content;
};
export default DashFooter;
