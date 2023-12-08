// Styles
import './App.css';

// React Router Dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// React Components
import { Home } from './Components/Home';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { PostPage } from './Components/PostPage';
import GoToTop from './Components/GoToTop';
import { About } from './Components/About';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/imovel/:id" element={<PostPage />} />
        </Routes>
      <Footer />
      <GoToTop />
    </BrowserRouter>
  );
}

export default App;
