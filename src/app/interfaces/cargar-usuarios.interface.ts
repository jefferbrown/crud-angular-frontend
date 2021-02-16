import { User } from '../models/user.model';

export interface CargarUsuario {
    total: number;
    usuarios: User[];
}