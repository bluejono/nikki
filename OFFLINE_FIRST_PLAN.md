# 📝 Plano de Implementação: Offline-First com SQLite + Drizzle

Este documento detalha o passo a passo para implementar a persistência de dados local no Nikki, utilizando **SQLite** (via `expo-sqlite`) e **Drizzle ORM**.

---

## 🏗️ Stack Tecnológica
- **Banco de Dados:** SQLite (nativo do dispositivo).
- **ORM:** Drizzle ORM (TypeScript-first, leve e performático).
- **Migrations:** Drizzle Kit.

---

## 🚀 Passo a Passo

### 1. Instalação de Dependências
Precisamos instalar o core do banco e as ferramentas de desenvolvimento do Drizzle.

```bash
# Core
npx expo install expo-sqlite expo-file-system
npm install drizzle-orm

# Dev Dependencies
npm install -D drizzle-kit
```

### 2. Estrutura de Pastas
Vamos organizar os arquivos dentro do diretório `/db` já existente:
```text
/db
  ├── schema.ts      # Definição das tabelas
  ├── client.ts      # Configuração do cliente do banco
  └── migrations/    # SQL gerado automaticamente pelo Drizzle
```

### 3. Definição do Schema (`db/schema.ts`)
Criar a tabela de notas com os campos necessários.
- `id`: Texto (UUID) para evitar conflitos em futuros syncs.
- `title` e `content`.
- Timestamps de criação e atualização.

### 4. Configuração do Cliente (`db/client.ts`)
Configurar a conexão entre o `expo-sqlite` e o Drizzle.

### 5. Configuração do Drizzle Kit (`drizzle.config.ts`)
Criar o arquivo na raiz do projeto para que o Drizzle saiba como gerar as migrations para o SQLite do celular.

### 6. Execução das Migrations
No Expo, as migrations precisam ser aplicadas ao iniciar o app. Usaremos o hook `useMigrations` do `drizzle-orm/expo-sqlite`.

### 7. Criação de Hooks/Serviços de Dados
Implementar funções reutilizáveis:
- `getNotes()`
- `insertNote(note)`
- `updateNote(id, data)`
- `deleteNote(id)`

### 8. Integração na UI
- Criar um estado global ou usar `React Query` para gerenciar o cache das notas vindo do DB.
- Substituir o mock da `Index` pela chamada real ao banco.

---

## 📋 Schema Sugerido

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const notes = sqliteTable('notes', {
  id: text('id').primaryKey(), // Gerado via crypto.randomUUID()
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  isSynced: integer('is_synced', { mode: 'boolean' }).default(false),
});
```

---

## 🛠️ Comandos Úteis
- `npx drizzle-kit generate`: Gera os arquivos SQL de migração baseados no seu `schema.ts`.
- `npx drizzle-kit studio`: Abre uma interface visual para ver os dados (requer configuração extra para ler do simulador).
