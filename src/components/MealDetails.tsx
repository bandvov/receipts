import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { useMeal } from "../useMeals";
import { useParams } from "react-router-dom";



const MealDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const { data: meal, isLoading, isError } = useMeal(id!);


  if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  if (isError || !meal) return <Typography variant="h6" textAlign="center" mt={4}>Meal not found</Typography>;
  
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ name: ingredient, measure });
    }
  }

    return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
      {/* Meal Image */}
      <CardMedia
        component="img"
        height="300"
        image={meal.strMealThumb}
        alt={meal.strMeal}
        sx={{ borderRadius: 2 }}
      />

      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {meal.strMeal}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          <strong>Category:</strong> {meal.strCategory} | <strong>Area:</strong> {meal.strArea}
        </Typography>

        {/* Ingredients List */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Ingredients:
        </Typography>
        <List dense>
          {meal.ingredients?.map((ingredient: {name: string; measure: string}, index: number) => (
            <ListItem key={index}>
              <ListItemText primary={`${ingredient.name} - ${ingredient.measure}`} />
            </ListItem>
          ))}
        </List>

        {/* Instructions */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Instructions:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meal.strInstructions}
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          {meal.strYoutube && (
            <Button variant="contained" color="error" href={meal.strYoutube} target="_blank">
              Watch on YouTube
            </Button>
          )}
          {meal.strSource && (
            <Button variant="outlined" href={meal.strSource} target="_blank">
              View Recipe
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MealDetails;
