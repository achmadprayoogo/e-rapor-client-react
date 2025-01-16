interface TableDataProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}

export default function TableData({ children, align }: TableDataProps) {
  return (
    <td
      className={`border-b p-2 whitespace-nowrap text-${align} ${
        children === "Aktif"
          ? "text-green-500 font-bold"
          : children === "Boyong"
          ? "text-red-500 font-bold"
          : children === "Lulus"
          ? "text-blue-500 font-bold"
          : "text-white"
      }`}
    >
      {children}
    </td>
  );
}
