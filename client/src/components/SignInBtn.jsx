import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, removeUserData } from '../utils/authSlice'
import { useNavigate } from 'react-router-dom'
import { toggleLogin } from '../utils/toggleSlice'

const SignInBtn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.authSlice.userData);

  async function handleAuth() {
    let data = await signInWithPopup(auth, provider);
    const userData = {
      name: data.user.displayName,
      photo: data.user.photoURL
    }
    dispatch(addUserData(userData))
    dispatch(toggleLogin())
    navigate("/")
  }

  async function handleLogOut() {
    await signOut(auth)
    dispatch(removeUserData())
    dispatch(toggleLogin())
  }

  return (
    <div className='w-full'>
      {
        userData ? <button onClick={handleLogOut} className='w-full mt-16 text-sm uppercase bg-orange-600 py-4 text-white font-semibold cursor-pointer'>
          Logout
        </button> : <button onClick={handleAuth} className='w-full mt-16 text-sm uppercase bg-orange-600 py-4 text-white font-semibold cursor-pointer'>
          Login With Google
        </button>
      }
    </div>
  )
}

export default SignInBtn;
