export interface TagsResponse {
  data: Tag[];
  message: string;
  success: boolean;
  statusCode: number;
}

export interface Tag {
  uuid: string;
  title: string;
  description: string;
}