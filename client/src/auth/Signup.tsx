import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { userSignupSchema, type SignUpInputState } from '@/schemas/userSchema'
import { Separator } from '@radix-ui/react-separator'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const isLoading = false
  const [input, setInput] = useState<SignUpInputState>({
    fullname: '',
    email: '',
    contact: '',
    password: ''
  })
  const [error, setError] = useState<Partial<SignUpInputState>>({})
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = userSignupSchema.safeParse(input)
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors
      setError(fieldError as Partial<SignUpInputState>)
      return
    }
    console.log(input)
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-auto'>
        <div className='mb-4'>
          <h1 className='font-bold text-2xl'>PatelEats</h1>
        </div>
        <div className='mb-4'>
          <div className='relative'>
            <Input
              type='email'
              placeholder='Enter a email'
              className=''
              onChange={handleChangeInput}
              name='email'
              value={input.email}
            />
            {error && <span className='text-sm text-red-500'>{error.email}</span>}
          </div>
        </div>
        <div className='mb-4'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Enter fullname'
              className=''
              onChange={handleChangeInput}
              name='fullname'
              value={input.fullname}
            />
            {error && <span className='text-sm text-red-500'>{error.fullname}</span>}
          </div>
        </div>
        <div className='mb-4'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Enter contact'
              className=''
              onChange={handleChangeInput}
              name='contact'
              value={input.contact}
            />
            {error && <span className='text-sm text-red-500'>{error.contact}</span>}
          </div>
        </div>
        <div className='mb-4'>
          <div className='relative'>
            <Input
              type='password'
              placeholder='Enter a password'
              className=''
              onChange={handleChangeInput}
              name='password'
              value={input.password}
            />
            {error && <span className='text-sm text-red-500'>{error.password}</span>}
          </div>
        </div>
        <div className='mb-10'>
          {isLoading ? (
            <Button className='bg-orange w-full hover:bg-hoverOrange cursor-pointer'>
              Loading... <Loader2 className='animate-spin mr-2 w-4 h-4' />
            </Button>
          ) : (
            <Button className='bg-orange w-full hover:bg-hoverOrange cursor-pointer' onClick={handleSubmit}>
              Login
            </Button>
          )}
        </div>
        <Separator />
        <p>
          Don't have account?{' '}
          <Link to='/login' className='text-blue-300'>
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
