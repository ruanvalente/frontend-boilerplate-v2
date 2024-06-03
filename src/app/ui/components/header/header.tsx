'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSessionStore } from '@/app/store';
import { MENU } from '@/app/config/globals/constants/menu/menu';

export function Header({ children }: Readonly<{ children: React.ReactNode }>) {
  const { profile, username } = useSessionStore();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <header className="w-full bg-sidebar py-5 px-6 sm:py-2 sm:flex sm:justify-between sm:items-center bg-slate-900">
        <div className="flex items-center justify-between sm:w-1/2">
          <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300 sm:hidden">
            Logo
          </a>
          <button
            onClick={toggleMenu}
            className="text-white text-3xl focus:outline-none sm:hidden"
          >
            {!isOpen ? (
              <i className="pi pi-align-justify"></i>
            ) : (
              <i className="pi pi-plus"></i>
            )}
          </button>
        </div>
        <div className="hidden sm:flex sm:w-1/2 sm:justify-end">
          <button
            onClick={toggleMenu}
            className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/6674232?v=4"
              width={400}
              height={400}
              alt="User profile image"
            />
          </button>
          {isOpen && (
            <>
              <button
                onClick={toggleMenu}
                className="h-full w-full fixed inset-0 cursor-default"
              ></button>
              <div className="absolute w-40 bg-slate-900 rounded-lg shadow-lg py-2 mt-16">
                <p className="text-white block px-4 py-2 account-link hover:text-gray-100 truncate">
                  User: <span className="text-balance">{username}</span>
                </p>
                <p className="text-white block px-4 py-2 account-link hover:text-gray-100">
                  Profile: <span className="text-balance">{profile}</span>
                </p>
                <button className="mx-auto text-white flex items-center justify-center px-4 py-2 account-link hover:text-gray-100 mt-3 cursor-pointer">
                  <i className="pi pi-sign-out mr-2"></i>
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
        <nav
          className={`${isOpen ? 'flex' : 'hidden'} flex-col pt-4 sm:hidden`}
        >
          {MENU.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.title}
            </Link>
          ))}
          <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i className="pi pi-sign-out mr-3"></i> Sign out
          </button>
        </nav>
      </header>
      {children}
    </div>
  );
}
