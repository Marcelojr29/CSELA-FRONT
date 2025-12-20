# API de Galeria de Fotos

Esta API permite gerenciar a galeria de fotos do condomínio que aparece no carrossel da página inicial, incluindo upload, visualização, controle de status e estatísticas.

## Endpoints Disponíveis

### 🔒 Todos os endpoints requerem autenticação JWT

**Header obrigatório:**
```
Authorization: Bearer SEU_TOKEN_JWT
```

---

## 📝 Adicionar Foto na Galeria

**POST** `/api/galeria`

Adiciona uma nova foto à galeria do site.

### Request Body:
```json
{
  "imageUrl": "/images/AcaoSocial.jpeg",
  "title": "Ação Social da Comunidade Bela Vista",
  "description": "Ação Social da Comunidade Bela Vista realizada em dezembro de 2024",
  "status": "ativa",
  "addedBy": "Admin"
}
```

### Campos Obrigatórios:
- `imageUrl`: URL da imagem (1-500 caracteres, pode ser URL completa ou caminho local começando com `/`)
- `title`: Título da foto (1-255 caracteres)
- `description`: Descrição da foto
- `addedBy`: Nome de quem adicionou a foto (1-100 caracteres)

### Campos Opcionais:
- `status`: Status da foto (`"ativa"` ou `"inativa"`, padrão: `"ativa"`)

### Status Válidos:
- `ativa`: Foto aparece no carrossel da página inicial
- `inativa`: Foto oculta do carrossel

### Response (201 Created):
```json
{
  "id": 1,
  "imageUrl": "/images/AcaoSocial.jpeg",
  "title": "Ação Social da Comunidade Bela Vista",
  "description": "Ação Social da Comunidade Bela Vista realizada em dezembro de 2024",
  "status": "ativa",
  "addedBy": "Admin",
  "views": 0,
  "createdAt": "2024-12-15T10:30:00.000Z",
  "updatedAt": "2024-12-15T10:30:00.000Z"
}
```

### Validações:
- URL da imagem deve ser válida (http/https ou caminho local com `/`)
- Todos os campos de texto respeitam limites de tamanho

---

## 📋 Listar Fotos da Galeria

**GET** `/api/galeria`

Lista todas as fotos da galeria com paginação e filtros opcionais.

### Query Parameters:
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 10, máximo: 100)
- `search`: Busca por título, descrição ou nome do adicionante
- `status`: Filtrar por status (`"ativa"` ou `"inativa"`)

### Exemplos:
```
GET /api/galeria?page=1&limit=20
GET /api/galeria?search=Ação Social
GET /api/galeria?status=ativa
GET /api/galeria?search=poço&status=ativa
```

