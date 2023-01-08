// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { WoolworthSearchResults } from '../../../types/woolworths'

type Data = WoolworthSearchResults | {
  error: string
}


export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>) => {
  // get the search term from the query string
  const { search } = req.query

  //check to see if the search term is present
  if (!search) {
    res.status(400).json({ error: 'Missing search term' })
    return
  }

  // make the request to Woolworths
  const { data } = await axios
    .get<WoolworthSearchResults>(`https://www.woolworths.com.au/apis/ui/Search/products?searchTerm=${search}`);


  res.status(200).json(data)
}
