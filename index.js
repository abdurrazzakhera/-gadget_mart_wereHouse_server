const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

//middle ware
app.use(cors());
app.use(express.json());

//Port
const port = process.env.PORT || 5000;

//App server get
app.get("/", (req, res) => {
  res.send("Hero");
});

//mongoDb connect

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qfwsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const inventoryCollection = client
      .db("allInventory")
      .collection("inventory");

    //Find Multiple Data
    app.get("/items", async (req, res) => {
      const query = {};
      const itemsFound = inventoryCollection.find(query);
      const result = await itemsFound.toArray();
      res.send(result);
    });

    // Delete a One User
    app.delete("/items/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    });

    //Update an User
    app.put("/items/:id", async (req, res) => {
      const id = req.params.id;
      const deliverdUser = req.body;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updatedDeliverd = {
        $set: {
          quantity: deliverdUser.quantity,
        },
      };
      const result = await inventoryCollection.updateOne(
        filter,
        updatedDeliverd,
        option
      );
      res.send(result);

      console.log(result);
    });

    //post a data from client side
    app.post("/items", async (req, res) => {
      console.log("body", req.body);
      const newUser = req.body;
      const resutl = await inventoryCollection.insertOne(newUser);
      res.send(resutl);
    });
  } finally {
  }
}

//database function call
run().catch(console.dir);
//App listen
app.listen(port, () => {
  console.log("hello the port is runnig", port);
});
