interface TableHeaderProps {
  children: React.ReactNode;
  filter?: boolean;
  order?: string;
  onClick?: () => void;
}

function TableHeader({ children, filter, onClick, order }: TableHeaderProps) {
  return (
    <th
      onClick={onClick}
      className="text-white p-2 font-bold border-b text-left whitespace-nowrap"
    >
      {filter && (
        <span className="material-symbols-outlined text-sm mr-2">
          {order === "asc" ? "south" : "north"}
        </span>
      )}
      {children}
    </th>
  );
}

export default TableHeader;
