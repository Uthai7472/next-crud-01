"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const EditProductForm = ({ id, name, image, price, category }) => {
    const [newName, setNewName] = useState(name);
    const [newImage, setNewImage] = useState(image);
    const [newPrice, setNewPrice] = useState(price);
    const [newCategory, setNewCategory] = useState(category);

    const router = useRouter();

    console.log('Name on EditProductForm', name);

    useEffect(() => {
        setNewName(name || '');
        setNewImage(image || '');
        setNewPrice(price || '');
        setNewCategory(category || '');
    }, [name, image, price, category])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://next-crud-01.vercel.app/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newName, newImage, newPrice, newCategory }),
            });

            router.push('/products');
            // router.reload();

        } catch(error) {
            console.log(error);
        }
    }

  return (
    <div>
        <div className='flex justify-between items-center px-10'>
            <h1 className='font-bold py-10 text-2xl'> Update Product</h1>
        </div>
        <form className='flex flex-col gap-3 px-10' onSubmit={handleSubmit}>
            <input type="text" 
                className='input input-bordered input-accent w-full max-w-xs'
                placeholder='Product Name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <input type="text"
                className='input input-bordered input-accent w-full max-w-xs'
                placeholder='/images/1.jpg'
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
            />
            <input type="number"
                className='input input-bordered input-accent w-full max-w-xs'
                placeholder='Price'
                defaultValue={1}
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
            />
            <input type="text"
                className='input input-bordered input-accent w-full max-w-xs'
                placeholder='Product Category'
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />

            <button type='submit' className='btn btn-primary w-full max-w-xs'>
                Update Product
            </button>
        </form>
    </div>
  )
}

export default EditProductForm