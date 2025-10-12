
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

export interface GetUserMeetingsInput {
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

export interface JoinMeetingInput {
    meetingId: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    firebaseUid: string;
    oauth: string;
    accessToken: string;
    idToken: string;
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
    id: string;
    name?: Nullable<string>;
    googleId?: Nullable<string>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface UserMeeting {
    id: string;
    userId: string;
    meetingId: string;
    fileUrl?: Nullable<string>;
    transcript?: Nullable<string>;
    summary?: Nullable<string>;
    containerId?: Nullable<string>;
    createdAt: DateTime;
    updatedAt: DateTime;
    participants?: Nullable<string>;
    meeting?: Nullable<Meeting>;
}

export interface UserMeetingEdge {
    cursor: string;
    node: UserMeeting;
}

export interface PaginatedUserMeetingResponse {
    edges: UserMeetingEdge[];
    pageInfo: PageInfo;
    totalCount: number;
    pageSize: number;
    totalPage: number;
}

export interface IQuery {
    me(): User | Promise<User>;
    recordings(input: GetRecordingsInput): PaginatedRecordingResponse | Promise<PaginatedRecordingResponse>;
    recording(id: number): Recording | Promise<Recording>;
    userMeetings(input: GetUserMeetingsInput): PaginatedUserMeetingResponse | Promise<PaginatedUserMeetingResponse>;
    userMeeting(id: string): UserMeeting | Promise<UserMeeting>;
}

export interface IMutation {
    createRecording(createRecordingInput: CreateRecordingInput): Recording | Promise<Recording>;
    updateRecording(updateRecordingInput: UpdateRecordingInput): Recording | Promise<Recording>;
    removeRecording(id: number): Recording | Promise<Recording>;
    joinMeeting(input: JoinMeetingInput): Meeting | Promise<Meeting>;
}

export type DateTime = any;
type Nullable<T> = T | null;
