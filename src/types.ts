
export interface Gift {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    reservedBy?: string;
    reservationMessage?: string;
}

export type Screen = 'LOGIN' | 'REGISTRY' | 'DETAILS' | 'CONFIRMATION' | 'MY_GIFTS' | 'PROFILE';

export interface UserState {
    email: string | null;
    isAuthenticated: boolean;
}
