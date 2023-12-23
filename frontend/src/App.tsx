import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blog from './components/Blog';
import NewBlog from './pages/NewBlog';
 
function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/new-blog' element={<NewBlog/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
