import axios from "axios";

export default function axiosPatch(url, data) {
  return axios
    .patch(url, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      return "Something is wrong!!";
    });
}