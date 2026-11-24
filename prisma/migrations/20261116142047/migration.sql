-- DropIndex
DROP INDEX "Category_userId_name_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" DROP NOT NULL;
