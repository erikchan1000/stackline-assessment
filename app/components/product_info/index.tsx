import React from 'react';
import './styles.scss';
import { ProductInfoInterface } from './interface';
import Image from 'next/image';

export const ProductInfo = ({ title, subtitle, tags, image}: ProductInfoInterface) => { 
  return (
    <div className="productInfo">
      <Image src={image} alt={title} width={500} height={500} />
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
