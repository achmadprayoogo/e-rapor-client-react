function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-row border-e-2">
      {children}
    </div>
  );
}

export default ContentContainer;
