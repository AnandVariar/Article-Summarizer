import React, { useState, useEffect } from 'react'

import { copy, linkIcon,loader, tick } from '../assets'

import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {

  const [ article, setArticle ] = useState({
    url:'',
    summary:''
  })

  //  article list
  const [ allArticles, setAllArticles ] = useState([])

  const [ getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('article')) 

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  
  }, [])
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    const { data } = await getSummary({ articleUrl: article.url})

    if(data?.summary) {
      const newArticle = {...article, summary:data.summary };
      const updatedAllArticle = [ newArticle,...allArticles]

      setArticle(newArticle);
      setAllArticles(updatedAllArticle)

      localStorage.setItem('article',JSON.stringify(updatedAllArticle))

      console.log(newArticle);
      
    }
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form onSubmit={ handleSubmit } className='relative flex justify-center items-center'>
          <img src={ linkIcon } alt='' className='absolute left-0 my-2 ml-3 w-5' />

          <input type='url' placeholder='place the URL here'
           value={ article.url } required
            onChange={(e) => setArticle({...article, url : e.target.value })} className='url_input peer' />

          <button type='submit' className='p-2 submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>Click </button>
        </form>

        {/* Browser Hostory */}
              <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
        { allArticles.map((item,index) => (
          <div key={`link.${index}`}
            onClick={()=>setAllArticles(item)} className='link_card' >
              <div className="copy_btn">
                <img src={copy} alt='' className='w-[40%] h-[40%] object-contain' />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{ item.url }</p>
          </div>
        ))}
      </div>
      </div>

      {/* Results Section */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        { isFetching ? (
          <img src={ loader } alt='' className='w-20 h-20 object-contain' />
        ):error ? (
          <p className='font-inter font-bold text-black text-center'>Well, thats not supposed to happen....
          <br />
          <span className='font-satoshi font-normal text-gray-700'>
            { error?.data?.error }
          </span>
          </p>
        ): (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>{ article.summary}</p>
              </div>
            </div>
          )
        )  }
      </div>
    </section>
  )
}

export default Demo