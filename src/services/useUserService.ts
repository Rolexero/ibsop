import useToast from "@/hooks/useToast";
import { IUserForm } from "@/views/root/dashboard/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}`);
      return data;
    },
    enabled: true,
  });
};

// Add a new user
export const useAddUser = () => {
  const { toastSuccess } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser: IUserForm) => {
      const { data } = await axios.post(API_URL, newUser);
      return data;
    },
    onSuccess: () => {
      toastSuccess("User created successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

// Edit a user
export const useEditUser = () => {
  const { toastSuccess } = useToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: IUserForm) => {
      const { data } = await axios.put(`${API_URL}/${user.id}`, user);
      return data;
    },
    onSuccess: () => {
      toastSuccess("User updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

// Delete a user
export const useDeleteUser = () => {
  const { toastSuccess } = useToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      toastSuccess("User deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
