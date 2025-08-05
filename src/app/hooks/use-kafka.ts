import { useCallback } from "react";
import { produceBatch } from "../slice/kafka";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import { KafkaBatchRequest, KafkaResponse } from "../models/kafka";

type UseKafka = {
  loading: boolean;
  error: string | null;
  lastResponse: KafkaResponse | null;
  sendBatch: (data: KafkaBatchRequest) => Promise<void>;
};

const useKafka = (): UseKafka => {
  const dispatch = useDispatch();
  const { loading, error, lastResponse } = useSelector((state: any) => state.kafkaSlice);

  const sendBatch = useCallback(async (data: KafkaBatchRequest): Promise<void> => {
    await dispatch(produceBatch(data));
  }, [dispatch]);

  return {
    loading,
    error,
    lastResponse,
    sendBatch,
  };
};

export default useKafka; 