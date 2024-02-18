import SearchBlogs from './components/SearchBlogs';
import TagSection from './components/TagSection';
import RecentBlogs from './components/RecentBlogs';


const Home = () => {
  return (
    <div>
        <SearchBlogs/>
        <RecentBlogs/>
        <TagSection/>
    </div>
  )
}

export default Home