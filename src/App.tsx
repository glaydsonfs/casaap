
import { useState, useEffect, useMemo } from 'react';
import { Gift, Screen, UserState } from './types';
import { supabase } from './lib/supabase';
import { TopBar } from './components/TopBar';
import { BottomNavigation } from './components/BottomNavigation';
import { LoginScreen } from './screens/LoginScreen';
import { RegistryScreen } from './screens/RegistryScreen';
import { GiftDetailsScreen } from './screens/GiftDetailsScreen';
import { ConfirmationScreen } from './screens/ConfirmationScreen';
import { MyGiftsScreen } from './screens/MyGiftsScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
    const [user, setUser] = useState<UserState>({ email: null, isAuthenticated: false });
    const [screen, setScreen] = useState<Screen>('LOGIN');
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
    const [categoryFilter, setCategoryFilter] = useState('Todos');

    useEffect(() => {
        // Fetch gifts
        const fetchGifts = async () => {
            const { data, error } = await supabase
                .from('gifts')
                .select('*')
                .order('created_at', { ascending: true });

            if (data) {
                // Map database fields to our Gift interface
                const mappedGifts: Gift[] = data.map((g: any) => ({
                    id: g.id,
                    name: g.name,
                    imageUrl: g.image_url,
                    category: g.category,
                    reservedBy: g.reserved_by,
                    reservationMessage: g.reservation_message
                }));
                setGifts(mappedGifts);
            }
        };

        fetchGifts();

        // Restore direct session from LocalStorage
        const savedEmail = localStorage.getItem('user_email');
        if (savedEmail) {
            setUser({ email: savedEmail, isAuthenticated: true });
            setScreen('REGISTRY');
        }
    }, []);

    const handleLogin = (email: string) => {
        localStorage.setItem('user_email', email);
        setUser({ email, isAuthenticated: true });
        setScreen('REGISTRY');
    };

    const handleLogout = async () => {
        localStorage.removeItem('user_email');
        setUser({ email: null, isAuthenticated: false });
        setScreen('LOGIN');
    };

    const filteredGifts = useMemo(() => {
        return gifts
            .filter(gift => {
                return categoryFilter === 'Todos' || gift.category === categoryFilter;
            })
            .sort((a, b) => {
                if (a.reservedBy && !b.reservedBy) return 1;
                if (!a.reservedBy && b.reservedBy) return -1;
                return 0;
            });
    }, [gifts, categoryFilter]);

    const handleSelectGift = (gift: Gift) => {
        setSelectedGift(gift);
        setScreen('DETAILS');
    };

    const handleReserve = async (id: string, message: string) => {
        const giftToReserve = gifts.find(g => g.id === id);
        if (!giftToReserve) return;

        const { error } = await supabase
            .from('gifts')
            .update({
                reserved_by: user.email,
                reservation_message: message
            })
            .eq('id', id);

        if (!error) {
            setGifts(prev => prev.map(g => g.id === id ? { ...g, reservedBy: user.email!, reservationMessage: message } : g));
            setScreen('CONFIRMATION');
        } else {
            console.error("Error reserving gift:", error);
            alert("Erro ao reservar presente. Tente novamente.");
        }
    };

    const handleCancelReservation = async (id: string) => {
        const { error } = await supabase
            .from('gifts')
            .update({
                reserved_by: null,
                reservation_message: null
            })
            .eq('id', id);

        if (!error) {
            setGifts(prev => prev.map(g => g.id === id ? { ...g, reservedBy: undefined, reservationMessage: undefined } : g));
        } else {
            console.error("Error cancelling reservation:", error);
        }
    };

    const handleBackToPrevious = () => {
        setSelectedGift(null);
        setScreen('REGISTRY'); // Standard back behavior
    };

    const handleNavigate = (newScreen: Screen) => {
        setScreen(newScreen);
        setSelectedGift(null);
    };

    const renderScreen = () => {
        const userGifts = gifts.filter(g => g.reservedBy === user.email);

        switch (screen) {
            case 'LOGIN': return <LoginScreen onLogin={handleLogin} />;
            case 'REGISTRY': return (
                <RegistryScreen
                    gifts={filteredGifts}
                    onSelect={handleSelectGift}
                    selectedCategory={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                />
            );
            case 'DETAILS': return selectedGift ? (
                <GiftDetailsScreen
                    gift={selectedGift}
                    userEmail={user.email}
                    onReserve={handleReserve}
                    onBack={handleBackToPrevious}
                />
            ) : null;
            case 'CONFIRMATION': return selectedGift ? (
                <ConfirmationScreen
                    gift={selectedGift}
                    onBackToList={handleBackToPrevious}
                />
            ) : null;
            case 'MY_GIFTS': return (
                <MyGiftsScreen
                    gifts={gifts}
                    userEmail={user.email}
                    onSelect={handleSelectGift}
                    onCancel={handleCancelReservation}
                />
            );
            case 'PROFILE': return <ProfileScreen user={user} onLogout={handleLogout} userGifts={userGifts} />;
            default: return <LoginScreen onLogin={handleLogin} />;
        }
    };

    // Hide TopBar on DETAILS and CONFIRMATION screens
    const showTopBar = user.isAuthenticated && screen !== 'DETAILS' && screen !== 'CONFIRMATION';
    // Hide BottomNavigation on CONFIRMATION screen
    const showBottomNav = user.isAuthenticated && screen !== 'CONFIRMATION';

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-background-dark min-h-screen relative shadow-2xl overflow-x-hidden">
            {showTopBar && <TopBar />}

            {renderScreen()}

            {showBottomNav && (
                <BottomNavigation currentScreen={screen} onNavigate={handleNavigate} />
            )}
        </div>
    );
}
