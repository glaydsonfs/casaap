
import React from 'react';

export const TopBar: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center p-4 justify-between h-16">
                <div className="text-primary dark:text-neutral-100 flex size-10 shrink-0 items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-2xl font-light">card_giftcard</span>
                </div>
                <h2 className="text-primary dark:text-neutral-100 text-[10px] font-bold leading-tight tracking-[0.3em] flex-1 text-center pr-10 font-display uppercase">Lista de Presentes</h2>
            </div>
        </header>
    );
};
