const mongoose = require("mongoose");
const counterModel = require("./counter.js");

const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
  },
  { _id: false }
);

const childSchema = new mongoose.Schema(
  {
    _id: { type: String },
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    level: {
      type: String,
      enum: ["KG1", "KG2", "PreKG"],
      required: true,
    },
    address: addressSchema,
    image: { type: String, required: true },
  },
  { _id: false }
);
childSchema.pre("save", async function (next) {
  let doc = this;
  console.log("doc before counter update:", doc);
  try {
    const counter = await counterModel
      .findByIdAndUpdate(
        "child",
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      )
      .exec();
    doc._id = counter.count;
  } catch (err) {
    console.error("error updating counter:", err);
    next(err);
  }
});

module.exports = mongoose.model("Child", childSchema);
