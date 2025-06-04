import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plano A - Reconquista Rápida",
  description: "O sistema completo para reconquistar seu amor perdido em 21 dias ou menos",
  generator: 'v0.dev'
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KBSLRJ2FJF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KBSLRJ2FJF');
          `}
        </Script>

        {/* UTMfy Pixel de Rastreamento */}
        <Script id="utmfy-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "683e4507be02a8b1bece6041";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            a.onload = function() {
              console.log('✅ UTMfy Pixel carregado com sucesso');
              console.log('Pixel ID configurado:', window.pixelId);
            };
            a.onerror = function() {
              console.error('❌ Erro ao carregar UTMfy Pixel');
            };
            document.head.appendChild(a);
          `}
        </Script>

        {/* UTMfy Tracking Script */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="afterInteractive"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          onLoad={() => {
            console.log('✅ UTMfy Tracking Script carregado com sucesso');
          }}
          onError={() => {
            console.error('❌ Erro ao carregar UTMfy Tracking Script');
          }}
        />

        {/* Debug Completo da UTMfy */}
        <Script id="utmfy-complete-debug" strategy="afterInteractive">
          {`
            // Aguarda um pouco para garantir que tudo carregou
            setTimeout(() => {
              console.log('🔍 === DEBUG COMPLETO UTMfy ===');
              
              // 1. Verificar se os scripts carregaram
              console.log('Pixel ID definido:', window.pixelId);
              console.log('UTMfy disponível:', typeof window.utmify !== 'undefined');
              console.log('Parâmetros UTM disponíveis:', window.utmParams);
              
              // 2. Verificar URL atual e parâmetros
              console.log('URL atual:', window.location.href);
              console.log('Parâmetros da URL:', Object.fromEntries(new URLSearchParams(window.location.search)));
              
              // 3. Verificar localStorage
              const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'xcod', 'src'];
              const storedUtms = {};
              utmKeys.forEach(key => {
                const value = localStorage.getItem(key);
                if (value) storedUtms[key] = value;
              });
              console.log('UTMs armazenados no localStorage:', storedUtms);
              
              // 4. Verificar se há eventos sendo enviados
              if (window.utmify && typeof window.utmify.track === 'function') {
                console.log('✅ Função de tracking disponível');
                // Testar envio de evento
                try {
                  window.utmify.track('page_view', {
                    page: window.location.pathname,
                    title: document.title
                  });
                  console.log('✅ Evento de teste enviado com sucesso');
                } catch (error) {
                  console.error('❌ Erro ao enviar evento de teste:', error);
                }
              } else {
                console.warn('⚠️ Função de tracking não disponível');
              }
              
              // 5. Verificar se o pixel está funcionando
              if (window.pixelId) {
                console.log('✅ Pixel ID configurado corretamente');
              } else {
                console.error('❌ Pixel ID não encontrado');
              }
              
              // 6. Verificar network requests (se possível)
              console.log('🌐 Verifique a aba Network do DevTools para requisições para:');
              console.log('- cdn.utmify.com.br');
              console.log('- api.utmify.com.br');
              
              console.log('🔍 === FIM DEBUG UTMfy ===');
            }, 5000);
          `}
        </Script>

        {/* Teste de Eventos UTMfy */}
        <Script id="utmfy-event-test" strategy="afterInteractive">
          {`
            // Função para testar eventos manualmente
            window.testUtmfyEvent = function(eventName, eventData) {
              if (window.utmify && typeof window.utmify.track === 'function') {
                try {
                  window.utmify.track(eventName || 'test_event', eventData || {
                    test: true,
                    timestamp: new Date().toISOString()
                  });
                  console.log('✅ Evento enviado:', eventName);
                  return true;
                } catch (error) {
                  console.error('❌ Erro ao enviar evento:', error);
                  return false;
                }
              } else {
                console.error('❌ UTMfy não disponível para envio de eventos');
                return false;
              }
            };
            
            // Teste automático após carregamento
            setTimeout(() => {
              window.testUtmfyEvent('page_loaded', {
                url: window.location.href,
                referrer: document.referrer,
                timestamp: new Date().toISOString()
              });
            }, 3000);
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}
