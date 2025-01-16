import "./NotFoundError.css";

function NotFoundError({ data }: { data: string }) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl text-white">Error Not Found</h1>
      <h1 className="text-4xl text-white">404</h1>
      <p className="text-white">Data {data} yang anda minta tidak ditemukan</p>
    </div>
  );
}

export default NotFoundError;
