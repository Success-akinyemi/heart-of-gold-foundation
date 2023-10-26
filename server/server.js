import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import schedule  from 'node-schedule'
import errorHandler from './middleware/error.js'
import router from './routes/auth.js'
import privateRouter from './routes/route.js'
import DonationModel from './models/Donations.js'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(cors())

/**HTTP get request */
app.get('/', async (req, res) => {
    try {

        res.status(201).json('Home GET Request');
    } catch (error) {
        console.error(error);
        res.status(500).json('INTERNAL SERVER ERROR');
    }
});

//Import DB
import './connection/connection.js'


app.use('/api', router)
app.use('/api', privateRouter)


const rule = new schedule.RecurrenceRule();
rule.minute = 0; // This task runs at the start of every hour

// Schedule the task
const task = schedule.scheduleJob(rule, async () => {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  try {
    // Find and delete documents older than 24 hours with `valid` set to `false`
    await DonationModel.deleteMany({ createdAt: { $lt: twentyFourHoursAgo }, valid: false });

    console.log('Deleted old invalid donations.');
  } catch (error) {
    console.error('Error deleting donations:', error);
  }
});

//Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 8080
console.log('PORT', PORT)
const server =  app.listen(PORT, () => console.log (`server runing on port http://localhost:${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`LOGGED ERROR>>: ${err}`);
    server.close(() => process.exit(1));
})