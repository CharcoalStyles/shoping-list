import { PrismaClient, ListItem } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ListItem[] | { error: string }>) {

  //get the item from the request body
  const { item } = req.body

  //check to see if the item is present
  if (!item) {
    res.status(400).json({ error: 'Missing item' })
    return
  }

  //create the item in the database
  const newItem = await prisma.listItem.create({
    data: {
      name: item
    }
  })

  res.end();
}