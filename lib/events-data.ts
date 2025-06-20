export interface Event {
  id: number
  title: string
  description: string
  longDescription: string
  date: string
  time: string
  endTime: string
  location: string
  address: string
  category: string
  participants: number
  maxParticipants: number
  rating: number
  totalReviews: number
  price: string
  organizer: {
    name: string
    avatar: string
    verified: boolean
    rating: number
    totalEvents: number
  }
  venue: {
    name: string
    capacity: number
    address: string
    amenities: string[]
  }
  images: string[]
  tickets: {
    id: number
    name: string
    description: string
    price: number
    available: number
    total: number
    benefits: string[]
    requirements?: string
  }[]
  status: string
  tags: string[]
  isHighlighted?: boolean
}

// Array mutável para permitir adição de novos eventos
const eventsDataArray: Event[] = [
  {
    id: 1,
    title: "Festival de Jazz da Cidade",
    description: "Uma noite mágica com os melhores artistas de jazz nacional e internacional",
    longDescription: `
      O Festival de Jazz da Cidade retorna em sua 15ª edição com uma programação especial que celebra a rica tradição do jazz brasileiro e internacional. 

      **Programação:**
      • 19h00 - Abertura com Quarteto Bossa Nova
      • 20h00 - Apresentação principal: Maria Jazz Ensemble
      • 21h30 - Show especial: Carlos Santana Tribute
      • 23h00 - Jam session aberta

      **O que está incluído:**
      • Acesso a todas as apresentações
      • Welcome drink
      • Programa oficial do evento
      • Acesso à área VIP (ingressos Premium)

      **Informações importantes:**
      • Evento para maiores de 18 anos
      • Não é permitido entrar com bebidas
      • Estacionamento disponível no local
      • Classificação livre para acompanhantes
    `,
    date: "2024-02-15",
    time: "19:00",
    endTime: "23:30",
    location: "Teatro Municipal",
    address: "Praça Ramos de Azevedo, s/n - República, São Paulo - SP",
    category: "Música",
    participants: 245,
    maxParticipants: 300,
    rating: 4.8,
    totalReviews: 42,
    price: "R$ 45,00",
    organizer: {
      name: "Produtora Musical XYZ",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      rating: 4.9,
      totalEvents: 28,
    },
    venue: {
      name: "Teatro Municipal",
      capacity: 300,
      address: "Praça Ramos de Azevedo, s/n - República",
      amenities: ["Ar Condicionado", "Acessibilidade", "Bar", "Estacionamento"],
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tickets: [
      {
        id: 1,
        name: "Entrada Geral",
        description: "Acesso a todas as apresentações",
        price: 45.0,
        available: 55,
        total: 200,
        benefits: ["Acesso ao evento", "Welcome drink", "Programa oficial"],
      },
      {
        id: 2,
        name: "Premium",
        description: "Área VIP + benefícios exclusivos",
        price: 85.0,
        available: 15,
        total: 50,
        benefits: [
          "Acesso VIP",
          "Welcome drink premium",
          "Programa oficial",
          "Meet & greet com artistas",
          "Estacionamento gratuito",
        ],
      },
      {
        id: 3,
        name: "Meia Entrada",
        description: "Para estudantes e idosos",
        price: 22.5,
        available: 30,
        total: 50,
        benefits: ["Acesso ao evento", "Welcome drink", "Programa oficial"],
        requirements: "Apresentar documento comprobatório",
      },
    ],
    status: "Em breve",
    tags: ["Jazz", "Música ao vivo", "Nacional", "Internacional", "Teatro"],
    isHighlighted: true,
  },
  {
    id: 2,
    title: "Workshop de Fotografia Digital",
    description: "Aprenda técnicas avançadas de fotografia urbana com profissionais renomados",
    longDescription: `
      Workshop intensivo de fotografia digital focado em técnicas urbanas e street photography.

      **O que você vai aprender:**
      • Composição e enquadramento
      • Uso da luz natural
      • Técnicas de pós-produção
      • Fotografia noturna
      • Street photography

      **Incluso no workshop:**
      • Material didático completo
      • Certificado de participação
      • Coffee break
      • Acesso ao grupo exclusivo no WhatsApp

      **Requisitos:**
      • Câmera DSLR ou mirrorless
      • Conhecimento básico de fotografia
      • Notebook para edição (opcional)
    `,
    date: "2024-02-18",
    time: "14:00",
    endTime: "18:00",
    location: "Centro Cultural",
    address: "Rua das Artes, 123 - Centro, São Paulo - SP",
    category: "Educação",
    participants: 32,
    maxParticipants: 40,
    rating: 4.9,
    totalReviews: 18,
    price: "R$ 80,00",
    organizer: {
      name: "Escola de Artes Visuais",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      rating: 4.8,
      totalEvents: 15,
    },
    venue: {
      name: "Centro Cultural",
      capacity: 40,
      address: "Rua das Artes, 123 - Centro",
      amenities: ["Wi-Fi", "Projetor", "Ar Condicionado", "Estacionamento"],
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tickets: [
      {
        id: 1,
        name: "Ingresso Único",
        description: "Acesso completo ao workshop",
        price: 80.0,
        available: 8,
        total: 40,
        benefits: ["Acesso ao workshop", "Material didático", "Certificado", "Coffee break"],
      },
    ],
    status: "Vagas limitadas",
    tags: ["Fotografia", "Workshop", "Educação", "Arte", "Digital"],
  },
  {
    id: 3,
    title: "Feira Gastronômica Regional",
    description: "Sabores únicos da culinária local com mais de 30 expositores",
    longDescription: `
      A maior feira gastronômica da região retorna com sabores únicos e tradicionais.

      **Destaques:**
      • Mais de 30 expositores
      • Pratos típicos regionais
      • Shows culturais
      • Área kids
      • Concurso de melhor prato

      **Horários especiais:**
      • 10h às 14h - Almoços tradicionais
      • 14h às 18h - Lanches e doces
      • 18h às 22h - Jantares especiais

      **Entrada gratuita para toda a família!**
    `,
    date: "2024-02-20",
    time: "10:00",
    endTime: "22:00",
    location: "Praça Central",
    address: "Praça da República, s/n - Centro, São Paulo - SP",
    category: "Gastronomia",
    participants: 180,
    maxParticipants: 500,
    rating: 4.7,
    totalReviews: 65,
    price: "Gratuito",
    organizer: {
      name: "Prefeitura Municipal",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      rating: 4.5,
      totalEvents: 42,
    },
    venue: {
      name: "Praça Central",
      capacity: 500,
      address: "Praça da República, s/n - Centro",
      amenities: ["Área aberta", "Banheiros", "Segurança", "Área kids"],
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tickets: [
      {
        id: 1,
        name: "Entrada Gratuita",
        description: "Acesso livre ao evento",
        price: 0,
        available: 320,
        total: 500,
        benefits: ["Acesso ao evento", "Área kids", "Shows culturais"],
      },
    ],
    status: "Confirmado",
    tags: ["Gastronomia", "Família", "Gratuito", "Cultura", "Regional"],
  },
  {
    id: 4,
    title: "Hackathon de Inovação",
    description: "48 horas de desenvolvimento de soluções tecnológicas para problemas sociais",
    longDescription: `
      Hackathon focado em criar soluções inovadoras para problemas sociais urbanos.

      **Desafios:**
      • Mobilidade urbana
      • Sustentabilidade
      • Educação digital
      • Saúde pública
      • Inclusão social

      **Premiação:**
      • 1º lugar: R$ 10.000
      • 2º lugar: R$ 5.000
      • 3º lugar: R$ 2.500
      • Menção honrosa: Cursos gratuitos

      **Incluso:**
      • Alimentação completa
      • Mentoria especializada
      • Networking
      • Certificado de participação
    `,
    date: "2024-02-22",
    time: "09:00",
    endTime: "18:00",
    location: "Tech Hub",
    address: "Av. Tecnologia, 456 - Vila Olímpia, São Paulo - SP",
    category: "Tecnologia",
    participants: 95,
    maxParticipants: 100,
    rating: 4.6,
    totalReviews: 23,
    price: "R$ 25,00",
    organizer: {
      name: "Comunidade Tech Local",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      rating: 4.7,
      totalEvents: 8,
    },
    venue: {
      name: "Tech Hub",
      capacity: 100,
      address: "Av. Tecnologia, 456 - Vila Olímpia",
      amenities: ["Wi-Fi", "Computadores", "Ar Condicionado", "Café", "Segurança 24h"],
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tickets: [
      {
        id: 1,
        name: "Participante",
        description: "Acesso completo ao hackathon",
        price: 25.0,
        available: 5,
        total: 100,
        benefits: ["Acesso ao evento", "Alimentação", "Mentoria", "Certificado", "Kit participante"],
      },
    ],
    status: "Quase lotado",
    tags: ["Hackathon", "Tecnologia", "Inovação", "Programação", "Startup"],
  },
  {
    id: 5,
    title: "Exposição de Arte Contemporânea",
    description: "Obras de artistas locais explorando temas urbanos e sociais",
    longDescription: `
      Exposição coletiva com obras de 15 artistas locais explorando a vida urbana contemporânea.

      **Artistas participantes:**
      • Maria Silva - Pinturas urbanas
      • João Santos - Esculturas em metal
      • Ana Costa - Fotografias sociais
      • Pedro Lima - Instalações interativas
      • E mais 11 artistas renomados

      **Atividades especiais:**
      • Visita guiada com curador
      • Bate-papo com artistas
      • Workshop de arte urbana
      • Vernissage de abertura

      **Horário especial:**
      • Terça a domingo: 10h às 18h
      • Quinta-feira: 10h às 21h
    `,
    date: "2024-02-25",
    time: "16:00",
    endTime: "21:00",
    location: "Galeria de Arte Moderna",
    address: "Rua das Artes, 789 - Bela Vista, São Paulo - SP",
    category: "Arte",
    participants: 67,
    maxParticipants: 150,
    rating: 4.5,
    totalReviews: 31,
    price: "R$ 15,00",
    organizer: {
      name: "Coletivo Artístico",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: false,
      rating: 4.3,
      totalEvents: 12,
    },
    venue: {
      name: "Galeria de Arte Moderna",
      capacity: 150,
      address: "Rua das Artes, 789 - Bela Vista",
      amenities: ["Ar Condicionado", "Acessibilidade", "Loja", "Café"],
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tickets: [
      {
        id: 1,
        name: "Entrada Individual",
        description: "Acesso à exposição",
        price: 15.0,
        available: 83,
        total: 150,
        benefits: ["Acesso à exposição", "Catálogo digital"],
      },
      {
        id: 2,
        name: "Meia Entrada",
        description: "Para estudantes e idosos",
        price: 7.5,
        available: 20,
        total: 30,
        benefits: ["Acesso à exposição", "Catálogo digital"],
        requirements: "Apresentar documento comprobatório",
      },
    ],
    status: "Disponível",
    tags: ["Arte", "Exposição", "Contemporânea", "Local", "Cultura"],
  },
  {
    id: 6,
    title: "Palestra: Sustentabilidade Urbana",
    description: "Discussão sobre práticas sustentáveis nas cidades modernas",
    longDescription: `
      Palestra magna sobre sustentabilidade urbana e práticas eco-friendly nas grandes cidades.

      **Palestrantes:**
      • Dr. Carlos Ambiente - Especialista em sustentabilidade
      • Eng. Maria Verde - Arquitetura sustentável
      • Prof. João Eco - Políticas públicas ambientais

      **Temas abordados:**
      • Mobilidade sustentável
      • Energia renovável urbana
      • Gestão de resíduos
      • Arquitetura verde
      • Políticas públicas

      **Incluso:**
      • Material didático
      • Coffee break sustentável
      • Certificado de participação
      • Networking
    `,
    date: "2024-02-28",
    time: "19:00",
    endTime: "22:00",
    location: "Auditório da Universidade",
    address: "Av. Universitária, 1000 - Cidade Universitária, São Paulo - SP",
    category: "Educação",
    participants: 120,
    maxParticipants: 200,
    rating: 4.4,
    totalReviews: 28,
    price: "Gratuito",
    organizer: {
      name: "Instituto de Meio Ambiente",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      rating: 4.6,
      totalEvents: 35,
    },
    venue: {
      name: "Auditório da Universidade",
      capacity: 200,
      address: "Av. Universitária, 1000 - Cidade Universitária",
      amenities: ["Ar Condicionado", "Projetor", "Som", "Acessibilidade", "Estacionamento"],
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tickets: [
      {
        id: 1,
        name: "Entrada Gratuita",
        description: "Acesso livre à palestra",
        price: 0,
        available: 80,
        total: 200,
        benefits: ["Acesso à palestra", "Material didático", "Coffee break", "Certificado"],
      },
    ],
    status: "Confirmado",
    tags: ["Sustentabilidade", "Educação", "Meio Ambiente", "Gratuito", "Universidade"],
  },
]

// Função para obter todos os eventos
export const getEventsData = () => eventsDataArray

// Função para adicionar novo evento
export const addEvent = (newEvent: Omit<Event, "id">) => {
  const id = Math.max(...eventsDataArray.map((e) => e.id), 0) + 1
  const eventWithId = { ...newEvent, id }
  eventsDataArray.push(eventWithId)
  return eventWithId
}

// Função para buscar evento por ID
export const getEventById = (id: number) => {
  return eventsDataArray.find((event) => event.id === id)
}

// Função para buscar eventos por tag
export const getEventsByTag = (tag: string) => {
  return eventsDataArray.filter((event) =>
    event.tags.some((eventTag) => eventTag.toLowerCase().includes(tag.toLowerCase())),
  )
}
