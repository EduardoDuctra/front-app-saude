# Sistema Saúde – Frontend (Angular)

Segunda Entrega – **POOW2 – UFSM**

Este repositório contém a **interface web (Frontend Angular)** do Sistema Saúde, desenvolvido para a segunda entrega da disciplina de Programação Orientada a Objetos Web 2 (POOW2).

A aplicação permite realizar:

- Cadastro e login de usuários
- Cadastro e login de farmácias
- Autenticação via JWT
- CRUD de relatórios de saúde
- Rotas protegidas por roles (Admin, Farmácia, Usuário)

---

# 🚀 Tecnologias Utilizadas

### **Frontend**

- Angular 17
- Angular Material
- Bootstrap
- TypeScript
- Reactive Forms
- Guards & Interceptors
- HttpClient

### **Backend (API da Segunda Entrega)**

- Spring Boot
- Spring Security (JWT)
- PostgreSQL
- Flyway

---

Comando para inicializar a aplicação:

```JSON
npm start
```

Cadastro de usuário ADMIN

URL no insomnia:

```json
http://localhost:8081/sistema-saude/usuario/salvar
```

JSON para inserir:

```json
{
  "conta": {
    "email": "e@email.com",
    "senha": "123",
    "permissao": "ROLE_ADMIN"
  },
  "perfil": {
    "nome": "Administrador",
    "sexo": "M",
    "altura": 1.8
  }
}
```
