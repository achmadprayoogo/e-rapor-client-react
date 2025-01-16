function ContentContainer({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction?: string;
}) {
  return (
    <div
      className={`p-4 h-full w-[calc(100vw-5rem)] flex ${
        direction === "column" ? "flex-col" : "flex-row"
      } border-e-2`}
    >
      {children}
    </div>
  );
}

export default ContentContainer;
