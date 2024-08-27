export interface Order {
    id: string;
    date: Date;
    total: number;
    status: 'Pendiente' | 'Enviado' | 'Entregado';
}