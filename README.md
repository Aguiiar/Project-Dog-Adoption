# 🐶 Adoption Dogs - Sistema Full Stack de Adoção de Cães

## 🚀 Sobre o Projeto

O **Adoption Dogs** é uma sistema Full Stack de adoção de cães, utilizando uma arquitetura baseada em **microserviços**, frontend moderno em **React** e backend construído com **ASP.NET Core**.

O sistema permite que usuários realizem cadastro e autenticação, recuperem suas senhas por e-mail, visualizem cães disponíveis para adoção, pesquisem por raça, enviem mensagens de contato e realizem o cadastro de adotantes vinculando um cão existente.

A comunicação entre os serviços acontece através de APIs REST, onde cada microserviço possui sua própria responsabilidade, proporcionando baixo acoplamento, maior organização e facilidade de manutenção.

O projeto foi desenvolvido com foco em arquitetura em camadas, comunicação entre microserviços, implementação de regras de negócio, autenticação JWT, consumo de APIs, envio de e-mails utilizando SMTP e construção de uma SPA utilizando React.

---

# 🎯 Principais Funcionalidades

## 👤 Sistema de Usuários

- Cadastro de usuários
- Login utilizando JWT
- Autenticação por Token
- Proteção de rotas privadas
- Identificação do usuário autenticado
- Recuperação de senha por e-mail
- Redefinição de senha através de token

---

## 🐶 Gerenciamento de Cães

O microserviço responsável pelos cães disponibiliza uma API REST completa.

Funcionalidades:

- Cadastro de cães
- Atualização de informações
- Exclusão
- Consulta por Id
- Listagem completa
- Pesquisa por raça
- Armazenamento das imagens dos cães
- Informações detalhadas sobre cada animal

Cada cão possui:

- Nome
- Idade
- Data de nascimento
- Raça
- Descrição
- URL da imagem

---

## 👨 Gerenciamento de Adotantes

O sistema permite realizar o gerenciamento completo dos adotantes.

Funcionalidades:

- Cadastro
- Atualização
- Exclusão
- Consulta por Id
- Listagem completa

Cada adotante possui:

- Nome
- CPF
- Idade
- Data de nascimento
- Salário
- Cão adotado

Durante o cadastro, o sistema realiza comunicação com o microserviço de cães para validar se o animal informado realmente existe.

---

## 🌐 Página Inicial

A aplicação possui uma página inicial desenvolvida em React apresentando a plataforma de adoção de animais.

A Home possui:

- Layout responsivo
- Banner institucional
- Navegação entre páginas
- Interface moderna
- Componentização utilizando React

---

## 🔎 Pesquisa de Cães

Os usuários autenticados podem pesquisar cães utilizando a raça como filtro.

O filtro é realizado dinamicamente, permitindo localizar rapidamente os animais disponíveis para adoção.

---

## 📧 Sistema de Contato

O sistema disponibiliza uma página para envio de mensagens.

As mensagens são encaminhadas automaticamente para o e-mail configurado utilizando:

- MailKit
- SMTP Gmail

Cada mensagem enviada contém:

- E-mail informado pelo usuário
- Conteúdo da mensagem

---

## 🔐 Recuperação de Senha

A plataforma possui um fluxo completo de recuperação de senha.

Fluxo implementado:

1. Usuário informa o e-mail
2. O sistema gera um token
3. Um link é enviado automaticamente
4. O usuário acessa o link
5. Define uma nova senha
6. A senha é atualizada no banco de dados

Todo o processo é realizado utilizando autenticação baseada em token.

---

# 🏗️ Arquitetura

A solução foi construída utilizando arquitetura baseada em microserviços.

```

                    React
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
 User API        PetOwner API      Dog API
        │              │
        └──────► Comunicação HTTP ◄──────┘
                       │
                    SQLite

```

Cada microserviço possui responsabilidade única, facilitando manutenção, escalabilidade e reutilização do código.

---

## 📁 Arquitetura em Camadas

Todos os microserviços seguem a arquitetura:

```

Controller
↓
Service
↓
Repository
↓
Entity Framework Core
↓
SQLite

```

Essa separação permite melhor organização do projeto, aplicação do princípio de responsabilidade única e maior facilidade para manutenção futura.

---
# 📁 Controllers

Os Controllers são responsáveis por:

