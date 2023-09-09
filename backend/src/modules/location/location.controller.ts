import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';

import { LocationService } from '@/modules/location/location.service';
import { CreateLocationDTO } from '@/modules/location/location.dto';
import { successResponseBuilder } from '@/utils/responseBuilder';
import { queryParamsWithPageDetails } from '@/utils/paginationBuilder';
import { AuthGuard } from '@/guards/auth.guard';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/')
  public async getAll(@Req() req) {
    const { data, meta } = await this.locationService.getAll(
      queryParamsWithPageDetails(req)
    );
    return successResponseBuilder(data, meta);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  public async getOne(@Param('id') id: string) {
    const data = await this.locationService.getOne(id);
    return successResponseBuilder(data);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  @HttpCode(201)
  public async create(@Body() body: CreateLocationDTO) {
    const res = await this.locationService.create(body);
    return successResponseBuilder(res);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    const data = await this.locationService.deleteOne(id);
    return successResponseBuilder(data);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  public async update(@Body() body: CreateLocationDTO) {
    const res = await this.locationService.create(body);
    return successResponseBuilder(res);
  }
}
