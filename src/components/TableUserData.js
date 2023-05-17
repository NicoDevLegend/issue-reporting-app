import axiosGet from "../services/ServiceAxiosGet";

export default function TableUserData({ assigneeID }) {
    const [dataUser] = axiosGet(`${process.env.REACT_APP_SERVICE_API}/${assigneeID}/user`);
    return (
        dataUsers && <td>{dataUser.username}</td>
    )
}