- Expor endpoints REST
- Receber requisições HTTP
- Validar entradas
- Chamar os serviços responsáveis
- Retornar respostas ao cliente

Controllers implementados:

## 🐶 DogController

Responsável pelo gerenciamento dos cães.

Principais operações:

- Cadastro de cães
- Busca por ID
- Listagem de cães
- Atualização
- Exclusão
- Pesquisa por raça


Endpoints:

```
POST   /api/dog
GET    /api/dog
GET    /api/dog/{id}
PUT    /api/dog/{id}
DELETE /api/dog/{id}
GET    /api/dog/breed/{breed}
```

---

## 👨 PetOwnerController

Responsável pelo gerenciamento dos adotantes.

Funcionalidades:

- Cadastro de adotantes
- Consulta de adotante
- Atualização de dados
- Exclusão
- Listagem de adotantes
- Consulta dos adotantes junto com seus respectivos cães


Endpoints:

```
POST   /api/petowner
GET    /api/petowner
GET    /api/petowner/{id}
PUT    /api/petowner/{id}
DELETE /api/petowner/{id}
GET    /api/petowner/all
```

---

## 📧 ContactController

Responsável pelo envio das mensagens de contato.

Funcionalidade:

- Receber mensagem do usuário
- Processar envio de e-mail
- Retornar confirmação ao frontend


Endpoint:

```
POST /api/contact
```

---

# 📁 Services

Os Services concentram toda a lógica de negócio da aplicação.

Responsáveis por:

- Regras de validação
- Processamento dos dados
- Comunicação entre serviços
- Controle do fluxo da aplicação


Services implementados:

## DogService

Responsável por:

- Cadastro de cães
- Atualização
- Exclusão
- Busca
- Filtros por raça


---

## PetOwnerService

Responsável pelas regras dos adotantes.

Funcionalidades:

- Validação de idade
- Validação de salário
- Comunicação com Dog API
- Cadastro do adotante
- Associação entre usuário e cão


---

## EmailService

Responsável pelo envio de mensagens utilizando:

- MailKit
- SMTP
- Configuração externa através do appsettings.json


---

# 📁 Repositories

Os Repositories são responsáveis pela persistência dos dados.

Utilizam:

- Entity Framework Core
- DbContext
- SQLite


Repositories implementados:

## DogRepository

Responsável pelo acesso aos dados dos cães.

Operações:

- Insert
- Update
- Delete
- FindById
- FindAll
- Pesquisa por raça


---

## PetOwnerRepository

Responsável pelo armazenamento dos adotantes.

Operações:

- Cadastro
- Atualização
- Exclusão
- Busca individual
- Listagem


---

# 🧠 Regras de Negócio

O sistema possui diversas regras para garantir consistência dos dados.

---

# 🐶 Validação de Existência do Cão

Antes de cadastrar um adotante, o sistema consulta o microserviço de cães:

```csharp
var dogExists = await _repositoryDog.DogExists(
    petOwner.DogId
);
```

Caso o cão não exista:

```
Dog don't exists
```

O cadastro não é realizado.

---

# 👨 Validação de Idade

O sistema verifica se o adotante possui idade mínima.

Regra:

```csharp
if(petOwner.Age < 18)
{
    throw new Exception(
        "You are a minor!"
    );
}
```

Somente maiores de idade podem realizar adoções.

---

# 💰 Validação de Renda

Para garantir que o adotante possui condições financeiras:

```csharp
if(petOwner.Salary < 1621)
{
    throw new Exception(
    "Invalid salary"
    );
}
```

O sistema bloqueia cadastros abaixo do valor mínimo definido.

---

# 📅 Validação da Data de Nascimento

A idade informada é comparada com a data de nascimento:

```csharp
var age =
DateTime.Today.Year -
petOwner.BirthDate.Year;
```

Caso exista inconsistência:

```
Birth Date is invalid
```

O cadastro é interrompido.

---

# 🔗 Comunicação Entre Microserviços

Um dos diferenciais do projeto é a comunicação entre APIs.

O microserviço de adotantes consome a API de cães utilizando:

```
HttpClient
```

Fluxo:

```
PetOwner API

      |
      |
      ▼

Dog API

      |
      |
      ▼

Validação do cachorro

```

Exemplo:

```csharp
var response =
await _httpClient.GetAsync(
$"api/dog/{DogId}"
);
```

