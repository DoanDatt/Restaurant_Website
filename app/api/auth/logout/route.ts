import { cookies } from "next/headers"
import authApiRequest from "@/apiRequest/auth"

export async function POST(request: Request) {
  const cookieStore = cookies()
  const accessToken = (await cookieStore).get("accessToken")
  const refreshToken = (await cookieStore).get("refreshToken")

  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: "Không nhận được accessToken hoặc refreshToken từ cookie",
      },
      {
        status: 200,
      }
    )
  }
  try {
    const result = await authApiRequest.logoutFromNextServerToServer({
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
    })
    ;((await cookieStore).delete("accessToken"),
      (await cookieStore).delete("refreshToken"))
    // trả về payload chứa thông tin người dùng và token parse về kiểu JavaScript object
    return Response.json(result.payload)
  } catch (error) {
    ;(await cookieStore).delete("accessToken")
    ;(await cookieStore).delete("refreshToken")
    // nếu lỗi không xác định thì trả về thông báo lỗi và status code 500
    return Response.json(
      {
        message: "Lỗi khi gọi API đến server backend, buộc phải xóa cookie",
      },
      {
        status: 200,
      }
    )
  }
}
