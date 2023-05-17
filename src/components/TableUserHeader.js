import useAxiosGet from "../services/ServiceAxiosGet";

export default function TableUserData({ userSub }) {
    const [data] = useAxiosGet(
        `${process.env.REACT_APP_SERVICE_API}/${userSub}/roles`
    );
    return (
        data.name === "User" ? (<th>Assignee</th>) : data.name === "Support" ? (<th>Reported by</th>) : (<th></th>)
    )
}