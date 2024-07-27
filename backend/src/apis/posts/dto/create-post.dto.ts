import { MediaType } from "../schemas/post.schema";

export class CreateMediaDto {
  url: string;
  type: MediaType;
}
export class CreatePostDto {
  user: string;
  title: string;
  content: string;
  media?: CreateMediaDto[];
}
