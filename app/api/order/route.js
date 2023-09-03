import { connectToDB } from "@utils/database";
import Order from "@models/order";

export const GET = async (req) => {
    try {
        connectToDB();

        const orders = await Order.find({})
        console.log("fetch Orders successful")
        return new Response(JSON.stringify(orders), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch Orders", {status:500})
    }
}
