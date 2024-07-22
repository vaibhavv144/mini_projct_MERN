import React, { Children } from 'react'
import Header from './Header'

import {Helmet} from 'react-helmet';
import {Toaster}from 'react-hot-toast';
import Footer from '../../LadingPage/Footer/Footer';

const Layout = ({children,title, description, keywords, author}) => {
  return (
    <div>
        <Helmet>  
          <meta charset="UTF-8"/>
          <div>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
          </div>
          <title>{title}</title>
          </Helmet>
        <Header/>
        <main style={{minHeight:'0vh'}}>
          <Toaster/>
          {children}

          </main>
        <Footer/>

      
    </div>
  )
}
//seo
Layout.defaultProps = {
  title: "Foodie-Eat Now", 
  description: "mern stack project", 
  keywords: "mern, react, node, mongodb", 
  author: "Itsadiii",
};

export default Layout
