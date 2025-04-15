// cron/scheduler.js
const cron = require('node-cron');
const distributeProfits = require('./distributeProfits');

// Run every minute (for testing purposes)
cron.schedule('* * * * *', async () => {
  console.log("⏰ Running profit job every minute (for testing)");
  await distributeProfits();
});
