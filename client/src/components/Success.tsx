import { IndianRupee } from 'lucide-react'
import { Separator } from './ui/separator'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export default function Success() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4'>
      <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
            Order Status: <span className='text-[#FF5A5A]'>{'confirm'.toUpperCase()}</span>
          </h1>
        </div>
        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4'>Order Summary</h2>
          {/* Your Ordered Item Display here  */}
          <div className='mb-4'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <img
                  src='https://imgs.search.brave.com/pBuyL8sW5UDk43BZrHvFFDWI0KITP0fimhJC3lfsLJA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9taXgtZm9v/ZC1hc3NvcnRlZC10/YWJsZS0yNjBudy0y/NTAzMTkwOTk3Lmpw/Zw'
                  alt='food'
                  className='w-14 h-14 rounded-md object-cover'
                />
                <h3 className='ml-4 text-gray-800 dark:text-gray-200 font-medium'>Food</h3>
              </div>
              <div className='text-right'>
                <div className='text-gray-800 dark:text-gray-200 flex items-center'>
                  <IndianRupee />
                  <span className='text-lg font-medium'>100</span>
                </div>
              </div>
            </div>
            <Separator className='my-4' />
          </div>
        </div>
        <Link to='/cart'>
          <Button className='bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg'>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}
