## OCR FrontEnd

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Table of Contents

- [System Features](#system-features)
- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Project setup](#project-setup)

## System Features

- LLM Integration for Context and Explanation: The gemini Api provides a model which explain
  or provide context for the extracted text to the users, users can make queries about the extracted text.

- View Uploaded Documents:The user can see a list with all of their user previously uploaded documents along with the extracted information and LLM interactions

- Auth: You can create a user and log in to upload your images and interact with them

- Download Documents with Extracted Text : the user can download the uploaded documents with the appended extracted text and LLM interactions.

## Prerequisites

Ensure you have the following installed on your system:

- **Nodejs**
- **Git** (For cloning the repository)

## Folder Structure

```
/my-react-app
│── /public
│
│── /src
│   ├── /assets         # Imagens, ícones, estilos globais, fontes etc.
│   ├── /pages          # Páginas principais da aplicação
│   ├── /routes         # Configuração das rotas da aplicação
│   ├── /shared         # Recursos compartilhados
│   │   ├── /components # Componentes reutilizáveis (botões, tabelas, inputs, etc.)
│   │   ├── /contexts   # Contextos do React (Context API)
│   │
│   │   ├── /interfaces # Tipagens e interfaces TypeScript
│   │   ├── /layout     # Layouts padrão (ex: com menu lateral, cabeçalho etc.)
│   │   ├── /services   # Serviços de API, requisições HTTP etc.
│   │   ├── /themes     # Temas e estilos personalizados (ex: MUI Theme)
│
│   ├── App.tsx         # Componente principal da aplicação
│   ├── main.tsx        # Ponto de entrada do React
│   ├── vite.config.ts  # Configuração do Vite (se estiver usando Vite)
│
│── package.json
│── tsconfig.json       # Configuração do TypeScript
│── .eslintrc.js        # Configuração do ESLint
│── .gitignore

```

## Technologies Used

- Typescript: Programming language for back-end
- React: Library for front-end

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run dev
```
