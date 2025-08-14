import { Prisma } from '@prisma/client';
import { SortDirection } from 'src/lib/enums/common';

type ServicePaginatedOptionsResponse<
  TWhereUniqueInput,
  TOrderByWithRelationInput,
> = {
  shouldPaginate: boolean;
  orderByOptions: TOrderByWithRelationInput[];
  cursorOptions: TWhereUniqueInput | undefined;
  take: number | undefined;
};

export function constructServicePaginationOptions<
  TWhereUniqueInput extends { id?: string },
  TOrderByWithRelationInput extends { createdAt?: Prisma.SortOrder },
>({
  after,
  before,
  limit,
  sortDirection,
}: {
  limit?: number;
  after?: string;
  before?: string;
  sortDirection?: SortDirection | null;
}): ServicePaginatedOptionsResponse<
  TWhereUniqueInput,
  TOrderByWithRelationInput
> {
  const shouldPaginate = !!limit;

  const orderByOptions: TOrderByWithRelationInput[] = [
    {
      createdAt: (sortDirection?.toLowerCase() ?? 'desc') as Prisma.SortOrder,
    } as TOrderByWithRelationInput,
  ];

  let cursorOptions: TWhereUniqueInput | undefined;

  if (after) {
    cursorOptions = { id: after } as TWhereUniqueInput;
  } else if (before) {
    cursorOptions = { id: before } as TWhereUniqueInput;
  }

  const take = limit
    ? (before ? -1 : 1) * (limit + 1) // Negative for backward pagination
    : undefined;

  return {
    shouldPaginate,
    orderByOptions,
    cursorOptions,
    take,
  };
}
