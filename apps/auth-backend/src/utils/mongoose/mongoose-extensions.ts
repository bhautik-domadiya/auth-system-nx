import mongoose from 'mongoose';

import { MongoIdType } from '../types/core';
import { IAuditInfo } from '../../core/audit-info/audit-info';

declare module 'mongoose' {
  interface SoftDeleteModel<T extends Document, QueryHelpers = {}>
    extends Model<T, QueryHelpers> {
    withDeleted(): mongoose.Query<T[], T> & QueryHelpers;
    onlyDeleted(): mongoose.Query<T[], T> & QueryHelpers;
  }

  interface SoftDeleteDocument extends Document {
    auditInfo: IAuditInfo;
    softDelete(deletedBy: MongoIdType): Promise<void>;
    restore(): Promise<void>;
  }

  interface Query<ResultType, DocType extends Document, THelpers = {}> {
    withDeleted(): this;
    onlyDeleted(): this;
  }
}

// Extend Mongoose's Query prototype to include `withDeleted` and `onlyDeleted`
mongoose.Query.prototype.withDeleted = function (
  this: mongoose.Query<any, any>,
) {
  return this;
};

mongoose.Query.prototype.onlyDeleted = function (
  this: mongoose.Query<any, any>,
) {
  return this.where('auditInfo.deletedAt').ne(null);
};
