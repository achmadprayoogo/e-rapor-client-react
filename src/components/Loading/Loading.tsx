import "./Loading.css";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="loading-container">
        <div className="loading-text">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
}
