
import React from 'react';
import { Gift } from '../types';

interface RegistryScreenProps {
    gifts: Gift[];
    onSelect: (g: Gift) => void;
    selectedCategory: string;
    onCategoryChange: (cat: string) => void;
}

export const RegistryScreen: React.FC<RegistryScreenProps> = ({ gifts, onSelect, selectedCategory, onCategoryChange }) => {
    const categories = ['Todos', 'Cozinha', 'Banheiro', 'Quarto', 'Outros'];

    return (
        <main className="flex-1 pb-32">
            <div className="px-4 py-6 space-y-4">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-800 dark:text-neutral-300 mb-2 font-bold">Categorias</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat)}
                                className={`flex-none h-8 px-4 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedCategory === cat
                                    ? 'bg-primary text-white border-primary shadow-sm scale-105'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-transparent'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-10 px-4">
                {gifts.length > 0 ? (
                    gifts.map((gift) => (
                        <div key={gift.id} className={`flex flex-col gap-3 h-full ${gift.reservedBy ? 'opacity-50' : ''}`}>
                            <div
                                onClick={() => !gift.reservedBy && onSelect(gift)}
                                className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm cursor-pointer"
                            >
                                <div
                                    className="h-full w-full bg-center bg-no-repeat bg-contain bg-white dark:bg-neutral-800 transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url("${gift.imageUrl}")` }}
                                />
                                {gift.reservedBy && (
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-primary bg-white/90 px-2 py-1 rounded-sm">Reservado</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col px-0.5 flex-1">
                                <h3 className={`text-neutral-900 dark:text-neutral-100 text-[16px] font-bold serif-title leading-tight mb-4 ${gift.reservedBy ? 'italic opacity-70' : ''}`}>{gift.name}</h3>
                                {!gift.reservedBy && (
                                    <button
                                        onClick={() => onSelect(gift)}
                                        className="mt-auto flex w-full cursor-pointer items-center justify-center rounded-sm py-3 px-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest transition-transform active:scale-[0.98] shadow-md"
                                    >
                                        Vou dar este!
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 py-20 text-center">
                        <p className="text-neutral-500 italic">Nenhum presente encontrado nesta categoria.</p>
                    </div>
                )}
            </div>
        </main>
    );
};
