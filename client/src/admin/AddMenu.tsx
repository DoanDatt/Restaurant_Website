import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { menuSchema, type MenuFormSchema } from '@/schemas/menuSchema'
import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import EditMenu from './EditMenu'

const menus = [
  {
    name: 'Biryani',
    description: 'Delicious spicy rice with meat',
    price: 150,
    imageUrl:
      'https://imgs.search.brave.com/dm7r_HQftAEriYHlI3eCuLNcxt3wsiDlIaGSi8N0IdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/NTEyODYzMi9waG90/by9tb3N0LWNvbW1v/bi1hbGxlcmd5LWZv/b2Qtc2hvdC1mcm9t/LWFib3ZlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12YmJr/TlZScEh2LVg0c0lL/SnphSzF5WVJDbXpF/LUNnbnVXRTk4d2xO/X3ZVPQ'
  },
  {
    name: 'Biryani',
    description: 'Delicious spicy rice with meat',
    price: 150,
    imageUrl:
      'https://imgs.search.brave.com/dm7r_HQftAEriYHlI3eCuLNcxt3wsiDlIaGSi8N0IdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/NTEyODYzMi9waG90/by9tb3N0LWNvbW1v/bi1hbGxlcmd5LWZv/b2Qtc2hvdC1mcm9t/LWFib3ZlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12YmJr/TlZScEh2LVg0c0lL/SnphSzF5WVJDbXpF/LUNnbnVXRTk4d2xO/X3ZVPQ'
  },
  {
    name: 'Biryani',
    description: 'Delicious spicy rice with meat',
    price: 150,
    imageUrl:
      'https://imgs.search.brave.com/dm7r_HQftAEriYHlI3eCuLNcxt3wsiDlIaGSi8N0IdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/NTEyODYzMi9waG90/by9tb3N0LWNvbW1v/bi1hbGxlcmd5LWZv/b2Qtc2hvdC1mcm9t/LWFib3ZlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12YmJr/TlZScEh2LVg0c0lL/SnphSzF5WVJDbXpF/LUNnbnVXRTk4d2xO/X3ZVPQ'
  }
]

export default function AddMenu() {
  const [open, setOpen] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedMenu, setSelectedMenu] = useState<any>()
  const [input, setInput] = useState<MenuFormSchema>({
    name: '',
    description: '',
    price: 0,
    image: undefined
  })
  const loading = false
  const [error, setError] = useState<Partial<MenuFormSchema>>({})
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setInput({ ...input, [name]: type === 'number' ? Number(value) : value })
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = menuSchema.safeParse(input)
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors
      setError(fieldErrors as Partial<MenuFormSchema>)
      return
    }
    console.log(input)
  }
  return (
    <div className='max-w-6xl mx-auto my-10'>
      <div className='flex justify-between'>
        <h1 className='font-bold md:font-extrabold text-lg md:text-2xl'>Available Menus</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='bg-orange hover:bg-hoverOrange'>
              <Plus className='mr-2' />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>Create a menu that will make your restaurant stand out.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className='space-y-4'>
              <div>
                <Label>Name</Label>
                <Input
                  type='text'
                  name='name'
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder='Enter menu name'
                />
                {error && <span className='text-xs font-medium text-red-600'>{error.name}</span>}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type='text'
                  name='description'
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder='Enter menu description'
                />
                {error && <span className='text-xs font-medium text-red-600'>{error.description}</span>}
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                  type='number'
                  name='price'
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder='Enter menu price'
                />
                {error && <span className='text-xs font-medium text-red-600'>{error.price}</span>}
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  type='file'
                  name='image'
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined
                    })
                  }
                />
                {error && <span className='text-xs font-medium text-red-600'>{error.image?.name}</span>}
              </div>
              <DialogFooter className='mt-5'>
                {loading ? (
                  <Button disabled className='bg-orange hover:bg-hoverOrange'>
                    <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                    Please wait
                  </Button>
                ) : (
                  <Button className='bg-orange hover:bg-hoverOrange'>Submit</Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {menus.map((menu: any, idx: number) => (
        <div key={idx} className='mt-6 space-y-4'>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border'>
            <img src={menu.imageUrl} alt='' className='md:h-24 md:w-24 h-16 w-full object-cover rounded-lg' />
            <div className='flex-1'>
              <h1 className='text-lg font-semibold text-gray-800'>{menu.name}</h1>
              <p className='text-sm tex-gray-600 mt-1'>{menu.description}</p>
              <h2 className='text-md font-semibold mt-2'>
                Price: <span className='text-[#D19254]'>80</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu)
                setEditOpen(true)
              }}
              size={'sm'}
              className='bg-orange hover:bg-hoverOrange mt-2'
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
      {editOpen && <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />}
    </div>
  )
}
