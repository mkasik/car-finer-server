const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
var ObjectId = require('mongodb').ObjectId;
const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// User: Car-Server
// Pass: VVy7dwW7r4Cqinj7



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4nbkldt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        // create database collection for review
        const dataCollection = client.db('car').collection('data');
        const categoryCollection = client.db('car').collection('category');
        const usersCollection = client.db('car').collection('users');


        // get data from services
        app.get('/data', async (req, res) => {
            const query = {}
            const cursor = dataCollection.find(query);
            const data = await cursor.toArray();
            res.send(data);
        });
        app.get('/data/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await dataCollection.findOne(query);
            res.send(result);
        });
        app.get('/category', async (req, res) => {
            const query = {}
            const cursor = categoryCollection.find(query);
            const category = await cursor.toArray();
            res.send(category);
        })
        app.get('/users', async (req, res) => {
            const query = {}
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });
        // app.get('/users/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await usersCollection.findOne(query);
        //     res.send(result);
        // });
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category_id: parseInt(id) };
            const service = await dataCollection.find(query).toArray();
            res.send(service);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
    }
    finally {

    }

}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('running');

})

app.listen(port, () => {
    console.log(`Car server running on: ${port}`)
})