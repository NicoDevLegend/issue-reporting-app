import axios from "axios";

export default function axiosPatch(url, data) {
  return axios
    .patch(url, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
