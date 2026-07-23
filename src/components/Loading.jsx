import Styles from "./Loading.module.css";

const Loading = ({ message = "Loading..." }) => {
  return <div className={Styles.loadingContainer}>{message}</div>;
};

export default Loading;