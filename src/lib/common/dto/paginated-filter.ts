import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './paginated-response';

@InputType()
export class PaginatedFilter {
  @Field(() => Int, { nullable: true })
  first?: number | null;

  @Field(() => String, { nullable: true })
  after?: string | null;

  @Field(() => Number, { nullable: true })
  before?: string | null;

  @Field(() => Int, { nullable: true })
  last?: number | null;
}

export function createPaginatedResponse<T>(TClass: Type<T>): any {
  const className = TClass.name;

  @ObjectType(`${className}Edge`)
  class Edge {
    @Field(() => String)
    cursor: number;

    @Field(() => TClass)
    node: T;
  }

  @ObjectType(`${className}PaginatedResponse`)
  class PaginatedResponse {
    @Field(() => [Edge])
    edges: Edge[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => Int)
    totalCount: number;

    @Field(() => Int)
    pageSize: number;

    @Field(() => Int)
    totalPage: number;
  }

  return PaginatedResponse;
}
