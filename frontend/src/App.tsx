import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewBlog from './pages/NewBlog';
import BlogComponent from './pages/BlogComponent';
import YourBlogs from './pages/YourBlogs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL_AUTH } from './constants/env-variables';
import { useDispatch } from 'react-redux';
 
function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

  //on every refresh
  const refreshUser = async ()=>{
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
            <Route path='/blog/:id' element={<BlogComponent/>}/>
            <Route path='/your-blogs' element={<YourBlogs/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
