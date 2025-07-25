import React from 'react'

interface RoleForm {
    title: Title;
  description: Description;

}
type Title = "Créer un nouveau role" | "Modifier un role";
type Description =
  | "Complétez les informations ci-dessous pour créer un nouveau role."
  | "Mettez à jour les détails de l'utilisateur ci-dessous.";


const RoleForm = () => {
  return (
    <div>RoleForm</div>
  )
}

export default RoleForm