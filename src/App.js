import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/Home/Home'
import DetailsPage from './pages/Detail/Detail'
import Header from './components/Header/Header'

function App() {
  return (
    <div className="App">
      <Header/>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id/details" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
