import { PrismaClient, GroceryItem } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<GroceryItem[] | { error: string }>) {

  //get the item id from the query string
  const { id } = req.body

  //check to see if the item id is present
  if (!id) {
    res.status(400).json({ error: 'Missing item id' })
    return
  }

  //delete the item from the database
  await prisma.groceryItem.delete({
    where: {
      id: parseInt(id as string)
    }
  });

  res.end();
}
