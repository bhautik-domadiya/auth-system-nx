import mongoose, { Schema, Document } from 'mongoose';
import { IAuditInfo } from '../core/audit-info/audit-info';

export interface IAuditInfoDocument extends Document {
  auditInfo: IAuditInfo;
}

export const DEFAULT_USER_ID = new mongoose.Types.ObjectId(
  '6699e0a165280f5b4d807ccb'
); // Replace with userID

export function addAuditInfo(schema: Schema) {
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
      this.auditInfo.updatedBy = userId;
      this.auditInfo.createdAt = now;
      this.auditInfo.updatedAt = now;
      this.auditInfo.deletedAt = null;
      this.auditInfo.deletedBy = null;
    } else {
      // On update
      this.auditInfo.updatedAt = now;
      this.auditInfo.updatedBy = userId;
    }

    next();
  });
}
