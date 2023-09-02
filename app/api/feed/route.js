import { connectToDB } from "@utils/database";
import Item from "@models/item";

export const PATCH = async (request, res) => {
    const { stockCurrent, id } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingItem = await Item.findById(id);
        console.log("hel")
        console.log(existingItem)

        if (!existingPrompt) {
            return new Response("Item not found", { status: 404 });
        }
    } catch(error) {
        return new Response("Error Updating Item", { status: 500 });
    }

    //     // Update the Item with new data
    //     existingPrompt.currentStock = currentStock;

    //     await existingItem.save();

    //     return new Response("Successfully updated the Prompts", { status: 200 });
    // } catch (error) {
    //     return new Response("Error Updating Item", { status: 500 });
    // }
};
