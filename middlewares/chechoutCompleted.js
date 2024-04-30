const express = require("express");
const path = require("path");
const stripe = require("stripe")(process.env.stripeSecretKey);
const User = require("../models/userModel");

module.exports = (req, res, next) => {
  let event;
  try {
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.stripeWebhookSecret
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
  if (event.type === "checkout.session.completed") {
    User.findOneAndUpdate(
      { email: event.data.object.customer_email },
      { paid: true },
      { new: true, upsert: true },
      (err, data) => {
        if (err) console.log(error);
      }
    );
    res.status(200).send({ received: true });
  }
  next();
};
