import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios'


export const useInterval = (url, params, delay) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const savedCallback = useRef();
  const info = useRef(data);

  // Remember the latest callback.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (params) {
          const { data } = await axios.get(url, { params: params });
          setData(data)
        } else {
          const { data } = await axios.get(url);

          setData(data)
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    savedCallback.current = fetchData;
  }, [url, params]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  info.current = data;
  
  if (info.current === data) return { data: info, error: 'hi' }

  return { data, error, loading }
}