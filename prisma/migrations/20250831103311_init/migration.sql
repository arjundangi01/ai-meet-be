-- CreateEnum
CREATE TYPE "public"."USER_MEETING_STATUS" AS ENUM ('CREATED', 'JOINED', 'ENDED');

-- AlterTable
ALTER TABLE "public"."UserMeeting" ADD COLUMN     "status" "public"."USER_MEETING_STATUS" NOT NULL DEFAULT 'CREATED';
