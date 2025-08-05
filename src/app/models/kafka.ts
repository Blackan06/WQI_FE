export interface DataItem {
  station_id: number;
  measurement_time: string;
  ph?: number;
  temperature?: number;
  do?: number;
}

export interface KafkaBatchRequest {
  messages: DataItem[];
}

export interface KafkaResponse {
  success: boolean;
  message?: string;
  sent_count?: number;
} 