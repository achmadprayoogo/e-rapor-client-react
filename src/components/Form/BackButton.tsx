function BackButton({ link }: { link: string }) {
  return (
    <a href={link} className="text-white absolute top-4 left-4">
      <span className="material-symbols-outlined">arrow_back</span>
    </a>
  );
}

export default BackButton;
