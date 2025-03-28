#!/bin/bash
# Script de deploy para RastreioExpress

echo "🚀 Iniciando deploy do RastreioExpress..."

# Atualizar código do repositório
git pull

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar cliente Prisma
echo "🔄 Gerando cliente Prisma..."
npx prisma generate

# Executar migrações do banco de dados
echo "🗃️ Atualizando banco de dados..."
npx prisma migrate deploy

# Construir frontend
echo "🏗️ Construindo frontend..."
npm run build

# Reiniciar serviços
echo "🔄 Reiniciando serviços..."
pm2 restart all

echo "✅ Deploy concluído com sucesso!"