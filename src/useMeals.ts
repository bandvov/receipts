import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";

// Initialize QueryClient
const queryClient = new QueryClient();

// Fetch meals by first letter
const fetchMeals = async (letter: string) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  return data.meals || []; // Return an empty array if no meals found
};

// Fetch meal details by ID
const fetchMealById = async (id: string) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return data.meals ? data.meals[0] : null; // Return the first meal object or null if not found
};

// Hook for fetching meals by letter
export const useMeals = (letter: string) => {
  return useQuery({
    queryKey: ["meals", letter],
    queryFn: () => fetchMeals(letter),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

// Hook for fetching meal details by ID
export const useMeal = (id: string) => {
  return useQuery({
    queryKey: ["meal", id],
    queryFn: () => fetchMealById(id),
    enabled: !!id, // Only fetch if ID exists
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};