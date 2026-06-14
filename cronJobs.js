const cron = require("node-cron");

// Schedule a task to run every day at midnight (00:00)
const initCronJobs = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("⏳ Running midnight cron job to reset Daily Habits...");

    try {
      const result = await actionModel.updateMany(
        {
          type: "Daily habit", // 1. Only target actions categorized as daily habits
          "completed.status": true, // 2. Only target ones that are currently completed
        },
        {
          $set: {
            "completed.status": false,
            "completed.completionDate": null,
          },
        },
      );

      console.log(
        `✅ Habit reset successful. Updated ${result.modifiedCount} daily habits.`,
      );
    } catch (error) {
      console.error("❌ Error running midnight habit reset:", error);
    }
  });
};

module.exports = initCronJobs;
