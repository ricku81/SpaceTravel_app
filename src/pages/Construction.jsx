import { useStates } from "../context/States"
import BackButton from "../components/BackButton"
import Loading from "../components/Loading";
import Styles from "./Construction.module.css";

const Construction = () => {
  const { buildSpacecraft, isLoading, error } = useStates();

  if (isLoading) { // Show loading message while building spacecraft
    return <Loading message="Working..." />;
  }

  if (error) { // Show error message if there is an error
    return <div className={Styles.container}>{error}</div>;
  }

  const handleBuildSpacecraft = async (e) => { // Handles the build spacecraft button click event
    e.preventDefault();

    // Glossary of form inputs
    const form = e.currentTarget;
    const name = form.name.value;
    const capacity = form.capacity.value;
    const description = form.description.value;
    const pictureUrl = form.image.value.trim();
    const currentLocation = 2; // Earth

    // Input Errors
    if (!name) return alert("Name is required");
    if (!capacity || capacity < 0) return alert("Capacity is required");
    if (!description) return alert("Description is required");

    return await buildSpacecraft({name, capacity, description, pictureUrl, currentLocation});
  };

  return (
    <div className={Styles.container}>
      <BackButton/>

      <div className={Styles.formContainer}>
        <form onSubmit={handleBuildSpacecraft}>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            required 
          />
          <input 
            type="number" 
            name="capacity" 
            min="0" 
            max="1000000000"  
            placeholder="Capacity" 
            required 
          />
          <textarea 
            name="description" 
            placeholder="Description" 
            required 
          />
          <input 
            type="url" 
            name="image" 
            placeholder="Picture URL (optional)" 
          />
          <button className={Styles.buildButton} type="submit">Build</button>
        </form>
      </div>
    </div>
  )
}

export default Construction