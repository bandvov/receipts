import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredients: string[];
}

interface FavoritesProps {
  favorites: Meal[];
  removeFromFavorites: (id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, removeFromFavorites }) => {
  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Favorite Meals
      </Typography>

      <Grid container spacing={4} >
        {favorites.map((meal: any) => (
          <Grid item xs={12} sm={6} md={3} key={meal.idMeal}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {meal.strMeal}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Instructions:</strong> {meal.strInstructions.slice(0, 100)}...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Ingredients:</strong>
                  {meal.strIngredient1 && ` ${meal.strIngredient1},`}
                  {meal.strIngredient2 && ` ${meal.strIngredient2},`}
                  {meal.strIngredient3 && ` ${meal.strIngredient3},`}
                  {meal.strIngredient4 && ` ${meal.strIngredient4},`}
                  {meal.strIngredient5 && ` ${meal.strIngredient5}`}
                </Typography>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeFromFavorites(meal.idMeal)}
                  sx={{ mt: 2 }}
                >
                  Remove from Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;
