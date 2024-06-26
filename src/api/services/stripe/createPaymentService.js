require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function createPayment(amount, packageId, timePeriod) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Coins",
              description: "Coins for your X  Project Account",
              images: [
                "https://www.freepnglogos.com/uploads/coins-png/pile-coins-png-clip-art-14.png",
              ],
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      // success_url: `http://localhost:5000/payment?session_id={CHECKOUT_SESSION_ID}&package_id=${packageId}&time_period=${timePeriod}`,
      success_url: `https://x-project-cquw.onrender.com/payment?session_id={CHECKOUT_SESSION_ID}&package_id=${packageId}&time_period=${timePeriod}`,
      cancel_url: `https://example.com/cancel`,
    });

    return session;
  } catch (error) {
    console.error("Error creating payment session:", error.message);
    throw new Error("Processing the data Failed");
  }
}

module.exports = { createPayment };
