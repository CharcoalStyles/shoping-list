/*
  Warnings:

  - You are about to drop the `ListItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ListItem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GroceryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
