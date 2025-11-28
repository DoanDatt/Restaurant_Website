import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'

export default function AvailableMenu() {
  return (
    <div className='md:p-4'>
      <h1 className='text-xl md:text-2xl font-extrabold mb-6'>Available Menus</h1>
      <div className='grid grid-cols-3 space-y-4 md:space-y-0'>
        <Card className=' mx-auto shadow-lg rounded-lg overflow-hidden'>
          <img
            src='https://imgs.search.brave.com/dm7r_HQftAEriYHlI3eCuLNcxt3wsiDlIaGSi8N0IdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/NTEyODYzMi9waG90/by9tb3N0LWNvbW1v/bi1hbGxlcmd5LWZv/b2Qtc2hvdC1mcm9t/LWFib3ZlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz12YmJr/TlZScEh2LVg0c0lL/SnphSzF5WVJDbXpF/LUNnbnVXRTk4d2xO/X3ZVPQ'
            alt=''
            className='w-full h-40 object-cover'
          />
          <CardContent className='p-4'>
            <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Tandori Biryani</h2>
            <p className='text-sm text-gray-600 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <h3 className='text-lg font-semibold mt-4'>
              Price: <span className='text-[#D19254]'>80</span>
            </h3>{' '}
          </CardContent>
          <CardFooter className='py-4'>
            <Button className='bg-orange hover:bg-hoverOrange cursor-pointer'>Add to cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
