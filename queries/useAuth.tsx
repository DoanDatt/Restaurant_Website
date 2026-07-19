import authApiRequest from "@/apiRequest/auth"
import { useMutation } from "@tanstack/react-query"

export const useGuestLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.GuestLogin,
  })
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.Login,
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logout,
  })
}
