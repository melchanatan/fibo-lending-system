import { connectToDB } from "@utils/database";
import Item from "@models/item";


export const POST = async (req, res) => {
    const { userId, name, tag, description, image, stockMax, stockCurrent } = await req.json();
    try {
        console.log(image)
    } catch(err) {
        console.log(err)
    }

    try {
        await connectToDB();
        const newItem = new Item({
            creator: userId,
            name,
            description,
            stockCurrent,
            stockMax,
            image,
            tag,
        })

        await newItem.save();
        return new Response(JSON.stringify(newItem), {status: 201})
    } catch (error) {
        return new Response("Failed to create new item", {status: 500})
    }
}


