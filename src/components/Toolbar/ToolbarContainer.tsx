function ToolbarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-between items-center mb-4 gap-2">
      {children}
    </div>
  );
}

export default ToolbarContainer;
