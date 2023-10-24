import { ReactNode, createContext, useState } from "react";

type UserRoleType = {
    role: string;
    setRole: (role: string) => void;
}

const UserRole = createContext<UserRoleType | null>(null);

const RoleContext = ({children}:{children:ReactNode}) => {
    const [role, setRole] = useState<string>("customer")
    return (
        <UserRole.Provider value={{role, setRole}}>
            {children}
        </UserRole.Provider>
    )
}

export default RoleContext
export { UserRole }
