import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { Logger } from '@nestjs/common';

import { AbstractDocument } from '@/modules/database/abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected readonly logger: Logger = new Logger();

  constructor(protected readonly model: Model<TDocument>) {}

  public async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId()
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  public async findOne(
    filterQuery: FilterQuery<TDocument>
  ): Promise<TDocument | null> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
    }
    return document;
  }

  public async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        lean: true,
        new: true
      }
    );
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
    }
    return document;
  }

  public async find(
    filterQuery: FilterQuery<TDocument> | null,
    options?: QueryOptions<TDocument>
  ): Promise<TDocument[]> {
    return this.model.find(filterQuery || {}, {}, { lean: true, ...options });
  }

  public async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>
  ): Promise<TDocument[]> {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  public async count(filterQuery: FilterQuery<TDocument> | null) {
    return this.model.countDocuments(filterQuery);
  }
}
