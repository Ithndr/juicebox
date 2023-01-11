const {
  client,
  getAllUsers // new
} = require('./index');

const { 
  // other imports,
  createUser
} = require('./index');

// new function, should attempt to create a few users
async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({ username: 'albert', password: 'bertie99' });
    const albertTwo = await createUser({ username: 'albert', password: 'imposter_albert' });

    console.log(albert);

    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function testDB() {
  try {

    const users = await getAllUsers();
    console.log(users);
  } catch (error) {
    console.error(error);
  }
}

async function dropTables() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
    `);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  }
}


const run = async () => {
  try {
    client.connect();
    console.log("rebuild here");
    await rebuildDB();
    console.log("test here");
    await testDB();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}
run();
