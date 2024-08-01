import { Controller, Post, Body, Get, Param, Put, NotFoundException, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create.dto';
import { UpdateReportDto } from './dto/update.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async createReport(@Body() createReportDto: CreateReportDto) {
      return await this.reportService.createReport(createReportDto);
  }

  @Get()
  async getReports() {
    return this.reportService.findReports();
  }

  @Get(':id')
  async getReport(@Param('id') id: string) {
    return this.reportService.findReportById(id);
  }

  @Put(':id')
  async updateReport(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    try {
      return await this.reportService.updateReport(id, updateReportDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('An error occurred while updating the report.');
    }
  }
  @Delete(':id')
  async deleteReport(@Param('id') id: string) {
    return this.reportService.deleteReportById(id);
  }
}
