import PropTypes from "prop-types";
import ToolbarItem from "./ToolbarItem";

Toolbar.propTypes = {
  onSearch: PropTypes.func,
  toolbarItems: PropTypes.array,
};

function Toolbar({ onSearch, toolbarItems }) {
  return (
    <div className="flex flex-row justify-between items-center mb-4 gap-4">
      {/* Search */}
      <div className="flex-grow">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari...   nis/nama/tempal lahir/ayah/ibu/wali/alamat"
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full p-2 bg-transparent border rounded-lg text-white placeholder:italic focus:outline-none focus:border-blue-500"
          />
          <span className="material-symbols-outlined absolute right-2 top-2 text-white">
            search
          </span>
        </div>
      </div>

      {/* Tools */}
      <div className="flex gap-2">
        {toolbarItems.map((item) => (
          <ToolbarItem
            key={item.name}
            icon={item.icon}
            name={item.name}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Toolbar;
