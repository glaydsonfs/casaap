
import React from 'react';
import { Screen } from '../types';

interface BottomNavigationProps {
    currentScreen: Screen;
    onNavigate: (screen: Screen) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onNavigate }) => {
    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-neutral-100 dark:border-neutral-800 pb-8 pt-3 px-8 flex justify-around items-center z-50">
            <div
                onClick={() => onNavigate('REGISTRY')}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${currentScreen === 'REGISTRY' ? 'text-primary dark:text-white scale-110' : 'text-neutral-400 hover:text-primary'}`}
            >
                <span className={`material-symbols-outlined text-2xl ${currentScreen === 'REGISTRY' ? 'fill-current' : 'font-light'}`}>home</span>
                <span className="text-[9px] font-bold uppercase tracking-widest">Início</span>
            </div>
            <div
                onClick={() => onNavigate('MY_GIFTS')}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${currentScreen === 'MY_GIFTS' ? 'text-primary dark:text-white scale-110' : 'text-neutral-400 hover:text-primary'}`}
            >
                <span className={`material-symbols-outlined text-2xl ${currentScreen === 'MY_GIFTS' ? 'fill-current' : 'font-light'}`}>featured_seasonal_and_gifts</span>
                <span className="text-[9px] font-bold uppercase tracking-widest">Escolhas</span>
            </div>
            <div
                onClick={() => onNavigate('PROFILE')}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${currentScreen === 'PROFILE' ? 'text-primary dark:text-white scale-110' : 'text-neutral-400 hover:text-primary'}`}
            >
                <span className={`material-symbols-outlined text-2xl ${currentScreen === 'PROFILE' ? 'fill-current' : 'font-light'}`}>person</span>
                <span className="text-[9px] font-bold uppercase tracking-widest">Perfil</span>
            </div>
        </nav>
    );
};
