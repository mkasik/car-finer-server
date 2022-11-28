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
        const bookingCollection = client.db('car').collection('booking');
        const reportCollection = client.db('car').collection('report');
        const advertiseCollection = client.db('car').collection('advertise');


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
        // POST data from seller 
        app.post('/data', async (req, res) => {
            const data = req.body;
            const result = await dataCollection.insertOne(data);
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
        // get data by category id 
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category_id: parseInt(id) };
            const service = await dataCollection.find(query).toArray();
            res.send(service);
        });
        // get user data 
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        });
        // get booking data from collection
        app.get('/booking', async (req, res) => {
            const query = {}
            const cursor = bookingCollection.find(query);
            const booking = await cursor.toArray();
            res.send(booking);
        });
        app.post('/reports', async (req, res) => {
            const report = req.body;
            const result = await reportCollection.insertOne(report);
            res.send(result);
        });
        app.get('/reports', async (req, res) => {
            const query = {}
            const cursor = reportCollection.find(query);
            const report = await cursor.toArray();
            res.send(report);
        });
        app.post('/advertise', async (req, res) => {
            const advertise = req.body;
            const result = await advertiseCollection.insertOne(advertise);
            res.send(result);
        });
        app.get('/advertise', async (req, res) => {
            const query = {}
            const cursor = advertiseCollection.find(query);
            const report = await cursor.toArray();
            res.send(report);
        });
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