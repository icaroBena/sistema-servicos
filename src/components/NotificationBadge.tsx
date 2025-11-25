import React from "react";
import "../styles/badge.css";

export interface NotificationBadgeProps {
  count: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  if (!count || count <= 0) return null;

  return (
    <span
      className="notif-badge"
      role="status"
      aria-label={`${count} notificações não lidas`}
    >
      {count}
    </span>
  );
};

export default NotificationBadge;
