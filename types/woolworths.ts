export type WoolworthSearchResults = {
  Products?: Array<{
    Products: WoolworthProduct[];
    Name: string;
    DisplayName: string;
  }>;
};

export type WoolworthProduct = {
  TileID: number;
  Stockcode: number;
  Barcode: string;
  GtinFormat: number;
  CupPrice: number;
  InstoreCupPrice: number;
  CupMeasure: string;
  CupString: string;
  InstoreCupString: string;
  HasCupPrice: boolean;
  InstoreHasCupPrice: boolean;
  Price: number;
  InstorePrice: number;
  Name: string;
  DisplayName: string;
  UrlFriendlyName: string;
  Description: string;
  SmallImageFile: string;
  MediumImageFile: string;
  LargeImageFile: string;
  IsHalfPrice: boolean;
  IsOnlineOnly: boolean;
  IsOnSpecial: boolean;
  InstoreIsOnSpecial: boolean;
  IsEdrSpecial: boolean;
  SavingsAmount: number;
  InstoreSavingsAmount: number;
  WasPrice: number;
  IsAvailable: boolean;
}