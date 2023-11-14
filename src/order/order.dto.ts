export class OrderDTO {
  readonly clientId: number;
  readonly status: number;
  readonly adminId?: number;
  readonly receiver: string;
  readonly phoneNumber: string;
  readonly address: string;
  readonly total: number;
  readonly note: string;
  readonly createdAt: Date;
}
