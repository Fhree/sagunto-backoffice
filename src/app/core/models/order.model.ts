export interface OrderKpis {
  totalPendingDebt: number;       // Total adeudado por saguntinos (> 0)
  totalImmediatePayments: number; // Total cobrado en el acto (customer_id = -2)
  totalGuests: number;            // Total consumido por invitados (customer_id = -1)
  pendingDebtCount: number;       // N.º de saguntinos con deuda
  immediatePaymentsCount: number; // N.º de operaciones liquidadas al momento
  guestsCount: number;            // N.º de comandas de invitados
}

export interface CustomerConsumptionSummary {
  customerId: number;
  name: string;
  surname: string;
  totalConsumed: number;
}