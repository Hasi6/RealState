import { Injectable } from '@nestjs/common';
import mongoose, { FilterQuery } from 'mongoose';

import { PropertyRepository } from '@/modules/property/property.repository';
import { PropertyDTO } from '@/modules/property/property.dto';
import { Query, paginationBuilder } from '@/utils/paginationBuilder';
import { PropertyDocument } from '@/modules/property/property.schema';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  public async create(body: PropertyDTO) {
    return this.propertyRepository.create(body);
  }

  public async update(_id: string, body: PropertyDTO) {
    return this.propertyRepository.findOneAndUpdate({ _id }, body);
  }

  public async getOne(_id: string) {
    if (!mongoose.isValidObjectId(_id)) {
      return null;
    }

    return this.propertyRepository.findOne({ _id });
  }

  public async deleteOne(_id: string) {
    if (!mongoose.isValidObjectId(_id)) {
      return null;
    }

    return this.propertyRepository.findOneAndDelete({ _id });
  }

  public async getAll(query: Query) {
    const filterQuery: FilterQuery<PropertyDocument> = {};

    if (query.search) {
      const searchKey = new RegExp(String(query.search), 'i');
      const isNumericSearch = !isNaN(parseInt(String(query.search)));
      filterQuery.$or = [
        { title: searchKey },
        { location: searchKey },
        { status: searchKey },
        { type: searchKey }
      ];
      if (isNumericSearch) {
        filterQuery.$or = [
          ...filterQuery.$or,
          { areaSqFt: parseInt(String(query.search)) },
          { price: parseInt(String(query.search)) }
        ];
      }
    } else {
      if (query.title) {
        filterQuery.title = new RegExp(String(query.title), 'i');
      }

      if (query.location) {
        filterQuery.location = query.location;
      }

      if (query.status) {
        filterQuery.status = query.status;
      }

      if (query.type) {
        filterQuery.type = query.type;
      }
    }

    const data = await this.propertyRepository.find(filterQuery, {
      skip: query.skip,
      limit: query.pageSize
    });
    const total = await this.propertyRepository.count(filterQuery);
    return paginationBuilder(data, total, query);
  }
}
