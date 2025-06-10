"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Head from "next/head"

// Função otimizada para enviar eventos ao Google Analytics
const enviarEvento = (nombre_evento, propriedades = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  setTimeout(() => {
    try {
      window.gtag('event', nombre_evento, propriedades);
    } catch (error) {
      // Silenciar erros em produção
    }
  }, 100);
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
  
  // Detectar dispositivos de baixo desempenho - implementação simplificada
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
  
  // Efeito para métricas - implementação simplificada
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Marcar como carregado imediatamente
    setIsLoaded(true);
    
    // Registrar visualização após carregamento
    const handleLoad = () => {
      enviarEvento('visualizo_pagina_inicial', {
        device_type: window.innerWidth <= 768 ? 'mobile' : 'desktop'
      });
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
    
    // Contador de urgência simplificado
    const urgencyInterval = setInterval(() => {
      setUrgencyCount(prev => prev + Math.floor(Math.random() * 3));
    }, 45000);
    
    return () => {
      clearInterval(urgencyInterval);
    };
  }, []);
  
  // Função para iniciar o quiz
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
        // Simulação de progresso simplificada
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 5;
          });
        }, 100);
        
        // Preservar UTMs
        let targetUrl = '/quiz/1';
        
        if (window.location.search) {
          const utmParams = new URLSearchParams();
          const currentParams = new URLSearchParams(window.location.search);
          
          for (const [key, value] of currentParams.entries()) {
            if (key.startsWith('utm_')) {
              utmParams.append(key, value);
            }
          }
          
          const utmString = utmParams.toString();
          if (utmString) {
            targetUrl += `?${utmString}`;
          }
        }
        
        // Navegação simplificada
        setTimeout(() => {
          clearInterval(progressInterval);
          setLoadingProgress(100);
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
        
        {/* CSS crítico inline */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .lcp-image {
              width: 112px;
              height: 112px;
              object-fit: cover;
              border-radius: 9999px;
              border: 4px solid #f97316;
              box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3);
              z-index: 10;
            }
            .main-card {
              background: linear-gradient(to bottom right, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.95));
              backdrop-filter: blur(8px);
              border: 2px solid rgba(249, 115, 22, 0.3);
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              border-radius: 0.5rem;
              padding: 1rem;
            }
            @media (min-width: 640px) {
              .main-card {
                padding: 2rem;
              }
            }
            .cta-button {
              background: linear-gradient(to right, #22c55e, #16a34a);
              color: white;
              font-weight: bold;
              padding: 1rem;
              border-radius: 9999px;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
              transition: all 300ms;
              width: 100%;
              margin-top: 1.5rem;
            }
            .cta-button:hover {
              background: linear-gradient(to right, #16a34a, #15803d);
              transform: translateY(-2px);
            }
            @media (min-width: 640px) {
              .cta-button {
                width: auto;
                padding: 1rem 1.5rem;
              }
            }
            @media (min-width: 768px) {
              .cta-button {
                padding: 1rem 2rem;
                font-size: 1.125rem;
              }
            }
          `
        }} />
      </Head>
      
      {/* Indicador de carga */}
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
      
      {/* Conteúdo principal simplificado */}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center">
          <div className="main-card">
            <div className="mb-4 sm:mb-8">
              {/* Imagem principal otimizada - LCP */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6">
                {/* Efeitos de luz simplificados */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-600/20 blur-lg"></div>
                
                {/* Imagem otimizada para LCP */}
                <img
                  src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/Nova-Imagem-Plan-A-Livro.png"
                  alt="Logo Plan A"
                  width="112"
                  height="112"
                  className="lcp-image"
                  id="lcp-image"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-10">
              <h1 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight" 
                id="lcp-title"
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

              {/* Imagem com container adequado */}
              <div className="w-full mb-8">
                <img 
                  src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/02-IMAGE-INICIAL-NOVA.png" 
                  alt="Imagen de ejemplo" 
                  width="600"
                  height="400"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-4">
              {/* Botão com espaçamento adequado */}
              <button
                onClick={handleStart}
                disabled={isLoading || !isOnline}
                className="cta-button"
                aria-label="Iniciar test"
              >
                {isLoading ? (
                  <>
                    <span>PREPARANDO...</span>
                    <span className="ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </>
                ) : (
                  <>
                    QUIERO DESCUBRIR EL TRUCO
                    <span className="ml-2 inline-block" aria-hidden="true">→</span>
                  </>
                )}
              </button>
              
              <div className="text-xs text-gray-400 mt-4 flex items-center justify-center">
                <span className="mr-1" aria-hidden="true">🔒</span>
                Tus respuestas son confidenciales y están protegidas
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Script otimizado para LCP */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Otimização de LCP
          (function() {
            // Marcar imagem LCP
            var lcpImage = document.getElementById('lcp-image');
            if (lcpImage) {
              lcpImage.setAttribute('fetchpriority', 'high');
              lcpImage.setAttribute('importance', 'high');
            }
            
            // Precarregar próxima página
            setTimeout(function() {
              var link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = '/quiz/1';
              document.head.appendChild(link);
            }, 1000);
          })();
        `
      }} />
    </>
  )
}
