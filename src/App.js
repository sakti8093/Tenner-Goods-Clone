import logo from './logo.svg';
import './App.css';

import Navbar from './Pages/Navbar';
import Home from './Pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Pages/Footer';
import Allroutes from './Allroutes';


function App() {
  return (<div className='App'>
  <Allroutes/>
  </div>);
}

export default App;
