import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./utils";

export const dataProvider = {
  getList: async ({ resource }: { resource: string }) => {
    const url = `${import.meta.env.VITE_BE_URL}/${resource}`;

    const urlWithQuery = url;

    const { data } = await axiosInstance.get(urlWithQuery);

    return {
      data,
    };
  },
};

export const useList = ({ resource }: { resource: string }) => {
  const query = useQuery({
    queryKey: [resource],
    queryFn: () => dataProvider.getList({ resource }),
  });

  return { ...query };
};
