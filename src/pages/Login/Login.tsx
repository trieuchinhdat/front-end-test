import { Fragment, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Banner from '../../assets/login-desktop_1.png'
import iconUsa from '../../assets/usa.jpg'
import iconGoogle from '../../assets/google-icon.png'
import iconApple from '../../assets/apple-icon.png'
import BannerMb from '../../assets/login-mobile.png'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
})

interface IFormInput {
  email: string
  password: string
}
export default function Login() {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onLogin = async (data: any) => {
    try {
      setLoading((prev) => !prev)
      const response = await axios.get('https://650c4ef147af3fd22f6771a6.mockapi.io/register/user')
      const checkLogin = response.data.some(
        (user: any) => user.email === data.email && user.password === data.password
      )
      if (checkLogin) {
        navigate('/home')
        console.log('Register success', response.data)
      } else {
        alert('Thông tin đăng nhập không chính xác')
      }
      setLoading((prev) => !prev)
    } catch (error) {
      // show error message toast
    }
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onLogin(data)
  }
  return (
    <Fragment>
      <div className='grid h-screen grid-cols-1 md:grid-cols-12'>
        <div className='bg-white md:col-span-6'>
          <div className='flex h-full flex-col items-center justify-between md:pt-[100px] pt-[40px] pb-[20px] px-4'>
            <div className='w-full sm:w-[350px] lg:w-[460px]'>
              <h1 className='fs-22 text-center font-bold text-primary-1A162E lg:fs-30'>Sign In</h1>
              <p className='fs-14 mt-[10px] text-center text-secondary-9E9DA8 md:fs-16'>
                Your Social Campaigns
              </p>
              <div className='my-10 block md:flex gap-4 space-y-4 md:space-y-0'>
                <button
                  type='submit'
                  className='fs-14 flex h-10 w-[100%] md:w-[50%]  items-center justify-center rounded-10 font-medium border border-secondary-D2D1D6 md:fs-16 md:h-[50px]'
                  // isLoading={loginAccountMutation.isLoading}
                  // disabled={loginAccountMutation.isLoading}>
                >
                  <img
                    src={iconGoogle}
                    alt='image language'
                    title='language'
                    className='rounded-[4px] w-[28px] pr-2'
                  />
                  Sign in with Google
                </button>
                <button
                  type='submit'
                  className='fs-14 flex h-10 w-[100%] md:w-[50%] items-center justify-center rounded-10 border border-secondary-D2D1D6 font-medium md:fs-16 md:h-[50px]'
                  // isLoading={loginAccountMutation.isLoading}
                  // disabled={loginAccountMutation.isLoading}>
                >
                  <img
                    src={iconApple}
                    alt='image language'
                    title='language'
                    className='rounded-[4px] w-[28px] pr-2'
                  />
                  Sign in with Apple
                </button>
              </div>
              <div className='my-10 flex items-center gap-4'>
                <span className='h-[1px] flex-1 bg-slate-200'></span>
                <p className='px-4 text-secondary-9E9DA8'>Or with email</p>
                <span className='h-[1px] flex-1 bg-slate-200'></span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register('email')}
                  className='w-full md:h-12 h-10 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors'
                  type='email'
                  name='email'
                  placeholder='Email'
                />
                <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545'>
                  {errors.email?.message}
                </p>
                <input
                  {...register('password')}
                  className='w-full md:h-12 mt-4 h-10 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors'
                  type='password'
                  name='password'
                  placeholder='Password'
                />
                <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545'>
                  {errors.password?.message}
                </p>
                <div className='mt-4 text-right'>
                  <Link
                    className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-16'
                    to='/'>
                    Forgot Password ?
                  </Link>
                </div>
                <div className='mt-4'>
                  <button
                    type='submit'
                    className='fs-14 flex h-10 w-full items-center justify-center rounded-10 bg-[#0a72eb] font-medium text-white md:fs-16 md:h-[50px]'>
                    {loading ? 'Loading....' : 'Sign Up'}
                  </button>
                </div>
              </form>
              <div className='flex items-center justify-center mt-4'>
                <span className='fs-14 text-secondary-9E9DA8 md:fs-16'>Not a Member yet?</span>
                <Link
                  className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-18'
                  to='/register'>
                  Sign Up
                </Link>
              </div>
            </div>
            <div className='w-full sm:w-[350px] lg:w-[460px] footer flex justify-between flex-wrap md:pt-0 pt-4'>
              <div className='language'>
                <div className='flex items-center'>
                  <img
                    src={iconUsa}
                    alt='image language'
                    title='language'
                    className='rounded-[4px] w-[20px] h-[20px] '
                  />
                  <span className='pl-[4px]'>English</span>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='w-4 h-4'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className='links'>
                <ul className='flex gap-2'>
                  <li>
                    <Link
                      className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-16'
                      to='/'>
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-16'
                      to='/'>
                      Plans
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-16'
                      to='/'>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden md:col-span-6 md:block md:bg-FAFAFD'>
          <div className='h-full'>
            <img src={Banner} alt='image login' title='Login' />
          </div>
        </div>
        <div className='col-span-6 md:hidden block -order-1 md:bg-FAFAFD'>
          <div className='h-full'>
            <img src={BannerMb} alt='image login' title='Login' />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