Essa comunicação permite validar informações externas antes de persistir os dados.

---

# 🗄️ Modelagem do Banco de Dados

## 🐶 Dog

Armazena informações dos cães.

Campos:

- Id
- Nome
- Idade
- Data de nascimento
- Raça
- Descrição
- Imagem


---

## 👨 PetOwner

Armazena informações dos adotantes.

Campos:

- Id
- Nome
- Idade
- CPF
- Data de nascimento
- Salário
- DogId


---

# 🔗 Relacionamento Entre Entidades


```
PetOwner
    |
    |
    | DogId
    |
    ▼

Dog

```

O adotante possui uma referência para o cão escolhido através do identificador do animal.

---

# ⚙️ Tecnologias Utilizadas

## Backend

- C#
- ASP.NET Core
- Entity Framework Core
- ASP.NET Web API
- Dependency Injection
- HttpClient
- SQLite
- Swagger


## Arquitetura

- Microserviços
- Repository Pattern
- Service Layer
- DTO Pattern
- REST API


## Comunicação

- HTTP Client
- APIs REST


## Frontend

- React
- React Router DOM
- JavaScript ES6+
- Bootstrap 5
- CSS


## E-mails

- MailKit
- SMTP Gmail


## Banco de Dados

- SQLite

---

# 🎨 Funcionalidades do Frontend

O frontend foi desenvolvido utilizando **React** seguindo o conceito de **SPA (Single Page Application)**.

A aplicação realiza comunicação direta com as APIs através de requisições HTTP e possui separação de componentes para facilitar manutenção e organização.

---

## 🏠 Página Inicial

A Home apresenta a proposta da plataforma de adoção.

Funcionalidades:

- Apresentação institucional
- Banner principal
- Navegação entre páginas
- Layout responsivo
- Componentização com React


---

## 🐶 Página de Cães

Área responsável pela visualização dos animais disponíveis.

Funcionalidades:

- Listagem dinâmica de cães
- Cards personalizados
- Exibição de imagens
- Informações do animal
- Busca por raça
- Layout responsivo


Dados consumidos através da API:

```
GET /api/dog
```

---

## 🔐 Área de Login

O sistema possui autenticação de usuários.

Funcionalidades:

- Login através de e-mail e senha
- Armazenamento do token JWT
- Redirecionamento após autenticação
- Proteção de páginas privadas


Após autenticação:

```javascript
localStorage.setItem(
    "token",
    response.token
);
```

---

## 👤 Cadastro de Usuário

A aplicação permite criação de novas contas.

Validações implementadas:

- Nome obrigatório
- E-mail obrigatório
- Senha obrigatória
- Confirmação de senha
- Aceite dos termos de uso


---

## 🔑 Recuperação de Senha

Fluxo desenvolvido no frontend:

1. Usuário informa o e-mail
2. API envia link de recuperação
3. Usuário acessa a página de redefinição
4. Nova senha é cadastrada


Componentes envolvidos:

```
ForgotPassword.jsx

ResetPassword.jsx
```

---

## 📧 Página de Contato

Permite que usuários enviem mensagens para a plataforma.

Funcionalidades:

- Campo de e-mail
- Campo de mensagem
- Aceite dos termos
- Envio para API de contato
- Feedback de sucesso


---

# 🔐 Autenticação

A aplicação utiliza autenticação baseada em **JWT (JSON Web Token)**.

Fluxo:

```
Usuário
   |
   |
Login
   |
   |
User API
   |
   |
JWT Token
   |
   |
LocalStorage
   |
   |
Rotas Protegidas
```

---

## 🔒 Rotas Privadas

O projeto possui um componente responsável por proteger páginas privadas.

Exemplo:

```javascript
const token =
localStorage.getItem("token");

if(!token){
    return <Navigate to="/Login"/>
}
```

Somente usuários autenticados conseguem acessar:

```
/dogs
```

---

# 📡 Principais Endpoints

# 🐶 Dog API

## Listar todos os cães

```
GET /api/dog
```

---

## Buscar cão por ID

```
GET /api/dog/{id}
```

---

## Cadastrar cão

```
POST /api/dog
```

---

## Atualizar cão

```
PUT /api/dog/{id}
```

---

## Remover cão

```
DELETE /api/dog/{id}
```

---

## Buscar por raça

