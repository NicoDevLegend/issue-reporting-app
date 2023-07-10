import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxiosGet(url, dependencies) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      axios
        .get(url)
        .then((res) => setData(res.data))
        .catch(() => {
          setData("Something is wrong!!");
        });
    }
  }, [url, dependencies]);
  return [data];
}
