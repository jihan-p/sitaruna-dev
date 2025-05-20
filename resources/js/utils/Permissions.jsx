import { usePage } from "@inertiajs/react";

export default function hasAnyPermission(permissions){


    // destruct auth from usepage props
    const { auth } = usePage().props
    console.log('Inertia page props auth:', auth); // Tambahkan baris ini
    console.log('All permissions from auth:', auth.permissions); // Tambahkan baris ini

    // get all permissions from props auth
    let allPermissions = auth.permissions;
    // define has permission is false
    let hasPermission = false;

    // loop permissions
    permissions.forEach(function(item){
        // do it if permission is match with key
        if(allPermissions[item])
            // assign hasPermission to true
            hasPermission = true;
    });

 return hasPermission;

   
}