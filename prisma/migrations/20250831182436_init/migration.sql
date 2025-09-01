-- DropForeignKey
ALTER TABLE "public"."ContainerPort" DROP CONSTRAINT "ContainerPort_userMeetingId_fkey";

-- DropIndex
DROP INDEX "public"."ContainerPort_userMeetingId_key";

-- AlterTable
ALTER TABLE "public"."ContainerPort" ALTER COLUMN "userMeetingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ContainerPort" ADD CONSTRAINT "ContainerPort_userMeetingId_fkey" FOREIGN KEY ("userMeetingId") REFERENCES "public"."UserMeeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
