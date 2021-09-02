import { getProducts } from './products/index'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// import fs from 'fs'
// import matter from 'gray-matter'
/* get data from a collection of markdown files */
// const getProducts = () => {
//   const directory = `${process.cwd()}/content`
//   const filenames = fs.readdirSync(directory)

//   const products = filenames.map((filename: any) => {
//     // read the file from fs
//     const fileContent = fs.readFileSync(`${directory}/${filename}`)
//     // pull out frontmatter -> name
//     const { data } = matter(fileContent)

//     return data
//   })
// }

// export const handler = async (event: any, context: any) => {
const StripeHandler = async (req: any, res: any) => {
  const domainURL = req.headers.referer
  const products = getProducts()
  // receive cart items from client
  const { cart } = req.body

  const cartWithProducts = cart.map(({ id, qty }: { id: any; qty: any }) => {
    const product = products.find((p: any) => p.id === id)
    return {
      ...product,
      qty,
    }
  })

  // Stripe model
  // get data from server side and compare to client data. so there are no hacked low prices charged.
  const lineItems = cartWithProducts.map((product: any) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.product,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qty,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    locale: 'ru',
    success_url: `${process.env.URL}/success`,
    cancel_url: `${process.env.URL}/cancelled`,
  })

  res.status(200).json({
    sessionId: session.id,
  })
}

export default StripeHandler
