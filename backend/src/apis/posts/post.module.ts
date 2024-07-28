import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { PostService } from './post.service';
import { MediaSchema, PostSchema, ReplySchema, TopicSchema } from './schemas/post.schema';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Posts', schema: PostSchema },
      { name: 'Media', schema: MediaSchema },
      { name: 'Reply', schema: ReplySchema },
      { name: 'Topic', schema: TopicSchema },

    ]),
  ],
  controllers: [PostController],
  providers: [PostService, FirebaseService],
})
export class PostModule {}