### Response (200 OK):
```json
{
  "data": [
    {
      "id": 1,
      "imageUrl": "/images/AcaoSocial.jpeg",
      "title": "Ação Social da Comunidade Bela Vista",
      "description": "Ação Social da Comunidade Bela Vista realizada em dezembro de 2024",
      "status": "ativa",
      "addedBy": "Admin",
      "views": 125,
      "createdAt": "2024-12-15T10:30:00.000Z",
      "updatedAt": "2024-12-15T10:30:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

---

## 🌟 Listar Fotos Ativas

**GET** `/api/galeria/ativas`

Retorna todas as fotos ativas da galeria (para exibição no carrossel da página inicial).

### Response (200 OK):
```json
[
  {
    "id": 1,
    "imageUrl": "/images/AcaoSocial.jpeg",
    "title": "Ação Social da Comunidade Bela Vista",
    "description": "Ação Social da Comunidade Bela Vista",
    "status": "ativa",
    "addedBy": "Admin",
    "views": 125,
    "createdAt": "2024-12-15T10:30:00.000Z",
    "updatedAt": "2024-12-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "imageUrl": "/images/Padre.jpeg",
    "title": "Presidente Edivaldo Barreto",
    "description": "Presidente Edivaldo Barreto em Ação Social",
    "status": "ativa",
    "addedBy": "Admin",
    "views": 98,
    "createdAt": "2024-12-15T10:35:00.000Z",
    "updatedAt": "2024-12-15T10:35:00.000Z"
  }
]
```

### Observações:
- Ordenado por data de criação (mais recentes primeiro)
- Útil para o frontend exibir apenas fotos disponíveis no carrossel

---

## 📊 Obter Estatísticas da Galeria

**GET** `/api/galeria/statistics`

Retorna estatísticas gerais sobre as fotos da galeria.

### Response (200 OK):
```json
{
  "total": 50,
  "ativas": 45,
  "inativas": 5,
  "totalViews": 5420,
  "topPhotos": [
    {
      "id": 1,
      "title": "Ação Social da Comunidade Bela Vista",
      "views": 325
    },
    {
      "id": 3,
      "title": "Bomba aumenta a pressão das tubulações",
      "views": 298
    },
    {
      "id": 2,
      "title": "Presidente Edivaldo Barreto",
      "views": 267
    },
    {
      "id": 5,
      "title": "Escavação",
      "views": 234
    },
    {
      "id": 7,
      "title": "Poço em ponto estratégico",
      "views": 189
    }
  ]
}
```

### Campos Retornados:
- `total`: Total de fotos na galeria
- `ativas`: Quantidade de fotos ativas
- `inativas`: Quantidade de fotos inativas
- `totalViews`: Soma total de visualizações de todas as fotos
- `topPhotos`: Top 5 fotos mais visualizadas (id, título e número de views)

---

## 🔍 Buscar Foto por ID

**GET** `/api/galeria/:id`

Busca uma foto específica da galeria pelo ID.

### Parâmetros:
- `id`: ID da foto (número inteiro)

### Exemplo:
```
GET /api/galeria/1
```

### Response (200 OK):
```json
{
  "id": 1,
  "imageUrl": "/images/AcaoSocial.jpeg",
  "title": "Ação Social da Comunidade Bela Vista",
  "description": "Ação Social da Comunidade Bela Vista realizada em dezembro de 2024",
  "status": "ativa",
  "addedBy": "Admin",
  "views": 125,
  "createdAt": "2024-12-15T10:30:00.000Z",
  "updatedAt": "2024-12-15T10:30:00.000Z"
}
```

### Response (404 Not Found):
```json
{
  "statusCode": 404,
  "message": "Foto da galeria com ID \"1\" não encontrada",
  "error": "Not Found"
}
```

---

## ✏️ Atualizar Foto da Galeria

**PATCH** `/api/galeria/:id`

Atualiza uma foto existente na galeria.

### Parâmetros:
- `id`: ID da foto (número inteiro)

### Request Body (todos os campos opcionais):
```json
{
  "imageUrl": "/images/AcaoSocialAtualizada.jpeg",
  "title": "Ação Social da Comunidade - Atualizado",
  "description": "Descrição atualizada da ação social",
  "status": "inativa",
  "addedBy": "Administrador"
}
```

### Exemplo:
```
PATCH /api/galeria/1
```

### Response (200 OK):
```json
{
  "id": 1,
  "imageUrl": "/images/AcaoSocialAtualizada.jpeg",
  "title": "Ação Social da Comunidade - Atualizado",
  "description": "Descrição atualizada da ação social",
  "status": "inativa",
  "addedBy": "Administrador",
  "views": 125,
  "createdAt": "2024-12-15T10:30:00.000Z",
  "updatedAt": "2024-12-15T14:20:00.000Z"
}
```

### Response (404 Not Found):
```json
{
  "statusCode": 404,
  "message": "Foto da galeria com ID \"1\" não encontrada",
  "error": "Not Found"
}
```

---

## 🔄 Alternar Status da Foto

**PATCH** `/api/galeria/:id/status`

Alterna o status de uma foto entre ativa e inativa.

### Parâmetros:
- `id`: ID da foto (número inteiro)

### Exemplo:
```
PATCH /api/galeria/1/status
```

### Response (200 OK):
```json
{
  "id": 1,
  "imageUrl": "/images/AcaoSocial.jpeg",
  "title": "Ação Social da Comunidade Bela Vista",
  "description": "Ação Social da Comunidade Bela Vista",
  "status": "inativa",
  "addedBy": "Admin",
  "views": 125,
  "createdAt": "2024-12-15T10:30:00.000Z",
  "updatedAt": "2024-12-15T14:25:00.000Z"
}
```

### Observações:
- Se a foto está `ativa`, será alterada para `inativa`
- Se a foto está `inativa`, será alterada para `ativa`
- Útil para esconder/mostrar fotos rapidamente no carrossel

---

## 👁️ Incrementar Visualizações

**PATCH** `/api/galeria/:id/view`

Incrementa o contador de visualizações de uma foto.

### Parâmetros:
- `id`: ID da foto (número inteiro)

### Exemplo:
```
PATCH /api/galeria/1/view
```

### Response (200 OK):
```json
{
  "id": 1,
  "imageUrl": "/images/AcaoSocial.jpeg",
  "title": "Ação Social da Comunidade Bela Vista",
  "description": "Ação Social da Comunidade Bela Vista",
  "status": "ativa",
  "addedBy": "Admin",
  "views": 126,
  "createdAt": "2024-12-15T10:30:00.000Z",
  "updatedAt": "2024-12-15T14:30:00.000Z"
}
```

### Observações:
- Útil para rastrear quais fotos são mais visualizadas
- O campo `views` é incrementado em 1 a cada chamada
- Usado automaticamente quando usuários visualizam fotos no carrossel

---

## 🗑️ Excluir Foto

**DELETE** `/api/galeria/:id`

Remove uma foto da galeria permanentemente.

### Parâmetros:
- `id`: ID da foto (número inteiro)

### Exemplo:
```
DELETE /api/galeria/1
```

### Response (204 No Content):
Sem conteúdo (foto excluída com sucesso)

### Response (404 Not Found):
```json
{
  "statusCode": 404,
  "message": "Foto da galeria com ID \"1\" não encontrada",
  "error": "Not Found"
}
```

---

## 🌱 Popular Dados Iniciais

**POST** `/api/galeria/seed`

Adiciona as fotos iniciais da galeria (usar apenas uma vez).

### Response (201 Created):
```json
{
  "message": "Dados iniciais adicionados com sucesso"
}
```

### Observações:
- Adiciona 9 fotos pré-definidas ao sistema
- Só funciona se não houver fotos cadastradas
- Útil para configuração inicial do sistema
- Fotos incluídas:
  - Ação Social da Comunidade Bela Vista
  - Presidente Edivaldo Barreto
  - Ação Social (entrega de alimentos)
  - Escavação
  - Bomba de pressão das tubulações
  - Compressor para limpeza e manutenção
  - Equipe executando troca de bomba
  - Painel de proteção das bombas
  - Poço em ponto estratégico

---

## 📦 Exemplos de Uso Completo

### Exemplo 1: Adicionar Nova Foto
```bash
curl -X POST http://localhost:3000/api/galeria \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "/images/nova-foto.jpeg",
    "title": "Nova Infraestrutura do Condomínio",
    "description": "Reforma recente da área comum",
    "status": "ativa",
    "addedBy": "João Silva"
  }'
