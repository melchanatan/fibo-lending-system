import Item from "@models/item";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const item = await Item.findById(params.id).populate("creator")
        if (!item) return new Response("item Not Found", { status: 404 });

        return new Response(JSON.stringify(item), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { name, description, tag, image, stockCurrent} = await request.json();

    try {
        await connectToDB();

        // Find the existing item by ID
        const existingItem = await Item.findById(params.id);

        if (!existingItem) {
            return new Response("item not found", { status: 404 });
        }

        // Update the item with new data
        existingItem.name = name;
        existingItem.description = description;
        existingItem.tag = tag;
        existingItem.stockCurrent = stockCurrent;

        await existingItem.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating item", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Item.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};