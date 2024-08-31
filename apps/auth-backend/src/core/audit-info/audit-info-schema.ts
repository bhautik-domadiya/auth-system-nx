import { Schema } from 'mongoose';
import { IAuditInfo } from './audit-info';

export const auditSchema = new Schema<IAuditInfo>(
  {
    createdAt: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    updatedAt: {
      type: Number,
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    deletedAt: {
      type: Number,
      required: false,
      default: null, // Default to null: To be used in creation time
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      default: null, // Default to null: To be used in creation time
    },
  },
  { _id: false }
);
