import { connectToDB } from "@utils/database";
import Item from "@models/item";

export const GET = async (req) => {
    try {
        connectToDB();

        const items = await Item.find({})
        return new Response(JSON.stringify(items), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch Items", {status:500})
    }
}
