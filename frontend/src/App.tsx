import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewBlog from './pages/NewBlog';
import BlogComponent from './pages/BlogComponent';
import YourBlogs from './pages/YourBlogs';
 
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/new-blog' element={<NewBlog/>}/>
            <Route path='/blog/:id' element={<BlogComponent/>}/>
            <Route path='/your-blogs' element={<YourBlogs/>}/>
          </Routes>
          {/* <Footer/> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
