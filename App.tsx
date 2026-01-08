
import React, { useState, useEffect } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { GiftCardSplash } from './components/GiftCardSplash';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { QuoteFlow } from './components/QuoteFlow';
import { CartScreen } from './components/CartScreen';
import { AddCardScreen } from './components/AddCardScreen';
import { ExperiencesScreen } from './components/ExperiencesScreen';
import { WhereToUseScreen } from './components/WhereToUseScreen';

export interface CartItem {
  id: string;
  format: 'physical' | 'digital';
  type: 'full' | 'select';
  unitAmount: number;
  quantity: number;
  total: number;
}

export interface LinkedCard {
  id: string;
  name: string;
  number: string;
  balance: number;
  color: string;
}

const App: React.FC = () => {
  const [screen, setScreen] = useState<'splash' | 'login' | 'home' | 'quote' | 'cart' | 'add-card' | 'experiences' | 'where-to-use'>('splash');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [linkedCards, setLinkedCards] = useState<LinkedCard[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setScreen('home');
  };

  const handleStartQuote = () => {
    setScreen('quote');
  };

  const handleBackToHome = () => {
    setScreen('home');
  };

  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCartItems(prev => [...prev, newItem]);
    setScreen('home');
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleOpenCart = () => {
    setScreen('cart');
  };

  const handleOpenAddCard = () => {
    setScreen('add-card');
  };

  const handleOpenExperiences = () => {
    setScreen('experiences');
  };

  const handleOpenWhereToUse = () => {
    setScreen('where-to-use');
  };

  const handleAddLinkedCard = (cardData: Omit<LinkedCard, 'id' | 'balance' | 'color'>) => {
    const colors = ['bg-[#f9b13d]', 'bg-[#4fb9af]', 'bg-[#a855f7]', 'bg-[#f87171]'];
    const newCard: LinkedCard = {
      id: Math.random().toString(36).substr(2, 9),
      name: cardData.name,
      number: cardData.number,
      balance: Math.floor(Math.random() * 1000) + 100,
      color: colors[linkedCards.length % colors.length]
    };
    setLinkedCards(prev => [...prev, newCard]);
    setScreen('home');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#f1f5f9]">
      <div className="relative">
        <PhoneFrame>
          {screen === 'splash' && <GiftCardSplash />}
          {screen === 'login' && <LoginScreen onLogin={handleLogin} />}
          {screen === 'home' && (
            <HomeScreen 
              onStartQuote={handleStartQuote} 
              onOpenCart={handleOpenCart}
              onOpenAddCard={handleOpenAddCard}
              onOpenExperiences={handleOpenExperiences}
              onOpenWhereToUse={handleOpenWhereToUse}
              cartCount={cartItems.length} 
              linkedCards={linkedCards}
            />
          )}
          {screen === 'quote' && (
            <QuoteFlow 
              onBack={handleBackToHome} 
              onAddToCart={handleAddToCart}
            />
          )}
          {screen === 'cart' && (
            <CartScreen 
              items={cartItems}
              onBack={handleBackToHome}
              onRemoveItem={handleRemoveFromCart}
            />
          )}
          {screen === 'add-card' && (
            <AddCardScreen 
              onBack={handleBackToHome}
              onAddCard={handleAddLinkedCard}
            />
          )}
          {screen === 'experiences' && (
            <ExperiencesScreen 
              onBack={handleBackToHome}
              onOpenCart={handleOpenCart}
              onOpenAddCard={handleOpenAddCard}
              onGoHome={handleBackToHome}
              cartCount={cartItems.length}
            />
          )}
          {screen === 'where-to-use' && (
            <WhereToUseScreen 
              onBack={handleBackToHome}
              onOpenCart={handleOpenCart}
              onOpenAddCard={handleOpenAddCard}
              onGoHome={handleBackToHome}
              cartCount={cartItems.length}
            />
          )}
        </PhoneFrame>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/10 blur-xl rounded-[100%] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default App;
