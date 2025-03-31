export interface Base {
  id: string;
}

export interface PagingModel {
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalSize: number;
  pageSkip: number;
}
