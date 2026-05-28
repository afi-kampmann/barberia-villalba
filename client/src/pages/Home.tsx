import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Scissors, 
  Coffee, 
  Gamepad2, 
  Trophy, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  ChevronRight, 
  Calendar, 
  Check,
  Instagram,
  ChevronDown,
  Info
} from "lucide-react";
import { toast } from "sonner";
import assetsData from "../assets_data.json";

// Estilo de recordatorio de diseño para el archivo
/**
 * @design_philosophy Urban Tech & Wellness (Vanguardia Masculina)
 * - Estética estricta en blanco y negro con acentos metálicos y grises de alta fidelidad.
 * - Bordes rectos y afilados (radius: 0px) para un look arquitectónico y masculino.
 * - Patrón de red hexagonal que rinde homenaje a la lámpara de techo del local físico.
 * - Tipografía Syne para encabezados potentes y Plus Jakarta Sans para legibilidad limpia.
 */

interface Service {
  name: string;
  price: string;
  duration: string;
  description?: string;
  category: "corte" | "barba" | "combo" | "oferta";
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [isScrolled, setIsScrolled] = useState(false);

  // URL de reserva directa de Booksy
  const booksyUrl = "https://booksy.com/es-es/114355_barberia-villalba_barberia_53325_collado-villalba#ba_s=seo";

