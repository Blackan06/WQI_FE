import { KafkaBatchRequest, KafkaResponse } from "../models/kafka";
import apiLinks from "../utils/api-link";
import httpClient from "../utils/http-client";

const produceBatch = async (data: KafkaBatchRequest): Promise<KafkaResponse> => {
  const response = await httpClient.post({
    url: apiLinks.kafka.produceBatch,
    data: data,
  });
  return response.data;
};

const kafkaService = { 
  produceBatch
};

export default kafkaService; 