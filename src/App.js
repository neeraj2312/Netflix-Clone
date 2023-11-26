import './App.scss';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { Home } from './Component/Home/Home';
import Header from './Component/Home/Header/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
