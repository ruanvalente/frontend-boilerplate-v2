'use client';

import { MENU } from '@/app/config/globals/constants/menu/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const currentPath = usePathname();

  return (
    <aside className="relative bg-slate-900 h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a
          href="index.html"
          className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
        >
          Logo
        </a>
      </div>
      <nav className="text-white text-base font-semibold pt-3 divide-y divide-slate-500">
        <div />
        {MENU.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`flex items-center text-white py-4 pl-4 nav-item transition-all  ${
              currentPath === item.path ? '' : 'opacity-50'
            }`}
          >
            <i className={`${item.icon} mr-4 text-white`}></i>
            {item.title}
          </Link>
        ))}
        <div />
      </nav>
    </aside>
  );
}
