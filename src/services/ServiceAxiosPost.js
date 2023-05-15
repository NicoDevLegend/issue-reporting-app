import axios from "axios";

export default function axiosPost(url, data) {
  return axios
    .post(url, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (res) {
      return JSON.stringify(res.data);
    })
    .catch(function (error) {
      return "Something is wrong!!";
    });
}
