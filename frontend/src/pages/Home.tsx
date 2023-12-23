import BlogPreview from '../components/BlogPreview'

const Home = () => {
  return (
    <div>
        <section className='flex flex-col gap-4 w-10/12 mx-auto'>
            <h1 className='text-3xl text-left'>Recent Blogs</h1>
            <div className='w-10/12 mx-auto flex scroll-smooth'>
                <BlogPreview/>
                <BlogPreview/>
                <BlogPreview/>
            </div>
        </section>
    </div>
  )
}

export default Home