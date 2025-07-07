# Rocketseat - API SOLID

---

## Sobre

Nesse módulo da trilha Ignite da Rocketseat iremos trabalhar a criação de uma API utilizando os princípios SOLID em uma aplicação para gerenciamento de check-ins em uma academia.

---

## Tecnologias

- TypeScript
- Fastify
- Vitest
- Prisma

---

## Requisitos

Uma das partes mais importantes quando trabalhamos com um projeto, seja ele qual for, em qualquer área, a parte mais complexa e que pode ser um entrave é o levantamento e especificação de requisitos. Quando temos um bom levantamento, temos um projeto muito mais fluído e que entrega um valor muito maior para os clientes.

No nosso caso, o Diego nos mostra como ele fez o levantamento de requisitos para esse caso, que não é uma aplicação demandada por um cliente real, mas um projeto de portifólio, mas que também poderia ser uma ideia de startup. O mesmo processo pode ser utilizado.

### Requisitos Funcionais

- [x] Deve ser possível se cadastrar
- [-] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível para o usuário obter seu histórico de check-ins
- [x] Deve ser possível para o usuário buscar academias próximas até 10km.
- [x] Deve ser possível para o usuário buscar academias pelo nome
- [x] Deve ser possível para o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário

### Regras de negócio

- [x] O usuário não deve poder se cadastrar com um e-mail já cadastrado
- [x] O usuário não poderá fazer 2 check-ins no mesmo dia
- [x] O usuário não poderá fazer check-in se não estiver próximo (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [-] A academia só poderá ser cadastrada por administradores

### Requisitos não funcionais

- [x] A senha dos usuários precisa ser criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)

---

## Instalação

```bash
git clone https://github.com/wander-alves/rocketseat-gym-api.git


```
