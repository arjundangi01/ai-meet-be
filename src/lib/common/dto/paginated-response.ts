// paginated-response.dto.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  afterCursor?: string;

  @Field({ nullable: true })
  beforeCursor?: string;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;
}

export function PaginatedResponse<TItem>(TItemClass: Type<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    edges: {
      cursor: string;
      node: TItem;
    }[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => Int)
    pageSize: number;

    @Field(() => Int)
    totalCount: number;

    @Field(() => Int)
    totalPage: number;
  }

  return PaginatedResponseClass;
}
