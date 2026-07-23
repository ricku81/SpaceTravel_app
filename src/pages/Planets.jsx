import { useStates } from "../context/States"
import Loading from "../components/Loading";
import styles from "./Planets.module.css"

const Planets = () => { // Display a list of planets and docked ships
  const { planets, isLoading, error, spacecrafts, setFocusedShipId, setFocusedPlanetId } = useStates();

  if (isLoading) {
    return <Loading message="Loading Planets..." />;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  const dockedShips = (planetId) => { // Returns an array of ships docked at the given planet ID
    return spacecrafts.filter((ship) => ship.currentLocation === planetId);
  };

  return ( // Render the list of planets and their docked ships
    <div className={styles.container}>
        {planets.map(({ id, pictureUrl, name, currentPopulation }) => ( // Map through each planet and display its details
        <div key={id} className={styles.planet}>

          {/* Planet information section */}
          <button className={styles.planetInfo} onFocus={(e) => { console.log(`Focused on planet ${id}`); setFocusedPlanetId(id) }}> 
            <img src={pictureUrl} alt={name}/>
            <h2>Name: {name}</h2>
            <h2>Current Population:</h2>
            <h2>{currentPopulation}</h2>
          </button>

          {/* Docked ships section */}
          <div className={styles.dockedShips}>
            {dockedShips(id).map(({ id: shipId, name: shipName, capacity }) => (
              shipId && <button key={shipId} className={styles.ship} onFocus= { (e) => {console.log(`Focused on ship ${shipId}`); setFocusedShipId(shipId) }}>
                <p>{shipName}</p>
                <p>{capacity}</p>
              </button>
            ))}
          </div>

        </div>
        ))}
    </div>
  );
};

export default Planets