```

### Exemplo 2: Listar Fotos Ativas para o Carrossel
```bash
curl -X GET http://localhost:3000/api/galeria/ativas \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Exemplo 3: Buscar Fotos por Termo
```bash
curl -X GET "http://localhost:3000/api/galeria?search=bomba&page=1&limit=10" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Exemplo 4: Obter Estatísticas
```bash
curl -X GET http://localhost:3000/api/galeria/statistics \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Exemplo 5: Desativar Foto
```bash
curl -X PATCH http://localhost:3000/api/galeria/1/status \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Exemplo 6: Registrar Visualização
```bash
curl -X PATCH http://localhost:3000/api/galeria/1/view \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🎨 Exemplo de Integração Frontend (React)

### Componente de Carrossel com Galeria
```typescript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GalleryPhoto {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  views: number;
}

function GalleryCarousel() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivePhotos();
  }, []);

  const fetchActivePhotos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/galeria/ativas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPhotos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
      setLoading(false);
    }
  };

  const incrementView = async (photoId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3000/api/galeria/${photoId}/view`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
    }
  };

  const nextPhoto = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    incrementView(photos[newIndex].id);
  };

  const prevPhoto = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    incrementView(photos[newIndex].id);
  };

  if (loading) return <div>Carregando galeria...</div>;
  if (photos.length === 0) return <div>Nenhuma foto disponível</div>;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="carousel">
      <button onClick={prevPhoto}>❮ Anterior</button>
      
      <div className="photo-container">
        <img 
          src={currentPhoto.imageUrl} 
          alt={currentPhoto.title}
        />
        <div className="photo-info">
          <h3>{currentPhoto.title}</h3>
          <p>{currentPhoto.description}</p>
          <span>👁️ {currentPhoto.views} visualizações</span>
        </div>
      </div>

      <button onClick={nextPhoto}>Próxima ❯</button>

      <div className="indicators">
        {photos.map((_, index) => (
          <span 
            key={index}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => {
              setCurrentIndex(index);
              incrementView(photos[index].id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryCarousel;
```

### Painel de Administração da Galeria
```typescript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GalleryPhoto {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  status: 'ativa' | 'inativa';
  views: number;
  addedBy: string;
}

function GalleryAdmin() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchPhotos();
    fetchStatistics();
  }, []);

  const fetchPhotos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/galeria?limit=100', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPhotos(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/galeria/statistics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const toggleStatus = async (photoId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3000/api/galeria/${photoId}/status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPhotos(); // Recarrega lista
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  const deletePhoto = async (photoId: number) => {
    if (!confirm('Deseja realmente excluir esta foto?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/galeria/${photoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPhotos(); // Recarrega lista
      fetchStatistics(); // Atualiza estatísticas
    } catch (error) {
      console.error('Erro ao excluir foto:', error);
    }
  };

  return (
    <div className="gallery-admin">
      {/* Estatísticas */}
      {stats && (
        <div className="stats-panel">
          <h2>Estatísticas da Galeria</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total de Fotos</h3>
              <p>{stats.total}</p>
            </div>
            <div className="stat-card">
              <h3>Fotos Ativas</h3>
              <p>{stats.ativas}</p>
            </div>
            <div className="stat-card">
              <h3>Fotos Inativas</h3>
              <p>{stats.inativas}</p>
            </div>
            <div className="stat-card">
              <h3>Total de Visualizações</h3>
              <p>{stats.totalViews}</p>
            </div>
          </div>

          <div className="top-photos">
            <h3>Top 5 Fotos Mais Visualizadas</h3>
            <ul>
              {stats.topPhotos.map((photo: any, index: number) => (
                <li key={photo.id}>
                  {index + 1}. {photo.title} - {photo.views} visualizações
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Lista de Fotos */}
      <div className="photos-list">
        <h2>Gerenciar Fotos</h2>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Status</th>
              <th>Visualizações</th>
              <th>Adicionado por</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {photos.map(photo => (
              <tr key={photo.id}>
                <td>
                  <img src={photo.imageUrl} alt={photo.title} width="100" />
                </td>
                <td>{photo.title}</td>
                <td>
                  <span className={`badge ${photo.status}`}>
                    {photo.status}
                  </span>
                </td>
                <td>👁️ {photo.views}</td>
                <td>{photo.addedBy}</td>
                <td>
                  <button onClick={() => toggleStatus(photo.id)}>
                    {photo.status === 'ativa' ? 'Desativar' : 'Ativar'}
                  </button>
                  <button onClick={() => deletePhoto(photo.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GalleryAdmin;
```

---

## 🔒 Códigos de Resposta HTTP

- `200 OK`: Operação realizada com sucesso
- `201 Created`: Recurso criado com sucesso
- `204 No Content`: Recurso excluído com sucesso
- `400 Bad Request`: Dados inválidos fornecidos
- `401 Unauthorized`: Token JWT inválido ou expirado
- `404 Not Found`: Foto não encontrada
- `500 Internal Server Error`: Erro interno do servidor

---

## 📝 Observações Importantes

1. **Autenticação**: Todos os endpoints requerem token JWT válido
2. **URL de Imagens**: Aceita URLs completas (http/https) ou caminhos locais começando com `/`
3. **Status**: Apenas fotos com status `"ativa"` aparecem no carrossel
4. **Visualizações**: O contador de views deve ser incrementado quando usuários visualizam as fotos
5. **Paginação**: Limite máximo de 100 itens por página
6. **Busca**: A busca é case-insensitive e busca em título, descrição e nome do adicionante
7. **Seed**: O endpoint de seed só funciona se não houver fotos cadastradas
8. **Ordenação**: Por padrão, fotos são ordenadas por data de criação (mais recentes primeiro)
9. **Top Photos**: A estatística de fotos mais visualizadas retorna apenas o top 5

---

## 🚀 Fluxo Recomendado de Uso

1. **Configuração Inicial**:
   - Chamar `/api/galeria/seed` para popular fotos iniciais
   - Verificar com `/api/galeria/ativas` se as fotos estão disponíveis

2. **Exibição no Frontend**:
   - Buscar fotos ativas com `/api/galeria/ativas`
   - Exibir no carrossel da página inicial
   - Registrar visualização com `/api/galeria/:id/view` quando usuário visualizar

3. **Administração**:
   - Listar todas as fotos com `/api/galeria?limit=100`
   - Ver estatísticas com `/api/galeria/statistics`
   - Gerenciar status com `/api/galeria/:id/status`
   - Adicionar novas fotos com `POST /api/galeria`
   - Excluir fotos com `DELETE /api/galeria/:id`

4. **Monitoramento**:
   - Acompanhar visualizações nas estatísticas
   - Identificar fotos mais populares
   - Gerenciar fotos ativas/inativas conforme necessário
