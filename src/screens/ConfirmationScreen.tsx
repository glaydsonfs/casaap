
import React from 'react';
import { Gift } from '../types';

export const ConfirmationScreen: React.FC<{ gift: Gift; onBackToList: () => void }> = ({ gift, onBackToList }) => {
    return (
        <div className="flex h-full min-h-screen w-full flex-col max-w-[430px] mx-auto overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="flex items-center p-4 pb-2 justify-between">
                <div className="w-12" />
                <h2 className="text-primary dark:text-white text-xs font-bold uppercase tracking-[0.2em] flex-1 text-center">Confirmação</h2>
                <div className="text-primary dark:text-white flex size-12 shrink-0 items-center justify-end">
                    <span onClick={onBackToList} className="material-symbols-outlined cursor-pointer">close</span>
                </div>
            </div>
            <div className="flex flex-col flex-grow items-center justify-center px-6 py-12">
                <div className="mb-8 text-primary dark:text-white">
                    <span className="material-symbols-outlined !text-6xl font-extralight opacity-80 text-green-600">check_circle</span>
                </div>
                <div className="w-full text-center mb-4">
                    <h1 className="serif-title text-primary dark:text-white tracking-tight text-[36px] font-medium leading-tight px-4 italic">
                        Muito obrigado pelo carinho!
                    </h1>
                </div>
                <div className="w-full text-center mb-12">
                    <p className="text-neutral-900 dark:text-white/60 text-sm font-bold leading-relaxed px-8">
                        Sua reserva foi concluída com sucesso. Estamos muito felizes em compartilhar este novo capítulo com você.
                    </p>
                </div>
                <div className="w-full max-w-sm mb-12">
                    <div className="bg-white dark:bg-neutral-900 border border-primary/20 dark:border-white/20 rounded-lg p-5 shadow-sm">
                        <div className="flex items-center gap-5">
                            <div className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0" style={{ backgroundImage: `url("${gift.imageUrl}")` }} />
                            <div className="flex flex-col justify-center overflow-hidden">
                                <p className="text-neutral-900/40 dark:text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Item Reservado</p>
                                <p className="text-neutral-900 dark:text-white text-lg font-serif font-medium leading-tight mb-2 truncate">{gift.name}</p>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined !text-sm text-green-600">verified</span>
                                    <span className="text-green-600 text-[11px] font-bold uppercase tracking-wider">Confirmado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-auto">
                    <div className="flex flex-col gap-4 px-4">
                        <button onClick={onBackToList} className="flex w-full items-center justify-center rounded-sm h-14 px-5 bg-primary dark:bg-white text-white dark:text-primary text-sm font-bold uppercase tracking-[0.15em] transition-all active:scale-[0.98]">
                            Voltar para a lista
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
