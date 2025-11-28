import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { menuSchema, type MenuFormSchema } from '@/schemas/menuSchema'
import type { MenuItem } from '@/types/restaurantType'
import { Loader2 } from 'lucide-react'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

interface EditMenuProps {
  selectedMenu: MenuItem
  editOpen: boolean
  setEditOpen: Dispatch<SetStateAction<boolean>>
}

export default function EditMenu({ selectedMenu, editOpen, setEditOpen }: EditMenuProps) {
  const loading = false
  const [error, setError] = useState<Partial<MenuFormSchema>>({})

  // Khởi tạo state trực tiếp từ selectedMenu - KHÔNG dùng useEffect
  const [input, setInput] = useState<MenuFormSchema>(() => ({
    name: selectedMenu?.name || '',
    description: selectedMenu?.description || '',
    price: selectedMenu?.price || 0,
    image: undefined
  }))

  // Reset form khi selectedMenu thay đổi - dùng key prop thay vì useEffect
  // Hoặc có thể dùng cách bên dưới với useEffect nhưng phải batch update
  useEffect(() => {
    if (editOpen && selectedMenu) {
      // Sử dụng queueMicrotask để tránh cascading renders
      queueMicrotask(() => {
        setInput({
          name: selectedMenu.name || '',
          description: selectedMenu.description || '',
          price: selectedMenu.price || 0,
          image: undefined
        })
        setError({})
      })
    }
  }, [editOpen, selectedMenu])

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setInput((prev) => ({
      ...prev,
      image: file || undefined
    }))
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate input
    const result = menuSchema.safeParse(input)
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors
      setError(fieldErrors as Partial<MenuFormSchema>)
      return
    }

    // Clear errors nếu validation thành công
    setError({})

    // TODO: Xử lý submit data ở đây
    console.log('Form data:', result.data)

    // Đóng dialog sau khi submit thành công
    setEditOpen(false)
  }

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>Update your menu to keep your offerings fresh and exciting!</DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className='space-y-4'>
          {/* Name Field */}
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              type='text'
              name='name'
              value={input.name}
              onChange={changeEventHandler}
              placeholder='Enter menu name'
            />
            {error.name && <span className='text-xs font-medium text-red-600'>{error.name}</span>}
          </div>

          {/* Description Field */}
          <div>
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              type='text'
              name='description'
              value={input.description}
              onChange={changeEventHandler}
              placeholder='Enter menu description'
            />
            {error.description && <span className='text-xs font-medium text-red-600'>{error.description}</span>}
          </div>

          {/* Price Field */}
          <div>
            <Label htmlFor='price'>Price in (Rupees)</Label>
            <Input
              id='price'
              type='number'
              name='price'
              value={input.price}
              onChange={changeEventHandler}
              placeholder='Enter menu price'
              min='0'
              step='0.01'
            />
            {error.price && <span className='text-xs font-medium text-red-600'>{error.price}</span>}
          </div>

          {/* Image Upload Field */}
          <div>
            <Label htmlFor='image'>Upload Menu Image</Label>
            <Input id='image' type='file' name='image' accept='image/*' onChange={handleFileChange} />
            {error.image && (
              <span className='text-xs font-medium text-red-600'>
                {typeof error.image === 'string' ? error.image : error.image?.name}
              </span>
            )}
          </div>

          {/* Footer Buttons */}
          <DialogFooter className='mt-5'>
            {loading ? (
              <Button disabled type='button' className='bg-orange hover:bg-hoverOrange'>
                <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button type='submit' className='bg-orange hover:bg-hoverOrange'>
                Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
