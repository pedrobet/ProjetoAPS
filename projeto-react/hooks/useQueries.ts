import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

function useNotifications() {
  return useQuery(
    ["notifications"],
    async () => {
      const res = await api.get("/scheduledRequests/notifications");
      return res.data;
    },
    {
      refetchInterval: 1000 * 60,
    }
  );
}

function useUpdateNotifications() {
  return useQuery(
    ["update_notifications"],
    async () => {
      const res = await api.get("/scheduledRequests/update_notifications");
      return res.data;
    },
    {
      refetchInterval: 1000 * 60 * 5,
    }
  );
}

export { useNotifications, useUpdateNotifications };
