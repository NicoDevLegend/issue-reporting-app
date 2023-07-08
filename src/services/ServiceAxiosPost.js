import axios from "axios";

export default function axiosPost(url, data) {
  return axios
    .post(url, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
