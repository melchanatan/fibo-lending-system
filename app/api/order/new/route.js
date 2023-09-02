import { connectToDB } from "@utils/database";
import Order from "@models/order";

export const POST = async (req, res) => {
    const { customerName, customerTel, customerGroup, timestamp, items } = await req.json();

    try {
        console.log("Order: posting order for " + customerName)
        await connectToDB();
        const newOrder = new Order({
            customerName,
            customerTel,
            customerGroup,
            timestamp,
            items
        })

        await newOrder.save();
        return new Response(JSON.stringify(newOrder), {status: 201})
    } catch (error) {
        return new Response("Failed to create new Order", {status: 500})
    }
}



