"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Head from "next/head"

// Função otimizada para eventos GA com debounce e cache
const enviarEvento = (() => {
  let eventQueue = [];
  let isProcessing = false;
  
  const processQueue = () => {
    if (isProcessing || eventQueue.length === 0) return;
    
    isProcessing = true;
    const events = [...eventQueue];
    eventQueue = [];
    
    requestIdleCallback(() => {
      events.forEach(({ nombre_evento, propriedades }) => {
        try {
          if (typeof window !== 'undefined') {
            if (window.gtag) {
              window.gtag('event', nombre_evento, propriedades);
            } else {
              window._gtagEvents = window._gtagEvents || [];
              window._gtagEvents.push({ event: nombre_evento, props: propriedades });
            }
          }
        } catch (error) {
          console.error('Error al enviar evento:', error);
        }
      });
      isProcessing = false;
    }, { timeout: 1000 });
  };
  
  return (nombre_evento, propriedades = {}) => {
    eventQueue.push({ nombre_evento, propriedades });
    if (eventQueue.length === 1) {
      setTimeout(processQueue, 100);
    }
  };
})();

// Hook personalizado para detección de dispositivo
const useDeviceDetection = () => {
  return useMemo(() => {
    if (typeof window === 'undefined') return { isLowEnd: false, isMobile: false };
    
    const isLowEnd = 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || 
      (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
      window.innerWidth < 768;
    
    const isMobile = window.innerWidth <= 768;
    
    return { isLowEnd, isMobile };
  }, []);
};

// Hook para conexión de red optimizado
const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setIsOnline(navigator.onLine);
    
    let timeoutId;
    const handleConnectionChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsOnline(navigator.onLine);
      }, 200);
    };

    window.addEventListener('online', handleConnectionChange, { passive: true });
    window.addEventListener('offline', handleConnectionChange, { passive: true });

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
      clearTimeout(timeoutId);
    };
  }, []);
  
  return isOnline;
};

