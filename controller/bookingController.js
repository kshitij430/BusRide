const path = require("path");
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));
const Bus = require(path.join(__dirname, "..", "model", "busModel"));
const User = require(path.join(__dirname, "..", "model", "userModel"));
const Booking = require(path.join(__dirname, "..", "model", "bookingModel"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createSession = catchAsync(async (req, res, next) => {
  // 1) get tour
  if (!req.user) return next(new AppErr("Please Login to continue..", 403));
  const bus = await Bus.findById(req.params.busID);
  const seats = req.query.seats.split(",");
  const { busDepartureDate } = req.query;
  if (!bus) return next(new AppErr("NO BUSES FOUND", 404));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `https://${req.get("host")}?bus=${req.params.busID}&user=${req.user.id}&seats=${seats}&price=${
      bus.busFare * Number(seats.length)
    }&busDepartureDate=${busDepartureDate}`,
    cancel_url: `${req.protocol}://${req.get("host")}/error`,
    customer_email: req.user.email,
    client_reference_id: req.params.busID,
    line_items: [
      {
        name: bus.busName.toUpperCase(),
        description: `from ${bus.busDepartureCity.toUpperCase()} to ${bus.busArrivalCity.toUpperCase()} on ${busDepartureDate}, ${
          bus.busDepartureTime
        }
        `,
        amount: bus.busFare * 100,
        // TODO: images after deployment
        currency: "inr",
        quantity: seats.length,
      },
    ],
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.getBookingDetails = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  const docs = await Booking.find({ user });
  res.status(200).json({
    status: "success",
    data: {
      result: docs.length,
      docs,
    },
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
