import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plano A - Reconquista Rápida",
  description: "O sistema completo para reconquistar seu amor perdido em 21 dias ou menos",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KBSLRJ2FJF" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KBSLRJ2FJF');
          `}
        </Script>

        {/* UTMfy - Configuração Corrigida */}
        <Script id="utmfy-config" strategy="afterInteractive">
          {`
            // Configuração do pixel
            window.pixelId = "683e4507be02a8b1bece6041";
            
            // Configurações adicionais para resolver problemas de CORS
            window.utmifyConfig = {
              pixelId: "683e4507be02a8b1bece6041",
              domain: "plan-a-recuperacion-rapida.vercel.app",
              debug: true,
              retryOnError: true,
              fallbackTracking: true
            };
          `}
        </Script>

        {/* UTMfy Pixel com tratamento de erro melhorado */}
        <Script id="utmfy-pixel-improved" strategy="afterInteractive">
          {`
            (function() {
              var script = document.createElement("script");
              script.async = true;
              script.defer = true;
              script.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
              
              script.onload = function() {
                console.log('✅ UTMfy Pixel carregado');
                
                // Configurar fallback para problemas de CORS
                if (window.utmify) {
                  const originalTrack = window.utmify.track;
                  window.utmify.track = function(eventName, eventData) {
                    try {
                      return originalTrack.call(this, eventName, eventData);
                    } catch (error) {
                      console.warn('⚠️ Erro no tracking UTMfy, usando fallback:', error);
                      
                      // Fallback: enviar para Google Analytics
                      if (typeof gtag !== 'undefined') {
                        gtag('event', eventName, {
                          custom_parameter: JSON.stringify(eventData),
                          event_category: 'utmfy_fallback'
                        });
                        console.log('📊 Evento enviado via GA como fallback');
                      }
                      
                      // Fallback: armazenar localmente para retry
                      const fallbackEvents = JSON.parse(localStorage.getItem('utmfy_fallback_events') || '[]');
                      fallbackEvents.push({
                        event: eventName,
                        data: eventData,
                        timestamp: new Date().toISOString()
                      });
                      localStorage.setItem('utmfy_fallback_events', JSON.stringify(fallbackEvents));
                      
                      return Promise.resolve();
                    }
                  };
                }
              };
              
              script.onerror = function() {
                console.error('❌ Erro ao carregar UTMfy Pixel');
                
                // Criar mock da UTMfy para evitar erros
                window.utmify = {
                  track: function(eventName, eventData) {
                    console.log('🔄 UTMfy Mock - Evento:', eventName, eventData);
                    
                    // Enviar para Google Analytics como backup
                    if (typeof gtag !== 'undefined') {
                      gtag('event', eventName, {
                        custom_parameter: JSON.stringify(eventData),
                        event_category: 'utmfy_mock'
                      });
                    }
                    
                    return Promise.resolve();
                  }
                };
              };
              
              document.head.appendChild(script);
            })();
          `}
        </Script>

        {/* UTMfy Tracking Script */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="afterInteractive"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          onLoad={() => {
            console.log("✅ UTMfy Tracking Script carregado")
          }}
          onError={() => {
            console.error("❌ Erro no UTMfy Tracking Script")
          }}
        />

        {/* Retry de eventos fallback */}
        <Script id="utmfy-retry-fallback" strategy="afterInteractive">
          {`
            // Tentar reenviar eventos que falharam
            setTimeout(() => {
              const fallbackEvents = JSON.parse(localStorage.getItem('utmfy_fallback_events') || '[]');
              
              if (fallbackEvents.length > 0 && window.utmify) {
                console.log('🔄 Tentando reenviar', fallbackEvents.length, 'eventos fallback');
                
                fallbackEvents.forEach(async (item, index) => {
                  try {
                    await window.utmify.track(item.event, item.data);
                    console.log('✅ Evento fallback reenviado:', item.event);
                  } catch (error) {
                    console.warn('⚠️ Falha ao reenviar evento fallback:', error);
                  }
                });
                
                // Limpar eventos após tentativa
                localStorage.removeItem('utmfy_fallback_events');
              }
            }, 10000); // Tentar após 10 segundos
          `}
        </Script>

        {/* Monitor de status da UTMfy */}
        <Script id="utmfy-status-monitor" strategy="afterInteractive">
          {`
            setTimeout(() => {
              console.log('📊 === STATUS UTMfy ===');
              console.log('Pixel ID:', window.pixelId);
              console.log('UTMfy disponível:', typeof window.utmify !== 'undefined');
              console.log('Domínio atual:', window.location.hostname);
              
              // Testar conectividade
              fetch('https://cdn.utmify.com.br/scripts/pixel/pixel.js', { method: 'HEAD' })
                .then(() => console.log('✅ CDN UTMfy acessível'))
                .catch(() => console.error('❌ CDN UTMfy inacessível'));
                
              // Verificar se há eventos pendentes
              const pendingEvents = localStorage.getItem('utmfy_fallback_events');
              if (pendingEvents) {
                console.log('📝 Eventos pendentes:', JSON.parse(pendingEvents).length);
              }
              
              console.log('📊 === FIM STATUS ===');
            }, 5000);
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}
