import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { originalColors } from "../Utilities/originalColors";

export default function ResetTableButton({
  setFilteredData,
  setValue,
  setFilterColor,
}) {
  return (
    <Button
      variant="primary"
      className="position-relative"
      style={{
        top: "5px",
        right: "30%",
      }}
      onClick={() => {
        setFilteredData(null);
        setValue(null);
        setFilterColor(originalColors);
      }}
    >
      <FontAwesomeIcon icon={faRotateLeft} />
    </Button>
  );
}
