import { Link } from "react-router-dom";
import { useStates } from "../context/States";
import Loading from "../components/Loading";
import Styles from "./Spacecrafts.module.css";

const Spacecrafts = () => { // Display a list of spacecrafts with options to view more details or destroy them
  const { spacecrafts, isLoading, error, destroySpacecraft } = useStates();

  if (isLoading) {
    return <Loading message="Loading Spacecrafts..." />;
  }

  if (error) {
    return <div className={Styles.container}>{error}</div>;
  }

  return (// Render the list of spacecrafts
    <div className={Styles.container}>
      <Link className={Styles.createLink} to="/construction">Create</Link>

      {spacecrafts.map((spacecraft) => { // Render each spacecraft in the list
        const pictureUrl = spacecraft.pictureUrl?.trim();

        return ( // Render each spacecraft card
        <div key={spacecraft.id} className={Styles.spacecraft}>
          {pictureUrl && <img src={pictureUrl} alt={spacecraft.name} />}
          <p>Name: {spacecraft.name}</p>
          <p>Capacity: {spacecraft.capacity}</p>
          <div className={Styles.actionRow}>
            <Link className={Styles.moreLinkSpacecraft} to={`/spacecraft/${spacecraft.id}`}>More...</Link>
            <button className={Styles.destroyButton} onClick={() => destroySpacecraft(spacecraft.id)}>Destroy</button>
          </div>
        </div>
        );
        
      })}
    </div>
  );
};

export default Spacecrafts;