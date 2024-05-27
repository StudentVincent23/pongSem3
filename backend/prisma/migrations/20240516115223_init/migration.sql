-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "score" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
