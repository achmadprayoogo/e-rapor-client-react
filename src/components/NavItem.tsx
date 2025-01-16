interface NavItemProps {
  endPoint: string;
  icon: string;
  name: string;
  isActive: boolean;
}

function NavItem({ endPoint, icon, name, isActive }: NavItemProps) {
  const handleClick = () => {
    window.location.href = endPoint;
  };
  if (name === "Logout") {
    return (
      <li className="p-2 text-white mt-auto">
        <a
          onClick={handleClick}
          className="flex flex-row justify-center items-center mt-2 mb-2 group-hover:justify-start transition-all duration-300 "
        >
          <span className="material-symbols-outlined text-2xl hover:bg-gray-700">
            logout
          </span>
          <span className="text-base w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:w-auto group-hover:ms-2 transition-all duration-300 delay-200">
            {name}
          </span>
        </a>
      </li>
    );
  }
  return (
    <li className={`p-2 text-white ${isActive && "bg-green-700 "} rounded-md`}>
      <a
        onClick={handleClick}
        className="flex flex-row justify-center items-center mt-2 mb-2 group-hover:justify-start transition-all duration-300"
      >
        <span className="material-symbols-outlined text-2xl hover:text-green-300">
          {icon}
        </span>
        <span className="text-base w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:w-auto group-hover:ms-2 transition-all duration-300 delay-200">
          {name}
        </span>
      </a>
    </li>
  );
}

export default NavItem;
