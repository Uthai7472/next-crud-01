"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const addProduct = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !image) {
            alert("Name and Image are required");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/api/products", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name, image, price, category }),
            });
            
            if (res.ok) {
                router.push("/products");
            } else {
                throw new Error("Faialed to create a Product");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className='flex justify-between items-center px-10'>
            <h1 className='font-bold py-10 text-2xl'> Add New Product</h1>
        </div>
        <form className='flex flex-col gap-3 px-10' onSubmit={handleSubmit}>
            <input type="text" 
                className='input input-bordered input-accent w-full max-w-xs'
                placeholder='Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input type="text"
                className='input input-bordered input-accent w-full max-w-xs'
                placeholder='/images/1.jpg'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <input type="number"
                className='input input-bordered input-accent w-full max-w-xs'
                placeholder='Price'
                defaultValue={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input type="text"
                className='input input-bordered input-accent w-full max-w-xs'
                placeholder='Product Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <button type='submit' className='btn btn-primary w-full max-w-xs'>
                Add Product
            </button>
        </form>
    </>
  )
}

export default addProduct