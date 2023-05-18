import useAxiosGet from "../services/ServiceAxiosGet";

export default function TableUserData({ userID }) {
    const [dataUser] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/${userID}/user`);
    return (
        dataUser
            ? (
                <td>{dataUser.username}</td>
            ) : (
                <td>
                    <Spinner animation="border" variant="secondary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </td>
            )
    )
}