const express = require('express')
const app = express()
const port = 3000

const {MongoClient} = require('mongodb');


app.get('/', function(req, res){
    main().catch(console.error);
    res.send('hello world');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/schedule', function(req, res) {
    let userId = req.param('user');
    console.log(userId);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://dbUser:8ojUpKyoLhDsabHr@scheduley-l3rwo.gcp.mongodb.net/test?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("GroupSchedules").findOne({'schedArray.schedules.userID':userId}, function(err, result) {
            if (err) throw err;
            console.log(result);
        });
    });
     /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
    // const uri = "mongodb+srv://dbUser:8ojUpKyoLhDsabHr@scheduley-l3rwo.gcp.mongodb.net/test?retryWrites=true&w=majority";


    // const client = new MongoClient(uri);

    // try {
    //     // Connect to the MongoDB cluster
    //     client.connect();

    //     // Make the appropriate DB calls
    //     getSchedules(client, userId);

    // } catch (e) {
    //     console.error(e);
    // } finally {
    //     client.close();
    // }
});


// async function main(){
//   /**
//    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//    */
//   const uri = "mongodb+srv://dbUser:8ojUpKyoLhDsabHr@scheduley-l3rwo.gcp.mongodb.net/test?retryWrites=true&w=majority";


//   const client = new MongoClient(uri);

//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();

//       // Make the appropriate DB calls
//       await  getSchedules(client);

//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }

async function listDatabases(client){
    const db = client.db("test");
    
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    console.log(databasesList);
    // databasesList.databases.forEach(db => console.log(- ${db.name}));
};

async function getSchedules(client, userId) {
    const db = client.db("test");
    db.collection("GroupSchedules").findOne({'schedArray.schedules.userID':userId}, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
};

