const express = require("express");
const actionModel = require("./models/actionModel"); // ⚠️ Make sure this path to your model is correct!

const initCronJobs = (app) => {
  app.post("/api/cron/reset-habits", async (req, res) => {
    try {
      const result = await actionModel.updateMany(
        {
          type: "Daily habit",
          "completed.status": true,
        },
        {
          $set: {
            "completed.status": false,
            "completed.completionDate": null,
          },
        },
      );

      console.log(`✅ Habit reset successful via GitHub Action.`);
      return res.status(200).json({
        success: true,
        message: `Updated ${result.modifiedCount} habits.`,
      });
    } catch (error) {
      console.error("❌ Error running habit reset:", error);
      return res.status(500).json({ error: error.message });
    }
  });
};

module.exports = initCronJobs;
