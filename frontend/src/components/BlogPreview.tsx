

const BlogPreview = (props : {title : string,author : string}) => {
  const {title,author} = props;
  return (
    <div className='rounded-lg border border-slate shadow-md w-96 p-4 text-left'>
        <img src='https://static.thenounproject.com/png/1156518-200.png' alt="blog-preview" className='mx-auto'/>
        <h3 className='text-2xl'>{title}</h3>
        <p>{author}</p>
        <p>Date</p>
    </div>
  )
}

export default BlogPreview