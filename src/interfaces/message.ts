export interface Message {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  date: Date;
  subject: string;
  message: string;
  archived: boolean;
}
