import React from 'react'
import Header from './Header'
import {motion} from 'framer-motion'

const Layout = ({children}: any) => {
  return (
    <motion.div
    className='
    
    flex flex-col'

    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    transition={{
      duration: 1,
      delay: 1,
    }}
    >
      <Header/>
      {children}
      
    </motion.div>
  )
}

export default Layout