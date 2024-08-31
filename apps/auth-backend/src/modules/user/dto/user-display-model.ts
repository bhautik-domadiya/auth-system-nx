import { IAuditInfo } from '../../../core/audit-info/audit-info';

export class UserDisplayModel {
  _id: string;

  firstName: string;

  lastName: string;

  email: string;

  lastLogin: Date;

  auditInfo: IAuditInfo;
}
