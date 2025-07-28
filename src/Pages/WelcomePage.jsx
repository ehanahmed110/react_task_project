import React from 'react'
import { useDispatch } from 'react-redux'
import { LogOut } from '../Features/AuthSlice'
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '../Shared/toast';
import { ShareButton } from '../Shared/ShareButton';

export function WelcomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    return (
        <>
            <h1>Welcome page</h1>
            <ShareButton className='cursor-pointer' onClick={()=>{dispatch(LogOut());
              showSuccess('Logout successfully');
              navigate('/login')
            }}>logout</ShareButton>

        </>
    )
}
