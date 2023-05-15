import axios from "axios";

export default function axiosPost(url, data) {
  return axios
    .post(url, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return JSON.stringify(res.data);
    })
    .catch((error) => {
      return "Something is wrong!!";
    });
}