export default function HomePage() {
  const router = useRouter();
  const { isLowEnd, isMobile } = useDeviceDetection();
  const isOnline = useNetworkStatus();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [urgencyCount, setUrgencyCount] = useState(127);
  const [loadingProgress, setLoadingProgress] = useState(10);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Memoizar mensajes de loading
  const loadingMessages = useMemo(() => [
    "Preparando tu test personalizado...",
    "Analizando tu perfil...",
    "Configurando preguntas..."
  ], []);

  // Efecto principal optimizado
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Marcar como cargado inmediatamente para LCP
    setIsLoaded(true);

    // Observer para métricas lazy
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        const sendMetrics = () => {
          enviarEvento('visualizo_pagina_inicial', {
            device_type: isMobile ? 'mobile' : 'desktop',
            is_low_end: isLowEnd
          });
          
          // Métricas de performance solo si están disponibles
          if ('performance' in window && performance.getEntriesByType) {
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries.length > 0) {
              const perfData = navEntries[0];
              enviarEvento('metricas_rendimiento', {
                domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                deviceType: isMobile ? 'mobile' : 'desktop',
                isLowEnd
              });
            }
          }
        };

        if (document.readyState === 'complete') {
          sendMetrics();
        } else {
          window.addEventListener('load', sendMetrics, { once: true, passive: true });
        }
        
        observer.disconnect();
      }
    }, { rootMargin: '50px' });

    const mainElement = document.querySelector('.min-h-screen');
    if (mainElement) observer.observe(mainElement);

    // Contador de urgencia optimizado
    let urgencyFrame;
    let lastUpdate = 0;
    
    const updateUrgency = (timestamp) => {
      if (timestamp - lastUpdate > 45000) {
        setUrgencyCount(prev => prev + Math.floor(Math.random() * 3));
        lastUpdate = timestamp;
      }
      urgencyFrame = requestAnimationFrame(updateUrgency);
    };
    
    urgencyFrame = requestAnimationFrame(updateUrgency);

    // Error handler crítico
    const handleError = (event) => {
      const error = event.error || event;
      if (error?.message?.match(/(network|fetch|load)/i)) {
        enviarEvento('error_pagina_inicial', {
          error_message: error.message.substring(0, 100)
        });
      }
    };

    window.addEventListener('error', handleError, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(urgencyFrame);
      window.removeEventListener('error', handleError);
    };
  }, [isMobile, isLowEnd]);

  // Función de inicio optimizada con useCallback
  const handleStart = useCallback(() => {
    if (isLoading || !isOnline) return;

    setIsLoading(true);
    setLoadingProgress(15);
    setLoadingMessage(loadingMessages[0]);

    enviarEvento('inicio_quiz', {
      device_type: isMobile ? 'mobile' : 'desktop',
      is_low_end: isLowEnd
    });

    try {
      // Animación de progreso optimizada
      let progress = 15;
      let messageIndex = 0;
      let lastTimestamp = 0;
      
      const updateProgress = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        
        if (elapsed > (isLowEnd ? 100 : 50) && progress < 90) {
          progress += isLowEnd ? 3 : 5;
          setLoadingProgress(progress);
          
          // Cambiar mensaje cada 30% de progreso
          const newMessageIndex = Math.floor(progress / 30);
          if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
            messageIndex = newMessageIndex;
            setLoadingMessage(loadingMessages[messageIndex]);
          }
          
          lastTimestamp = timestamp;
        }
        
        if (progress < 90) {
          requestAnimationFrame(updateProgress);
        }
      };
      
      requestAnimationFrame(updateProgress);
      
      // Preservar UTMs optimizado
      let targetUrl = '/quiz/1';
      const searchParams = window.location.search;
      
      if (searchParams) {
        const utmParams = new URLSearchParams();
        const currentParams = new URLSearchParams(searchParams);
        
        for (const [key, value] of currentParams) {
          if (key.startsWith('utm_')) {
            utmParams.set(key, value);
          }
        }
        
        const utmString = utmParams.toString();
        if (utmString) {
          targetUrl += `?${utmString}`;
        }
      }
      
      // Navegación con prefetch
      setTimeout(() => {
        setLoadingProgress(100);
        
        // Prefetch inteligente
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = targetUrl;
        prefetchLink.as = 'document';
        document.head.appendChild(prefetchLink);
        
        setTimeout(() => {
          router.push(targetUrl);
        }, isLowEnd ? 200 : 100);
      }, isLowEnd ? 1200 : 800);
      
    } catch (error) {
      console.error('Error al procesar redirección:', error);
      setLoadingProgress(0);
      setIsLoading(false);
      setErrorMessage("Hubo un problema al iniciar el test. Inténtalo de nuevo.");
      
      setTimeout(() => setErrorMessage(""), 5000);
    }
  }, [isLoading, isOnline, isMobile, isLowEnd, loadingMessages, router]);

  // Memoizar elementos pesados
  const loadingOverlay = useMemo(() => (
    isLoading && (
      <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4" />
        <p className="text-white text-lg font-medium">{loadingMessage}</p>
        <div className="w-64 h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>
    )
  ), [isLoading, loadingMessage, loadingProgress]);

  return (
    <>
      <Head>
        {/* Preload crítico optimizado */}
        <link 
          rel="preload" 
          href="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png" 
          as="image"
          fetchPriority="high"
          type="image/png"
        />
        
        {/* Preconnect optimizado */}
        <link rel="preconnect" href="https://comprarplanseguro.shop" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://comprarplanseguro.shop" />
        
        {/* Meta tags optimizados */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="description" content="Conheça o Truque de 3 etapas que está fazendo mulheres voltarem até depois da traição" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Cache optimizado */}
        <meta httpEquiv="Cache-Control" content="public, max-age=86400, stale-while-revalidate=604800" />
        
        {/* Resource hints */}
        <link rel="prefetch" href="/quiz/1" />
        <link rel="prefetch" href="/quiz/2" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4">
        {loadingOverlay}
        
        {/* Error message optimizado */}
        {errorMessage && (
          <div className="fixed top-4 left-4 right-4 mx-auto max-w-md bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg shadow-lg text-center font-medium z-50 animate-in slide-in-from-top duration-300">
            {errorMessage}
            <button 
              onClick={() => setErrorMessage("")} 
              className="ml-2 text-red-600 font-bold hover:text-red-800 transition-colors"
              aria-label="Cerrar mensaje de error"
            >
              ×
            </button>
          </div>
        )}
        
        {/* Offline alert */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-100 border-b border-red-200 text-red-800 p-3 text-center font-medium z-50">
            Parece que estás sin conexión. Verifica tu internet para continuar.
          </div>
        )}
        
        {/* Contenido principal */}
        <div className="max-w-3xl w-full text-center">
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border-orange-500/30 shadow-2xl border-2 overflow-hidden">
            <CardContent className="p-4 sm:p-8">
              {/* Logo section optimizada */}
              <div className="mb-4 sm:mb-8">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-600/20 blur-lg" />
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-orange-500 shadow-lg shadow-orange-500/30 z-10">
                    <img
                      src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                      alt="Logo Plan A"
                      className="w-full h-full object-cover"
                      fetchPriority="high"
                      width="112"
                      height="112"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              {/* Content section */}
              <div className="mb-6 sm:mb-10">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Conheça o <span className="text-red-500">Truco de 3 pasos</span> que está funcionando 
                  <br />
                  <span className="text-red-500">hace que las mujeres regresen incluso después de una traición</span>
                </h1>

                <p className="text-base sm:text-lg text-white font-semibold mb-2">
                  ✓ Funciona con cualquier mujer...
                </p>
                <p className="text-white mb-4 sm:mb-6">
                  sin mensajes largos, desaparecer ni jugar juegos.
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-green-500 mb-4 sm:mb-6">
                  ✅ ¿Y lo mejor? Es el mismo que usaron grandes celebridades.
                </h2>

                {/* Segunda imagen optimizada */}
                <img 
                  src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/02-IMAGE-INICIAL-NOVA.png" 
                  alt="Imagen de ejemplo" 
                  className="w-full h-auto rounded-lg mb-6 sm:mb-8"
                  width="600"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* CTA Section */}
              <div>
                <Button
                  onClick={handleStart}
                  disabled={isLoading || !isOnline}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 sm:py-5 px-4 sm:px-6 md:px-8 rounded-full text-base sm:text-lg md:text-xl shadow-lg transition-all duration-300 mb-4 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  aria-label="Iniciar test personalizado"
                >
                  {isLoading ? (
                    <>
                      <span>PREPARANDO...</span>
                      <div className="ml-2 w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      QUIERO DESCUBRIR EL TRUCO
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" aria-hidden="true" />
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-gray-400 mt-4 flex items-center justify-center">
                  <Lock className="w-3 h-3 mr-1" aria-hidden="true" />
                  Tus respuestas son confidenciales y están protegidas
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Script inline optimizado */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            'use strict';
            
            // Optimización crítica de LCP
            const optimizeLCP = () => {
              const criticalImages = document.querySelectorAll('img[fetchpriority="high"]');
              criticalImages.forEach(img => {
                if (!img.complete) {
                  img.style.contentVisibility = 'visible';
                }
              });
            };
            
            // Ejecutar inmediatamente
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', optimizeLCP, { once: true });
            } else {
              optimizeLCP();
            }
            
            // Preload inteligente
            const preloadNextPages = () => {
              const pages = ['/quiz/1', '/quiz/2'];
              pages.forEach((url, index) => {
                setTimeout(() => {
                  const link = document.createElement('link');
                  link.rel = 'prefetch';
                  link.href = url;
                  link.as = 'document';
                  document.head.appendChild(link);
                }, index * 500);
              });
            };
            
            // Ejecutar después de load
            window.addEventListener('load', () => {
              setTimeout(preloadNextPages, 1000);
            }, { once: true, passive: true });
            
            // Lazy loading nativo fallback
            if ('loading' in HTMLImageElement.prototype) {
              const lazyImages = document.querySelectorAll('img[loading="lazy"]');
              lazyImages.forEach(img => {
                if (img.loading !== 'lazy') img.loading = 'lazy';
              });
            }
            
            // Performance observer optimizado
            if ('PerformanceObserver' in window) {
              try {
                const observer = new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  const lcpEntry = entries[entries.length - 1];
                  if (lcpEntry && lcpEntry.startTime > 2500) {
                    console.warn('LCP alto detectado:', Math.round(lcpEntry.startTime), 'ms');
                  }
                });
                observer.observe({ type: 'largest-contentful-paint', buffered: true });
              } catch (e) {
                // Silencioso si no es compatible
              }
            }
          })();
        `
      }} />
    </>
  );
}
