import { useState, useMemo, useEffect, useRef, RefObject } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, SlidersHorizontal, X, MapPin } from 'lucide-react';
import { CITIES, BUDGETS, VIBES, DAYS, generateItinerary, CITY_IMAGES } from './data';
import type { City, Budget, Vibe, Theme, ItineraryStep } from './types';

const Logo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9">
    <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
  </svg>
);

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      delay: i * 0.05,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -10,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

interface ItineraryParams {
  city: City;
  budget: Budget;
  vibe: Vibe;
  days: number;
}

const CITY_SUBTITLES: Record<City, string> = {
  'Paris': 'France • Ville Lumière',
  'Berlin': 'Allemagne • Capitale Créative',
  'Tokyo': 'Japon • Mégalopole Futuriste',
  'Rome': 'Italie • Cité Éternelle',
  'New York': 'États-Unis • The Big Apple',
  'Londres': 'Royaume-Uni • Capitale Cosmopolite',
  'Barcelone': 'Espagne • Joyau Catalan',
  'Amsterdam': 'Pays-Bas • La Venise du Nord',
  'Lisbonne': 'Portugal • Ville aux Sept Collines',
  'Marrakech': 'Maroc • La Ville Ocre',
};

export default function App() {
  const [hasValidated, setHasValidated] = useState(false);
  const [draftParams, setDraftParams] = useState<ItineraryParams>({
    city: 'Paris',
    budget: 'Standard',
    vibe: 'Aventure',
    days: 2,
  });

  const [appliedParams, setAppliedParams] = useState<ItineraryParams>({
    city: 'Paris',
    budget: 'Standard',
    vibe: 'Aventure',
    days: 2,
  });

  const [activeFilter, setActiveFilter] = useState<Theme | 'All'>('All');
  const [isValidated, setIsValidated] = useState(false);
  // Sur mobile et tablette, le panneau d'option est déployé par défaut avant la première validation
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(true);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      const isOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(target);
      const isOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(target);
      
      if (isOutsideMobile && isOutsideDesktop) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const hasUnsavedChanges = useMemo(() => {
    return (
      draftParams.city !== appliedParams.city ||
      draftParams.budget !== appliedParams.budget ||
      draftParams.vibe !== appliedParams.vibe ||
      draftParams.days !== appliedParams.days
    );
  }, [draftParams, appliedParams]);
  
  const itinerary = useMemo(() => {
    return generateItinerary(
      appliedParams.city,
      appliedParams.budget,
      appliedParams.vibe,
      appliedParams.days
    );
  }, [appliedParams]);

  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCheckedIds(new Set(itinerary.map(step => step.id)));
  }, [itinerary]);

  const toggleCheck = (id: string) => {
    const newSet = new Set(checkedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCheckedIds(newSet);
  };

  const filteredItinerary = useMemo(() => {
    if (activeFilter === 'All') return itinerary;
    return itinerary.filter(step => step.theme === activeFilter);
  }, [itinerary, activeFilter]);

  const totalBudget = useMemo(() => {
    return itinerary
      .filter(step => checkedIds.has(step.id))
      .reduce((sum, step) => sum + step.price, 0);
  }, [itinerary, checkedIds]);

  const groupedItinerary = useMemo(() => {
    const groups: Record<string, ItineraryStep[]> = {};
    filteredItinerary.forEach(step => {
      const dayKey = String(step.day);
      if (!groups[dayKey]) groups[dayKey] = [];
      groups[dayKey].push(step);
    });
    return groups;
  }, [filteredItinerary]);

  const handleValidate = () => {
    setAppliedParams(draftParams);
    setHasValidated(true);
    setIsValidated(true);
    setIsMobilePanelOpen(false); // Close panel automatically on mobile/tablet upon calculation
    setTimeout(() => setIsValidated(false), 2500);
  };

  const renderOptionsContent = (ref: RefObject<HTMLDivElement | null>) => (
    <div className="flex flex-col gap-6 sm:gap-7 max-w-md mx-auto w-full">
      {/* 01 - Destination (Dropdown sur tous les appareils) */}
      <div className="relative" ref={ref}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-ink-medium font-bold">
            [ 01 ] Destination
          </span>
        </div>
        
        {/* Custom Styled Select Trigger */}
        <button
          type="button"
          onClick={() => setIsCityDropdownOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-4 py-3.5 sm:px-4 sm:py-3.5 bg-surface border-[1.5px] border-ink rounded transition-all hover:border-accent focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer select-none"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded bg-bg-main flex items-center justify-center flex-shrink-0 text-accent">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-left truncate">
              <div className="font-display text-base font-bold uppercase tracking-[-0.02em] text-ink leading-tight">
                {draftParams.city}
              </div>
              <div className="font-mono text-xs text-ink-medium truncate leading-none mt-1">
                {CITY_SUBTITLES[draftParams.city]}
              </div>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-ink transition-transform duration-200 flex-shrink-0 ${isCityDropdownOpen ? 'rotate-180 text-accent' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isCityDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full mt-2 bg-surface border-[1.5px] border-ink rounded shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-1.5 flex flex-col gap-1 max-h-[260px] overflow-y-auto">
                {CITIES.map(c => {
                  const isSelected = draftParams.city === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setDraftParams(prev => ({ ...prev, city: c }));
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded text-left transition-all duration-150 cursor-pointer ${
                        isSelected 
                          ? 'bg-accent text-accent-ink font-medium' 
                          : 'hover:bg-bg-main text-ink'
                      }`}
                    >
                      <div>
                        <div className="font-display text-sm sm:text-base font-bold uppercase">
                          {c}
                        </div>
                        <div className={`font-mono text-[0.65rem] sm:text-xs mt-0.5 ${isSelected ? 'text-accent-ink/80' : 'text-ink-medium'}`}>
                          {CITY_SUBTITLES[c]}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 flex-shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 02 - Budget */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-ink-medium font-bold">
            [ 02 ] Budget
          </span>
          <span className="font-mono text-xs text-ink-medium">Standing</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {BUDGETS.map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setDraftParams(prev => ({ ...prev, budget: b }))}
              className={`py-3 px-2 sm:py-3.5 border rounded text-sm transition-all duration-150 ease-out active:scale-[0.97] touch-manipulation text-center truncate cursor-pointer select-none ${
                draftParams.budget === b 
                  ? 'bg-accent text-accent-ink border-accent font-medium shadow-xs' 
                  : 'bg-surface border-ink-faint hover:border-accent/60 hover:bg-bg-main/50 text-ink'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* 03 - Ambiance */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-ink-medium font-bold">
            [ 03 ] Ambiance
          </span>
          <span className="font-mono text-xs text-ink-medium">Rythme</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {VIBES.map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setDraftParams(prev => ({ ...prev, vibe: v }))}
              className={`py-3 px-2 sm:py-3.5 border rounded text-sm transition-all duration-150 ease-out active:scale-[0.97] touch-manipulation text-center truncate cursor-pointer select-none ${
                draftParams.vibe === v 
                  ? 'bg-accent text-accent-ink border-accent font-medium shadow-xs' 
                  : 'bg-surface border-ink-faint hover:border-accent/60 hover:bg-bg-main/50 text-ink'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* 04 - Durée */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-ink-medium font-bold">
            [ 04 ] Durée
          </span>
          <span className="font-mono text-xs text-ink-medium">Séjour</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {DAYS.map(d => (
            <button
              key={d}
              type="button"
              onClick={() => setDraftParams(prev => ({ ...prev, days: d }))}
              className={`py-3 px-2 sm:py-3.5 border rounded text-sm transition-all duration-150 ease-out active:scale-[0.97] touch-manipulation text-center truncate cursor-pointer select-none ${
                draftParams.days === d 
                  ? 'bg-accent text-accent-ink border-accent font-medium shadow-xs' 
                  : 'bg-surface border-ink-faint hover:border-accent/60 hover:bg-bg-main/50 text-ink'
              }`}
            >
              {d} {d > 1 ? 'j' : 'j'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen lg:overflow-hidden bg-bg-main text-ink font-sans w-full max-w-full overflow-x-hidden relative">
      
      {/* 1) Fixed Top / Floating Navbar on Mobile & Tablet */}
      <header className="lg:hidden sticky top-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-b-[1.5px] border-ink px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <Logo />
          <div className="min-w-0">
            <span className="font-display text-[clamp(1rem,4.5vw,1.125rem)] font-extrabold uppercase tracking-tight block whitespace-nowrap">Wander</span>
            <span className="font-mono text-[clamp(0.55rem,2.5vw,0.65rem)] text-ink-medium tracking-wider uppercase block whitespace-nowrap overflow-hidden text-ellipsis">
              {hasValidated ? `${appliedParams.city} • ${appliedParams.days}j • ${appliedParams.budget}` : 'Configurez votre séjour'}
            </span>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => setIsMobilePanelOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-bg-main hover:bg-ink hover:text-white border-[1.5px] border-ink rounded text-xs font-mono uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
          <span>Options</span>
          {hasUnsavedChanges && hasValidated && (
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          )}
        </button>
      </header>

      {/* 2) FIXED BUDGET FLOATING CAPSULE (Always visible everywhere in the UI) */}
      <aside 
        aria-label="Budget réel en direct"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:top-6 lg:right-8 lg:bottom-auto z-30 flex items-center gap-3 bg-surface/95 backdrop-blur-md border-[1.5px] border-ink rounded-full pl-4 pr-2.5 py-2 sm:pl-5 sm:pr-3 sm:py-2.5 shadow-xl hover:shadow-2xl transition-all"
      >
        <div className="flex flex-col text-left">
          <span className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.16em] text-ink-medium font-medium leading-none mb-1">
            Budget Réel
          </span>
          <motion.div 
            key={hasValidated ? totalBudget : 'initial'}
            initial={{ scale: 1.1, color: 'var(--color-accent)' }}
            animate={{ scale: 1, color: 'var(--color-ink)' }}
            transition={{ duration: 0.25 }}
            className="font-display font-extrabold text-xl sm:text-2xl leading-none text-ink flex items-baseline gap-0.5"
          >
            {hasValidated ? totalBudget : 0}<span className="text-sm sm:text-base font-light text-ink-medium">€</span>
          </motion.div>
        </div>

        {/* Quick button to open options if on mobile/tablet */}
        <button
          type="button"
          onClick={() => setIsMobilePanelOpen(true)}
          title="Modifier les options du séjour"
          className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent text-accent-ink flex items-center justify-center transition-transform active:scale-90 shadow-xs cursor-pointer ml-1"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </aside>

      {/* 3) Full-Screen Collapsible Panel on Mobile & Tablet (Zero-scroll design) */}
      <AnimatePresence>
        {isMobilePanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="lg:hidden fixed inset-0 z-50 bg-surface flex flex-col h-full w-full overflow-hidden justify-between"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b-[1.5px] border-ink flex items-center justify-between bg-surface flex-shrink-0">
              <div className="flex items-center gap-3">
                <Logo />
                <div>
                  <h2 className="font-display text-xl font-extrabold uppercase tracking-tight leading-tight">Préférences</h2>
                  <p className="font-mono text-[0.65rem] text-ink-medium uppercase tracking-wider">Ajustez vos critères</p>
                </div>
              </div>
              {hasValidated && (
                <button
                  type="button"
                  onClick={() => setIsMobilePanelOpen(false)}
                  className="w-10 h-10 rounded border border-ink-faint flex items-center justify-center text-ink hover:bg-bg-main active:scale-95 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Body - Natural compact spacing */}
            <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8 overflow-y-auto">
              {renderOptionsContent(mobileDropdownRef)}
            </div>

            {/* Modal Footer - Simple Calculate Button (No duplicate estimated budget) */}
            <div className="p-4 sm:p-5 border-t-[1.5px] border-ink bg-surface flex-shrink-0">
              <button 
                type="button"
                onClick={handleValidate}
                className={`w-full py-4 px-5 rounded font-display text-base font-bold uppercase tracking-[0.06em] transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                  isValidated 
                    ? 'bg-emerald-700 text-white' 
                    : !hasValidated || hasUnsavedChanges
                    ? 'bg-accent text-accent-ink ring-2 ring-accent/40 shadow-md'
                    : 'bg-accent text-accent-ink hover:opacity-95'
                }`}
              >
                {isValidated ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" /> Itinéraire Calculé !
                  </>
                ) : !hasValidated ? (
                  "Calculer l'itinéraire"
                ) : hasUnsavedChanges ? (
                  "Recalculer l'itinéraire"
                ) : (
                  "Voir l'itinéraire"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4) Desktop Sidebar (Persistent on large screens, zero-scroll fit) */}
      <aside className="hidden lg:flex w-[380px] xl:w-[420px] flex-shrink-0 border-r-[1.5px] border-ink flex-col justify-between bg-surface z-20 h-screen shadow-sm overflow-hidden">
        <div className="p-5 xl:p-6 border-b-[1.5px] border-ink flex-shrink-0">
          <h1 className="font-display text-2xl xl:text-3xl tracking-[-0.04em] uppercase flex items-center gap-3 font-extrabold">
            <Logo /> Wander
          </h1>
        </div>

        <div className="flex-1 p-5 xl:p-6 overflow-y-auto">
          {renderOptionsContent(desktopDropdownRef)}
        </div>

        {/* Desktop Footer Sidebar - Button Only (No duplicate estimated budget) */}
        <div className="p-5 xl:p-6 border-t-[1.5px] border-ink bg-surface flex-shrink-0">
          <button 
            type="button"
            onClick={handleValidate}
            className={`w-full py-3.5 xl:py-4 px-5 rounded font-display text-sm xl:text-base font-bold uppercase tracking-[0.06em] transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
              isValidated 
                ? 'bg-emerald-700 text-white' 
                : !hasValidated || hasUnsavedChanges
                ? 'bg-accent text-accent-ink hover:opacity-95 ring-2 ring-accent/40 shadow-md'
                : 'bg-accent text-accent-ink hover:opacity-95 hover:shadow-md'
            }`}
          >
            {isValidated ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" /> Itinéraire Calculé !
              </>
            ) : !hasValidated ? (
              "Calculer l'itinéraire"
            ) : hasUnsavedChanges ? (
              "Recalculer l'itinéraire"
            ) : (
              "Valider l'itinéraire"
            )}
          </button>
        </div>
      </aside>

      {/* 5) Main Content Area */}
      <main className="flex-1 min-w-0 lg:h-screen lg:overflow-y-auto relative w-full pb-20 lg:pb-0">
        {!hasValidated ? (
          /* Initial Empty State before first calculation */
          <div className="h-full min-h-[60vh] flex flex-col items-center justify-center p-6 sm:p-12 text-center max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-medium font-medium mb-2">
                Urban Explorer
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-3">
                Votre prochain voyage commence ici
              </h2>
              <p className="text-ink-medium text-sm sm:text-base font-light leading-relaxed mb-6 max-w-md">
                Sélectionnez votre destination, votre rythme et la durée de votre séjour dans le panneau de gauche, puis validez.
              </p>
            </motion.div>
          </div>
        ) : (
          /* Validated Itinerary View */
          <>
            {/* Hero Banner */}
            <div className="h-[26vh] sm:h-[34vh] lg:h-[42vh] min-h-[190px] relative bg-black w-full overflow-hidden [container-type:inline-size]">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={appliedParams.city}
                  src={CITY_IMAGES[appliedParams.city]} 
                  alt={appliedParams.city}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="w-full h-full object-cover grayscale-[0.2] absolute inset-0"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 lg:p-12 text-white pointer-events-none">
                <motion.h2 
                  key={appliedParams.city}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="font-display text-[clamp(1.5rem,12cqi,6.5rem)] leading-[0.88] tracking-[-0.05em] uppercase mb-2 sm:mb-3 font-extrabold whitespace-nowrap"
                >
                  {appliedParams.city}
                </motion.h2>
                <motion.p 
                  key={`${appliedParams.city}-${appliedParams.days}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="font-mono text-[clamp(0.6rem,3cqi,1rem)] sm:text-sm lg:text-base uppercase tracking-[0.18em] text-white/90 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Votre itinéraire de {appliedParams.days} {appliedParams.days > 1 ? 'jours' : 'jour'} • {appliedParams.vibe}
                </motion.p>
              </div>
            </div>

            {/* Itinerary Section */}
            <div className="max-w-[960px] mx-auto py-6 px-4 sm:py-9 sm:px-6 lg:py-12 lg:px-12 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-9 lg:mb-11 pb-4 sm:pb-5 border-b-[1.5px] border-ink gap-4 sm:gap-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-[-0.02em] font-extrabold uppercase">Programme</h2>
                  <p className="font-mono text-[0.68rem] sm:text-xs text-ink-medium uppercase tracking-wider mt-1">Cochez ou décochez les étapes pour ajuster votre budget</p>
                </div>
                <nav className="flex gap-1.5 sm:gap-2.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-hide">
                  {(['All', 'Culture', 'Food', 'Détente'] as const).map(filter => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`font-mono text-xs sm:text-sm uppercase px-3 py-1.5 sm:px-4 sm:py-2 border rounded-sm transition-all duration-200 ease-out active:scale-[0.96] touch-manipulation whitespace-nowrap cursor-pointer select-none ${
                        activeFilter === filter
                          ? 'border-accent text-accent font-bold bg-accent/10 shadow-xs'
                          : 'border-transparent text-ink-medium hover:text-accent hover:border-ink-faint font-normal'
                      }`}
                    >
                      {filter === 'All' ? 'Tout' : filter}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="space-y-8 sm:space-y-12 lg:space-y-14">
                <AnimatePresence mode="popLayout">
                  {(Object.entries(groupedItinerary) as [string, ItineraryStep[]][]).map(([day]) => (
                    <div 
                      key={`day-${day}-${appliedParams.city}-${appliedParams.budget}-${appliedParams.vibe}`}
                      className="mb-7 sm:mb-10 lg:mb-14"
                    >
                      <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase mb-4 sm:mb-6 lg:mb-8 flex items-center gap-4 sm:gap-6 after:flex-1 after:h-[1.5px] after:bg-ink">
                        Jour 0{day}
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {groupedItinerary[day].map((step, index) => {
                          const isChecked = checkedIds.has(step.id);
                          
                          return (
                            <motion.div 
                              layout
                              key={step.id} 
                              custom={index}
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              onClick={() => toggleCheck(step.id)}
                              className={`grid grid-cols-1 sm:grid-cols-[70px_1fr_auto] lg:grid-cols-[90px_1fr_120px] p-4 sm:p-5 lg:p-6 bg-surface border rounded transition-all duration-200 ease-out cursor-pointer gap-3 sm:gap-5 active:scale-[0.99] touch-manipulation select-none ${
                                isChecked 
                                  ? 'border-ink-faint hover:border-accent hover:shadow-md hover:-translate-y-0.5' 
                                  : 'border-ink-faint/50 opacity-40 grayscale hover:opacity-65 hover:border-ink-faint'
                              }`}
                            >
                              <div className="font-mono font-bold text-base sm:text-lg lg:text-xl text-ink transition-colors">
                                {step.time}
                              </div>
                              
                              <div className="min-w-0">
                                <span className="font-mono text-[0.65rem] sm:text-xs uppercase py-0.5 px-2 border border-ink-faint inline-block mb-2 sm:mb-2.5 tracking-wider rounded-xs transition-colors">
                                  {step.theme}
                                </span>
                                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                  <h4 className={`font-display text-base sm:text-lg lg:text-xl font-bold tracking-[-0.01em] break-words transition-all duration-200 ${!isChecked ? 'line-through decoration-ink-medium' : ''}`}>
                                    {step.title}
                                  </h4>
                                  {step.mapsUrl && (
                                    <a
                                      href={step.mapsUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className={`p-1.5 rounded-full transition-colors flex items-center justify-center ${isChecked ? 'text-ink-medium hover:text-accent hover:bg-bg-main' : 'text-ink-medium/50 hover:text-accent hover:bg-bg-main/50'}`}
                                      title="Voir sur Google Maps"
                                    >
                                      <MapPin className="w-4 h-4 sm:w-4 sm:h-4" />
                                    </a>
                                  )}
                                </div>
                                <p className="text-ink-medium leading-[1.6] max-w-[540px] text-xs sm:text-sm lg:text-base font-light transition-colors">
                                  {step.description}
                                </p>
                              </div>
                              
                              <div className="text-left sm:text-right flex flex-row sm:flex-col justify-between sm:justify-between h-full pt-2 sm:pt-0 border-t sm:border-t-0 border-ink-faint/30 sm:border-transparent items-center sm:items-end">
                                <div className="hidden sm:block">
                                  <div 
                                    className={`w-5 h-5 rounded-xs border flex items-center justify-center transition-all duration-200 ease-out ${
                                      isChecked 
                                        ? 'bg-accent border-accent text-accent-ink shadow-xs scale-100' 
                                        : 'border-ink-medium bg-transparent scale-95'
                                    }`}
                                  >
                                    {isChecked && (
                                      <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.15 }}
                                      >
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                                <div className={`font-display font-bold text-base sm:text-lg lg:text-xl transition-all duration-200 ${!isChecked ? 'line-through text-ink-medium' : 'text-ink'}`}>
                                  {step.price === 0 ? 'Gratuit' : `${step.price} €`}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {Object.keys(groupedItinerary).length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16 sm:py-20 font-mono text-sm sm:text-base text-ink-medium"
                    >
                      [ Aucune étape ne correspond à ce filtre ]
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}


