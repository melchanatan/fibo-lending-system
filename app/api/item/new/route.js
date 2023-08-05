import { connectToDB } from "@utils/database";
import Item from "@models/item";




export const POST = async (req, res) => {
    const { userId, itemName, tag, itemDescription, fileName } = await req.json();
    try {
        console.log(fileName)
    } catch(err) {
        console.log(err)
    }

    try {
        await connectToDB();
        const newItem = new Item({
            creator: userId,
            itemName,
            itemDescription,
            tag,
        })

        await newItem.save();
        return new Response(JSON.stringify(newItem), {status: 201})
    } catch (error) {
        return new Response("Failed to create new item", {status: 500})
    }
}


