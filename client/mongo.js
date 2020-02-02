const {MongoClient} = require('mongodb');
async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://dbUser:8ojUpKyoLhDsabHr@scheduley-l3rwo.gcp.mongodb.net/test?retryWrites=true&w=majority";


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

async function listDatabases(client){
    const db = client.db("test");
    
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    console.log(databasesList);
    // databasesList.databases.forEach(db => console.log(- ${db.name}));
};

main().catch(console.error);


