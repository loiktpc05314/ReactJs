
import { Posts } from 'src/apis/posts/schemas/post.schema';
import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  readonly username: string;
  readonly avatar: string;
  readonly email: string;
  readonly password: string;
  readonly posts: Posts[];
  readonly role: UserRole;
  readonly slug: string;
  readonly followers: { userId: string; followedAt: Date }[];
}
