function FormAcademicYear({ isClicked }: { isClicked: boolean }) {
  return (
    <div
      className={`fixed top-1/4 left-1/4 right-1/4 min-h-96 z-20 ${
        isClicked ? "inline" : "hidden"
      } border p-4 bg-[#636568] shadow-2xl shadow-black text-white`}
    >
      <h3 className="text-2xl font-bold text-center mb-5">Tahun Ajaran Baru</h3>
      <form className="flex flex-col">
        <label htmlFor="start-year">Tahun Ajaran:</label>
        <input
          className="rounded-lg p-2 h-8 border text-black border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          id="academic-year-name"
          name="academic-year-name"
        />
        <label className="mt-4" htmlFor="start-year">
          Tahun Mulai:
        </label>
        <input
          className="rounded-lg p-2 h-8 border text-black border-gray-300 focus:outline-none focus:border-blue-500"
          type="date"
          id="start-year"
          name="start-year"
        />
        <label className="mt-4" htmlFor="end-year">
          Tahun Berakhir:
        </label>
        <input
          className="rounded-lg p-2 h-8 border text-black border-gray-300 focus:outline-none focus:border-blue-500"
          type="date"
          id="end-year"
          name="end-year"
        />
        <button
          type="submit"
          className="absolute bottom-4 left-4 right-4 border rounded-lg p-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormAcademicYear;
