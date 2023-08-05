import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    itemName: {
        type: String,
        require: [true, "Item name is required."],
    },
    itemDescription: {
        type: String,
        require: [false],
    },
    tag: {
        type: String,
        require: [false, "Tag is required"]
    }
})

const Item = models.Item || model("Item", ItemSchema);
export default Item;
