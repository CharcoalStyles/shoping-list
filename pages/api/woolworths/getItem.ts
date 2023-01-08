// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { WoolworthProduct } from '../../../types/woolworths'

type Data = WoolworthProduct | {
  error: string
}


export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>) => {
  // get the search term from the query string
  const { item } = req.query

  //check to see if the item no is present
  if (!item) {
    res.status(400).json({ error: 'Missing item no' })
    return
  }

  // make the request to Woolworths
  const { data } = await axios
    .get<WoolworthProduct>(`https://www.woolworths.com.au/apis/ui/product/detail/${item}`);


  res.status(200).json(data)
}
