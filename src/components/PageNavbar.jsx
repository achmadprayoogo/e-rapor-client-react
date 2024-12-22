import NavItem from "./NavItem";

const pages = [
  { name: "Dashboard", icon: "dashboard", href: "/" },
  { name: "Biodata", icon: "person_book", href: "/biodata" },
  { name: "Kelas", icon: "class", href: "/kelas" },
  { name: "Nilai", icon: "grade", href: "/nilai" },
  { name: "Rapor", icon: "receipt_long", href: "/rapor" },
  { name: "Setting", icon: "settings", href: "/setting" },
  { name: "Logout", icon: "logout", href: "/logout" },
];

function PageNavbar() {
  return (
    <div className="fixed top-28 left-0 z-10 overflow-auto w-20 bg-[#343a40] border-x-0 border-e-2 border-s-2 border-b-2 bottom-0 hover:w-36 group transition-all duration-500 ease-in-out">
      <ul className="flex flex-col p-2 h-full">
        {pages.map((page) => (
          <NavItem
            key={page.name}
            href={page.href}
            icon={page.icon}
            name={page.name}
          />
        ))}
      </ul>
    </div>
  );
}

export default PageNavbar;
