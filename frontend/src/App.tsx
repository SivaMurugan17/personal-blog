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
import axios from 'axios';
import { API_URL_AUTH } from './constants/env-variables';
import { useDispatch } from 'react-redux';
import Blog from './pages/Blog/Blog';
 
function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

  //on every refresh
  const refreshUser = async ()=>{
    try{
      const { data } = await axios.post(API_URL_AUTH+"/refresh",null,{
        withCredentials : true
      })
      //when no cookie, empty string is received
      if(data === ""){
        dispatch({ type : 'CLEAR'})
      }
      else{
        dispatch({ type : 'SET', payload : data});
      }
    }
    catch(e){
      console.log(e);
    }
  } 
  
  useEffect(()=>{
    refreshUser()
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
