import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MealDetails from './components/MealDetails';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
 

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/meal/:id" element={<MealDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
