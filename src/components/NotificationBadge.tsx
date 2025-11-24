import React from "react";
import "../styles/badge.css";

interface Props {
  count: number;
}

const NotificationBadge: React.FC<Props> = ({ count }) => {
  if (count <= 0) return null;

  return <span className="notif-badge">{count}</span>;
};

export default NotificationBadge;