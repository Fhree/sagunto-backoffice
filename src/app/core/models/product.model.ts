export interface SegmentData {
  quantity: number;
  revenue: number;
}

export interface DailyProductSale {
  festiveBlock: string;
  saguntinos: SegmentData;
  guests: SegmentData;
}

export interface ProductSales {
  productName: string;
  totalSaguntinos: SegmentData;
  totalGuests: SegmentData;
  absoluteTotal: number;
  dailySales: DailyProductSale[];
}