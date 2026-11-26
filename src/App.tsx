import {useCallback, useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {CatalogView} from './components/CatalogView';
import {FaqView, Footer} from './components/FaqAndFooter';
import {HomeView} from './components/HomeView';
import {InquiryBar} from './components/InquiryBar';
import {LegalModal} from './components/LegalModal';
import {
  MobileBottomNav,
  TopNavbar,
  type AppView,
} from './components/NavbarAndBottomNav';
import {ProductDetailModal} from './components/ProductDetailModal';
import {PromotionsView} from './components/PromotionsView';
import {OfflineIndicator} from './components/PWAInstallBanner';
import {SamiVipView} from './components/SamiVipView';
import {CATEGORIES, PRODUCTS, type CategoryId, type Product} from './data/catalog';
import type {InquiryItem} from './utils/whatsapp';

const VALID_CATEGORIES = new Set<string>(CATEGORIES.map((c) => c.id));

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [legalDoc, setLegalDoc] = useState<'terms' | 'privacy' | null>(null);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);

  const inquiryKeys = useMemo(
    () => new Set(inquiryItems.map((item) => item.key)),
    [inquiryItems]
  );

  const toggleInquiryItem = useCallback((item: InquiryItem) => {
    setInquiryItems((prev) => {
      const exists = prev.some((existing) => existing.key === item.key);
      if (exists) {
        return prev.filter((existing) => existing.key !== item.key);
      }
      return [...prev, item];
    });
  }, []);

  const removeInquiryItem = useCallback((key: string) => {
    setInquiryItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const clearInquiry = useCallback(() => {
    setInquiryItems([]);
  }, []);

  const navigateTo = useCallback((view: AppView) => {
    setCurrentView(view);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const handleSelectCategory = useCallback((categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setCatalogSearch('');
    setCurrentView('catalog');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const handleHomeSearchSubmit = useCallback((query: string) => {
    setSelectedCategory('all');
    setCatalogSearch(query);
    setCurrentView('catalog');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const handleOpenProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    window.history.replaceState(null, '', `#producto=${product.id}`);
  }, []);

  const handleCloseProduct = useCallback(() => {
    setSelectedProduct(null);
    const targetHash =
      currentView === 'catalog' && selectedCategory !== 'all'
        ? `#categoria=${selectedCategory}`
        : `#${currentView}`;
    window.history.replaceState(null, '', targetHash);
  }, [currentView, selectedCategory]);

  // Deep-link support: #producto=<id>, #categoria=<id>, #catalog, #promotions, #vip, #faq, #home
  useEffect(() => {
    const syncFromHash = () => {
      const rawHash = window.location.hash.replace(/^#/, '');
      if (!rawHash) return;

      if (rawHash.startsWith('producto=')) {
        const productId = rawHash.slice('producto='.length);
        const found = PRODUCTS.find((p) => p.id === productId);
        if (found) {
          setSelectedProduct(found);
        }
        return;
      }

      if (rawHash.startsWith('categoria=')) {
        const catId = rawHash.slice('categoria='.length);
        if (VALID_CATEGORIES.has(catId)) {
          if (catId === 'combos') {
            setCurrentView('promotions');
          } else {
            setSelectedCategory(catId as CategoryId);
            setCurrentView('catalog');
          }
        }
        return;
      }

      if (['home', 'catalog', 'promotions', 'vip', 'faq'].includes(rawHash)) {
        setCurrentView(rawHash as AppView);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    if (selectedProduct) return;
    const nextHash =
      currentView === 'catalog' && selectedCategory !== 'all'
        ? `#categoria=${selectedCategory}`
        : `#${currentView}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, [currentView, selectedCategory, selectedProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-[#060A14] text-[#F8FAFC]">
      <TopNavbar currentView={currentView} onNavigate={navigateTo} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{opacity: 0, y: 6}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -4}}
            transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
          >
            {currentView === 'home' && (
              <HomeView
                onNavigate={navigateTo}
                onSelectCategory={handleSelectCategory}
                onSelectProduct={handleOpenProduct}
                onSearchSubmit={handleHomeSearchSubmit}
                inquiryKeys={inquiryKeys}
                onToggleInquiry={toggleInquiryItem}
              />
            )}

            {currentView === 'catalog' && (
              <CatalogView
                selectedCategory={selectedCategory}
                searchQuery={catalogSearch}
                onSelectCategory={setSelectedCategory}
                onSearchChange={setCatalogSearch}
                onSelectProduct={handleOpenProduct}
                inquiryKeys={inquiryKeys}
                onToggleInquiry={toggleInquiryItem}
              />
            )}

            {currentView === 'promotions' && <PromotionsView />}

            {currentView === 'vip' && <SamiVipView />}

            {currentView === 'faq' && <FaqView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer
        onNavigate={navigateTo}
        onSelectCategory={handleSelectCategory}
        onOpenLegal={setLegalDoc}
      />

      <InquiryBar
        items={inquiryItems}
        onRemoveItem={removeInquiryItem}
        onClearAll={clearInquiry}
      />

      <MobileBottomNav currentView={currentView} onNavigate={navigateTo} />
      <OfflineIndicator />

      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProduct}
        inquiryKeys={inquiryKeys}
        onToggleInquiry={toggleInquiryItem}
      />

      <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>
  );
}
