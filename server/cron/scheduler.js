// cron/scheduler.js
const cron = require('node-cron');
const distributeProfits = require('./distributeProfits');

// Run once every day at 12:00 AM
cron.schedule('*/5 * * * *', async () => {
  console.log("⏰ Running profit job daily at 12:00 AM");
  await distributeProfits();
});
