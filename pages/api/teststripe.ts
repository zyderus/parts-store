const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const StripeHandler = async (req: any, res: any) => {
  const domainURL = req.headers.referer

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'Pasha photo',
        images: ['https://picsum.photos/300/300?random=4'],
        quantity: 4,
        currency: 'usd',
        amount: 1277, // Keep the amount on the server to prevent customers from manipulating on client
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}canceled.html`,
  })

  res.send({
    sessionId: session.id,
  })
}

export default StripeHandler
