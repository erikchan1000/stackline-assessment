import React from 'react';
import Logo from '@/public/stackline_logo.svg'
import Image from 'next/image'
import './styles.scss'

export const Header = () => {
  return (
    <header> 
      <Image src={Logo} alt="logo" />
    </header>
  )
}

    
