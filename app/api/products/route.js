import connectMongoDB from "@/libs/mongodb";
import ProductModel from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();

        const products = await ProductModel.find();
        console.log("Products:", products);

        return NextResponse.json({ message: 'Get Products success', products }, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: "Error get product", error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const {name, image, price, category} = await request.json();

        await connectMongoDB();

        const newProduct = await ProductModel.create({ name, image, price, category });

        return NextResponse.json({ message: "Product Created", product: newProduct }, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "Error creating product", error: error.message }, { status: 500 });
    }
    
}