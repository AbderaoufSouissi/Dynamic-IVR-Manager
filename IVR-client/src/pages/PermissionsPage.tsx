import { useState } from 'react'
import PermissionFilter from '../components/filters/PermissionFilter'
import PermissionsTable from '../components/tables/PermissionsTable';
import content from "../data/content.json"

const PermissionsPage = () => {
    const [filters, setFilters] = useState({
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        createdBy: '',
        updatedBy: ''
    });

    const handleFilterChange = (name: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }
  return (
    
       
            <div>
                <p className='pb-4'>Gestion des permissions ici.</p>
                <PermissionFilter filters={filters}
                    onFilterChange={handleFilterChange} />
                <PermissionsTable permissions={content.permissions} />
          

            </div>
        )
  }
  


export default PermissionsPage