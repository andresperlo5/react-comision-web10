import React from 'react'
import { useChangeTitle } from '../helpers/useChangeTitlePage'

const ContactPage = () => {
  useChangeTitle('contact')
  return (
    <div className='vh-100'>ContactPage</div>
  )
}

export default ContactPage
