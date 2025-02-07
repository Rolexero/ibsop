import cx from "classnames";
import { capitalizeFirstLetter, Status } from "@/utils";

interface Props {
  status?: Status;
  className?: string;
}
function Badge({ status, className }: Props) {
  const { bg, text } = getColor(status);
  return (
    <span
      style={{
        backgroundColor: bg,
        color: text,
        display: "inline-block",
      }}
      className={cx(
        "bg-opacity-30 font-medium rounded-xl p-1 px-3 text-[13px] text-center",
        className
      )}
    >
      {capitalizeFirstLetter(status ?? "")}
    </span>
  );
}
function getColor(status?: Status): { bg: string; text: string } {
  switch (status) {
    case "Delivered":
    case "success":
      return { text: "#008000", bg: "#E8F7E8" };
    case "request_pickup":
      return { text: "#B54708", bg: "#FFFAEB" };
    case "In Transit":
      return { text: "#6C6C6C", bg: "#EBEBEB" };
    case "cancelled":
      return { text: "#B42318", bg: "#FEF3F2" };
    case "Pending":
      return { text: " #B54708", bg: "#FFFAEB" };

    default:
      return { bg: "#F1BD13", text: " #FFFFFF" };
  }
}

export default Badge;
