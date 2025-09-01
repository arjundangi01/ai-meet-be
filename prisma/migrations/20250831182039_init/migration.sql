/*
  Warnings:

  - A unique constraint covering the columns `[userMeetingId]` on the table `ContainerPort` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userMeetingId` on table `ContainerPort` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."ContainerPort" DROP CONSTRAINT "ContainerPort_userMeetingId_fkey";

-- AlterTable
ALTER TABLE "public"."ContainerPort" ALTER COLUMN "userMeetingId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ContainerPort_userMeetingId_key" ON "public"."ContainerPort"("userMeetingId");

-- AddForeignKey
ALTER TABLE "public"."ContainerPort" ADD CONSTRAINT "ContainerPort_userMeetingId_fkey" FOREIGN KEY ("userMeetingId") REFERENCES "public"."UserMeeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
