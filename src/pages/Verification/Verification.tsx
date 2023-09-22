import { Fragment, useContext, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Banner from '../../assets/login-desktop_1.png'
import iconUsa from '../../assets/usa.jpg'
import iconGoogle from '../../assets/google-icon.png'
import iconApple from '../../assets/apple-icon.png'
import BannerMb from '../../assets/login-mobile.png'
import Phone from '../../assets/phone.png'
import axios from 'axios'

export default function Verification() {
  let location = useLocation()
  const navigate = useNavigate()
  const [otp, setOtp] = useState()
  const [inputValues, setInputValues] = useState<string[]>(['', '', '', '', ''])
  const inputRefs = useRef<any>([])
  const initialInputValues = ['', '', '', '', '']

  const handleChange = (index: number, value: string) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)

    // Tự động di chuyển tới ô input tiếp theo nếu ô hiện tại đã đủ ký tự
    if (value && value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }
  const combinedValue = inputValues.join('')

  const handleReset = () => {
    setInputValues(initialInputValues) // Reset giá trị của các ô input
    inputRefs.current[0].focus() // Di chuyển con trỏ tới ô input đầu tiên
  }

  const onCheckOTP = async (e: any) => {
    e.preventDefault()
    if (location.state.id && location.state.email) {
      try {
        const response = await axios.get(
          `https://650c4ef147af3fd22f6771a6.mockapi.io/register/user/${location.state?.id}`
        )
        if (response.data && response.status === 200) {
          setOtp(response.data.otp)
          if (response.data.otp == combinedValue) {
            // Thông báo thành công
            navigate('/home')
          } else {
            alert('OTP không chính sát')
            handleReset()
          }
        }
      } catch (error) {
        // Thông báo sai OTP
      }
    }
  }

  const maskEmail = (email: string) => {
    const atIndex = email.indexOf('@')
    if (atIndex !== -1 && atIndex >= 6) {
      const maskedPart = '*'.repeat(6)
      const visiblePart = email.substring(6, atIndex)
      const domainPart = email.substring(atIndex)
      return maskedPart + visiblePart + domainPart
    }
    return email
  }
  return (
    <Fragment>
      <div className='grid h-screen grid-cols-1 md:grid-cols-12'>
        <div className='bg-white md:col-span-6'>
          <div className='flex h-full flex-col items-center justify-between md:pt-[100px] pt-[40px] pb-[20px] px-4'>
            <div className='w-full sm:w-[350px] lg:w-[460px]'>
              <img src={Phone} alt='logo' className='m-auto' />
              <h1 className='fs-22 mt-4 text-center font-bold text-primary-1A162E lg:fs-30'>
                Tow-Factor Verification
              </h1>
              <p className='fs-14 mt-[10px] text-center text-secondary-9E9DA8 md:fs-16'>
                Enter the verification code we sent to
              </p>
              <p className='fs-16 mt-4 text-center font-bold text-primary-1A162E'>
                {maskEmail(location.state?.email)}
              </p>
              <p className='text-center'>OTP test: {location.state.otp}</p>
              <form>
                <div className='pt-10 max-w-[70%] m-auto'>
                  <p className='fs-16 mt-4 pb-2 font-bold text-primary-1A162E'>
                    Type your 5 digit security code
                  </p>

                  <div className='flex gap-4'>
                    {inputValues.map((value, index) => (
                      <input
                        key={index}
                        type='text'
                        maxLength={1}
                        value={value}
                        className='w-10 md:w-12 h-10 md:h-12 text-center rounded-10 border border-secondary-D2D1D6 placeholder:text-secondary-D2D1D6 placeholder:fs-14 md:placeholder:fs-16 fs-14 md:fs-16 text-primary-1A162E outline-none focus:border-primary-1A162E transition-colors'
                        onChange={(e) => handleChange(index, e.target.value)}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                      />
                    ))}
                  </div>
                </div>
                <div className='mt-8'>
                  <button
                    onClick={onCheckOTP}
                    className='fs-14 flex h-10 px-8 m-auto items-center justify-center rounded-10 bg-[#0a72eb] font-medium text-white md:fs-16 md:h-[50px]'>
                    Submit
                  </button>
                </div>
              </form>
              <div className='flex items-center justify-center mt-8'>
                <span className='fs-14 text-secondary-9E9DA8 md:fs-16'>Didn't get the code ? </span>
                <Link
                  className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-18'
                  to='/'>
                  Resend
                </Link>
                <span className='fs-14 pl-2 text-secondary-9E9DA8 md:fs-16'>Or </span>
                <Link
                  className='fs-14 ml-2 font-semibold capitalize text-primary-0071DC md:fs-18'
                  to='/'>
                  Call Us
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
