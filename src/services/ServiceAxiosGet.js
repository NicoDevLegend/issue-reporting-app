import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxiosGet(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => {
        setData("Something is wrong!!");
        console.log(err);
      });
  }, [url]);
  return [data];
}
