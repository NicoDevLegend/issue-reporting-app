import axiosGet from "../services/ServiceAxiosGet";

export default function TableUserData({ userID }) {
    const [dataUser] = axiosGet(`${process.env.REACT_APP_SERVICE_API}/${userID}/user`);
    return (
        dataUser ? (<td>{dataUser.username}</td>) : (<td></td>)
    )
}