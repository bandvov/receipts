import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MealsList from "./components/MealsList";
import Favorites from "./components/Favorites";
import { Box, Button } from "@mui/material";
import MealDetails from "./components/MealDetails";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredients: string[];
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  const addToFavorites = (meal: any) => {
    if (!favorites.some((fav) => fav.idMeal === meal.idMeal)) {
      setFavorites([...favorites, meal]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((meal) => meal.idMeal !== id));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Box sx={{ display: "flex", gap:2, mt:2 }}>
          <Link to="/">
            <Button variant="contained">Home</Button>
          </Link>
          <Link to="/favorites">
            <Button variant="contained">Favorites</Button>
          </Link>
        </Box>
        <Routes>
          <Route path="/" element={<MealsList addToFavorites={addToFavorites} />} />
          <Route path="/:id" element={<MealDetails/>} />
          <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