  // Efecto para controlar el scroll del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cargar el script de Booksy Widget para el botón de reserva
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://booksy.com/widget/code.js?id=52301&country=es&lang=es";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpiar script al desmontar si es necesario
      const existingScript = document.querySelector(`script[src*="booksy.com/widget/code.js"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleBookClick = (serviceName?: string) => {
    if (serviceName) {
      toast.success(`Redirigiendo a Booksy para reservar: ${serviceName}`);
    } else {
      toast.success("Redirigiendo al portal de reservas de Booksy");
    }
    setTimeout(() => {
      window.open(booksyUrl, "_blank", "noopener,noreferrer");
    }, 800);
  };

  const services: Service[] = [
    {
      name: "💈 Corté LUN MART MIERC JUEVES 😱OFERTA",
      price: "9,99 €",
      duration: "30 min",
      description: "Oferta especial de lunes a jueves. Corte de cabello moderno o clásico con acabado profesional.",
      category: "oferta"
    },
    {
      name: "💈 CORTE (JUEV VIERN SABADO)",
      price: "11,99 €",
      duration: "30 min",
      description: "Corte de cabello premium los días de mayor demanda. (Pago con tarjeta: 13,99€).",
      category: "corte"
    },
    {
      name: "🔥 PROMO CORTE + BARBA",
      price: "17,99 €",
      duration: "45 min",
      description: "El combo definitivo. Corte de pelo a medida y perfilado/arreglo de barba perfectamente definido. (Pago con tarjeta: 19,99€).",
      category: "combo"
    },
    {
      name: "🔥 PROMO CORTE + RITUAL BARBA CALIENTE",
      price: "21,99 €",
      duration: "30 min",
      description: "Experiencia de relax completa. Corte de pelo premium y afeitado tradicional de barba con toalla caliente. (Pago con tarjeta: 23,99€).",
      category: "combo"
    },
    {
      name: "🧔 Arreglo de Barba Tradicional",
      price: "8,99 €",
      duration: "20 min",
      description: "Recorte, perfilado con navaja y tratamiento de hidratación para lucir una barba impecable.",
      category: "barba"
    },
    {
      name: "👴 Corte Jubilado (Oferta Especial)",
      price: "8,50 €",
      duration: "30 min",
      description: "Corte clásico adaptado con atención personalizada y preferente.",
      category: "oferta"
    }
  ];

  const filteredServices = activeCategory === "todos" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const amenities = [
    {
      name: "Café de Especialidad",
      description: "Disfruta de un espresso perfecto, capuccino o un café frío preparado al momento mientras esperas o te relajas.",
      image: assetsData.amenity_coffee,
      icon: <Coffee className="w-6 h-6 text-white" />
    },
    {
      name: "PlayStation 5 Arena",
      description: "Zona gaming equipada con PS5 y mandos DualSense para jugar unas partidas a tus juegos favoritos.",
      image: assetsData.amenity_playstation,
      icon: <Gamepad2 className="w-6 h-6 text-white" />
    },
    {
      name: "Futbolín Urban Club",
      description: "Reta a tus amigos o a otros miembros del club a una partida rápida de futbolín en nuestro espacio social.",
      image: assetsData.amenity_foosball,
      icon: <Trophy className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-white selection:text-black">
      {/* Patrón de fondo hexagonal general sutil */}
      <div className="absolute inset-0 hex-grid-bg opacity-40 pointer-events-none z-0" />

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-premium border-b ${
        isScrolled 
          ? "bg-black/90 backdrop-blur-md border-white/10 py-4" 
          : "bg-transparent border-transparent py-6"
      }`}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo real de Barbería Villalba */}
            <img 
              src={assetsData.logo} 
              alt="Barbería Villalba Logo" 
              className="h-12 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-medium">
            <a href="#club" className="text-white/70 hover:text-white transition-premium">El Club</a>
            <a href="#servicios" className="text-white/70 hover:text-white transition-premium">Servicios</a>
            <a href="#amenities" className="text-white/70 hover:text-white transition-premium">Wellness Lounge</a>
            <a href="#equipo" className="text-white/70 hover:text-white transition-premium">El Equipo</a>
            <a href="#contacto" className="text-white/70 hover:text-white transition-premium">Contacto</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button 
              onClick={() => handleBookClick()}
              className="bg-white text-black hover:bg-white/90 font-bold text-xs tracking-widest uppercase py-5 px-6 rounded-none transition-premium border border-white hover:border-white/90"
            >
              Reservar Cita
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        {/* Fondo con imagen de barbería premium y overlay oscuro */}
        <div className="absolute inset-0 z-0">
          <img 
            src={assetsData.hero_barber} 
            alt="Barbería Villalba Interior" 
            className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-white animate-pulse rounded-full" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-white/80">Urban Club & Wellness Masculino</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight leading-none mb-6">
            MÁS QUE UN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">CORTE DE PELO</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/60 font-light max-w-2xl leading-relaxed mb-10 uppercase tracking-wider">
            Un espacio exclusivo de relax, cuidado y camaradería para el hombre moderno en Collado Villalba. Disfruta de un café premium, una partida de PS5 o futbolín mientras redefinimos tu estilo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              onClick={() => handleBookClick()}
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-black text-sm tracking-widest uppercase py-7 px-10 rounded-none transition-premium w-full sm:w-auto"
            >
              Reservar en Booksy
            </Button>
            <a href="#servicios" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white hover:text-black font-black text-sm tracking-widest uppercase py-7 px-10 rounded-none transition-premium w-full"
              >
                Ver Servicios
              </Button>
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <a href="#club" className="text-white/40 hover:text-white transition-premium flex flex-col items-center gap-2 text-[10px] tracking-widest uppercase">
              <span>Explorar</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* THE CLUB CONCEPT (VALORES) */}
      <section id="club" className="py-24 border-y border-white/5 relative bg-zinc-950/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs tracking-[0.3em] text-white/40 uppercase font-bold block mb-3">El Concepto</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black leading-none mb-6">
                BIENVENIDO AL <br />URBAN CLUB
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Barbería Villalba no es simplemente un lugar para cortarse el pelo o arreglarse la barba. Hemos diseñado un refugio urbano donde la estética impecable se encuentra con el bienestar y el entretenimiento masculino.
              </p>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                Queremos que cada visita sea una pausa en tu rutina diaria. Por eso, ponemos a tu disposición servicios de cortesía pensados para que te relajes y disfrutes de tu momento de cuidado personal sin prisas.
              </p>

              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                <div>
                  <span className="font-display text-3xl font-black block">★ 4.9</span>
                  <span className="text-[10px] tracking-wider text-white/40 uppercase">343+ Reseñas en Booksy</span>
                </div>
                <div>
                  <span className="font-display text-3xl font-black block">100%</span>
                  <span className="text-[10px] tracking-wider text-white/40 uppercase">Espacio de Wellness</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 p-8 bg-black hover:border-white/30 transition-premium">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">Estilo de Alta Gama</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Cortes clásicos, degradados modernos, rituales de afeitado tradicionales con toalla caliente y asesoramiento de imagen personalizado por barberos expertos.
                </p>
              </div>

              <div className="border border-white/10 p-8 bg-black hover:border-white/30 transition-premium">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">Servicio de Cortesía</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Disfruta de café de especialidad, refrescos o agua de forma totalmente gratuita mientras realizamos tu servicio o durante tu tiempo de relax.
                </p>
              </div>

              <div className="border border-white/10 p-8 bg-black hover:border-white/30 transition-premium">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">Zona PlayStation 5</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Contamos con un espacio dedicado a los videojuegos con una consola PS5 de última generación para que juegues una partida y desconectes.
                </p>
              </div>

              <div className="border border-white/10 p-8 bg-black hover:border-white/30 transition-premium">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">Futbolín Social</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Un futbolín profesional de club urbano para fomentar la comunidad, el juego limpio y las buenas conversaciones entre caballeros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-24 relative">
        <div className="container max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase font-bold block mb-3">Nuestra Carta</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black mb-4">SERVICIOS & TARIFAS</h2>
            <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest">
              Selecciona una categoría para ver los precios y tiempos. Todas las reservas se gestionan a través de Booksy.
            </p>
          </div>

          {/* Categorías de Filtro */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {["todos", "corte", "barba", "combo", "oferta"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-[10px] tracking-widest uppercase font-bold transition-premium border ${
                  activeCategory === category 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-white/60 border-white/10 hover:text-white hover:border-white/30"
                }`}
              >
                {category === "todos" ? "Todos los servicios" : category}
              </button>
            ))}
          </div>

          {/* Lista de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredServices.map((service, index) => (
              <div 
                key={index}
                className="border border-white/5 p-6 bg-zinc-950/40 hover:border-white/20 transition-premium flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-white transition-premium">
                      {service.name}
                    </h3>
                    <span className="font-display text-lg sm:text-xl font-black text-white shrink-0">
                      {service.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-wider uppercase mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duración: {service.duration}</span>
                  </div>

                  {service.description && (
                    <p className="text-xs text-white/50 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  )}
                </div>

                <Button 
                  onClick={() => handleBookClick(service.name)}
                  className="w-full bg-transparent hover:bg-white hover:text-black text-white border border-white/20 hover:border-white font-bold text-[10px] tracking-widest uppercase py-5 rounded-none transition-premium"
                >
                  Reservar en Booksy
                </Button>
              </div>
            ))}
          </div>

          {/* Nota de pago e IVA */}
          <div className="border border-white/10 p-4 bg-zinc-950/80 flex items-start gap-3 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <p className="text-[11px] text-white/50 leading-relaxed">
              <strong>Nota sobre tarifas:</strong> Las promociones especiales tienen precios diferenciados según el método de pago (efectivo / tarjeta de crédito) para adaptarnos a tus necesidades. Los jueves, viernes y sábados se aplican las tarifas estándar de fin de semana debido a la alta demanda.
            </p>
          </div>
        </div>
      </section>

      {/* AMENITIES / WELLNESS LOUNGE (DETALLE VISUAL) */}
      <section id="amenities" className="py-24 border-y border-white/5 relative bg-zinc-950/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase font-bold block mb-3">El Valor Añadido</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black mb-4">WELLNESS LOUNGE</h2>
            <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest">
              Un auténtico club urbano para caballeros donde el relax está garantizado y es 100% gratuito.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div 
                key={index}
                className="border border-white/10 bg-black overflow-hidden flex flex-col group hover:border-white/30 transition-premium"
              >
                {/* Imagen del Amenity */}
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={amenity.image} 
                    alt={amenity.name} 
                    className="w-full h-full object-cover filter grayscale contrast-115 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Icono flotante */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    {amenity.icon}
                  </div>
                </div>

                {/* Contenido del Amenity */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase font-bold block mb-2">Servicio de Cortesía</span>
                    <h3 className="text-xl font-bold mb-3 tracking-tight">{amenity.name}</h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-6">
                      {amenity.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold text-white/40 group-hover:text-white transition-premium mt-auto">
                    <span>Incluido gratis con tu servicio</span>
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EL EQUIPO (FOTO ADJUNTADA POR EL USUARIO) */}
      <section id="equipo" className="py-24 relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Imagen del equipo a la izquierda (ocupa 7 columnas en desktop) */}
            <div className="lg:col-span-7 relative">
              <div className="absolute -inset-2 border border-white/10 z-0 pointer-events-none" />
              <div className="relative z-10 border border-white/20 bg-zinc-900 overflow-hidden aspect-[9/16] max-h-[750px] mx-auto lg:mx-0">
                <img 
                  src={assetsData.team_image} 
                  alt="Equipo de Barbería Villalba" 
                  className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 hover:contrast-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Etiqueta flotante */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/90 backdrop-blur-md border border-white/10 p-4">
                  <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-bold mb-1">El Club de Profesionales</p>
                  <p className="text-sm font-bold tracking-tight uppercase">Los Barberos de Villalba</p>
                </div>
              </div>
            </div>

            {/* Contenido a la derecha (ocupa 5 columnas en desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs tracking-[0.3em] text-white/40 uppercase font-bold block mb-3">La Plantilla</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black leading-none mb-6">
                PROFESIONALES <br />DEL ESTILO
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Conoce al equipo detrás de la experiencia de Barbería Villalba. Un grupo de profesionales apasionados por la barbería tradicional, el estilismo de vanguardia y la atención al detalle.
              </p>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                Cada uno de nuestros barberos está especializado en diferentes técnicas de corte y arreglo de barba, asegurando que encuentres exactamente el estilo que buscas en un ambiente relajado y de confianza.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <span className="w-1.5 h-1.5 bg-white" />
                  <span className="text-xs font-bold tracking-wider uppercase text-white/80">Cortes clásicos y modernos de alta precisión</span>
                </div>
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <span className="w-1.5 h-1.5 bg-white" />
                  <span className="text-xs font-bold tracking-wider uppercase text-white/80">Perfilado y cuidado de barbas con navaja</span>
                </div>
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <span className="w-1.5 h-1.5 bg-white" />
                  <span className="text-xs font-bold tracking-wider uppercase text-white/80">Rituales de toalla caliente para relajación máxima</span>
                </div>
              </div>

              <Button 
                onClick={() => handleBookClick()}
                className="bg-white text-black hover:bg-white/90 font-black text-xs tracking-widest uppercase py-6 px-8 rounded-none transition-premium self-start"
              >
                Elige tu Barbero y Reserva
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKSY INTEGRATION / RESERVA DIRECTA */}
      <section className="py-24 border-t border-white/5 bg-zinc-950 relative">
        <div className="container max-w-4xl text-center">
          <span className="text-xs tracking-[0.3em] text-white/40 uppercase font-bold block mb-3">Reserva Fácil</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black mb-6">RESERVA TU EXPERIENCIA ONLINE</h2>
          <p className="text-sm text-white/50 max-w-xl mx-auto leading-relaxed mb-10 uppercase tracking-wider">
            Utilizamos Booksy para garantizar un proceso de reserva rápido, cómodo y sin esperas. Elige tu servicio, fecha, hora y barbero favorito con total comodidad desde tu móvil u ordenador.
          </p>

          {/* Booksy widget button integration */}
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="p-8 border border-white/10 bg-black max-w-md w-full">
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-4">Widget de Reserva Oficial</p>
              
              {/* Aquí se incrusta el código de Booksy */}
              <div className="flex justify-center py-4">
                <a 
                  href={booksyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="booksy-widget-button" 
                  data-id="52301" 
                  data-country="es" 
                  data-lang="es"
                  style={{
                    display: "inline-block",
                    padding: "16px 32px",
                    color: "#000000",
                    background: "#ffffff",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    border: "1px solid #ffffff",
                    transition: "all 0.25s ease-out"
                  }}
                >
                  Reservar ahora en Booksy
                </a>
              </div>
              
              <p className="text-[10px] text-white/30 mt-4 leading-relaxed">
                Al hacer clic, se abrirá la plataforma segura de Booksy para completar tu reserva en menos de 1 minuto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & LOCATION (MAPS INTEGRATION) */}
      <section id="contacto" className="py-24 border-t border-white/5 relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Información de contacto a la izquierda */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs tracking-[0.3em] text-white/40 uppercase font-bold block mb-3">Ubicación & Contacto</span>
                <h2 className="text-3xl sm:text-5xl font-display font-black leading-none mb-8">
                  ¿DÓNDE <br />ENCONTRARNOS?
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest text-white/40 uppercase font-bold mb-1">Dirección</p>
                      <p className="text-sm font-medium leading-relaxed">
                        Avenida Juan Carlos I, 39, <br />
                        28400 Collado Villalba, Madrid
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest text-white/40 uppercase font-bold mb-1">Horario</p>
                      <p className="text-sm font-medium leading-relaxed">
                        Lunes, martes y miércoles: 10:00 - 21:30 <br />
                        Jueves, viernes y sábado: 10:00 - 22:00 <br />
                        Domingo: 10:00 - 16:00 <br />
                        Festivos: Abierto
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest text-white/40 uppercase font-bold mb-1">Teléfono & Correo</p>
                      <p className="text-sm font-medium leading-relaxed">
                        Teléfono: +34 919 281 164 <br />
                        Email: Barbers.casablanca@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 mt-8 lg:mt-0">
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-3">Síguenos en Redes</p>
                <div className="flex gap-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-premium"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mapa interactivo a la derecha (ocupa 7 columnas) */}
            <div className="lg:col-span-7 h-[450px] border border-white/10 relative bg-zinc-900 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.6747209355912!2d-3.8521!3d40.6370!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4173f5e5e5e5e5d%3A0x1234567890abcdef!2sAvenida%20Juan%20Carlos%20I%2C%2039%2C%2028400%20Collado%20Villalba%2C%20Madrid!5e0!3m2!1ses!2ses!4v1716800000000!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(100%) contrast(120%)" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Barbería Villalba"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 bg-black relative z-10 text-xs text-white/40">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-10 border border-white/20 flex items-center justify-center font-display font-black text-sm tracking-tighter text-white/80">
              BV
            </div>
            <div>
              <p className="font-bold tracking-widest text-white/80">BARBERÍA VILLALBA</p>
              <p className="text-[9px] tracking-wider">Urban Club & Wellness Masculino</p>
            </div>
          </div>

          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} Barbería Villalba. Todos los derechos reservados. <br />
            Reservas gestionadas mediante <a href={booksyUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Booksy</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
