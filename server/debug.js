import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
const charts = await mongoose.connection.db.collection('charts').find({}).toArray();
console.log('Total charts in DB:', charts.length);
console.log('Charts:', JSON.stringify(charts, null, 2));
mongoose.disconnect();