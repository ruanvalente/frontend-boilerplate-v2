export function Sidebar() {
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
      <nav className="text-white text-base font-semibold pt-3">
        <a
          href="index.html"
          className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </a>
        <a
          href="blank.html"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <i className="fas fa-sticky-note mr-3"></i>
          Blank Page
        </a>
        <a
          href="tables.html"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <i className="fas fa-table mr-3"></i>
          Tables
        </a>
        <a
          href="forms.html"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <i className="fas fa-align-left mr-3"></i>
          Forms
        </a>
        <a
          href="tabs.html"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <i className="fas fa-tablet-alt mr-3"></i>
          Tabbed Content
        </a>
        <a
          href="calendar.html"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
        >
          <i className="fas fa-calendar mr-3"></i>
          Calendar
        </a>
      </nav>
    </aside>
  );
}
