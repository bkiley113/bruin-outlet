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
    if (name == '') {
        return collection.find().toArray();
    }
    else 
        return collection.find({ name }).toArray();
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
//this is mostly a test function
 export async function executeUserCrudOperations() {
    const uri = process.env.DB_URI;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('test');
        const collection = db.collection('users')


       console.log(await findUsersByName(collection, ''));


    } finally {
        await mongoClient.close();
    }
 }


 export async function searchByName(itemName) {
    const uri = process.env.DB_URI;
    let mongoClient;
    let item;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('test');
        const collection = db.collection('products');
        item = await findUsersByName(collection, itemName);
        return item;
    }

    finally {
        await mongoClient.close();
    
    }
 }

 export async function loadAllItems(dbName) {
    const uri = process.env.DB_URI;
    let mongoClient;
    let itemList;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('test');
        const collection = db.collection(dbName);
        itemList = await findUsersByName(collection, '');
        return itemList;
    }
    finally {
        await mongoClient.close();
    }

 }

 