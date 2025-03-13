import { PrismaClient } from '@prisma/client'
import { addDays, subDays } from 'date-fns'

const prisma = new PrismaClient()

const paymentMethods = ['credit_card', 'pix', 'boleto']
const status = ['waiting_payment', 'paid', 'refused', 'refunded', 'chargedback']
const deliveryStatus = ['waiting', 'in_transit', 'delivered', 'returned']
const cities = [
  { city: 'São Paulo', state: 'SP' },
  { city: 'Rio de Janeiro', state: 'RJ' },
  { city: 'Belo Horizonte', state: 'MG' },
  { city: 'Salvador', state: 'BA' },
  { city: 'Curitiba', state: 'PR' }
]

export async function seedCustomers() {
  const customers = [
    {
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "11988776655",
      document: { type: "cpf", number: "12345678900" },
      address: {
        street: "Avenida Paulista",
        streetNumber: "1000",
        complement: "Apto 123",
        zipCode: "01310100",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        country: "BR"
      },
      order: {
        amount: 1500,
        status: "paid",
        trackingCode: "RE987654321BR",
        currentStep: 4,
        items: [{ title: "Curso Marketing Digital Pro", quantity: 1, unitPrice: 1500 }]
      }
    },
    {
      name: "Ana Santos",
      email: "ana.santos@empresa.com.br",
      phone: "21977665544",
      document: { type: "cpf", number: "98765432100" },
      address: {
        street: "Rua do Comércio",
        streetNumber: "500",
        complement: "Sala 45",
        zipCode: "20010020",
        neighborhood: "Centro",
        city: "Rio de Janeiro",
        state: "RJ",
        country: "BR"
      },
      order: {
        amount: 2990,
        status: "in_transit",
        trackingCode: "RE123987456BR",
        currentStep: 2,
        items: [{ title: "Consultoria Express", quantity: 1, unitPrice: 2990 }]
      }
    },
    {
      name: "Pedro Oliveira",
      email: "pedro.oliveira@gmail.com",
      phone: "31999887766",
      document: { type: "cpf", number: "45678912300" },
      address: {
        street: "Rua dos Ipês",
        streetNumber: "789",
        complement: "Casa 2",
        zipCode: "30140110",
        neighborhood: "Savassi",
        city: "Belo Horizonte",
        state: "MG",
        country: "BR"
      },
      order: {
        amount: 3500,
        status: "delivered",
        trackingCode: "RE789456123BR",
        currentStep: 5,
        items: [{ title: "Curso Completo de Marketing", quantity: 1, unitPrice: 3500 }]
      }
    },
    {
      name: "Startup Solutions LTDA",
      email: "financeiro@startupsolutions.com.br",
      phone: "1134567890",
      document: { type: "cnpj", number: "23456789000188" },
      address: {
        street: "Rua Faria Lima",
        streetNumber: "1500",
        complement: "Cj 101",
        zipCode: "04538132",
        neighborhood: "Itaim Bibi",
        city: "São Paulo",
        state: "SP",
        country: "BR"
      },
      order: {
        amount: 8990,
        status: "paid",
        trackingCode: "RE321654987BR",
        currentStep: 3,
        items: [{ title: "Consultoria Empresarial Premium", quantity: 1, unitPrice: 8990 }]
      }
    },
    {
      name: "Carolina Mendes",
      email: "carol.mendes@hotmail.com",
      phone: "71988776655",
      document: { type: "cpf", number: "78912345600" },
      address: {
        street: "Avenida Oceânica",
        streetNumber: "1234",
        complement: "Apto 502",
        zipCode: "40170110",
        neighborhood: "Barra",
        city: "Salvador",
        state: "BA",
        country: "BR"
      },
      order: {
        amount: 1990,
        status: "in_transit",
        trackingCode: "RE147258369BR",
        currentStep: 2,
        items: [{ title: "Curso de Design Digital", quantity: 1, unitPrice: 1990 }]
      }
    },
    {
      name: "Rafael Costa",
      email: "rafael.costa@uol.com.br",
      phone: "41999887766",
      document: { type: "cpf", number: "89123456700" },
      address: {
        street: "Rua XV de Novembro",
        streetNumber: "700",
        complement: null,
        zipCode: "80020310",
        neighborhood: "Centro",
        city: "Curitiba",
        state: "PR",
        country: "BR"
      },
      order: {
        amount: 2490,
        status: "waiting_payment",
        trackingCode: "RE963852741BR",
        currentStep: 1,
        items: [{ title: "Curso de Programação Web", quantity: 1, unitPrice: 2490 }]
      }
    },
    {
      name: "Digital Marketing EIRELI",
      email: "contato@digitalmarketing.com.br",
      phone: "2125634789",
      document: { type: "cnpj", number: "34567890000177" },
      address: {
        street: "Avenida Rio Branco",
        streetNumber: "156",
        complement: "Sala 1201",
        zipCode: "20040901",
        neighborhood: "Centro",
        city: "Rio de Janeiro",
        state: "RJ",
        country: "BR"
      },
      order: {
        amount: 7500,
        status: "refused",
        trackingCode: "RE741852963BR",
        currentStep: 1,
        items: [{ title: "Pacote Agência Digital", quantity: 1, unitPrice: 7500 }]
      }
    },
    {
      name: "Fernanda Lima",
      email: "fernanda.lima@gmail.com",
      phone: "31987654321",
      document: { type: "cpf", number: "90123456788" },
      address: {
        street: "Rua da Bahia",
        streetNumber: "1000",
        complement: "Apto 801",
        zipCode: "30160011",
        neighborhood: "Centro",
        city: "Belo Horizonte",
        state: "MG",
        country: "BR"
      },
      order: {
        amount: 990,
        status: "chargedback",
        trackingCode: "RE159753468BR",
        currentStep: 1,
        items: [{ title: "Curso Excel Avançado", quantity: 1, unitPrice: 990 }]
      }
    },
    {
      name: "Tech Education LTDA",
      email: "contato@techeducation.com.br",
      phone: "1145678901",
      document: { type: "cnpj", number: "45678901000166" },
      address: {
        street: "Avenida Brigadeiro Faria Lima",
        streetNumber: "3477",
        complement: "14º Andar",
        zipCode: "04538133",
        neighborhood: "Itaim Bibi",
        city: "São Paulo",
        state: "SP",
        country: "BR"
      },
      order: {
        amount: 12990,
        status: "paid",
        trackingCode: "RE852963741BR",
        currentStep: 4,
        items: [{ title: "Plataforma Educacional Enterprise", quantity: 1, unitPrice: 12990 }]
      }
    },
    {
      name: "Mariana Santos",
      email: "mari.santos@outlook.com",
      phone: "71999887766",
      document: { type: "cpf", number: "01234567899" },
      address: {
        street: "Avenida Tancredo Neves",
        streetNumber: "2227",
        complement: "Sala 501",
        zipCode: "41820021",
        neighborhood: "Caminho das Árvores",
        city: "Salvador",
        state: "BA",
        country: "BR"
      },
      order: {
        amount: 1750,
        status: "in_transit",
        trackingCode: "RE369258147BR",
        currentStep: 3,
        items: [{ title: "Curso de Social Media", quantity: 1, unitPrice: 1750 }]
      }
    },
    {
      name: "Lucas Mendonça",
      email: "lucas.mendonca@gmail.com",
      phone: "41988776655",
      document: { type: "cpf", number: "12345098766" },
      address: {
        street: "Rua Comendador Araújo",
        streetNumber: "323",
        complement: "Cj 84",
        zipCode: "80420000",
        neighborhood: "Centro",
        city: "Curitiba",
        state: "PR",
        country: "BR"
      },
      order: {
        amount: 4990,
        status: "delivered",
        trackingCode: "RE147852369BR",
        currentStep: 5,
        items: [{ title: "Curso Full Stack Developer", quantity: 1, unitPrice: 4990 }]
      }
    },
    {
      name: "Innovation Labs LTDA",
      email: "contato@innovationlabs.com.br",
      phone: "1134567891",
      document: { type: "cnpj", number: "56789012000155" },
      address: {
        street: "Rua Funchal",
        streetNumber: "500",
        complement: "4º Andar",
        zipCode: "04551060",
        neighborhood: "Vila Olímpia",
        city: "São Paulo",
        state: "SP",
        country: "BR"
      },
      order: {
        amount: 15990,
        status: "paid",
        trackingCode: "RE258963147BR",
        currentStep: 2,
        items: [{ title: "Consultoria de Inovação", quantity: 1, unitPrice: 15990 }]
      }
    },
    {
      name: "Amanda Rodrigues",
      email: "amanda.rodrigues@hotmail.com",
      phone: "21987654321",
      document: { type: "cpf", number: "23456789011" },
      address: {
        street: "Avenida Atlântica",
        streetNumber: "2000",
        complement: "Apto 1201",
        zipCode: "22021001",
        neighborhood: "Copacabana",
        city: "Rio de Janeiro",
        state: "RJ",
        country: "BR"
      },
      order: {
        amount: 2990,
        status: "waiting_payment",
        trackingCode: "RE963741852BR",
        currentStep: 1,
        items: [{ title: "Curso de UX/UI Design", quantity: 1, unitPrice: 2990 }]
      }
    }
  ]

  // Criar os clientes e pedidos
  for (const customerData of customers) {
    const customer = await prisma.customer.create({
      data: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        document: {
          create: {
            type: customerData.document.type,
            number: customerData.document.number
          }
        },
        address: {
          create: customerData.address
        },
        orders: {
          create: {
            trackingCode: customerData.order.trackingCode,
            status: customerData.order.status,
            currentStep: customerData.order.currentStep,
            items: {
              create: customerData.order.items
            }
          }
        }
      }
    })
    
    console.log(`Cliente criado: ${customer.name}`)
  }
} 