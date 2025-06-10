"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Head from "next/head"

// GA otimizado - só envia quando necessário
const enviarEvento = (() => {
  let queue = [];
  let timeout;
  
  return (evento, props = {}) => {
    queue.push({ evento, props });
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          window.gtag('event', evento, props);
        });
        queue = [];
      }
    }, 500);
  };
})();

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  // Detecção de conexão minimalista
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus, { passive: true });
    window.addEventListener('offline', updateOnlineStatus, { passive: true });
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Tracking minimalista - só o essencial
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Delay para não bloquear renderização
    const timer = setTimeout(() => {
      enviarEvento('page_view', {
        device: window.innerWidth <= 768 ? 'mobile' : 'desktop'
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Função de início ultra-otimizada
  const handleStart = useCallback(() => {
    if (isLoading || !isOnline) return;

    setIsLoading(true);
    setLoadingProgress(20);
    
    enviarEvento('quiz_start');

    // Animação de progresso eficiente
    let progress = 20;
    const interval = setInterval(() => {
      progress += 15;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Preservar UTMs
        let url = '/quiz/1';
        if (window.location.search) {
          const params = new URLSearchParams(window.location.search);
          const utms = new URLSearchParams();
          
          for (const [key, value] of params) {
            if (key.startsWith('utm_')) utms.set(key, value);
          }
          
          if (utms.toString()) url += `?${utms.toString()}`;
        }
        
        router.push(url);
      }
    }, 200);

  }, [isLoading, isOnline, router]);

  return (
    <>
      <Head>
        {/* CRÍTICO: Preload das imagens com alta prioridade */}
        <link 
          rel="preload" 
          href="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png" 
          as="image"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="https://comprarplanseguro.shop/wp-content/uploads/2025/06/02-IMAGE-INICIAL-NOVA.png" 
          as="image"
          fetchPriority="high"
        />
        
        {/* DNS otimizado */}
        <link rel="preconnect" href="https://comprarplanseguro.shop" />
        <link rel="dns-prefetch" href="https://comprarplanseguro.shop" />
        
        {/* Meta essencial */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Conheça o Truque de 3 etapas que está fazendo mulheres voltarem até depois da traição" />
        
        {/* Inline CSS crítico para evitar FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .critical-image { 
              content-visibility: visible !important;
              contain: layout style paint;
            }
            .loading-overlay {
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
            }
          `
        }} />
      </Head>
      
      {/* Container principal - estrutura simplificada */}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4">
        
        {/* Loading overlay otimizado */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 loading-overlay flex flex-col items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white text-lg mb-4">Preparando tu test...</p>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-200"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Error message */}
        {errorMessage && (
          <div className="fixed top-4 left-4 right-4 mx-auto max-w-md bg-red-100 text-red-800 p-4 rounded-lg z-50">
            {errorMessage}
            <button onClick={() => setErrorMessage("")} className="ml-2 font-bold">×</button>
          </div>
        )}
        
        {/* Offline indicator */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-100 text-red-800 p-3 text-center z-50">
            Sin conexión a internet
          </div>
        )}
        
        {/* Conteúdo principal */}
        <div className="max-w-3xl w-full text-center">
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 border-orange-500/30 border-2 shadow-2xl">
            <CardContent className="p-4 sm:p-8">
              
              {/* Logo - OTIMIZADO PARA LCP */}
              <div className="mb-6">
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-lg" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
                    <img
                      src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                      alt="Plan A Logo"
                      className="w-full h-full object-cover critical-image"
                      width="112"
                      height="112"
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                      onLoad={() => console.log('Logo carregado')}
                      onError={(e) => {
                        console.error('Erro ao carregar logo');
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Título - Otimizado para CLS */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
                  Conheça o <span className="text-red-500">Truco de 3 pasos</span> que está funcionando
                  <br />
                  <span className="text-red-500">hace que las mujeres regresen incluso después de una traición</span>
                </h1>

                <p className="text-lg text-white font-semibold mb-2">
                  ✓ Funciona con cualquier mujer...
                </p>
                <p className="text-white mb-6">
                  sin mensajes largos, desaparecer ni jugar juegos.
                </p>

                <h2 className="text-xl font-bold text-green-500 mb-6">
                  ✅ ¿Y lo mejor? Es el mismo que usaron grandes celebridades.
                </h2>

                {/* Segunda imagem - com lazy loading inteligente */}
                <div className="mb-8">
                  <img 
                    src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/02-IMAGE-INICIAL-NOVA.png" 
                    alt="Ejemplo del método" 
                    className="w-full h-auto rounded-lg critical-image"
                    width="600"
                    height="400"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    onLoad={() => console.log('Imagem principal carregada')}
                    onError={(e) => {
                      console.error('Erro ao carregar imagem principal');
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* CTA Button - Otimizado */}
              <div>
                <Button
                  onClick={handleStart}
                  disabled={isLoading || !isOnline}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-8 rounded-full text-xl shadow-lg transition-all duration-200 mb-4 w-full sm:w-auto disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      PREPARANDO...
                      <div className="ml-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      QUIERO DESCUBRIR EL TRUCO
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-gray-400 mt-4 flex items-center justify-center">
                  <Lock className="w-3 h-3 mr-1" />
                  Tus respuestas son confidenciales y están protegidas
                </div>
              </div>
              
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Script crítico inline - OTIMIZAÇÃO MÁXIMA */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Otimização crítica de imagens
          (function() {
            const criticalImages = document.querySelectorAll('.critical-image');
            
            criticalImages.forEach(img => {
              // Forçar prioridade máxima
              img.fetchPriority = 'high';
              img.loading = 'eager';
              img.decoding = 'sync';
              
              // Otimizar renderização
              img.style.contentVisibility = 'visible';
              img.style.contain = 'layout style paint';
              
              // Preload se não carregou
              if (!img.complete) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.href = img.src;
                preloadLink.as = 'image';
                preloadLink.fetchPriority = 'high';
                document.head.appendChild(preloadLink);
              }
            });
            
            // Prefetch da próxima página após 3s
            setTimeout(() => {
              const prefetchLink = document.createElement('link');
              prefetchLink.rel = 'prefetch';
              prefetchLink.href = '/quiz/1';
              document.head.appendChild(prefetchLink);
            }, 3000);
            
            // Otimizar Web Vitals
            if ('PerformanceObserver' in window) {
              try {
                new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  entries.forEach(entry => {
                    if (entry.startTime > 2500) {
                      console.warn('LCP lento:', entry.startTime + 'ms', entry.element);
                    }
                  });
                }).observe({type: 'largest-contentful-paint', buffered: true});
              } catch(e) {}
            }
          })();
        `
      }} />
    </>
  );
}
