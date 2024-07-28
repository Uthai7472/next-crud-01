"use client";

import React, { useEffect, useState } from 'react'
import EditProductForm from '@/components/EditProductForm'

const EditPage = ({ params }) => {
    const {id} = params;
    const [productByID, setProductByID] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/products/${id}`, {
                    cache:'no-store',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch product');
                }

                const data = await res.json();
                console.log(data.product);
                setProductByID(data.product);
                console.log(productByID.name);

            } catch (error) {
                console.log(error);
            }
        }

        fetchProduct();
        
    }, [id]);

  return <EditProductForm id={id} name={productByID.name} image={productByID.image}
  price={productByID.price}
  category={productByID.category}/>
}

export default EditPage