"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Image from "next/image"

// Função otimizada para enviar eventos ao Google Analytics
const enviarEvento = (nombre_evento, propriedades = {}) => {
  if (typeof window === 'undefined') return;
  
  const runWhenIdle = (callback) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback);
    } else {
      setTimeout(callback, 200);
    }
  };

  runWhenIdle(() => {
    try {
      if (window.gtag) {
        window.gtag('event', nombre_evento, propriedades);
      } else {
        window._gtagEvents = window._gtagEvents || [];
        window._gtagEvents.push({event: nombre_evento, props: propriedades});
      }
    } catch (error) {
      // Silenciar erros em produção
    }
  });
};

export default function HomePage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [urgencyCount, setUrgencyCount] = useState(127)
  const [loadingProgress, setLoadingProgress] = useState(10)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  
  // Detectar dispositivos de baixo desempenho - implementação otimizada
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Simplificar detecção
    const isLowEnd = 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || 
      (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
      window.innerWidth < 768;
    
    setIsLowEndDevice(isLowEnd);
    setIsOnline(navigator.onLine);
    
    // Simplificar listeners
    const handleConnectionChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);
  
  // Efeito para métricas - implementação otimizada
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Marcar como carregado imediatamente para melhorar LCP
    setIsLoaded(true);
    
    // Usar IntersectionObserver para carregar métricas apenas quando visível
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Registrar visualização quando visível
        const runMetrics = () => {
          enviarEvento('visualizo_pagina_inicial', {
            device_type: window.innerWidth <= 768 ? 'mobile' : 'desktop'
          });
          
          // Registrar métricas apenas se disponíveis
          if ('performance' in window && 'getEntriesByType' in window.performance) {
            const perfEntries = window.performance.getEntriesByType('navigation');
            if (perfEntries && perfEntries.length > 0) {
              const perfData = perfEntries[0];
              enviarEvento('metricas_rendimiento', {
                domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                deviceType: window.innerWidth <= 768 ? 'mobile' : 'desktop'
              });
            }
          }
        };
        
        // Executar métricas após a página estar completamente carregada
        if (document.readyState === 'complete') {
          runMetrics();
        } else {
          window.addEventListener('load', runMetrics, { once: true });
        }
        
        observer.disconnect();
      }
    });
    
    // Observar o elemento principal
    const mainElement = document.querySelector('.min-h-screen');
    if (mainElement) {
      observer.observe(mainElement);
    }
    
    // Contador de urgência otimizado - usar requestAnimationFrame
    let urgencyUpdateTime = Date.now();
    let urgencyFrameId;
    
    const updateUrgency = () => {
      const now = Date.now();
      if (now - urgencyUpdateTime > 45000) { // 45 segundos
        setUrgencyCount(prev => prev + Math.floor(Math.random() * 3));
        urgencyUpdateTime = now;
      }
      urgencyFrameId = requestAnimationFrame(updateUrgency);
    };
    
    urgencyFrameId = requestAnimationFrame(updateUrgency);
    
    return () => {
      if (urgencyFrameId) {
        cancelAnimationFrame(urgencyFrameId);
      }
      observer.disconnect();
    };
  }, []);
  
  // Função otimizada para iniciar o quiz
  const handleStart = () => {
    // Evitar múltiplos cliques
    if (isLoading) return;
    
    // Mostrar feedback visual imediato
    setIsLoading(true);
    setLoadingMessage("Preparando tu test personalizado...");
    setLoadingProgress(15);
    
    // Registrar evento de início
    enviarEvento('inicio_quiz', {
      device_type: typeof window !== 'undefined' && window.innerWidth <= 768 ? 'mobile' : 'desktop'
    });
    
    try {
      if (typeof window !== 'undefined') {
        // Usar requestAnimationFrame para animação fluida
        let progress = 15;
        let lastTimestamp = 0;
        let animationId;
        
        const updateProgress = (timestamp) => {
          if (!lastTimestamp) lastTimestamp = timestamp;
          const elapsed = timestamp - lastTimestamp;
          
          if (elapsed > 50 && progress < 90) { // Atualizar a cada 50ms
            progress += 5;
            setLoadingProgress(progress);
            lastTimestamp = timestamp;
          }
          
          if (progress < 90) {
            animationId = requestAnimationFrame(updateProgress);
          }
        };
        
        animationId = requestAnimationFrame(updateProgress);
        
        // Preservar UTMs de forma otimizada
        let targetUrl = '/quiz/1';
        
        // Verificar UTMs apenas uma vez
        if (window.location.search) {
          const utmParams = new URLSearchParams();
          const currentParams = new URLSearchParams(window.location.search);
          
          // Extrair apenas parâmetros UTM
          for (const [key, value] of currentParams.entries()) {
            if (key.startsWith('utm_')) {
              utmParams.append(key, value);
            }
          }
          
          // Adicionar UTMs à URL de destino se existirem
          const utmString = utmParams.toString();
          if (utmString) {
            targetUrl += `?${utmString}`;
          }
        }
        
        // Navegação otimizada
        setTimeout(() => {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          setLoadingProgress(100);
          
          // Prefetch da próxima página
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = targetUrl;
          document.head.appendChild(link);
          
          // Navegar após prefetch
          setTimeout(() => router.push(targetUrl), 100);
        }, 800);
      }
    } catch (error) {
      console.error('Error al procesar redirección:', error);
      setLoadingProgress(0);
      setIsLoading(false);
      setErrorMessage("Hubo un problema al iniciar el test. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      <Head>
        {/* Preload crítico e otimizado */}
        <link 
          rel="preload" 
          href="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png" 
          as="image"
          fetchpriority="high"
          type="image/webp" // Sugerir formato moderno
          imagesizes="112px"
          imagesrcset="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.webp 112w" // Sugerir versão WebP
        />
        
        {/* Preconnect otimizado */}
        <link rel="preconnect" href="https://comprarplanseguro.shop" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://comprarplanseguro.shop" />
        
        {/* Meta tags otimizados */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content="Conheça o Truque de 3 etapas que está fazendo mulheres voltarem até depois da traição" />
        <meta name="theme-color" content="#000000" />
        
        {/* Otimização de cache */}
        <meta httpEquiv="Cache-Control" content="max-age=86400" />
      </Head>
      
      <div 
        className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4"
        style={{ minHeight: '100vh' }} // Garantir altura mínima para evitar CLS
      >
        {/* Indicador de carga otimizado */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-white text-lg">{loadingMessage || "Cargando..."}</p>
            <div className="w-64 h-2 bg-gray-700 rounded-full mt-4">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Mensagem de erro condicional */}
        {errorMessage && (
          <div className="fixed top-4 left-0 right-0 mx-auto max-w-md bg-red-100 text-red-800 p-4 rounded-lg shadow-lg text-center font-medium z-50">
            {errorMessage}
            <button 
              onClick={() => setErrorMessage("")} 
              className="ml-2 text-red-600 font-bold"
              aria-label="Cerrar mensaje de error"
            >
              ×
            </button>
          </div>
        )}
        
        {/* Alerta de offline condicional */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-100 text-red-800 p-3 text-center font-medium z-50">
            Parece que estás sin conexión. Verifica tu internet para continuar.
          </div>
        )}
        
        {/* Conteúdo principal otimizado */}
        <div className="max-w-3xl w-full text-center">
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border-orange-500/30 shadow-2xl border-2">
            <CardContent className="p-4 sm:p-8">
              <div className="mb-4 sm:mb-8">
                {/* Imagem principal otimizada - LCP */}
                <div 
                  className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6"
                  style={{ aspectRatio: '1/1', minHeight: '96px' }} // Reservar espaço para evitar CLS
                >
                  {/* Efeitos de luz simplificados */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-600/20 blur-lg"></div>
                  
                  {/* Imagem otimizada para LCP */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-orange-500 shadow-lg shadow-orange-500/30 z-10">
                    <Image
                      src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                      alt="Logo Plan A"
                      width={112}
                      height={112}
                      priority
                      className="object-cover"
                      id="lcp-image"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6 sm:mb-10">
                <h1 
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" 
                  id="lcp-title"
                  style={{ minHeight: '3.5rem' }} // Reservar espaço para evitar CLS
                >
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

                {/* Imagem otimizada com dimensões explícitas */}
                <div style={{ aspectRatio: '600/400', maxWidth: '100%', margin: '0 auto', minHeight: '200px' }}>
                  <Image 
                    src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/02-IMAGE-INICIAL-NOVA.png" 
                    alt="Imagen de ejemplo" 
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg mb-6 sm:mb-8"
                    loading="lazy"
                  />
                </div>
              </div>

              <div>
                {/* Botão otimizado */}
                <Button
                  onClick={handleStart}
                  disabled={isLoading || !isOnline}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 sm:py-5 px-4 sm:px-6 md:px-8 rounded-full text-base sm:text-lg md:text-xl shadow-lg transition-all duration-300 mb-4 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  aria-label="Iniciar test"
                  style={{ minHeight: '3.5rem' }} // Altura mínima para evitar CLS
                >
                  {isLoading ? (
                    <>
                      <span>PREPARANDO...</span>
                      <div className="ml-2 w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
      
      {/* Script otimizado para LCP */}
      <script type="module" dangerouslySetInnerHTML={{
        __html: `
          // Otimização de LCP
          const markLCP = () => {
            const lcpImage = document.getElementById('lcp-image');
            if (lcpImage && !lcpImage.hasAttribute('fetchpriority')) {
              lcpImage.setAttribute('fetchpriority', 'high');
            }
            
            // Monitorar LCP para otimização
            if ('PerformanceObserver' in window) {
              try {
                new PerformanceObserver((entryList) => {
                  const entries = entryList.getEntries();
                  if (entries.length > 0) {
                    const lcpEntry = entries[entries.length - 1];
                    const lcpTime = Math.round(lcpEntry.startTime);
                    
                    // Reportar LCP apenas se relevante (>2.5s)
                    if (lcpTime > 2500) {
                      console.log('LCP:', lcpTime, 'ms');
                    }
                  }
                }).observe({type: 'largest-contentful-paint', buffered: true});
              } catch (e) {}
            }
          };
          
          // Executar o mais cedo possível
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', markLCP);
          } else {
            markLCP();
          }
          
          // Carregar recursos não críticos depois
          const loadNonCritical = () => {
            // Pré-carregar páginas seguintes
            const nextPages = ['/quiz/1', '/quiz/2'];
            nextPages.forEach(url => {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = url;
              document.head.appendChild(link);
            });
          };
          
          // Usar requestIdleCallback para carregar recursos não críticos
          if ('requestIdleCallback' in window) {
            requestIdleCallback(loadNonCritical, { timeout: 2000 });
          } else {
            setTimeout(loadNonCritical, 2000);
          }
        `
      }} />
      
      {/* Fallback para navegadores antigos */}
      <script nomodule dangerouslySetInnerHTML={{
        __html: `
          // Versão simplificada para navegadores antigos
          document.addEventListener('DOMContentLoaded', function() {
            // Código simplificado para navegadores legados
            var lcpImage = document.getElementById('lcp-image');
            if (lcpImage) {
              lcpImage.setAttribute('importance', 'high');
            }
          });
        `
      }} />
    </>
  )
}
