import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Report } from './schemas/report.schema';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportSchema } from './schemas/report.schema';
import { Posts, PostSchema } from '../posts/schemas/post.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: Posts.name, schema: PostSchema } , 
      { name: User.name, schema: UserSchema}
    ]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
