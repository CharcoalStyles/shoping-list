import { PrismaClient, GroceryItem } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<GroceryItem | GroceryItem[] | { error: string }>
) {
  //get the item id from the query string
  const { id } = req.query;

  console.log({ id }, req.method)

  switch (req.method) {
    case "GET":
      if (!id) {
        const items = await prisma.groceryItem.findMany();
        res.status(200).json(items);
        return;
      }
      // get the item from the database
      const item = await prisma.groceryItem.findUnique({
        where: {
          id: parseInt(id as string)
        }
      });

      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      res.status(200).json(item);
      break;
    case "POST":
      //get the item from the request body
      const { name } = req.body;
      console.log({ name })

      //check to see if the item name is present
      if (!name) {
        res.status(400).json({ error: "Missing item name" });
        return;
      }

      //create the item in the database
      await prisma.groceryItem.create({
        data: {
          name,
        },
      });

      res.end();
    case "DELETE":
      //check to see if the item id is present
      if (!id) {
        res.status(400).json({ error: "Missing item id" });
        return;
      }

      //delete the item from the database
      await prisma.groceryItem.delete({
        where: {
          id: parseInt(id as string)
        }
      });

      res.status(200).end();
      break;
  }
}
