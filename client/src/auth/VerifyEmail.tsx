import { Input } from '@/components/ui/input'
import { useRef, useState } from 'react'

export default function VerifyEmail() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>([])
  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === '') {
      const newOtp = [...otp] // tạo bản sao
      newOtp[index] = value // lưu giá trị mới
      setOtp(newOtp) // set giá trị lại cho otp
    }
    if (value !== '' && index < 5) {
      inputRef.current[index + 1].focus()
    }
  }
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus()
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <div className='p-8 rounded-md w-full max-w-md flex flex-col border border-gray-200'>
        <div className='text-center'>
          <h1 className='font-extrabold text-2xl'>Verify email</h1>
          <p className='text-sm text-gray-600'>Enter the 6 digit code sent to your email address</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between'>
            {otp.map((letter: string, index: number) => (
              <Input
                type='text'
                key={index}
                ref={(element) => {
                  inputRef.current[index] = element
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                maxLength={1}
                value={letter}
                className='md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
