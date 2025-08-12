const ForbiddenPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 className="text-4xl font-bold mb-4">403 - Accès refusé</h1>
    <p className="mb-8">Vous n'avez pas la permission d'accéder à cette page.</p>
    <a href="/admin" className="text-blue-600 underline">Retour au tableau de bord</a>
  </div>
);
export default ForbiddenPage;