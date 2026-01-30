
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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Ensure we start at the top of the details
    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [gift.id]);

    const giftImages = (gift.images && gift.images.length > 0) ? gift.images : [gift.imageUrl];
    const displayImages = giftImages.slice(0, 3);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const width = e.currentTarget.offsetWidth;
        const newIndex = Math.round(scrollLeft / (width * 0.82)); // Adjusted for peek width
        if (newIndex !== currentImageIndex) {
            setCurrentImageIndex(newIndex);
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto pb-40"
        >
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full text-primary dark:text-white">
                    <button onClick={onBack} className="flex items-center justify-center">
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                    <h2 className="text-xs font-bold uppercase tracking-widest flex-1 text-center">Detalhes do Presente</h2>
                    <div className="w-6"></div>
                </div>
            </header>
            <main className="flex-1 max-w-md mx-auto w-full pt-6">
                <div className="px-0 relative mb-4">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {displayImages.map((img, index) => (
                            <div
                                key={index}
                                className="flex-none w-[82%] first:ml-6 last:mr-6 mr-3 snap-center"
                            >
                                <div
                                    className="w-full aspect-square bg-center bg-no-repeat bg-contain bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-100 dark:border-neutral-800"
                                    style={{ backgroundImage: `url("${img}")` }}
                                />
                            </div>
                        ))}
                    </div>

                    {displayImages.length > 1 && (
                        <div className="flex justify-center gap-1.5 mt-2">
                            {displayImages.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'w-4 bg-primary' : 'w-1.5 bg-neutral-300 dark:bg-neutral-700'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="px-6 pt-4">
                    <h1 className="text-3xl font-medium tracking-tight leading-tight mb-4 serif-title text-neutral-900 dark:text-neutral-50">{gift.name}</h1>

                    <div className="flex flex-col gap-4 mb-6">
                        {gift.color && (
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">Sugestão de Cor</span>
                                <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                                    <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                                        {gift.color}
                                    </span>
                                </div>
                            </div>
                        )}

                        {gift.purchaseUrl && (
                            <a
                                href={gift.purchaseUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] w-fit"
                            >
                                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                                <span>Ver onde comprar</span>
                            </a>
                        )}
                    </div>

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
                        <div className="mt-8 flex flex-col gap-4">
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
