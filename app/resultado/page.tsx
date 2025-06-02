"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Gift, Star, Shield, ArrowRight, Check, Clock, AlertTriangle, BookOpen, Heart, Award, Play, ThumbsUp, User, Users, MessageCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { bonuses, getPersonalizedContent } from "@/lib/quiz-data"
import { enviarEvento } from '../../lib/analytics'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResultPage() {
  const [unlockedBonuses, setUnlockedBonuses] = useState<number[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentBuyers, setRecentBuyers] = useState(3)
  const [userGender, setUserGender] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedBonuses = localStorage.getItem("unlockedBonuses")
    const savedValue = localStorage.getItem("totalValue")
    const savedGender = localStorage.getItem("userGender")

    if (savedBonuses) setUnlockedBonuses(JSON.parse(savedBonuses))
    if (savedValue) setTotalValue(Number.parseInt(savedValue))
    if (savedGender) setUserGender(savedGender)

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Simulate recent buyers with more dynamic behavior
    const interval = setInterval(() => {
      setRecentBuyers((prev) => {
        // Random increase between 1-3 people
        const increase = Math.floor(Math.random() * 3) + 1
        return Math.min(prev + increase, 17)
      })
    }, 30000)

    // Registra visualização da página de resultado
    try {
      enviarEvento('visualizou_resultado');
      console.log('Evento de visualização registrado com sucesso');
    } catch (error) {
      console.error('Erro ao registrar evento de visualização:', error);
    }

    return () => clearInterval(interval)
  }, [])

  const handlePurchase = () => {
    try {
      enviarEvento('clicou_comprar', {
        posicao: 'principal'
      });
    } catch (error) {
      console.error('Erro ao registrar evento de clique:', error);
    }
    window.open("https://pay.cakto.com.br/ko6ftx6_410912", "_blank")
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getPersonalizedTitle = () => {
    if (userGender === "MASCULINO") {
      return "DE REJEITADO A DESEJADO"
    } else if (userGender === "FEMININO") {
      return "DE REJEITADA A DESEJADA"
    }
    return "DE REJEITADO(A) A DESEJADO(A)"
  }

  const getPersonalizedCTA = () => {
    if (userGender === "MASCULINO") {
      return "RECONQUISTAR ELA AGORA"
    } else if (userGender === "FEMININO") {
      return "RECONQUISTAR ELE AGORA"
    }
    return "RECONQUISTAR AGORA"
  }

  const getPersonalizedPronoun = () => {
    return userGender === "FEMININO" ? "ele" : "ela";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4" ref={contentRef}>
      {/* Navegação interna */}

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{getPersonalizedTitle()}</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4">EM 21 DIAS OU MENOS</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="font-bold text-orange-300">Mesmo que {getPersonalizedPronoun()} tenha dito que nunca mais quer te ver</span> e você tenha tentado de tudo sem sucesso.
          </p>

          {/* Comparativo Antes e Depois */}
          <div id="historia" className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gray-50 border-2 border-gray-300 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">ONDE VOCÊ ESTÁ VS. ONDE ESTARÁ</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h4 className="text-xl font-bold text-red-800 mb-4">AGORA</h4>
                    <ul className="text-left space-y-3">
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Sofrendo com a rejeição e a dor da separação</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Tentando estratégias que só pioram a situação</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Sem saber o que fazer para recuperar a atenção {getPersonalizedPronoun() === "ele" ? "dele" : "dela"}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Perdendo noites de sono pensando no que deu errado</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-4">EM 21 DIAS</h4>
                    <ul className="text-left space-y-3">
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Reconquistando a atenção e o interesse {getPersonalizedPronoun() === "ele" ? "dele" : "dela"}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Aplicando estratégias que realmente funcionam</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Vendo {getPersonalizedPronoun()} olhar para você com aquele brilho nos olhos novamente</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Construindo um relacionamento ainda mais forte que antes</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/30 to-red-600/30 blur-2xl animate-pulse"></div>
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/15 to-pink-500/15 blur-lg animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>

                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      scale: [1, 1.02, 1],
                      rotate: [0, 0.8, -0.8, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 bg-white rounded-xl p-3 shadow-2xl border-2 border-orange-400"
                  >
                    <img
                      src="https://optimalhealthscout.shop/wp-content/uploads/2025/06/reconquista-rapida-1.png"
                      alt="Resultado Real de Transformação"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-3 h-3 rounded-full opacity-60 ${
                        i % 3 === 0 ? "bg-orange-400" : i % 3 === 1 ? "bg-yellow-400" : "bg-red-400"
                      }`}
                      animate={{
                        x: [0, Math.random() * 120 - 60, 0],
                        y: [0, Math.random() * 120 - 60, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1.8, 0.5],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.4,
                      }}
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`,
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sobre o Criador do Método */}
          <div id="metodo" className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white border-2 border-orange-500">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-orange-400 flex-shrink-0">
                    <img 
                      src="https://optimalhealthscout.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-01T212625.544.png" 
                      alt="Criador do Método" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-orange-400 mb-2">CONHEÇA O CRIADOR DO MÉTODO</h3>
                    <p className="text-gray-300 mb-4">
                      Depois de ajudar mais de <span className="text-orange-300 font-bold">3.847 pessoas</span> a reconquistarem seus relacionamentos, 
                      desenvolvi um sistema que funciona para <span className="text-orange-300 font-bold">qualquer tipo de término</span>, 
                      mesmo nos casos mais difíceis.
                    </p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        87% DE SUCESSO
                      </div>
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ESPECIALISTA EM RECONQUISTA
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      "Minha missão é ajudar pessoas a recuperarem o amor que parecia perdido para sempre."
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
          
          {/* Timeline de Resultados */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-3xl font-bold text-white text-center mb-8">O QUE ESPERAR NOS PRÓXIMOS 21 DIAS</h3>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-500"></div>
              
              {/* Dia 1-3 */}
              <div className="relative z-10 mb-12">
                <div className="flex items-center">
                  <div className="flex-grow md:w-5/12 md:pr-8 text-right hidden md:block">
                    <h4 className="text-xl font-bold text-orange-400">DIAS 1-3</h4>
                    <p className="text-gray-300">Fase de Desintoxicação Emocional</p>
                  </div>
                  
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center z-10 mx-4 md:mx-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  
                  <div className="flex-grow md:w-5/12 md:pl-8 md:hidden">
                    <h4 className="text-xl font-bold text-orange-400">DIAS 1-3</h4>
                    <p className="text-gray-300">Fase de Desintoxicação Emocional</p>
                  </div>
                  
                  <Card className="bg-gray-800 border border-orange-500 md:w-5/12 md:pl-8 hidden md:block">
                    <CardContent className="p-4">
                      <ul className="text-gray-300 space-y-2">
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                          <span>Parar comportamentos que afastam {getPersonalizedPronoun()}</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                          <span>Aplicar a técnica do "Espaço Magnético"</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                          <span>Recuperar sua estabilidade emocional</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-gray-800 border border-orange-500 mt-4 md:hidden">
                  <CardContent className="p-4">
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Parar comportamentos que afastam {getPersonalizedPronoun()}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Aplicar a técnica do "Espaço Magnético"</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Recuperar sua estabilidade emocional</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Dia 4-7 */}
              <div className="relative z-10 mb-12">
                <div className="flex items-center">
                  <Card className="bg-gray-800 border border-orange-500 md:w-5/12 md:pr-8 hidden md:block">
                    <CardContent className="p-4">
                      <ul className="text-gray-300 space-y-2 text-right">
                        <li className="flex items-start justify-end">
                          <span>Primeiros sinais de curiosidade {getPersonalizedPronoun() === "ele" ? "dele" : "dela"}</span>
                          <Check className="w-4 h-4 text-green-400 ml-2 mt-1" />
                        </li>
                        <li className="flex items-start justify-end">
                          <span>Implementar a técnica do "Gatilho de Nostalgia"</span>
                          <Check className="w-4 h-4 text-green-400 ml-2 mt-1" />
                        </li>
                        <li className="flex items-start justify-end">
                          <span>Primeiros contatos indiretos</span>
                          <Check className="w-4 h-4 text-green-400 ml-2 mt-1" />
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <div className="flex-grow md:w-5/12 md:pr-8 text-right hidden md:block">
                    <h4 className="text-xl font-bold text-orange-400">DIAS 4-7</h4>
                    <p className="text-gray-300">Fase de Reconexão Inicial</p>
                  </div>
                  
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center z-10 mx-4 md:mx-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  
                  <div className="flex-grow md:w-5/12 md:pl-8">
                    <h4 className="text-xl font-bold text-orange-400 md:hidden">DIAS 4-7</h4>
                    <p className="text-gray-300 md:hidden">Fase de Reconexão Inicial</p>
                  </div>
                </div>
                
                <Card className="bg-gray-800 border border-orange-500 mt-4 md:hidden">
                  <CardContent className="p-4">
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Primeiros sinais de curiosidade {getPersonalizedPronoun() === "ele" ? "dele" : "dela"}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Implementar a técnica do "Gatilho de Nostalgia"</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Primeiros contatos indiretos</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Dia 8-14 */}
              <div className="relative z-10 mb-12">
                <div className="flex items-center">
                  <div className="flex-grow md:w-5/12 md:pr-8 text-right hidden md:block">
                    <h4 className="text-xl font-bold text-orange-400">DIAS 8-14</h4>
                    <p className="text-gray-300">Fase de Atração Renovada</p>
                  </div>
                  
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center z-10 mx-4 md:mx-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  
                  <div className="flex-grow md:w-5/12 md:pl-8 md:hidden">
                    <h4 className="text-xl font-bold text-orange-400">DIAS 8-14</h4>
                    <p className="text-gray-300">Fase de Atração Renovada</p>
                  </div>
                  
                  <Card className="bg-gray-800 border border-orange-500 md:w-5/12 md:pl-8 hidden md:block">
                    <CardContent className="p-4">
                      <ul className="text-gray-300 space-y-2">
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                          <span>Contato direto e reaproximação</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                          <span>Despertar do interesse romântico</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                          <span>Aplicar os 7 Pilares da Presença Irresistível</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-gray-800 border border-orange-500 mt-4 md:hidden">
                  <CardContent className="p-4">
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Contato direto e reaproximação</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Despertar do interesse romântico</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Aplicar os 7 Pilares da Presença Irresistível</span>
                      </li>
                    </ul>
                                  </CardContent>
                </Card>
              </div>
              
              {/* Dia 15-21 */}
              <div className="relative z-10">
                <div className="flex items-center">
                  <Card className="bg-gray-800 border border-orange-500 md:w-5/12 md:pr-8 hidden md:block">
                    <CardContent className="p-4">
                      <ul className="text-gray-300 space-y-2 text-right">
                        <li className="flex items-start justify-end">
                          <span>Reconquista completa e reconciliação</span>
                          <Check className="w-4 h-4 text-green-400 ml-2 mt-1" />
                        </li>
                        <li className="flex items-start justify-end">
                          <span>Restabelecimento da conexão emocional profunda</span>
                          <Check className="w-4 h-4 text-green-400 ml-2 mt-1" />
                        </li>
                        <li className="flex items-start justify-end">
                          <span>Construção de um relacionamento mais forte</span>
                          <Check className="w-4 h-4 text-green-400 ml-2 mt-1" />
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <div className="flex-grow md:w-5/12 md:pr-8 text-right hidden md:block">
                    <h4 className="text-xl font-bold text-orange-400">DIAS 15-21</h4>
                    <p className="text-gray-300">Fase de Reconquista Total</p>
                  </div>
                  
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center z-10 mx-4 md:mx-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  
                  <div className="flex-grow md:w-5/12 md:pl-8">
                    <h4 className="text-xl font-bold text-orange-400 md:hidden">DIAS 15-21</h4>
                    <p className="text-gray-300 md:hidden">Fase de Reconquista Total</p>
                  </div>
                </div>
                
                <Card className="bg-gray-800 border border-orange-500 mt-4 md:hidden">
                  <CardContent className="p-4">
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Reconquista completa e reconciliação</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Restabelecimento da conexão emocional profunda</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1" />
                        <span>Construção de um relacionamento mais forte</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Este método é para você? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-orange-400 text-center mb-6">ESTE MÉTODO É PARA VOCÊ?</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-green-400 mb-4">ESTE MÉTODO É PARA VOCÊ SE...</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                        <span>Seu relacionamento terminou recentemente ou há algum tempo</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                        <span>Você ainda ama {getPersonalizedPronoun()} e quer uma segunda chance</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                        <span>Já tentou de tudo, mas nada funcionou até agora</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                        <span>{getPersonalizedPronoun() === "ele" ? "Ele" : "Ela"} disse que não quer mais nada com você</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                        <span>Você está disposto a seguir um método comprovado</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-red-400 mb-4">ESTE MÉTODO NÃO É PARA VOCÊ SE...</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-1" />
                        <span>Você só quer manipular {getPersonalizedPronoun()} por motivos egoístas</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-1" />
                        <span>Não está disposto a fazer mudanças pessoais</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-1" />
                        <span>O relacionamento envolvia abuso ou violência</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-1" />
                        <span>Você não está comprometido com o processo de 21 dias</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-1" />
                        <span>Espera resultados mágicos sem nenhum esforço</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 bg-orange-100 p-4 rounded-lg text-center">
                  <h4 className="text-xl font-bold text-orange-800 mb-2">POR QUE ISSO FUNCIONA QUANDO NADA MAIS FUNCIONOU?</h4>
                  <p className="text-orange-700">
                    Porque aborda as <span className="font-bold">causas emocionais profundas</span> do término, 
                    não apenas os sintomas superficiais. O método trabalha com os 7 Pilares da Presença Irresistível, 
                    ativando gatilhos psicológicos que despertam o desejo natural {getPersonalizedPronoun() === "ele" ? "dele" : "dela"} por você.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Detalhamento dos Módulos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          id="modulos"
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">CONTEÚDO DETALHADO DO PROGRAMA</h3>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-6">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-orange-400">PLANO A - RECONQUISTA RÁPIDA</h4>
                    <p className="text-orange-300 font-semibold text-lg">Sistema Completo de Reconquista em 21 Dias</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white p-3">
                      <h5 className="text-xl font-bold">MÓDULO 1: FUNDAMENTOS DA RECONQUISTA</h5>
                    </div>
                    <div className="p-4 text-gray-300">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Diagnóstico do Término</span>
                            <p className="text-sm">Identifique exatamente por que o relacionamento acabou e como isso afeta sua estratégia</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Protocolo de Emergência de 72 horas</span>
                            <p className="text-sm">O que fazer imediatamente para evitar erros fatais que impossibilitam a reconquista</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Mapeamento Emocional</span>
                            <p className="text-sm">Entenda o estado emocional atual {getPersonalizedPronoun() === "ele" ? "dele" : "dela"} e como isso influencia suas chances</p>
                          </div>
                        </li>
                      </ul>
                      
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white p-3">
                      <h5 className="text-xl font-bold">MÓDULO 2: OS 7 PILARES DA PRESENÇA IRRESISTÍVEL</h5>
                    </div>
                    <div className="p-4 text-gray-300">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Pilar 1: Independência Emocional</span>
                            <p className="text-sm">Como se tornar emocionalmente atraente mesmo após o término</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Pilar 2: Comunicação Magnética</span>
                            <p className="text-sm">As exatas palavras e frases que despertam interesse imediato</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Pilares 3-7: Revelados no programa</span>
                            <p className="text-sm">Os 5 pilares restantes que completam o sistema de reconquista</p>
                          </div>
                        </li>
                      </ul>
                      
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white p-3">
                      <h5 className="text-xl font-bold">MÓDULO 3: ESTRATÉGIAS PARA CADA TIPO DE TÉRMINO</h5>
                    </div>
                    <div className="p-4 text-gray-300">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-700/40 p-3 rounded-lg">
                          <h6 className="font-bold text-orange-300 mb-1">TÉRMINO POR TRAIÇÃO</h6>
                          <p className="text-sm">Protocolo específico para recuperar a confiança e superar a mágoa</p>
                        </div>
                        <div className="bg-gray-700/40 p-3 rounded-lg">
                          <h6 className="font-bold text-orange-300 mb-1">TÉRMINO POR DESGASTE</h6>
                          <p className="text-sm">Como reacender a chama e trazer novidade ao relacionamento</p>
                        </div>
                        <div className="bg-gray-700/40 p-3 rounded-lg">
                          <h6 className="font-bold text-orange-300 mb-1">TÉRMINO POR BRIGAS</h6>
                          <p className="text-sm">Técnicas de comunicação para resolver conflitos permanentemente</p>
                        </div>
                        <div className="bg-gray-700/40 p-3 rounded-lg">
                          <h6 className="font-bold text-orange-300 mb-1">TÉRMINO POR TERCEIROS</h6>
                          <p className="text-sm">Como lidar quando há outras pessoas envolvidas</p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white p-3">
                      <h5 className="text-xl font-bold">MÓDULO 4: RECONQUISTA E MANUTENÇÃO</h5>
                    </div>
                    <div className="p-4 text-gray-300">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">O Primeiro Encontro Pós-Término</span>
                            <p className="text-sm">Exatamente o que fazer e dizer para garantir que não seja o último</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Reconstrução da Intimidade</span>
                            <p className="text-sm">Como restabelecer a conexão física e emocional de forma natural</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Prevenção de Recaídas</span>
                            <p className="text-sm">Como garantir que os mesmos problemas não voltem a acontecer</p>
                          </div>
                        </li>
                      </ul>
                      
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-block"
                  >
                    <Button
                      onClick={() => scrollToSection('oferta')}
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      VER OFERTA COMPLETA
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Comparativo com Alternativas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">COMPARE AS ALTERNATIVAS:</h3>
          
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-gray-900 rounded-lg overflow-hidden border-collapse">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-4 text-left">Opção</th>
                  <th className="p-4 text-center">Tempo</th>
                  <th className="p-4 text-center">Custo</th>
                  <th className="p-4 text-center">Taxa de Sucesso</th>
                  <th className="p-4 text-center">Recomendado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-white font-medium">Terapia de Casal</td>
                  <td className="p-4 text-center text-gray-300">3-6 meses</td>
                  <td className="p-4 text-center text-gray-300">R$3.000 - R$7.200</td>
                  <td className="p-4 text-center text-gray-300">40-60%</td>
                  <td className="p-4 text-center text-gray-300">❌</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-white font-medium">Tentar sozinho</td>
                  <td className="p-4 text-center text-gray-300">Indefinido</td>
                  <td className="p-4 text-center text-gray-300">R$0</td>
                  <td className="p-4 text-center text-gray-300">15-20%</td>
                  <td className="p-4 text-center text-gray-300">❌</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-white font-medium">Outros cursos online</td>
                  <td className="p-4 text-center text-gray-300">30-90 dias</td>
                  <td className="p-4 text-center text-gray-300">R$97 - R$497</td>
                  <td className="p-4 text-center text-gray-300">30-50%</td>
                  <td className="p-4 text-center text-gray-300">❌</td>
                </tr>
                <tr className="bg-gradient-to-r from-orange-900/30 to-orange-800/30">
                  <td className="p-4 text-orange-400 font-bold">PLANO A - RECONQUISTA RÁPIDA</td>
                  <td className="p-4 text-center text-orange-300 font-bold">21 dias</td>
                  <td className="p-4 text-center text-orange-300 font-bold">R$37</td>
                  <td className="p-4 text-center text-orange-300 font-bold">87-97%</td>
                  <td className="p-4 text-center text-green-400">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Depoimentos Categorizados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.5 }}
          id="depoimentos"
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-2">RESULTADOS REAIS</h3>
          <p className="text-orange-400 text-center font-semibold mb-8">
            Histórias de pessoas que já passaram pelo que você está passando agora
          </p>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="traicao" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="traicao" className="text-sm md:text-base">Após Traição</TabsTrigger>
                <TabsTrigger value="desgaste" className="text-sm md:text-base">Após Desgaste</TabsTrigger>
                <TabsTrigger value="brigas" className="text-sm md:text-base">Após Brigas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="traicao">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                          <img 
                            src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/04-roberto.png" 
                            alt="Cliente" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">Carlos S.</h5>
                          <div className="flex text-orange-500">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        "Depois que descobri a traição, achei que nunca mais conseguiria confiar nela. 
                        Mas o Módulo 3 me mostrou como reconstruir a confiança passo a passo. Hoje estamos 
                        juntos há 8 meses e nosso relacionamento está mais forte que antes."
                      </p>
                      <div className="text-sm text-gray-500">Reconciliado há 8 meses</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                          <img 
                            src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/01.png" 
                            alt="Cliente" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">Mariana L.</h5>
                          <div className="flex text-orange-500">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        "Ele me traiu e terminou comigo por mensagem. Estava destruída até encontrar este método. Segui exatamente o protocolo de 72 horas 
                        e em 18 dias ele estava implorando para voltar. Hoje estamos noivos!"
                      </p>
                      <div className="text-sm text-gray-500">Reconciliada há 1 ano</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="desgaste">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                          <img 
                            src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/06.png" 
                            alt="Cliente" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">André P.</h5>
                          <div className="flex text-orange-500">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        "Nosso relacionamento de 5 anos tinha perdido a graça. Ela disse que não sentia mais 
                        nada por mim. Apliquei os 7 Pilares da Presença Irresistível e em 3 semanas ela 
                        confessou que estava apaixonada por mim de novo."
                      </p>
                      <div className="text-sm text-gray-500">Reconciliado há 6 meses</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                          <img 
                            src="https://optimalhealthscout.shop/wp-content/uploads/2025/06/2-DEPOIMENTO.png" 
                            alt="Cliente" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">Juliana M.</h5>
                          <div className="flex text-orange-500">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        "Depois de 7 anos, ele disse que não sentia mais a mesma coisa. Achei que era o fim. 
                        Segui o método à risca, especialmente a parte de reconexão emocional, e hoje estamos 
                        mais apaixonados que no início do relacionamento."
                      </p>
                      <div className="text-sm text-gray-500">Reconciliada há 4 meses</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="brigas">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                          <img 
                            src="https://optimalhealthscout.shop/wp-content/uploads/2025/06/f256f28a41fc4b4e1427cc37874429da.jpg" 
                            alt="Cliente" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">Rafael T.</h5>
                          <div className="flex text-orange-500">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        "Brigávamos por qualquer coisa. Nossa última discussão foi tão feia que ela bloqueou 
                        meu número. Usei as técnicas de comunicação do Módulo 3 e hoje conseguimos resolver 
                        nossos problemas sem gritar um com o outro."
                      </p>
                      <div className="text-sm text-gray-500">Reconciliado há 3 meses</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                          <img 
                            src="https://optimalhealthscout.shop/wp-content/uploads/2025/06/4-DEPOIMENTO.png" 
                            alt="Cliente" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">Fernanda C.</h5>
                          <div className="flex text-orange-500">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        "Nosso relacionamento era uma montanha-russa de brigas e reconciliações. Ele terminou 
                        dizendo que estava cansado. Apliquei o método e em 19 dias estávamos juntos novamente, 
                        mas desta vez com ferramentas para resolver conflitos."
                      </p>
                      <div className="text-sm text-gray-500">Reconciliada há 7 meses</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">87%</div>
              <p className="text-white text-lg mb-4">dos usuários relatam primeiros sinais positivos em menos de 14 dias</p>
              <div className="flex justify-center gap-6 text-gray-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-300">3.847+</div>
                  <div className="text-sm">Relacionamentos recuperados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-300">21</div>
                  <div className="text-sm">Dias ou menos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-300">97%</div>
                  <div className="text-sm">Taxa de satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Oferta Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
          transition={{ delay: 0.2 }}
          id="oferta"
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl border-4 border-yellow-400">
            <CardContent className="p-8 text-center">
              <div className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full inline-block mb-6">
                🔥 OFERTA LIMITADA - APENAS HOJE
              </div>

              <h3 className="text-3xl md:text-5xl font-bold mb-4">PLANO A - RECONQUISTA RÁPIDA</h3>

              <p className="text-xl md:text-2xl mb-6 font-semibold">
                O Sistema Completo que Já Reconquistou Mais de 3.847 Relacionamentos
              </p>

              <div className="bg-white/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">21 DIAS</div>
                    <div className="text-sm">Prazo máximo</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">97%</div>
                    <div className="text-sm">Taxa de sucesso</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">3.847</div>
                    <div className="text-sm">Pessoas ajudadas</div>
                  </div>
                </div>
              </div>

              {/* Botão de Compra na Oferta - Personalizado */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-full text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4 w-full sm:w-auto"
                >
                  {getPersonalizedCTA()}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <p className="text-yellow-200 text-sm">✅ Acesso imediato • 💳 Parcelamento disponível</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* O QUE VOCÊ VAI RECEBER - MÓDULO ÚNICO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">O QUE VOCÊ VAI RECEBER:</h3>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-6">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-orange-400">PLANO A - RECONQUISTA RÁPIDA</h4>
                    <p className="text-orange-300 font-semibold text-lg">Sistema Completo de Reconquista</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-xl font-bold text-orange-200 mb-4">📚 CONTEÚDO PRINCIPAL:</h5>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Sistema completo de 21 dias passo-a-passo</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ 7 Pilares da Presença Irresistível</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ 21 Gatilhos Emocionais Infalíveis</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Protocolo de 72 horas para casos urgentes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Estratégias para cada tipo de término</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Como sair da friendzone definitivamente</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xl font-bold text-orange-200 mb-4">🎯 INCLUI TAMBÉM:</h5>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>📱 Acesso pelo celular, tablet ou computador</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Atualizações gratuitas vitalícias</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Suporte prioritário por 30 dias</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Comunidade privada de apoio</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Scripts de mensagens prontos para usar</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Ferramentas de acompanhamento de progresso</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="text-4xl font-bold text-orange-400">VALOR TOTAL: R$ 297</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Bonuses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.4 }}
          id="bonus"
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-2">+ 5 BÔNUS EXCLUSIVOS</h3>
          <p className="text-orange-400 text-center font-semibold mb-8 text-xl">
            (Você desbloqueou {unlockedBonuses.length} de 5 no quiz!)
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={bonus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  className={`h-full ${
                    unlockedBonuses.includes(bonus.id)
                      ? "bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 shadow-lg"
                      : "bg-gray-50 border border-gray-300"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        unlockedBonuses.includes(bonus.id) ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {unlockedBonuses.includes(bonus.id) ? (
                        <Check className="w-8 h-8 text-white" />
                      ) : (
                        <Gift className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">BÔNUS #{bonus.id}</h4>
                    <p className="text-sm text-gray-700 mb-3">{getPersonalizedContent(bonus.title, userGender)}</p>
                    
                    {/* Descrição expandida do bônus */}
                    <div className="bg-gray-100 p-3 rounded-lg mb-3 text-left text-sm text-gray-700">
                      <p>{getPersonalizedContent(bonus.description || "Descrição detalhada deste bônus exclusivo que vai acelerar sua reconquista.", userGender)}</p>
                    </div>
                    
                    <div className="text-2xl font-bold text-green-600">R$ {bonus.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seção de Preço */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-black to-gray-900 text-white shadow-2xl border-4 border-yellow-500">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-red-400 text-2xl font-bold mb-2">
                  <span className="line-through">VALOR TOTAL: R$ 297</span>
                </div>
                <div className="text-6xl font-bold text-yellow-400 mb-2">R$ 37</div>
                <div className="text-2xl text-orange-400 font-bold">OU 3x DE R$ 12,33</div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-6 rounded-lg inline-block mb-4">
                💰 ECONOMIA DE R$ 260 HOJE!
              </div>

              <p className="text-lg mb-6">Menos que o preço de um lanche no shopping!</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Adicional após preço - Personalizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.7 }}
          className="mb-8 text-center"
        >
          <Button
            onClick={handlePurchase}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            GARANTIR VAGA
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-gray-400 text-sm mt-2">Clique aqui para ir direto ao checkout seguro</p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-red-600 text-white border-4 border-yellow-400">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <AlertTriangle className="w-8 h-8 text-yellow-300" />
                <h3 className="text-2xl md:text-3xl font-bold">OFERTA EXPIRA EM:</h3>
              </div>
              <CountdownTimer />
              <p className="text-xl font-bold mt-4 text-yellow-300">Depois disso, volta ao preço normal de R$ 297!</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Garantias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.2 }}
          id="garantias"
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">SUAS GARANTIAS:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-green-50 border-2 border-green-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-800 mb-2">GARANTIA #1</h4>
                <p className="text-green-700 font-semibold mb-3">Resultados em 7 dias ou devolução integral</p>
                <p className="text-sm text-green-600">
                  Se você não perceber nenhum sinal positivo nos primeiros 7 dias, devolveremos 100% do seu investimento sem questionamentos.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-2 border-blue-300">
              <CardContent className="p-6 text-center">
                <Star className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-blue-800 mb-2">GARANTIA #2</h4>
                <p className="text-blue-700 font-semibold mb-3">Suporte prioritário 24/7</p>
                <p className="text-sm text-blue-600">
                  Você terá acesso ao nosso time de especialistas para tirar dúvidas e receber orientações personalizadas durante todo o processo.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-2 border-purple-300">
              <CardContent className="p-6 text-center">
                <Clock className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-purple-800 mb-2">GARANTIA #3</h4>
                <p className="text-purple-700 font-semibold mb-3">30 dias sem questionamentos</p>
                <p className="text-sm text-purple-600">
                  Se por qualquer motivo você não ficar satisfeito nos primeiros 30 dias, basta solicitar e devolveremos seu investimento integralmente.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Perguntas Frequentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.3 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">PERGUNTAS FREQUENTES</h3>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">E se {getPersonalizedPronoun()} já estiver com outra pessoa?</h4>
                <p className="text-gray-300">
                  O método inclui estratégias específicas para casos onde há terceiros envolvidos. Muitos dos nossos casos 
                  de sucesso começaram exatamente nessa situação. O Módulo 3 aborda detalhadamente como proceder nestes casos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">Quanto tempo leva para ver resultados?</h4>
                <p className="text-gray-300">
                  87% dos usuários relatam os primeiros sinais positivos em menos de 14 dias. O método completo 
                  é projetado para funcionar em 21 dias, mas muitos conseguem resultados mais rápidos, especialmente 
                  com o Protocolo de Emergência de 72 horas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">O método funciona para qualquer tipo de término?</h4>
                <p className="text-gray-300">
                  Sim! O programa inclui estratégias específicas para diferentes tipos de término: traição, 
                  desgaste natural, brigas constantes, interferência de terceiros, etc. O Módulo 3 é inteiramente 
                  dedicado a abordar cada situação com técnicas personalizadas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">E se {getPersonalizedPronoun()} me bloqueou em tudo?</h4>
                <p className="text-gray-300">
                  O método inclui técnicas de "contato indireto" que funcionam mesmo quando você está bloqueado 
                  em todas as redes sociais. Muitos dos nossos casos de sucesso começaram com bloqueio total e 
                  terminaram com reconciliação completa.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">Como vou receber o acesso?</h4>
                <p className="text-gray-300">
                  Imediatamente após a confirmação do pagamento, você receberá um e-mail com suas credenciais 
                  de acesso à plataforma. Todo o conteúdo estará disponível instantaneamente, incluindo os 
                  bônus desbloqueados durante o quiz.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">E se eu não conseguir aplicar o método corretamente?</h4>
                <p className="text-gray-300">
                  Você terá acesso ao nosso suporte prioritário por 30 dias, onde nossa equipe irá ajudá-lo 
                  a implementar o método corretamente para sua situação específica. Além disso, a comunidade 
                  privada oferece apoio adicional de pessoas que já passaram pelo mesmo processo.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Final - Personalizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.6 }}
          className="mb-12 text-center"
        >
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl border-4 border-yellow-400">
            <CardContent className="p-8 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-5 px-8 rounded-full text-xl md:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6 w-full sm:w-auto"
                >
                  {getPersonalizedCTA()}
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </motion.div>

              <div className="space-y-3">
                <p className="text-xl font-semibold">✅ Acesso imediato após o pagamento</p>
                <p className="text-lg">💳 Parcelamento em até 3x sem juros</p>
                <p className="text-lg">🔒 Compra 100% segura e protegida</p>
                <p className="text-lg">🎯 Garantia de 30 dias ou seu dinheiro de volta</p>
              </div>

              {recentBuyers > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-6 bg-red-500 text-white py-2 px-4 rounded-full inline-block"
                >
                  🔥 {recentBuyers} pessoas compraram nas últimas 2 horas!
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Depoimentos - Substituído por uma única imagem flutuante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">MAIS RESULTADOS REAIS:</h3>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-50 border-2 border-gray-300 overflow-hidden">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-full rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/02-depoimento-1.png"
                    alt="Depoimento de Cliente"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                <p className="text-gray-600 font-medium mt-4">
                  Veja o que nossos clientes estão dizendo sobre os resultados!
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Final - Personalizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.6 }}
          className="mb-12 text-center"
        >
          <Button
            onClick={handlePurchase}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            COMPRAR AGORA
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-red-400 text-sm mt-2 font-semibold">⚠️ Esta oferta expira em breve!</p>
        </motion.div>
      </div>
    </div>
  )
}
