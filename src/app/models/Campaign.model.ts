import { Drop } from './Drop.model';
import { ZipCode } from './Zipcode.model';

export interface Campaign {
  campaignID?: any;
  campaignName: any;
  firstDropDate: any;
  campaignStatus: any;
  campaignType: any;
  firstDropVolume: any;
  totalCampaignVolume: any;
  zipCodeNumbers: string[];
  totalDropsNumber: any;
  mailerSize: any;
  totalHouseholds: any;
  totalcontractAmount: any;
  printOrderID: any;
  accountName: any;
  ownerName: any;
  contactName: any;
  drops: Drop[];
  attachments: any;
  createdAt: any;
}
