"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginMutation } from "@/queries/useAuth"
import { toast } from "sonner"
import { handleErrorApi } from "@/lib/utils"

export default function LoginForm() {
  const loginMutation = useLoginMutation()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginBodyType) {
    if (loginMutation.isPending) return
    try {
      const result = await loginMutation.mutateAsync(values)
      // khi dùng mutateAsync thì bắt buộc phải dùng try catch để bắt lỗi, nếu không sẽ bị lỗi unhandled promise rejection
      // mutateAsync được dùng khi muốn chờ kết quả trả về từ server, còn mutate thì không chờ kết quả trả về
      toast("Login Success", {
        description: result.payload.message,
      })
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      })
    }
  }

  return (
    <Card className="mx-auto w-full max-w-150">
      <CardHeader>
        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
        <CardDescription>
          Nhập email và mật khẩu của bạn để đăng nhập vào hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="w-full max-w-150 shrink-0 space-y-2"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Đăng nhập bằng Google
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
