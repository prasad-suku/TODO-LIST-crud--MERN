const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./model.js");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
  const items = await Todo.find();

  res.status(200).json({ data: items, message: "sucessfully fetched" });
});

app.post("/post", async (req, res) => {
  const { todo } = req.body;
  const isexists = await Todo.findOne({ todo: todo });

  if (!isexists) {
    const item = new Todo({ todo: todo });
    await item
      .save()
      .then(() =>
        res.status(201).json({ message: "succesfully created item", item })
      )
      .catch((error) => res.status(400).json({ error: error.message }));
  } else {
    return res
      .status(400)
      .json({ message: "data already exists in collection" });
  }
});

// delete item in mongodb

app.delete("/delete/:id", async (req, res) => {
  const deleteitem = req.params.id;

  const deleteItem = await Todo.findById(deleteitem);

  if (!deleteItem) {
    return res.status(404).json({ error: "Item not Found" });
  }
  await Todo.findByIdAndDelete(deleteItem)
    .then(() => res.status(200).json("succesfully deleted"))
    .catch((error) => console.log(error));
});

// update item in mongodb

app.put("/update/:id", async (req, res) => {
  const updateId = req.params.id;

  try {
    // Check if the todo exists
    const isExists = await Todo.findById(updateId);
    if (!isExists) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Perform the update
    const updated = await Todo.findByIdAndUpdate(
      updateId,
      { todo: req.body.todo },
      { new: true } //optional
    );
    if (updated) {
      res.status(200).json({ message: "Updated successfully", data: updated });
    } else {
      res.status(500).json({ error: "Failed to update the item" });
    }
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// connect with mongodb

mongoose
  .connect("mongodb://localhost:27017/Todo")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err.message));

app.listen(3000, () => {
  console.log("running on 3000 port");
});
