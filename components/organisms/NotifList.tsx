"use client";

import { NotifItem } from "@/components/molecules";
import type { Notifikasi } from "@/src/types";

interface NotifListProps {
  notifikasi: Notifikasi[];
}

export default function NotifList({ notifikasi }: NotifListProps) {
  const handleNotifClick = (id: string) => {
    // TODO: Mark as read / navigate to detail
    console.log("Notif clicked:", id);
  };

  return (
    <div className="divide-y divide-outline-variant/30">
      {notifikasi.map((notif) => (
        <NotifItem
          key={notif.id}
          notifikasi={notif}
          onClick={handleNotifClick}
        />
      ))}
    </div>
  );
}
