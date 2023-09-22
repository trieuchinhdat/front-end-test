import { Fragment, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Banner from '../../assets/login-desktop_1.png'
import iconUsa from '../../assets/usa.jpg'
import iconGoogle from '../../assets/google-icon.png'
import iconApple from '../../assets/apple-icon.png'
import BannerMb from '../../assets/login-mobile.png'
import { useDropzone } from 'react-dropzone'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required('First Name is required')
    .max(190, 'First Name maximum length is 190 characters.'),
  last_name: yup
    .string()
    .required('Last Name is required')
    .max(190, 'First Name maximum length is 190 characters.'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .max(190, 'First Name maximum length is 190 characters.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  repeat_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Repeat Password is required'),
  avatar: yup.mixed().required('Image is required'),
  checkbox: yup.boolean().oneOf([true], 'Checkbox must be checked')
})

interface IFormInput {
  first_name: string
  last_name: string
  email: string
  password: string
  repeat_password: string
  avatar: string
  checkbox: boolean
}

export default function Register() {
  const maxSize = 1 * 1024 * 1024
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ maxSize })
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.size >= maxSize ? (
        <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545'>
          {file.path} Kích thước hình ảnh lớn hơn 10Mb
        </p>
      ) : (
        <div>{file.path}</div>
      )}
    </li>
  ))
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onRegister = async (data: any) => {
    try {
      setLoading((prev) => !prev)
      const response = await axios.post(
        'https://650c4ef147af3fd22f6771a6.mockapi.io/register/user',
        data
      )
      if (response.data && response.status === 201) {
        navigate('/verification', {
          state: { id: response.data.id, email: response.data.email, otp: response.data.otp }
        })
        console.log('Register success', response.data)
      }
      setLoading((prev) => !prev)
    } catch (error) {
      // show error message toast
    }
  }

  const onSubmit = (data: any) => {
    const imageName = acceptedFiles.map((item) => item.name)
    const body = { ...data, avatar: imageName[0] ? imageName[0] : '' }
    onRegister(body)
  }
  return (
    <Fragment>
      <div className='grid h-screen grid-cols-1 md:grid-cols-12'>
        <div className='bg-white md:col-span-6'>
          <div className='flex h-full flex-col items-center justify-between md:pt-[100px] pt-[40px] pb-[20px] px-4'>
            <div className='w-full sm:w-[350px] lg:w-[460px]'>
              <h1 className='fs-22 text-center font-bold text-primary-1A162E lg:fs-30'>Sign Up</h1>
              <p className='fs-14 mt-[10px] text-center text-secondary-9E9DA8 md:fs-16'>
                Your Social Campaigns
              </p>
              <div className='my-10 block md:flex gap-4 space-y-4 md:space-y-0'>
                <button
                  type='submit'
                  className='fs-14 flex h-10 w-[100%] md:w-[50%]  items-center justify-center rounded-10 font-medium border border-secondary-D2D1D6 md:fs-16 md:h-[50px]'>
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
                  className='fs-14 flex h-10 w-[100%] md:w-[50%] items-center justify-center rounded-10 border border-secondary-D2D1D6 font-medium md:fs-16 md:h-[50px]'>
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
                <div className='w-full flex gap-4'>
                  <div className='w-[50%]'>
                    <input
                      {...register('first_name')}
                      className='w-full md:h-12 h-10 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors'
                      placeholder='First name'
                    />
                    <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545'>
                      {errors.first_name?.message}
                    </p>
                  </div>

                  <div className='w-[50%]'>
                    <input
                      {...register('last_name')}
                      className='w-full md:h-12 h-10 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors'
                      placeholder='Last name'
                    />
                    <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545'>
                      {errors.last_name?.message}
                    </p>
                  </div>
                </div>

                <div className='w-[100%]'>
                  <input
                    {...register('email')}
                    className='w-full md:h-12 h-10 mt-4 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors'
                    placeholder='Email'
                  />
                  <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545'>
                    {errors.email?.message}
                  </p>
                </div>

                <div className='w-[100%]'>
                  <input
                    {...register('password')}
                    className='w-full md:h-12 mt-4 h-10 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors'
                    placeholder='Password'
                    type='password'
                  />
                  <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545'>
                    {errors.password?.message}
                  </p>
                </div>

                <div className='w-[100%]'>
                  <input
                    {...register('repeat_password')}
                    className='w-full md:h-12 mt-4 h-10 rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E md:px-4 px-3 outline-none focus:border-primary-1A162E transition-colors'
                    placeholder='Repeat Password'
                    type='password'
                  />
                  <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545'>
                    {errors.repeat_password?.message}
                  </p>
                </div>
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  className={`mt-4 p-2 rounded-10 border border-dashed border-secondary-D2D1D6`}>
                  <input {...getInputProps()} {...register('avatar')} />

                  <p className='p-2'>
                    {files.length == 0 ? (
                      <p className='mt-1 min-h-[1.25rem] fs-1'>
                        Drag drop some files here, or click to select files {errors.avatar?.message}
                      </p>
                    ) : (
                      <ul>{files}</ul>
                    )}
                  </p>
                </div>

                <div className='mt-4 text-left flex items-center'>
                  <input
                    {...register('checkbox')}
                    className='form-checkbox h-5 w-5 rounded-xl shadow-none border border-secondary-D2D1D md:placeholder:fs-16 fs-14 md:fs-16 md:px-4 px-3 outline-non transition-colors'
                    type='checkbox'
                  />
                  <span className=' text-secondary-9E9DA8 pl-2'>I Accept the</span>
                  <a
                    className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-16'
                    href='/'
                    target='_blank'>
                    Terms ?
                  </a>
                  <p className='mt-1 min-h-[1.25rem] fs-12 text-primary-F94545 pl-2'>
                    {errors.checkbox?.message}
                  </p>
                </div>
                <div className='mt-8'>
                  <button
                    type='submit'
                    className='fs-14 flex h-10 w-full items-center justify-center rounded-10 bg-[#0a72eb] font-medium text-white md:fs-16 md:h-[50px]'>
                    {loading ? 'Loading....' : 'Sign Up'}
                  </button>
                </div>
              </form>

              <div className='flex items-center justify-center mt-4'>
                <span className='fs-14 text-secondary-9E9DA8 md:fs-16'>
                  Already have an Account?
                </span>
                <Link
                  className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-18'
                  to='/login'>
                  Sign In
                </Link>
              </div>
            </div>
            <div className='w-full sm:w-[350px] lg:w-[460px] footer flex justify-between flex-wrap pt-4'>
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
            <a href='https://kidsplaza.vn' target='_blank'>
              <img src={Banner} alt='image login' title='Login' />
            </a>
          </div>
        </div>
        <div className='col-span-6 md:hidden block -order-1 md:bg-FAFAFD'>
          <div className='h-full'>
            <a href='https://kidsplaza.vn' target='_blank'>
              <img src={BannerMb} alt='image login' title='Login' />
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