```
GET /api/dog/breed/{breed}
```

---

# 👨 PetOwner API

## Listar adotantes

```
GET /api/petowner
```

---

## Buscar adotante

```
GET /api/petowner/{id}
```

---

## Cadastrar adotante

```
POST /api/petowner
```

---

## Atualizar adotante

```
PUT /api/petowner/{id}
```

---

## Excluir adotante

```
DELETE /api/petowner/{id}
```

---

## Buscar adotantes com seus cães

```
GET /api/petowner/all
```

---

# 📧 Contact API

Enviar mensagem:

```
POST /api/contact
```

Body:

```json
{
    "email":"usuario@email.com",
    "message":"Mensagem enviada"
}
```

---

# 💡 Diferenciais do Projeto

✅ Aplicação Full Stack

✅ Arquitetura baseada em Microserviços

✅ Backend desenvolvido em ASP.NET Core

✅ Frontend desenvolvido em React

✅ Comunicação entre APIs utilizando HttpClient

✅ API REST

✅ Entity Framework Core

✅ Repository Pattern

✅ Service Layer

✅ DTOs para transferência de dados

✅ Banco SQLite

✅ Autenticação JWT

✅ Proteção de rotas no React

✅ Recuperação de senha por e-mail

✅ Envio de mensagens utilizando SMTP

✅ Interface responsiva

✅ Pesquisa dinâmica de cães

✅ Integração completa entre Frontend e Backend

---

# 🚀 Como Executar o Projeto

## Backend

Cada microserviço deve ser executado separadamente.


### Dog API

Executar:

```
dotnet run
```

Servidor:

```
https://localhost:7022
```


---

### PetOwner API

Executar:

```
dotnet run
```

Servidor:

```
https://localhost:7170
```


---

### User API

Executar:

```
dotnet run
```

Servidor:

```
https://localhost:7266
```


---

## Frontend

Instalar dependências:

```
npm install
```

Executar aplicação:

```
npm start
```


Aplicação:

```
http://localhost:3000
```

---

# 📂 Estrutura do Projeto

```
AdoptionDogs

│
├── Backend
│
│   ├── DogService
│   │
│   ├── PetOwnerService
│   │
│   └── UserService
│
│
└── Frontend
    │
    ├── components
    │
    ├── services
    │
    ├── assets
    │
    └── App.js
```

---

# 📸 Screenshots

![Screenshot 1](imgs/1.png)
![Screenshot 2](imgs/2.png)
![Screenshot 3](imgs/3.png)
![Screenshot 4](imgs/4.png)
![Screenshot 5](imgs/5.png)
![Screenshot 6](imgs/6.png)
![Screenshot 7](imgs/7.png)
![Screenshot 8](imgs/8.png)
![Screenshot 9](imgs/9.png)
![Screenshot 10](imgs/10.png)
![Screenshot 11](imgs/11.png)
![Screenshot 12](imgs/12.png)
![Screenshot 13](imgs/13.png)
![Screenshot 14](imgs/14.png)
![Screenshot 15](imgs/15.png)
![Screenshot 16](imgs/16.png)
![Screenshot 17](imgs/17.png)
![Screenshot 18](imgs/18.png)
![Screenshot 19](imgs/19.png)
![Screenshot 20](imgs/20.png)
![Screenshot 21](imgs/21.png)
![Screenshot 22](imgs/22.png)
![Screenshot 23](imgs/23.png)
![Screenshot 24](imgs/24.png)
![Screenshot 25](imgs/25.png)
![Screenshot 26](imgs/26.png)
![Screenshot 27](imgs/27.png)
![Screenshot 28](imgs/28.png)
![Screenshot 29](imgs/29.png)
![Screenshot 30](imgs/30.png)
![Screenshot 31](imgs/31.png)
![Screenshot 32](imgs/32.png)
![Screenshot 33](imgs/33.png)
![Screenshot 34](imgs/34.png)
![Screenshot 35](imgs/35.png)
![Screenshot 36](imgs/36.png)
![Screenshot 37](imgs/37.png)

---

# 👨‍💻 Autor

Desenvolvido por **Guilherme Fernandes**

Projeto criado com objetivo de estudo e demonstração de conhecimentos em:

- Desenvolvimento Backend .NET
- APIs REST
- Arquitetura de Software
- Microserviços
- React
- Integração entre sistemas

---
