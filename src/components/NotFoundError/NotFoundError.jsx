import "./NotFoundError.css";
import PropTypes from "prop-types";

NotFoundError.propTypes = {
  data: PropTypes.string,
};

export default function NotFoundError({ data }) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl text-white">Error Not Found</h1>
      <h1 className="text-4xl text-white">404</h1>
      <p className="text-white">Data {data} yang anda minta tidak ditemukan</p>
    </div>
  );
}
