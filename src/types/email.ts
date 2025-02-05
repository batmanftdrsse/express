export interface EmailTemplate {
  day: number;
  type: string;
  subject: string;
  template: string;
  variables?: (order: any) => Record<string, any>;
}

export interface EmailSequence {
  id: number;
  customer_id: number;
  order_id: number;
  current_step: number;
  started_at: Date;
  completed_at?: Date;
  status: 'active' | 'completed' | 'paused';
  last_email_sent_at?: Date;
} 