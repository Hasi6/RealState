import { Injectable } from '@nestjs/common';
import mongoose, { FilterQuery } from 'mongoose';

import { LocationRepository } from '@/modules/location/location.repository';
import { CreateLocationDTO } from '@/modules/location/location.dto';
import { Query, paginationBuilder } from '@/utils/paginationBuilder';
import { LocationDocument } from '@/modules/location/location.schema';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  public async create(body: CreateLocationDTO) {
    return this.locationRepository.create(body);
  }

  public async update(_id: string, body: CreateLocationDTO) {
    return this.locationRepository.findOneAndUpdate({ _id }, body);
  }

  public async getOne(_id: string) {
    if (!mongoose.isValidObjectId(_id)) {
      return null;
    }

    return this.locationRepository.findOne({ _id });
  }

  public async deleteOne(_id: string) {
    if (!mongoose.isValidObjectId(_id)) {
      return null;
    }

    return this.locationRepository.findOneAndDelete({ _id });
  }

  public async getAll(query: Query) {
    const filterQuery: FilterQuery<LocationDocument> = {};

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

    const data = await this.locationRepository.find(filterQuery, {
      skip: query.skip,
      limit: query.pageSize
    });
    const total = await this.locationRepository.count(null);
    return paginationBuilder(data, total, query);
  }
}
