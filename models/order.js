import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
    customerName: {
        type: String,
        require: [true, "Customer name is required."],
    },
    customerTel: {
        type: String,
        require: [true, "Customer tel is required."],
    },
    customerGroup: {
        type: String,
        require: [true, "Group is required."],
    },
    timestamp: {
        type: String,
        require: [true, "timestamp is required."],
    },
    items: {
        type: Array,
        "default": []
    },
    error: {
        type: String
    }

})

const Order = models.Order || model("Order", ItemSchema);
export default Order;
