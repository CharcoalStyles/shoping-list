import { PrismaClient, GroceryItem } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<GroceryItem[]>
) {
  const items = await prisma.groceryItem.findMany();
  res.status(200).json(items);
}
