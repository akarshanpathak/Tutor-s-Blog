import { Footer, FooterLink } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsTwitter,BsGithub,BsDribbble} from 'react-icons/bs'
import React from 'react'

function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
     <div className="w-full max-w-7xl mx-auto ">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl dark:text-white font-semibold'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Tutor's</span>
        Blog
      </Link>   
            </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
          <div>
          <Footer.Title title='About'/>  
           <Footer.LinkGroup col>
           <FooterLink href='https://github.com/akarshanpathak' rel='noopener noreferrer'>
            Projects
           </FooterLink>
           <FooterLink href='/about' rel='noopener noreferrer'>
           Tutor's Blog
           </FooterLink>
           </Footer.LinkGroup>
          </div>
          <div>
          <Footer.Title title='Follow Us'/>  
           <Footer.LinkGroup col>
           <FooterLink href='https://github.com/akarshanpathak' rel='noopener noreferrer'>
           Github
           </FooterLink>
           <FooterLink href='https://www.linkedin.com/in/akarshan-pathak-6809a2247/' >
           LinkedIn
           </FooterLink>
           </Footer.LinkGroup>
          </div>
          <div>
          <Footer.Title title='Legal'/>  
           <Footer.LinkGroup col>
           <FooterLink href='#' >
           Privacy Policy
           </FooterLink>
           <FooterLink href='#' >
           Terms &amp; Conditions
           </FooterLink>
           </Footer.LinkGroup>
          </div>
          </div>
          
        </div>
       <Footer.Divider/>
       <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href='#' by="Tutor's blog "
        year={new Date().getFullYear()}/> 
       <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
         <Footer.Icon href='#' icon={BsFacebook}/>
        <Footer.Icon href='#' icon={BsInstagram}/>
        <Footer.Icon href='#' icon={BsTwitter}/>
        <Footer.Icon href='https://github.com/akarshanpathak/' icon={BsGithub}/>
       
       </div>
       </div>
     </div>
    </Footer>
  )
}

export default FooterCom
