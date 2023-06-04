import { useAuth0 } from "@auth0/auth0-react";
import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBellSlash,
  faEnvelopeOpen
} from "@fortawesome/free-regular-svg-icons";
import { faTrashCanArrowUp, faFilter,
  faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import NotificationBadge from "../components/NotificationBadge";
import { useContext, useState } from "react";
import { NotificationsContext } from "../components/NotificationsProvider";
import axiosDelete from "../services/ServiceAxiosDelete";
import axiosPatch from "../services/ServiceAxiosPatch";

export default function NotificationsPage() {
  const { user } = useAuth0();
  const { notifications, setNotifications, unread } =
    useContext(NotificationsContext);
  const [showUnread, setShowUnread] = useState(false);
  const allNotifUrl = `${process.env.REACT_APP_SERVICE_API}/Notifications/${user.sub}`;

  const handleDeleteNotification = async (notifId, notif) => {
    await axiosDelete(
      `${process.env.REACT_APP_SERVICE_API}/Notification/${notifId}`
    );
    const newNotifications = notifications.filter((n) => n !== notif);
    setNotifications(newNotifications);
  };

  const handleDeleteAllNotifications = async () => {
    await axiosDelete(allNotifUrl);
  };

  const handleReadAllNotifications = async () => {
    await axiosPatch(allNotifUrl);
  };

  const handleFilterUnread = () => {
    setShowUnread(true);
  };
  
  const handleUnfiltered = () => {
    setShowUnread(false);
  };

  return (
    <div className="d-grid">
      <PageHeader name={"Notifications"} />
      {!notifications || notifications.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon
            icon={faBellSlash}
            style={{
              width: "10em",
              height: "10em",
              color: "white",
            }}
          />
          <h1 className="text-light mt-5">
            <strong>No Notifications Yet</strong>
          </h1>
        </div>
      ) : (
        <>
          <div
            className="p-2 w-50 mx-auto text-light"
            style={{ minHeight: "60px" }}
          >
            <Button
              variant="dark"
              className="p-2 mx-4 my-auto"
              size="sm"
              onClick={handleDeleteAllNotifications}
            >
              Delete All{" "}
              <FontAwesomeIcon
                icon={faTrashCanArrowUp}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </Button>
            <Button
              variant="dark"
              className="p-2 mx-4 my-2"
              size="sm"
              onClick={handleReadAllNotifications}
            >
              Read All{" "}
              <FontAwesomeIcon
                icon={faEnvelopeOpen}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </Button>
            {showUnread ? (
              <Button
              variant="dark"
              className="p-2 mx-4 my-auto"
              size="sm"
              onClick={handleUnfiltered}
            >
              Unfiltered{" "}
              <FontAwesomeIcon
                icon={faFilterCircleXmark}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </Button>
            ) : (
              <Button
              variant="dark"
              className="p-2 mx-4 my-auto"
              size="sm"
              onClick={handleFilterUnread}
            >
              Filter Unread{" "}
              <FontAwesomeIcon
                icon={faFilter}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </Button>
            )}
          </div>
          <div
            style={{
              height: "auto",
              maxHeight: "75vh",
              overflowX: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <NotificationBadge
              handleClick={handleDeleteNotification}
              notif={showUnread ? unread : notifications}
            />
          </div>
        </>
      )}
    </div>
  );
}
