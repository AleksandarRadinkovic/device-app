export interface GroupInterface {
  id: string;
  name: string;
  permissions: [];
  rangeEnd: number;
  rangeStart: number;
  attributes: [];
  devices: [];
  inheritPermissions: boolean;
}
