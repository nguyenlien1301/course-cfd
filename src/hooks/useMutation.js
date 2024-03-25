import React, { useState } from "react";

const useMutation = (promise) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const execute = async (payload, callback = {}) => {
    const { onSuccess, onFail } = callback;
    try {
      setLoading(true);
      const res = await promise(payload);
      console.log("res", res);

      if (res?.data) {
        setData(res?.data);
        onSuccess?.(res.data);
      }
    } catch (error) {
      setError(error);
      onFail?.(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    execute,
    data,
    error,
    loading,
    setData,
  };
};

export default useMutation;
