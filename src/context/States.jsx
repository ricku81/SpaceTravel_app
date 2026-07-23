import { createContext, useContext, useEffect, useMemo, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

const StatesContext = createContext(null);

export const StatesProvider = ({ children }) => {
	// Three core shared states: planets, spacecrafts, and loading.
	const [planets, setPlanets] = useState([]);
	const [focusedShipId, setFocusedShipId] = useState(null);
	const [focusedPlanetId, setFocusedPlanetId] = useState(null);
	const [spacecrafts, setSpacecrafts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const refreshPlanets = async () => { // Fetch the latest list of planets from the API and update the state accordingly.
		const response = await SpaceTravelApi.getPlanets();

		if (response.isError) {
			setError(response.errorMessage);
			return;
		}

		setPlanets(response.data ?? []);
	};

	const refreshSpacecrafts = async () => { // Fetch the latest list of spacecrafts from the API and update the state accordingly.
		const response = await SpaceTravelApi.getSpacecrafts();

		if (response.isError) {
			setError(response.errorMessage);
			return;
		}

		setSpacecrafts(response.data ?? []);
	};

	const initializeData = async () => { // Initialize the data by fetching both planets and spacecrafts.
		setIsLoading(true);
		setError(null);

		await Promise.all([refreshPlanets(), refreshSpacecrafts()]);
		setFocusedPlanetId(null);
		setFocusedShipId(null);
		setIsLoading(false);
	};

	const buildSpacecraft = async (spacecraftData) => { // Build a new spacecraft and refresh the spacecrafts list. Return to Spacecrafts page on successful creation.
		setIsLoading(true);

		const response = await SpaceTravelApi.buildSpacecraft(spacecraftData); // Build the spacecraft using the API.

		if (response.isError) { // Handle error and reset loading state
			setError(response.errorMessage);
			setIsLoading(false);
			return false;
		}

		await refreshSpacecrafts();
		setIsLoading(false);
		return true;
	};

	const moveSpacecraft = async (id, newLocation) => { // Move a spacecraft to a new location and refresh the spacecrafts list when both focusedShipId and focusedPlanetId are set.
		setIsLoading(true);

		const response = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId: id, targetPlanetId: newLocation });

		if (response.isError) { // Handle error when moving spacecraft
			alert(response.data.message);
			setIsLoading(false);
			return false;
		}

		await initializeData(); // Refresh Planets and Spacecrafts data after moving a spacecraft; initializeData() sets the focused ship and planet IDs to null.
		setIsLoading(false);
		return true;
	};

	const destroySpacecraft = async (id) => { // Destroy a spacecraft by its ID and refresh the spacecrafts list.
		setIsLoading(true); // Set loading state before attempting to destroy the spacecraft.
		const response = await SpaceTravelApi.destroySpacecraftById({ id });

		if (response.isError) {
			setError(response.errorMessage);
			setIsLoading(false); // Reset loading state if there is an error.
			return false;
		}

		await refreshSpacecrafts();
		setIsLoading(false);
		return true;
	};

	useEffect(() => { // Initialize data on component mount.
		initializeData();
	}, []);

	useEffect(() => { // Move the focused spacecraft to the focused planet whenever both are selected.
		moveSpacecraft(focusedShipId, focusedPlanetId);
	}, [focusedShipId && focusedPlanetId]);

	const value = useMemo( // Memoize the context value to optimize performance and prevent unnecessary re-renders.
		() => ({
			planets,
			spacecrafts,
			isLoading,
			error,
			focusedShipId,
			focusedPlanetId,
			setFocusedShipId,
			setFocusedPlanetId,
			refreshPlanets,
			refreshSpacecrafts,
			destroySpacecraft,
			buildSpacecraft,
		}),
		[planets, spacecrafts, isLoading, error, focusedShipId, focusedPlanetId]
	);

	return <StatesContext.Provider value={value}>{children}</StatesContext.Provider>;
};

export const useStates = () => { // Custom hook to access the shared state context.
	const context = useContext(StatesContext);

	if (!context) { // If the context is not available, it means the hook is used outside the provider.
		throw new Error("useStates must be used within a StatesProvider.");
	}

	return context;
};
