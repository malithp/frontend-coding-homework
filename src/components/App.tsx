import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import MovieDetails from './MovieDetails';

function App() {
  return (
    <Routes>
      <Route path='/movie/:id' element={<MovieDetails />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
