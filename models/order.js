import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
    customerName: {
        type: String,
        require: [true, "Customer name is required."],
    },
    customerTel: {
        type: Number,
        require: [true, "Customer tel is required."],
    },
    customerGroup: {
        type: Number,
        require: [true, "Group is required."],
    },
    timestamp: {
        type: String,
        require: [true, "timestamp is required."],
    },
    items: {
        type: Array,
        "default": []
    }


})

const Order = models.Order || model("Order", ItemSchema);
export default Order;
