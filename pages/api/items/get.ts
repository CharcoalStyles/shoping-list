import { PrismaClient, ListItem } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ListItem[]>) {
  const items: ListItem[] = await prisma.listItem.findMany()
  console.log(items)
  res.status(200).json(items)
}
