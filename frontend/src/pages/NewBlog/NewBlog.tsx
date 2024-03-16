import QuillToolbar from '../../components/QuillToolbar';
import Textpad from './components/Textpad';

const NewBlog = () => {
  return (
    <div className='w-4/5 mx-auto'>
        <QuillToolbar/>
        <Textpad/>
    </div>
  )
}

export default NewBlog