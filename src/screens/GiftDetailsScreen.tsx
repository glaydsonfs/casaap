
import React, { useState } from 'react';
import { Gift } from '../types';

interface GiftDetailsScreenProps {
    gift: Gift;
    userEmail: string | null;
    onReserve: (id: string, message: string) => void;
    onBack: () => void;
}

export const GiftDetailsScreen: React.FC<GiftDetailsScreenProps> = ({ gift, userEmail, onReserve, onBack }) => {
    const [message, setMessage] = useState(gift.reservationMessage || '');
    const isAlreadyReservedByMe = gift.reservedBy === userEmail;

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto pb-40">
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full text-primary dark:text-white">
                    <button onClick={onBack} className="flex items-center justify-center">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <h2 className="text-xs font-bold uppercase tracking-widest flex-1 text-center">Detalhes do Presente</h2>
                    <div className="w-6"></div>
                </div>
            </header>
            <main className="flex-1 max-w-md mx-auto w-full">
                <div className="px-0 relative">
                    <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4">
                        {(gift.images && gift.images.length > 0 ? gift.images : [gift.imageUrl]).slice(0, 3).map((img, index) => (
                            <div key={index} className="flex-none w-[85%] first:ml-6 last:mr-6 mr-4 snap-center">
                                <div
                                    className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-lg shadow-md"
                                    style={{ backgroundImage: `url("${img}")` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-6 pt-4">
                    <h1 className="text-3xl font-medium tracking-tight leading-tight mb-4 serif-title text-neutral-900 dark:text-neutral-50">{gift.name}</h1>

                    {gift.color && (
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Cor</span>
                            <span className="bg-black text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-[3px]">
                                {gift.color}
                            </span>
                        </div>
                    )}

                    <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800 my-8" />
                </div>
                <div className="px-6">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900 dark:text-neutral-100">
                            {isAlreadyReservedByMe ? "Sua mensagem enviada" : "Sua mensagem de carinho"}
                        </label>
                    </div>
                    <div className={`bg-white dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 p-8 shadow-sm relative overflow-hidden transition-colors rounded-sm ${!isAlreadyReservedByMe ? 'group focus-within:border-primary' : 'bg-neutral-50 opacity-80'}`}>
                        <textarea
                            className={`w-full bg-transparent border-none focus:ring-0 p-0 text-neutral-900 dark:text-neutral-100 font-semibold italic leading-relaxed placeholder-neutral-400 dark:placeholder-neutral-500 resize-none h-32`}
                            placeholder="Escreva algo especial para os anfitriões..."
                            value={message}
                            onChange={(e) => !isAlreadyReservedByMe && setMessage(e.target.value)}
                            disabled={isAlreadyReservedByMe}
                        />
                    </div>

                    {!isAlreadyReservedByMe ? (
                        <div className="mt-8">
                            <button
                                onClick={() => onReserve(gift.id, message)}
                                className="w-full bg-primary text-white py-5 rounded-sm font-bold uppercase tracking-[0.25em] text-xs transition-transform active:scale-[0.98] shadow-2xl hover:bg-neutral-800 mb-6"
                            >
                                Reservar Presente
                            </button>
                        </div>
                    ) : (
                        <div className="mt-8 flex flex-col items-center gap-4 py-6 border-2 border-dashed border-green-200 dark:border-green-900 rounded-sm bg-green-50/30">
                            <span className="material-symbols-outlined text-green-600 text-3xl">verified</span>
                            <p className="text-green-700 dark:text-green-400 font-bold uppercase text-[10px] tracking-widest">Você já reservou este item!</p>
                        </div>
                    )}

                    {!isAlreadyReservedByMe && (
                        <p className="mt-4 text-[12px] text-neutral-800 dark:text-neutral-300 italic text-center font-bold px-4">
                            Sua reserva garante que outros convidados não escolham este mesmo item. Sua mensagem será entregue aos anfitriões.
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};
