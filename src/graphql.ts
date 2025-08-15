
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface GetRecordingsInput {
    first?: Nullable<number>;
    after?: Nullable<string>;
    before?: Nullable<number>;
    last?: Nullable<number>;
    meetingId?: Nullable<string>;
}

export interface CreateRecordingInput {
    exampleField: number;
}

export interface UpdateRecordingInput {
    exampleField?: Nullable<number>;
    id: number;
}

export interface CreateMeetingInput {
    exampleField: number;
}

export interface UpdateMeetingInput {
    exampleField?: Nullable<number>;
    id: number;
}

export interface JoinMeetingInput {
    meetingId: string;
}

export interface Recording {
    id: string;
    fileUrl?: Nullable<string>;
    transcript?: Nullable<string>;
    summary?: Nullable<string>;
    userMeetingId: string;
    createdAt: string;
    updatedAt: string;
}

export interface PageInfo {
    afterCursor?: Nullable<string>;
    beforeCursor?: Nullable<string>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface RecordingEdge {
    cursor: string;
    node: Recording;
}

export interface PaginatedRecordingResponse {
    edges: RecordingEdge[];
    pageInfo: PageInfo;
    totalCount: number;
    pageSize: number;
    totalPage: number;
}

export interface Meeting {
    exampleField: number;
}

export interface IQuery {
    recordings(input: GetRecordingsInput): PaginatedRecordingResponse | Promise<PaginatedRecordingResponse>;
    recording(id: number): Recording | Promise<Recording>;
    meeting(id: number): Meeting | Promise<Meeting>;
}

export interface IMutation {
    createRecording(createRecordingInput: CreateRecordingInput): Recording | Promise<Recording>;
    updateRecording(updateRecordingInput: UpdateRecordingInput): Recording | Promise<Recording>;
    removeRecording(id: number): Recording | Promise<Recording>;
    createMeeting(createMeetingInput: CreateMeetingInput): Meeting | Promise<Meeting>;
    updateMeeting(updateMeetingInput: UpdateMeetingInput): Meeting | Promise<Meeting>;
    removeMeeting(id: number): Meeting | Promise<Meeting>;
    joinMeeting(joinMeetingInput: JoinMeetingInput): Meeting | Promise<Meeting>;
}

type Nullable<T> = T | null;
