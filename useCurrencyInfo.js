import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!baseCurrency) return; // Don't fetch if currency not set

    setLoading(true);
    setError(null);

    fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_hiA2cOhgyz1UiNjGWhdSSW6Qckj7m2Mf2DSndLxJ&base_currency=${baseCurrency}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((res) => {
        setData(res.data || {});
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch currency info");
        setData({});
        setLoading(false);
      });
  }, [baseCurrency]);

  return { data, loading, error };
}

export default useCurrencyInfo;
