import React, { FC } from 'react';

interface ProductProps {
  title: string;
  price: string;
  content: string;
  image: string;
}

const ProductPage: FC<ProductProps> = ({ title, price, content, image }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <img src={image} alt={title} className="w-full h-auto" />
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{price}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ProductPage;