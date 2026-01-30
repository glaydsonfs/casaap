
import React from 'react';
import { Gift } from '../types';

interface MyGiftsScreenProps {
    gifts: Gift[];
    userEmail: string | null;
    onSelect: (g: Gift) => void;
    onCancel: (id: string) => void;
}

export const MyGiftsScreen: React.FC<MyGiftsScreenProps> = ({ gifts, userEmail, onSelect, onCancel }) => {
    const userGifts = gifts.filter(g => g.reservedBy === userEmail);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="max-w-lg mx-auto pb-40 w-full px-6">
                <header className="pt-10 pb-6">
                    <h1 className="serif-title text-4xl font-medium tracking-tight text-primary dark:text-neutral-50 mb-2">Sua Contribuição</h1>
                    <p className="text-neutral-900 dark:text-neutral-300 text-sm font-bold tracking-wide">
                        Você reservou {userGifts.length} {userGifts.length === 1 ? 'item' : 'itens'} para este evento.
                    </p>
                </header>
                <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-6" />
                <div className="flex flex-col gap-1">
                    {userGifts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <span className="material-symbols-outlined text-4xl text-neutral-300">shopping_basket</span>
                            <p className="text-center text-neutral-700 dark:text-neutral-400 italic font-bold">Você ainda não reservou nenhum presente.</p>
                        </div>
                    ) : (
                        userGifts.map((gift) => (
                            <div key={gift.id} className="flex flex-col gap-4 py-6 border-b border-neutral-100 dark:border-neutral-800">
                                <div
                                    className="flex items-center gap-5 cursor-pointer group"
                                    onClick={() => onSelect(gift)}
                                >
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-24 shadow-sm border border-neutral-200 dark:border-neutral-700 flex-shrink-0 transition-transform group-hover:scale-105" style={{ backgroundImage: `url("${gift.imageUrl}")` }} />
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <p className="text-neutral-900 dark:text-neutral-50 text-lg font-bold leading-tight truncate font-serif group-hover:text-primary/70">{gift.name}</p>
                                        <p className="text-neutral-900 dark:text-neutral-200 text-[12px] font-extrabold mt-1 uppercase tracking-tighter">
                                            R$ {gift.price.toFixed(2).replace('.', ',')}
                                        </p>
                                        <div className="flex items-center gap-4 mt-3">
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary dark:text-white underline underline-offset-4 decoration-neutral-300">
                                                Ver detalhes
                                                <span className="material-symbols-outlined !text-sm">visibility</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onCancel(gift.id); }}
                                        className="flex items-center justify-center rounded-sm h-9 px-5 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 text-[10px] font-bold tracking-wider uppercase transition-transform active:scale-95"
                                    >
                                        Remover Reserva
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};
