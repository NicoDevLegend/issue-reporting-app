import axiosPost from "../services/ServiceAxiosPost";

export default async function newNotifMessage(data) {
  await axiosPost(`${process.env.REACT_APP_SERVICE_API}/Notification`, data);
}
