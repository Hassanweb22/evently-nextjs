import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='max-w-7xl lg:mx-auto flex-between flex-center flex-col text-center sm:flex-row  gap-4 p-5'>
          <Link href={'/'}>
          <Image
            src={'/assets/images/logo.svg'}
            alt='Evently Logo'
            width={128} 
            height={38}
          />
          </Link>
          <p className='font-medium'>2023 Evently. All Rights Reserved</p>
        </div>
    </footer>
  )
}

export default Footer