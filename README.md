# Rastreio Express - Sistema de Rastreamento

## Controle de Acesso

O sistema agora conta com controle de acesso baseado em perfis, com os seguintes perfis disponíveis:

1. **Usuário (user)**: Acesso básico ao sistema
2. **Master**: Acesso completo, incluindo configurações do sistema e gerenciamento de usuários

### Credenciais de Acesso

Para acessar o sistema como administrador:

- **Email**: admin@example.com
- **Senha**: admin123

### Funcionalidades por Perfil

#### Perfil Usuário (user)
- Acesso ao Dashboard
- Visualização de dados de rastreamento
- Outras funcionalidades básicas

#### Perfil Master
- Todas as funcionalidades do perfil Usuário
- Acesso à página de Configurações
- Gerenciamento de usuários (criar, editar perfil, excluir)

### Implementação Técnica

A implementação do controle de acesso incluiu as seguintes modificações:

1. Adição do campo `role` na tabela `User` no banco de dados
2. Criação de rotas protegidas baseadas no perfil do usuário
3. Middleware para validação de acesso à API
4. Interface de gerenciamento de usuários na página de Configurações
5. Atualização da navegação para exibir opções de acordo com o perfil

### API para Gerenciamento de Usuários

Endpoints disponíveis para gerenciamento de usuários (apenas para perfil Master):

- `GET /api/admin/users` - Listar todos os usuários
- `POST /api/admin/users` - Criar um novo usuário
- `PATCH /api/admin/users/:id` - Atualizar o perfil de um usuário
- `DELETE /api/admin/users/:id` - Excluir um usuário

## Executando o Projeto

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute as migrações: `npx prisma migrate dev`
4. Popule o banco de dados: `npx prisma db seed`
5. Inicie o servidor: `npm run dev`

## Tecnologias

- React
- TypeScript
- Prisma
- Express
- SQLite 