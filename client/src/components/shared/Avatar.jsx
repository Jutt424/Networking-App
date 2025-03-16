import React, { useState } from 'react';
import { Avatar,Dropdown, Space } from 'antd';
import { CgProfile } from "react-icons/cg";
import { HiLogout } from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
const ProfileIcon = () => {
  const { logout, user } = useContext(AuthContext);

  // Get the first letter of the user's name
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };
  const items = [
    {
      label: (
        <Link to="/profile" className='px-2 flex items-center'>
         <CgProfile className='mr-2 text-md' /> My Profile
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <Link className='px-2 flex items-center' onClick={logout} >
          <HiLogout className='mr-2' />Sign Out
        </Link>
      ),
      key: '1',
    },
  ];
  return (
    <>
    <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
    className=''
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <Avatar
        className='cursor-pointer'
        style={{
          background: "purple",
          verticalAlign: 'middle',
        }}
        size="large"
      >
        {getInitial(user?.name)}
      </Avatar>
      </Space>
    </a>
  </Dropdown>
     
    </>
  );
};
export default ProfileIcon;