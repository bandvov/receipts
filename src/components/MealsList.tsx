import React, { useState } from "react";
import { useMeals } from "../useMeals";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Pagination,
  Button,
} from "@mui/material";
import { Meal } from "../App";

const MealsList: React.FC<{addToFavorites:(meal: Meal)=> void}> = ({addToFavorites }) => {
  const [page, setPage] = useState(1);
  const mealsPerPage = 10;
  const { data: meals, isLoading, isError } = useMeals("b");

  const indexOfLastMeal = page * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals ? meals.slice(indexOfFirstMeal, indexOfLastMeal) : [];

  const totalPages = meals ? Math.ceil(meals.length / mealsPerPage) : 1;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  if (isError) return <Typography variant="h6" textAlign="center" mt={4}>Error fetching meals</Typography>;

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Meal Recipes
      </Typography>

      <Grid container spacing={4} >
        {currentMeals.map((meal: any) => (
          <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
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
                  {meal.strCategory}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {meal.strArea}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToFavorites(meal)}
                >
                  Add to Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default MealsList;
