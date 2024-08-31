import mongoose, { Schema, SoftDeleteDocument } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { MongoIdType } from '../../utils/types/core';
import { IAuditInfo } from '../../core/audit-info/audit-info';
import { auditSchema } from '../../core/audit-info/audit-info-schema';
import { softDeleteAndAuditInfoPlugin } from '../../middlewares/softDelete.middleware';
import { env } from '../../env';

export interface IUser extends SoftDeleteDocument {
  _id: MongoIdType;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  lastLogin?: Date;
  refreshToken?: string;
  auditInfo: IAuditInfo;
  // Method definitions
  isPasswordCorrect(password: string): Promise<boolean>;
  hashPassword(): Promise<void>;
}

export const userSchema: Schema<IUser> = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
  },
  refreshToken: {
    type: String,
  },
  auditInfo: auditSchema,
});

softDeleteAndAuditInfoPlugin(userSchema);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  await this.hashPassword();
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.hashPassword = async function () {
  // generating salt before hashing to prevent from same password resulting in same hash issue
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

export const User = mongoose.model<IUser>('user', userSchema);
