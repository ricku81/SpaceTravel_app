import { useParams } from "react-router-dom";
import { useStates } from "../context/States";
import BackButton from "../components/BackButton"
import Loading from "../components/Loading";
import Styles from "./Spacecraft.module.css";

const Spacecraft = () => { // Display details of a single spacecraft based on the ID from the URL parameters
  const { id } = useParams();
  const { planets, spacecrafts, isLoading, error } = useStates();
  const spacecraft = spacecrafts.find((item) => item.id === id); // Find the spacecraft with the matching ID
  const currentPlanet = planets.find((planet) => planet.id === spacecraft?.currentLocation); // Find the planet where the spacecraft is currently located

  if (isLoading) { // Show loading message while fetching spacecraft details
    return <Loading message="Grabbing spacecraft..." />;
  }

  if (error) { // Show error message if there is an error
    return <div className={Styles.container}>{error}</div>;
  }

  if (!spacecraft) { // Show message if the spacecraft with the given ID is not found
    return <div className={Styles.container}>Spacecraft not found.</div>;
  }

  return ( // Render the details of the selected spacecraft
    <div className={Styles.container}>
      <BackButton/>
      
      <div className={Styles.spacecraftDetails}>
        {spacecraft.pictureUrl && <img src={spacecraft.pictureUrl} alt={spacecraft.name} />}
        <h2>{spacecraft.name}</h2>
        <hr />
        <p>Max Capacity: {spacecraft.capacity}</p>
        <p>Docked: "{currentPlanet?.name ?? `Unknown planet (${spacecraft.currentLocation})`}"</p>
        <hr />
        <p>{spacecraft.description}</p>
      </div>

    </div>
  );
};

export default Spacecraft;