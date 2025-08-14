type PaginationParams = {
  first?: number | null;
  after?: string | null;
  before?: string | null;
  last?: number | null;
};

export type PaginatedResponse<T> = {
  edges: { cursor: string; node: T }[];
  pageInfo: {
    afterCursor: string | null;
    beforeCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  pageSize: number;
  totalCount: number;
  totalPage: number;
};

export const handlePaginationParams = ({
  after,
  before,
  first,
  last,
}: PaginationParams) => {
  if (after && before) {
    throw new Error('Both "after" and "before" cursors cannot exist together');
  }

  const limit = first ?? last ?? undefined;

  return {
    after: after ?? undefined,
    before: before ?? undefined,
    limit,
  };
};

export const constructPaginatedResponse = <T extends { id: string }>({
  result,
  limit,
  after,
  before,
}: {
  result: { data: T[]; total: number };
  limit?: number;
  after?: string;
  before?: string;
}): PaginatedResponse<T> => {
  const totalCount = result.total;
  const hasMore = result.data.length > (limit ?? result.data.length);
  const pageSize = limit ?? result.data.length;
  const items = result.data.slice(0, pageSize); // Exclude extra item

  let hasPreviousPage = false;
  let hasNextPage = false;

  if (after) {
    hasPreviousPage = true;
    hasNextPage = hasMore;
  } else if (before) {
    hasPreviousPage = hasMore;
    hasNextPage = true;
  } else {
    hasNextPage = hasMore;
  }

  const edges = items.map((item) => ({
    cursor: generateCursor(item.id),
    node: item,
  }));

  const afterCursor =
    items.length > 0 ? generateCursor(items[items.length - 1].id) : null;
  const beforeCursor = items.length > 0 ? generateCursor(items[0].id) : null;

  const totalPage = Math.ceil(totalCount / pageSize);

  return {
    edges,
    pageInfo: {
      afterCursor,
      beforeCursor,
      hasNextPage,
      hasPreviousPage,
    },
    pageSize,
    totalCount,
    totalPage,
  };
};

export const generateCursor = (id: string): string => {
  return Buffer.from(id.toString()).toString('base64');
};
