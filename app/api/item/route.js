import { connectToDB } from "@utils/database";
import Item from "@models/item";

export const GET = async (req) => {
    try {
        connectToDB();

        const items = await Item.find({})
        console.log("fetch Items successful")
        return new Response(JSON.stringify(items), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch Items", {status:500})
    }
}

export const PATCH = async (request, { params }) => {
    const { stockCurrent, id } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingItem = await Item.findById(id);
        console.log("patch item successful")

        if (!existingItem) {
            return new Response("Item not found", { status: 404 });
        }

        existingItem.stockCurrent = stockCurrent;
        await existingItem.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch(error) {
        return new Response("Error Updating Item", { status: 500 });
    }

};
