import connectMongoDB from "@/libs/mongodb";
import ProductModel from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newImage: image, newPrice: price, newCategory: category } = await request.json();

    try {
        await connectMongoDB();

        const product = await ProductModel.findByIdAndUpdate(id, { name, image, price, category });

        return NextResponse.json({ product }, {status: 200});

    } catch (error) {
        return NextResponse.json({ message: `Failed to get product from id: ${id}` });
    }
}

export async function GET(request, { params }) {
    const { id } = params;
    console.log("Get Product by ID id:", id);

    try {
        await connectMongoDB();

        const product = await ProductModel.findOne({ _id: id });
        console.log(`Product from get by ID: ${product}`);

        return NextResponse.json({ product }, {status: 200});

    } catch (error) {
        return NextResponse.json({ message: `Failed to get product from id: ${id}` });
    }
}

