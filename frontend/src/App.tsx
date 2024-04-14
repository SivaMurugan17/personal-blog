import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NewBlog from './pages/NewBlog/NewBlog';
import YourBlogs from './pages/YourBlogs/YourBlogs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Blog from './pages/Blog/Blog';
import { clearUser, setUser } from './slices/userSlice';
import { refreshUser } from './service/userService';
 
function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

  const refresh = async ()=>{
    refreshUser()
      .then(( data )=>{
        if(data === ""){
          dispatch(clearUser());
        }
        else{
          dispatch(setUser(data));
        }
      })
      .catch((e)=>{
        console.log(e);
      })
  } 
  
  useEffect(()=>{
    refresh()
  },[])

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/new-blog' element={<NewBlog/>}/>
            <Route path='/blog/:id' element={<Blog/>}/>
            <Route path='/your-blogs' element={<YourBlogs/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
