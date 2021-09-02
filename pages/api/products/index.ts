import data from './data.json'
import type { NextApiRequest, NextApiResponse } from 'next'

export const getProducts = () => {
  return data
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  } else {
    const products = getProducts()
    res.status(200).json(products)
  }
}

export default handler
