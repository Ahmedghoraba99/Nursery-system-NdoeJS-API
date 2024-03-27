const mongoose = require("mongoose");
const counterModel = require("./counter");
const classSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  supervisor: { type: String, ref: "teachers" },
  children: [{ type: String, ref: "Child" }],
});
classSchema.pre("save", async function (next) {
  let doc = this;
  console.log("doc before counter update:", doc);
  try {
    const counter = await counterModel
      .findByIdAndUpdate(
        "class",
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

module.exports = mongoose.model("Class", classSchema);
