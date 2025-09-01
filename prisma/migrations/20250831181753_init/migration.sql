-- CreateTable
CREATE TABLE "public"."ContainerPort" (
    "id" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "userMeetingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContainerPort_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ContainerPort" ADD CONSTRAINT "ContainerPort_userMeetingId_fkey" FOREIGN KEY ("userMeetingId") REFERENCES "public"."UserMeeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
