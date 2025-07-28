import { Menubar } from 'primereact/menubar';
import React, { useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import { Navlinks } from "../constant/Navlink";
import { FaGlobe, FaUserCircle } from "react-icons/fa";
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from '../Features/AuthSlice';
import { showSuccess } from './toast';

export function Navbar() {
    const navigate = useNavigate();
    const [language,setLanguage] = useState('English');
    const state = useSelector((state)=>state.auth) 
    let langMenuRef = React.useRef(null);
    let userMenuRef = React.useRef(null);
    const dispatch =  useDispatch();
    const location = useLocation()
     const languageOptions = [
        {
            label: "English",
            command: () => setLanguage("English")
        },
        {
            label: "Arabic",
            command: () => setLanguage("Arabic")
        }
    ];
      const userOptions = [
        {
            label: "Settings",
            icon: "pi pi-cog",
            command: () => console.log("Settings clicked")
        },
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => {dispatch(LogOut());
                showSuccess('logout successfully');
                navigate('/login')
            }
        }
    ];
     const user = {
        name: state?.user?.full_name,
        image: ""  // empty string means no image
    };
    const getInitial = (name) => name?.charAt(0).toUpperCase();
  const convertinks = (links) => {
  return links.map((link) => {
    const isActive = location.pathname === link.url;

    const formattedLink = {
      label: link.label,
      icon: link.icon,
      className: isActive ? "!bg-linear-60 from-[#f14f3e] to-[#fab768] rounded" : "",
      command: link.url ? () => navigate(link.url) : undefined,
    };

    if (link.items) {
      formattedLink.items = convertinks(link.items); 
    }

    return formattedLink;
  });
};

    const links = convertinks(Navlinks)
    return (
        <>
        <div className='bg-black relative w-full '>
           <div className='bg-black px-2 pr-4 flex space-x-4 fixed w-full z-50 justify-between'>
              <div className='flex space-x-4 ml-2 '>
                {/* ------for -links */}
                <div onClick={()=>{navigate('/dashboard')}} className='cursor-pointer flex justify-center items-center'>
                    <img className='w-10 ' src="https://acc2.fe.supergitsa.com/images/supergit-02.png" alt="" />
                </div>
                <div className='card'>
                    <Menubar model={links} 
                    pt={{
                        root:{className:"!bg-black !border !border-black text-white"},
                        label:{className:"!text-white uppercase font-semibold text-[11px]"},
                        icon:{className:"!text-white !text-[11px]"},
                        submenu:{className:"!bg-black"},
                        content:{className:"!-p-[6px] hover:!bg-linear-60 from-[#f14f3e] to-[#fab768]"},
                        action:{className:"!px-2 !py-2 hover:!bg-linear-60 from-[#f14f3e] to-[#fab768] !rounded-lg"},
                        menu:{className:"!p-2 !w-[250px] !bg-black md:!w-full md:!p-0"}
                    }}
                    />
                </div>
              </div>
              <div className='flex items-center text-white gap-2'>
             {/* ------------for last */}
             <div onClick={(e)=>{langMenuRef.current.toggle(e)}}
                className='flex items-center gap-2 cursor-pointer hover:bg-linear-60 from-[#f14f3e] to-[#fab768] p-2 rounded-lg lg:ml-8'
                >
               <FaGlobe size={18} />
               <span className="text-sm font-bold">{language}</span>
             </div>
              <Menu model={languageOptions} popup ref={langMenuRef} />
                <div
                    onClick={(e) => userMenuRef.current.toggle(e)}
                    className="cursor-pointer "
                >
                    {user.image ? (
                        <Avatar image={user.image} size="small" shape="circle" />
                    ) : (
                        <Avatar label={getInitial(user.name)} size="small" shape="circle" className="bg-gray-500" />
                    )}
                    {/* <span className="text-sm font-bold">{user.name}</span> */}
                </div>
                <Menu model={userOptions} popup ref={userMenuRef} />
            </div>
           </div> 
           </div>
        </>
    )
}
