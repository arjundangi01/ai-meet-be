/*
  Warnings:

  - You are about to drop the `Recording` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Recording" DROP CONSTRAINT "Recording_userMeetingId_fkey";

-- AlterTable
ALTER TABLE "public"."UserMeeting" ADD COLUMN     "containerId" TEXT,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "transcript" JSONB;

-- DropTable
DROP TABLE "public"."Recording";
