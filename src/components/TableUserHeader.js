import useAxiosGet from "../services/ServiceAxiosGet";

export default function TableUserHeader({ userSub }) {
    const [data] = useAxiosGet(
        `${process.env.REACT_APP_SERVICE_API}/${userSub}/roles`
    );
    return (
        data && data[0].name === "User" ? (<th>Assignee</th>) : data && data[0].name === "Support" ? (<th>Reported by</th>) : (<th></th>)
    )
}