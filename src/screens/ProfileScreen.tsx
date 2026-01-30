
import React from 'react';
import { UserState, Gift } from '../types';

interface ProfileScreenProps {
    user: UserState;
    onLogout: () => void;
    userGifts: Gift[];
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, userGifts }) => {
    return (
        <main className="max-w-lg mx-auto pb-40 w-full px-6 flex flex-col min-h-[80vh]">
            <header className="pt-16 pb-12 flex flex-col items-center">
                <div className="size-24 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 shadow-inner border border-neutral-200 dark:border-neutral-700">
                    <span className="material-symbols-outlined text-4xl text-primary dark:text-neutral-200">person</span>
                </div>
                <h1 className="serif-title text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50 mb-1">Seu Perfil</h1>
                <p className="text-neutral-800 dark:text-neutral-300 text-sm font-bold">{user.email}</p>
            </header>

            <div className="space-y-6 flex-1">
                <div className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-600 mb-4">Seus Presentes Escolhidos</p>

                    {userGifts.length === 0 ? (
                        <p className="text-sm text-neutral-500 italic">Nenhum presente reservado ainda.</p>
                    ) : (
                        <div className="space-y-6">
                            {userGifts.map(gift => (
                                <div key={gift.id} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-4">
                                        <div className="size-16 rounded-sm bg-cover bg-center border border-neutral-200" style={{ backgroundImage: `url("${gift.imageUrl}")` }} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate font-serif">{gift.name}</p>
                                            <p className="text-[10px] font-extrabold text-neutral-600">R$ {gift.price.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                    </div>
                                    {gift.reservationMessage && (
                                        <div className="bg-white dark:bg-neutral-800 p-3 border-l-4 border-primary dark:border-white rounded-r shadow-sm">
                                            <p className="text-xs italic text-neutral-700 dark:text-neutral-300 leading-relaxed font-semibold">"{gift.reservationMessage}"</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 py-4 border border-red-300 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-[0.2em] hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors rounded-sm"
                >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sair da Conta
                </button>
            </div>
        </main>
    );
};
