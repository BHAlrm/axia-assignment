export type UserRole = 'MANAGER' | 'TEAMLEADER' | 'FLOORSTAFF';

export interface ProfileModel {
  id: string;
  role: UserRole;
}