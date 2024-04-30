const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const stripe = require("stripe")(process.env.stripeSecretKey);
const User = require("../models/userModel");

router.get("/checkout-session", auth, async (req, res) => {
  try {
    //   1)  get a product and user data
    let { email } = await User.findById(req.userData.userId, "email");

    //2) create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `https://${req.get("host")}/checkout/success/`,
      cancel_url: `https://${req.get("host")}/checkout/fail/`,
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "chat",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });
    //3) send the responce
    res.status(200).send({ status: "success", session });
  } catch (error) {
    res.status(500).send({ status: "error" });
  }
});

module.exports = router;
