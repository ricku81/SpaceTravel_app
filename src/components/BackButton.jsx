import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";
import Styles from "./BackButton.module.css";

const BackButton = () => { // Component for navigating back to the previous page or home if no history exists
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) { // Navigate back if there is history
      navigate(-1);
      return;
    }

    navigate(ROUTE_PATHS.HOME, { replace: true });
  };

  return (
    <button className={Styles.backButton} onClick={handleBack}>Go Back</button>
  )
}

export default BackButton