const  NotFoundPage = () => {
  

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-8xl md:text-9xl font-black text-gray-900 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <div className="mt-10">
          <button
            onClick={() => window.history.back()}
            className="inline-block px-8 py-3 bg-blue-700 cursor-pointer text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-101 hover:bg-blue-800"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;