import { useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Plus } from 'lucide-react'
import { Input } from './ui/input'

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [profileData, setProfileData] = useState<string>({
  //   fullname: "",
  //   email: "",
  //   address: "",

  // })
  const imageRef = useRef<HTMLInputElement>(null)
  return (
    <form className='max-w-7xl mx-auto my-5'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Avatar className='relative md:w-28 md:h-28 w-20 h-20'>
            <AvatarImage />
            <AvatarFallback>CN</AvatarFallback>

            <input type='file' className='hidden' accept='image/' ref={imageRef} />
            <div
              onClick={() => imageRef.current?.click()}
              className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer'
            >
              <Plus className='text-white w-8 h-8' />
            </div>
          </Avatar>
          <Input
            type='text'
            name='fullname'
            // value={profileData.fullname}
            // onChange={changeHandler}
            className='font-bold text-2xl outline-none border-none focus-visible:ring-transparent'
          />
        </div>
      </div>
    </form>
  )
}
