const path = require("path");
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));
const Bus = require(path.join(__dirname, "..", "model", "busModel"));
const User = require(path.join(__dirname, "..", "model", "userModel"));
const Booking = require(path.join(__dirname, "..", "model", "bookingModel"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createSession = catchAsync(async (req, res, next) => {
  // 1) get tour
  const bus = await Bus.findById(req.params.busID);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}`,
    cancel_url: `${req.protocol}://${req.get("host")}/bus/cancel`,
    customer_email: req.user.email,
    client_reference_id: req.params.busID,
    line_items: [
      {
        name: `NAME`,
        description: "DESCRIPTION",
        amount: bus.busFare,
        currency: "inr",
      },
    ],
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

// const handleWebhookSession = async (session) => {
//   console.log(session.customer_email, session.client_reference_id, session.amount_total);
//   const tour = session.client_reference_id;
//   const user = (await User.findOne({ email: session.customer_email }))._id;
//   const price = session.amount_total;
//   console.log(`tour => ${tour}, user => ${user}, price => ${price}`);
//   const doc = await Booking.create({
//     tour,
//     user,
//     price,
//   });
// };

// exports.sessionWebhook = catchAsync(async (req, res, next) => {
//   console.log(req.body);
//   const sig = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }
//   if (event.type === "checkout.session.completed") {
//     try {
//       const session = event.data.object;
//       await handleWebhookSession(session);
//       return res.status(200).json({
//         status: "success",
//         data: true,
//       });
//     } catch (err) {
//       return res.status(400).json({
//         status: "fail",
//         message: err.message,
//         stack: err.stack,
//       });
//     }
//   }
//   return res.status(400).json({
//     status: "fail",
//     message: "Something Went Wrong",
//   });
// });
