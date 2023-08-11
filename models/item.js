import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        require: [true, "Item name is required."],
    },
    description: {
        type: String,
        require: [false],
    },
    stockMax: {
        type: Number,
        require: [true],
    },
    stockCurrent: {
        type: Number,
        require: [false],
    },
    tag: {
        type: String,
        require: [false]
    },
    image: {
        type: String,
        require: [true]
    }
})

const Item = models.Item || model("Item", ItemSchema);
export default Item;
