export interface DailyPerformanceDto {
  date: string;
  consumptions: number;
  revenue: number;
}

export interface BartenderPerformanceDto {
  bartenderId: number;
  name: string;
  totalConsumptions: number;
  totalRevenue: number;
  dailyStats: DailyPerformanceDto[];
}