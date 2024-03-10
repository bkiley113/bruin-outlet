import { MongoClient } from 'mongodb';
//connect to MongoDB 
export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

//create a user 
export async function createUserDocument(collection, userDocument) {   
    await collection.insertOne(userDocument);
}

//find user by name
export async function findUsersByName(collection, name) {
    return collection.find( {name }).toArray();
}

//find user by email
export async function findUsersByEmail(collection, email) {
    return collection.find( { email }).toArray();
}

//update users by name
export async function updateUsersByName(collection, name, updatedField) {
    await collection.updateMany(
        { name },
        { $set: updatedField}
    )
}

//Delete a user
export async function deleteUsersByName(collection, name) {
    await collection.deleteMany({ name })
}

//update users by 

//create, read, update, delete operations
 export async function executeUserCrudOperations() {
    const uri = process.env.DB_URI;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('test');
        const collection = db.collection('users')

        console.log('CREATE Student');
        const userDocument = {
            name: "Jonny"
        }
       await createUserDocument(collection, userDocument);
       console.log(await findUsersByName(collection, 'Jonny'));

       console.log('UPDATE Student\'s Birthdate');
       await updateUsersByName(collection, 'Jonny', { password: "test323" });
       console.log(await findUsersByName(collection, 'Jonny'));

       console.log('DELETE Student');
       await deleteUsersByName(collection, 'Jonny');
       console.log(await findUsersByName(collection, 'Jonny'));

    } finally {
        await mongoClient.close();
    }
 }

 