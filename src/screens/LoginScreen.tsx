
import React, { useState } from 'react';

export const LoginScreen: React.FC<{ onLogin: (email: string) => void }> = ({ onLogin }) => {
    const [email, setEmail] = useState('');

    const isValidEmail = (e: string) => {
        return e.length > 5 && e.includes('@') && e.includes('.');
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center px-6 min-h-screen bg-white dark:bg-background-dark">
            <div className="max-w-[480px] w-full flex flex-col items-center">
                <div className="mb-12 text-center">
                    <h1 className="text-primary dark:text-neutral-50 tracking-tight text-[36px] font-bold leading-tight font-serif mb-4">
                        Bem-vindos à nossa nova casa
                    </h1>
                    <p className="text-primary/70 dark:text-neutral-400 text-sm font-normal leading-relaxed max-w-[320px] mx-auto">
                        Identifique-se com seu e-mail para reservar um presente. Sem senhas, apenas para sabermos quem é você. ❤
                    </p>
                </div>

                <div className="w-full space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="flex flex-col w-full">
                            <p className="text-primary dark:text-neutral-50 text-[10px] font-bold uppercase tracking-widest leading-normal pb-2 px-1">Seu E-mail</p>
                            <input
                                className="form-input flex w-full rounded-none text-primary dark:text-neutral-50 focus:outline-0 focus:ring-0 border-x-0 border-t-0 border-b border-primary/20 dark:border-neutral-700 bg-transparent focus:border-primary dark:focus:border-white h-14 placeholder:text-neutral-400 p-[12px] text-base font-normal transition-colors"
                                placeholder="exemplo@email.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="pt-6">
                        <button
                            onClick={() => isValidEmail(email) && onLogin(email)}
                            disabled={!isValidEmail(email)}
                            className="flex min-w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm h-14 px-5 bg-primary dark:bg-neutral-50 text-neutral-50 dark:text-primary text-xs font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-30 disabled:grayscale shadow-sm"
                        >
                            <span>Entrar na Lista</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
