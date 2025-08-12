const PermissionDeniedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="flex w-full max-w-lg flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-gray-900">Accès refusé</h2>
          <p className="mt-4 text-base text-slate-700">
            Vous n&apos;avez pas assez de permissions pour accéder à cette page.
            Veuillez contacter votre administrateur pour demander l&apos;accès.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PermissionDeniedPage;
