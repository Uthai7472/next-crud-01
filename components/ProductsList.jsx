"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/products", {
                    cache: 'no-store',
                });
        
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await res.json();
                console.log("Fetched data:", data); // Log fetched data

                if (data && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setProducts([]);
                }
        
            } catch (error) {
                console.log("Error loading products:", error);
                setProducts([]);
            }
        }

        fetchProducts();
    }, [])

  return (
    <>
        <div className='overflow-x-auto px-10'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold py-10 text-2xl'>Next.js 14 CRUD Craete, Read, Update and Delete - MongoDB DaisyUI TailwindCSS</h1>
            </div>
            <div className='text-right'>
                <Link className='btn btn-primary' href={'/addProduct'}>
                    Add Product
                </Link>
            </div>

            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr className='hover' key={product._id}>
                            <th>
                                <label>
                                    <input type="checkbox" className='checkbox' />
                                </label>
                            </th>
                            <td>
                                <div className='flex items-center gap-3'>
                                    <div className='avatar'>
                                        <div className='mask mask-squircle w-12 h-12'>
                                            <Image width={80} height={80}
                                                src={product.image}
                                                alt={product.name}
                                                className="rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-bold'>
                                            {product.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                {product.category}
                            </td>
                            <th>
                                <Link href={`/editProduct/${product._id}`}>
                                    <button className='btn btn-primary'>Edit</button>
                                </Link>
                                Delete
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default ProductsList