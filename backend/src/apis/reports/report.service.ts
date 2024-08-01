import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from '../reports/schemas/report.schema';
import { Posts } from '../posts/schemas/post.schema';
import { CreateReportDto } from './dto/create.dto';
import { UpdateReportDto } from './dto/update.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<Report>,
    @InjectModel(Posts.name) private readonly postsModel: Model<Posts>,
    @InjectModel(User.name) private readonly userModel: Model<User>,


  ) {}
  async createReport(createReportDto: CreateReportDto): Promise<Report> {
    const { user, post, reason, details } = createReportDto;
    
    const postExists = await this.postsModel.findById(post).exec();
    if (!postExists) {
      throw new NotFoundException(`Post with ID ${post} not found.`);
    }
 
    const report = new this.reportModel({
      user,
      post,
      reason,
      details,
    });
    return report.save();
  }


  async findReports(): Promise<Report[]> {
    return this.reportModel.find().exec();
  }

  async findReportById(id: string): Promise<Report> {
    return this.reportModel.findById(id).exec();
  }

  async updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const updatedReport = await this.reportModel.findByIdAndUpdate(id, updateReportDto, { new: true }).exec();
    if (!updatedReport) {
      throw new NotFoundException(`Report with ID ${id} not found.`);
    }
    return updatedReport;
  }

  async deleteReportById(id: string): Promise<Report> {
    return this.reportModel.findByIdAndDelete(id).exec();
  }
}
