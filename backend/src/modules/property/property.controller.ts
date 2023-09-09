import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';

import { PropertyService } from '@/modules/property/property.service';
import { PropertyDTO } from '@/modules/property/property.dto';
import { successResponseBuilder } from '@/utils/responseBuilder';
import { queryParamsWithPageDetails } from '@/utils/paginationBuilder';
import { AuthGuard } from '@/guards/auth.guard';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('/')
  public async getAll(@Req() req) {
    const { data, meta } = await this.propertyService.getAll(
      queryParamsWithPageDetails(req)
    );
    return successResponseBuilder(data, meta);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  public async getOne(@Param('id') id: string) {
    const data = await this.propertyService.getOne(id);
    return successResponseBuilder(data);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  @HttpCode(201)
  public async create(@Body() body: PropertyDTO) {
    const res = await this.propertyService.create(body);
    return successResponseBuilder(res);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  public async update(@Body() body: PropertyDTO, @Param('id') id: string) {
    const res = await this.propertyService.update(id, body);
    return successResponseBuilder(res);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    const data = await this.propertyService.deleteOne(id);
    return successResponseBuilder(data);
  }
}
