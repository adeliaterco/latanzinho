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
      return "DE RECHAZADO A DESEADO"
    } else if (userGender === "FEMININO") {
      return "DE RECHAZADA A DESEADA"
    }
    return "DE RECHAZADO(A) A DESEADO(A)"
  }

  const getPersonalizedCTA = () => {
    if (userGender === "MASCULINO") {
      return "RECONQUISTAR A ELLA AHORA"
    } else if (userGender === "FEMININO") {
      return "RECONQUISTAR A ÉL AHORA"
    }
    return "RECONQUISTAR AHORA"
  }

  const getPersonalizedPronoun = () => {
    return userGender === "FEMININO" ? "él" : "ella";
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
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4">EN 21 DÍAS O MENOS</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="font-bold text-orange-300">Incluso si {getPersonalizedPronoun()} te ha dicho que nunca más quiere verte</span> y has intentado de todo sin éxito.
          </p>

          {/* Comparativo Antes e Depois */}
          <div id="historia" className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gray-50 border-2 border-gray-300 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">DÓNDE ESTÁS VS. DÓNDE ESTARÁS</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h4 className="text-xl font-bold text-red-800 mb-4">AHORA</h4>
                    <ul className="text-left space-y-3">
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Sufriendo con el rechazo y el dolor de la separación</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Intentando estrategias que solo empeoran la situación</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Sin saber qué hacer para recuperar la atención {getPersonalizedPronoun() === "él" ? "de él" : "de ella"}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Perdiendo noches de sueño pensando en qué salió mal</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-4">EN 21 DÍAS</h4>
                    <ul className="text-left space-y-3">
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Reconquistando la atención y el interés {getPersonalizedPronoun() === "él" ? "de él" : "de ella"}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Aplicando estrategias que realmente funcionan</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Viendo a {getPersonalizedPronoun()} mirarte con ese brillo en los ojos nuevamente</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Construyendo una relación aún más fuerte que antes</span>
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
                      alt="Resultado Real de Transformación"
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
                      alt="Creador del Método" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-orange-400 mb-2">CONOCE AL CREADOR DEL MÉTODO</h3>
                    <p className="text-gray-300 mb-4">
                      Después de ayudar a más de <span className="text-orange-300 font-bold">3.847 personas</span> a reconquistar sus relaciones, 
                      desarrollé un sistema que funciona para <span className="text-orange-300 font-bold">cualquier tipo de ruptura</span>, 
                      incluso en los casos más difíciles.
                    </p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        87% DE ÉXITO
                      </div>
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ESPECIALISTA EN RECONQUISTA
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      "Mi misión es ayudar a las personas a recuperar el amor que parecía perdido para siempre."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
      return "DE RECHAZADO A DESEADO"
    } else if (userGender === "FEMININO") {
      return "DE RECHAZADA A DESEADA"
    }
    return "DE RECHAZADO(A) A DESEADO(A)"
  }

  const getPersonalizedCTA = () => {
    if (userGender === "MASCULINO") {
      return "RECONQUISTAR A ELLA AHORA"
    } else if (userGender === "FEMININO") {
      return "RECONQUISTAR A ÉL AHORA"
    }
    return "RECONQUISTAR AHORA"
  }

  const getPersonalizedPronoun = () => {
    return userGender === "FEMININO" ? "él" : "ella";
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
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4">EN 21 DÍAS O MENOS</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="font-bold text-orange-300">Incluso si {getPersonalizedPronoun()} te ha dicho que nunca más quiere verte</span> y has intentado de todo sin éxito.
          </p>

          {/* Comparativo Antes e Depois */}
          <div id="historia" className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gray-50 border-2 border-gray-300 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">DÓNDE ESTÁS VS. DÓNDE ESTARÁS</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h4 className="text-xl font-bold text-red-800 mb-4">AHORA</h4>
                    <ul className="text-left space-y-3">
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Sufriendo con el rechazo y el dolor de la separación</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Intentando estrategias que solo empeoran la situación</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Sin saber qué hacer para recuperar la atención {getPersonalizedPronoun() === "él" ? "de él" : "de ella"}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-red-600">✗</span>
                        </div>
                        <span className="text-red-700">Perdiendo noches de sueño pensando en qué salió mal</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-4">EN 21 DÍAS</h4>
                    <ul className="text-left space-y-3">
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Reconquistando la atención y el interés {getPersonalizedPronoun() === "él" ? "de él" : "de ella"}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Aplicando estrategias que realmente funcionan</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Viendo a {getPersonalizedPronoun()} mirarte con ese brillo en los ojos nuevamente</span>
                      </li>
                      <li className="flex items-start">
                        <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-700">Construyendo una relación aún más fuerte que antes</span>
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
                      alt="Resultado Real de Transformación"
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
                      alt="Creador del Método" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-orange-400 mb-2">CONOCE AL CREADOR DEL MÉTODO</h3>
                    <p className="text-gray-300 mb-4">
                      Después de ayudar a más de <span className="text-orange-300 font-bold">3.847 personas</span> a reconquistar sus relaciones, 
                      desarrollé un sistema que funciona para <span className="text-orange-300 font-bold">cualquier tipo de ruptura</span>, 
                      incluso en los casos más difíciles.
                    </p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        87% DE ÉXITO
                      </div>
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ESPECIALISTA EN RECONQUISTA
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      "Mi misión es ayudar a las personas a recuperar el amor que parecía perdido para siempre."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
                  {/* Detalhamento dos Módulos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          id="modulos"
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">CONTENIDO DETALLADO DEL PROGRAMA</h3>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-6">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-orange-400">PLAN A - RECONQUISTA RÁPIDA</h4>
                    <p className="text-orange-300 font-semibold text-lg">Sistema Completo de Reconquista en 21 Días</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white p-3">
                      <h5 className="text-xl font-bold">MÓDULO 1: FUNDAMENTOS DE LA RECONQUISTA</h5>
                    </div>
                    <div className="p-4 text-gray-300">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Diagnóstico de la Ruptura</span>
                            <p className="text-sm">Identifica exactamente por qué terminó la relación y cómo esto afecta tu estrategia</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Protocolo de Emergencia de 72 horas</span>
                            <p className="text-sm">Qué hacer inmediatamente para evitar errores fatales que imposibilitan la reconquista</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Mapeo Emocional</span>
                            <p className="text-sm">Entiende el estado emocional actual {getPersonalizedPronoun() === "él" ? "de él" : "de ella"} y cómo esto influye en tus posibilidades</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white p-3">
                      <h5 className="text-xl font-bold">MÓDULO 2: LOS 7 PILARES DE LA PRESENCIA IRRESISTIBLE</h5>
                    </div>
                    <div className="p-4 text-gray-300">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Pilar 1: Independencia Emocional</span>
                            <p className="text-sm">Cómo volverte emocionalmente atractivo incluso después de la ruptura</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Pilar 2: Comunicación Magnética</span>
                            <p className="text-sm">Las exactas palabras y frases que despiertan interés inmediato</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Pilares 3-7: Revelados en el programa</span>
                            <p className="text-sm">Los 5 pilares restantes que completan el sistema de reconquista</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white p-3">
                      <h5 className="text-xl font-bold">MÓDULO 3: ESTRATEGIAS PARA CADA TIPO DE RUPTURA</h5>
                    </div>
                    <div className="p-4 text-gray-300">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-700/40 p-3 rounded-lg">
                          <h6 className="font-bold text-orange-300 mb-1">RUPTURA POR INFIDELIDAD</h6>
                          <p className="text-sm">Protocolo específico para recuperar la confianza y superar el resentimiento</p>
                        </div>
                        <div className="bg-gray-700/40 p-3 rounded-lg">
                          <h6 className="font-bold text-orange-300 mb-1">RUPTURA POR DESGASTE</h6>
                          <p className="text-sm">Cómo reavivar la llama y traer novedad a la relación</p>
                        </div>
                        <div className="bg-gray-700/40 p-3 rounded-lg">
                          <h6 className="font-bold text-orange-300 mb-1">RUPTURA POR PELEAS</h6>
                          <p className="text-sm">Técnicas de comunicación para resolver conflictos permanentemente</p>
                        </div>
                        <div className="bg-gray-700/40 p-3 rounded-lg">
                          <h6 className="font-bold text-orange-300 mb-1">RUPTURA POR TERCEROS</h6>
                          <p className="text-sm">Cómo lidiar cuando hay otras personas involucradas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white p-3">
                      <h5 className="text-xl font-bold">MÓDULO 4: RECONQUISTA Y MANTENIMIENTO</h5>
                    </div>
                    <div className="p-4 text-gray-300">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">El Primer Encuentro Post-Ruptura</span>
                            <p className="text-sm">Exactamente qué hacer y decir para garantizar que no sea el último</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Reconstrucción de la Intimidad</span>
                            <p className="text-sm">Cómo restablecer la conexión física y emocional de forma natural</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 text-green-400 mr-3 mt-1" />
                          <div>
                            <span className="font-bold text-white">Prevención de Recaídas</span>
                            <p className="text-sm">Cómo garantizar que los mismos problemas no vuelvan a ocurrir</p>
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
          <h3 className="text-3xl font-bold text-white text-center mb-8">COMPARA LAS ALTERNATIVAS:</h3>
          
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-gray-900 rounded-lg overflow-hidden border-collapse">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="p-4 text-left">Opción</th>
                  <th className="p-4 text-center">Tiempo</th>
                  <th className="p-4 text-center">Costo</th>
                  <th className="p-4 text-center">Tasa de Éxito</th>
                  <th className="p-4 text-center">Recomendado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-white font-medium">Terapia de Pareja</td>
                  <td className="p-4 text-center text-gray-300">3-6 meses</td>
                  <td className="p-4 text-center text-gray-300">R$3.000 - R$7.200</td>
                  <td className="p-4 text-center text-gray-300">40-60%</td>
                  <td className="p-4 text-center text-gray-300">❌</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-white font-medium">Intentar solo</td>
                  <td className="p-4 text-center text-gray-300">Indefinido</td>
                  <td className="p-4 text-center text-gray-300">R$0</td>
                  <td className="p-4 text-center text-gray-300">15-20%</td>
                  <td className="p-4 text-center text-gray-300">❌</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-white font-medium">Otros cursos online</td>
                  <td className="p-4 text-center text-gray-300">30-90 días</td>
                  <td className="p-4 text-center text-gray-300">R$97 - R$497</td>
                  <td className="p-4 text-center text-gray-300">30-50%</td>
                  <td className="p-4 text-center text-gray-300">❌</td>
                </tr>
                <tr className="bg-gradient-to-r from-orange-900/30 to-orange-800/30">
                  <td className="p-4 text-orange-400 font-bold">PLAN A - RECONQUISTA RÁPIDA</td>
                  <td className="p-4 text-center text-orange-300 font-bold">21 días</td>
                  <td className="p-4 text-center text-orange-300 font-bold">R$37</td>
                  <td className="p-4 text-center text-orange-300 font-bold">87-97%</td>
                  <td className="p-4 text-center text-green-400">✅</td>
                </tr>
              </tbody>
            </table>
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
                🔥 OFERTA LIMITADA - SOLO HOY
              </div>

              <h3 className="text-3xl md:text-5xl font-bold mb-4">PLAN A - RECONQUISTA RÁPIDA</h3>

              <p className="text-xl md:text-2xl mb-6 font-semibold">
                El Sistema Completo que Ya Reconquistó Más de 3.847 Relaciones
              </p>

              <div className="bg-white/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">21 DÍAS</div>
                    <div className="text-sm">Plazo máximo</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">97%</div>
                    <div className="text-sm">Tasa de éxito</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">3.847</div>
                    <div className="text-sm">Personas ayudadas</div>
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
              <p className="text-yellow-200 text-sm">✅ Acceso inmediato • 💳 Pago en cuotas disponible</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Perguntas Frequentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.3 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">PREGUNTAS FRECUENTES</h3>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">¿Y si {getPersonalizedPronoun()} ya está con otra persona?</h4>
                <p className="text-gray-300">
                  El método incluye estrategias específicas para casos donde hay terceros involucrados. Muchos de nuestros casos 
                  de éxito comenzaron exactamente en esa situación. El Módulo 3 aborda detalladamente cómo proceder en estos casos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">¿Cuánto tiempo lleva ver resultados?</h4>
                <p className="text-gray-300">
                  87% de los usuarios reportan las primeras señales positivas en menos de 14 días. El método completo 
                  está diseñado para funcionar en 21 días, pero muchos logran resultados más rápidos, especialmente 
                  con el Protocolo de Emergencia de 72 horas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">¿El método funciona para cualquier tipo de ruptura?</h4>
                <p className="text-gray-300">
                  ¡Sí! El programa incluye estrategias específicas para diferentes tipos de ruptura: infidelidad, 
                  desgaste natural, peleas constantes, interferencia de terceros, etc. El Módulo 3 está enteramente 
                  dedicado a abordar cada situación con técnicas personalizadas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">¿Y si {getPersonalizedPronoun()} me bloqueó en todo?</h4>
                <p className="text-gray-300">
                  El método incluye técnicas de "contacto indirecto" que funcionan incluso cuando estás bloqueado 
                  en todas las redes sociales. Muchos de nuestros casos de éxito comenzaron con bloqueo total y 
                  terminaron con reconciliación completa.
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
                <p className="text-xl font-semibold">✅ Acceso inmediato después del pago</p>
                <p className="text-lg">💳 Pago en hasta 3 cuotas sin intereses</p>
                <p className="text-lg">🔒 Compra 100% segura y protegida</p>
                <p className="text-lg">🎯 Garantía de 30 días o tu dinero de vuelta</p>
              </div>

              {recentBuyers > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-6 bg-red-500 text-white py-2 px-4 rounded-full inline-block"
                >
                  🔥 ¡{recentBuyers} personas compraron en las últimas 2 horas!
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
          <h3 className="text-3xl font-bold text-white text-center mb-8">MÁS RESULTADOS REALES:</h3>

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
                    alt="Testimonio de Cliente"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                <p className="text-gray-600 font-medium mt-4">
                  ¡Mira lo que nuestros clientes están diciendo sobre los resultados!
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
            COMPRAR AHORA
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-red-400 text-sm mt-2 font-semibold">⚠️ ¡Esta oferta expira pronto!</p>
        </motion.div>
      </div>
    </div>
  )
}