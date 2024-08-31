import mongoose from 'mongoose';

export interface IAuditInfo {
  createdAt: number;
  createdBy: mongoose.Types.ObjectId;
  updatedAt: number;
  updatedBy: mongoose.Types.ObjectId;
  deletedAt?: number | null;
  deletedBy?: mongoose.Types.ObjectId | null;
}

export interface IBaseSchema {
  auditInfo: IAuditInfo;
}
