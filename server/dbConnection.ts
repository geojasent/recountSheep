const { Client, Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
// const connectDb = async () => {
//   try {
//     const client = new Client({
//       user: process.env.PGUSER,
//       host: process.env.PGHOST,
//       database: process.env.PGDATABASE,
//       password: process.env.PGPASSWORD,
//       port: process.env.PGPORT,
//     });

//     await client.connect();
//     console.log("Connected to DB");
//     await client.end();
// } catch (error) {
//     console.log(error);
// }
// };

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

export default pool;
