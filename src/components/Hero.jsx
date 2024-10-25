import React from 'react'

import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3 '>
      <img src={ logo } alt='' className='w-28 object-contain' />
      <button type='button' onClick={() => {}} className='black_btn'>Github</button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient'>OpenAI Gpt-4</span>
      </h1>
      <h2 className='desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore earum soluta rem cumque adipisci et ea quas laborum, nulla dicta odio repellendus, aliquam eligendi laudantium? In libero officiis et accusantium?</h2>

    </header>
  )
}

export default Hero