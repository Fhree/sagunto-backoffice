export interface OrderKpis {
  totalPendingDebt: number;       // Total adeudado por saguntinos (> 0)
  totalImmediatePayments: number; // Total cobrado en el acto (customer_id = -2)
  totalGuests: number;            // Total consumido por invitados (customer_id = -1)
  totalAbsolute: number;          // Total absoluto de consumos
  pendingDebtCount: number;       // N.º de saguntinos con deuda
  immediatePaymentsCount: number; // N.º de operaciones liquidadas al momento
  guestsCount: number;            // N.º de comandas de invitados
  totalOrdersCount: number;             // N.º total de operaciones (suma de los tres anteriores)
}

export interface CustomerConsumptionSummary {
  customerId: number;
  name: string;
  surname: string;
  totalConsumed: number;
}

export interface OrderDetailDto {
  orderId: string;
  orderTotal: number;
  isPaid: boolean;
  productName: string;
  quantity: number;
  priceSnapshot: number;
  date: string; // ISO 8601 format
}

export interface GroupedOrder {
  orderId: string;
  orderTotal: number;
  items: OrderDetailDto[];
  date: string; // ISO 8601 format
}