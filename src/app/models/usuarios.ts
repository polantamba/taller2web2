export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    phone: string;
    password: string;
    rol: 'ROLE_ADMIN' | 'ROLE_EMPLEADO';
}