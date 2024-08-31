import mongoose, { Document, Query } from 'mongoose';
import { IAuditInfo } from '../core/audit-info/audit-info';

import { DEFAULT_USER_ID } from './audit.middleware';
import { auditSchema } from '../core/audit-info/audit-info-schema';
import { MongoIdType } from '../utils/types/core';


export interface IAuditInfoDocument extends Document {
  auditInfo: IAuditInfo;
}

// Plugin to add soft delete functionality
export function softDeleteAndAuditInfoPlugin(schema: mongoose.Schema) {
  // Add auditInfo field if it doesn't exist
  if (!schema.path('auditInfo')) {
    schema.add({
      auditInfo: auditSchema,
    });
  }

  // Soft delete method
  schema.methods.softDelete = async function (deletedBy: MongoIdType) {
    this.auditInfo.deletedAt = new Date();
    this.auditInfo.deletedBy = deletedBy;
    await this.save();
  };

  // Restore method
  schema.methods.restore = async function () {
    this.auditInfo.deletedAt = null;
    this.auditInfo.deletedBy = null;
    await this.save();
  };

  schema.pre<IAuditInfoDocument>('save', function (next) {
    const now = Date.now();
    const userId = (this.$locals?.req as any)?.userId || DEFAULT_USER_ID;

    // Ensure auditInfo exists
    if (!this.auditInfo) {
      this.auditInfo = {} as IAuditInfo;
    }

    if (this.isNew) {
      // On creation
      this.auditInfo.createdBy = userId;
      this.auditInfo.createdAt = now;
      this.auditInfo.deletedAt = null;
      this.auditInfo.deletedBy = null;
    }
    this.auditInfo.updatedAt = now;
    this.auditInfo.updatedBy = userId;
    next();
  });

  const excludeDeletedDocuments = function (this: Query<any, any, any, any>) {
    this.where('auditInfo.deletedAt').equals(null);
  };

  schema.pre('find', excludeDeletedDocuments);
  schema.pre('findOne', excludeDeletedDocuments);
  schema.pre('countDocuments', excludeDeletedDocuments);
  schema.pre('findOneAndUpdate', excludeDeletedDocuments);
  (schema as any).pre('findByIdAndUpdate', excludeDeletedDocuments);

  // Middleware for findByIdAndUpdate
  schema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as any;
    if (update && !update.$set) {
      update.$set = {};
    }
    const options = this.getOptions();
    update.$set['auditInfo.updatedAt'] = new Date();
    update.$set['auditInfo.updatedBy'] = options?.userId;
    next();
  });

  // Add static methods to the model
  schema.statics.withDeleted = function () {
    return this.find().withDeleted();
  };

  schema.statics.onlyDeleted = function () {
    return this.find().onlyDeleted();
  };
}
