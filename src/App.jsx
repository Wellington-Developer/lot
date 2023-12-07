// Styles
import './App.css';

// React Router Dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// React Components
import { Home } from './Components/Home';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { FormSelectFilter } from './Components/FormSelectFilter';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <FormSelectFilter />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
