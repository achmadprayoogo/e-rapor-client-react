import propTypes from "prop-types";

Search.propTypes = {
  onSearch: propTypes.func,
};

export default function Search({ onSearch }) {
  return (
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
  );
}
