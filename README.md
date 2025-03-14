# QAZP - Sistema de Gestão de Eventos

## Instruções para Subir a Aplicação

1. Abra o terminal.
2. Navegue até o diretório do frontend.
3. Instale as dependências do projeto: npm i
4. Inicie a aplicação em modo de desenvolvimento: npm run start:dev

# Visão Geral do Sistema
O Zventos é um site desenvolvido para uma empresa fictícia especializada em gestão e organização de eventos. A Zventos se concentra em oferecer uma experiência completa de organização, onde os clientes podem delegar toda a gestão e planejamento dos eventos, permitindo que foquem na execução. O site oferece uma landing page para apresentar a empresa e captar orçamentos, além de uma área logada para a gestão de clientes, eventos, materiais e usuários.

# Objetivos Principais
Oferecer uma plataforma para facilitar a gestão de eventos, focando na organização de clientes, eventos e materiais.
Proporcionar uma interface intuitiva para que clientes e administradores possam gerenciar seus dados de forma eficaz.
Funcionalidades do Sistema
Landing Page
Apresentação da Empresa: Informações detalhadas sobre a Zventos, seus valores e a proposta de serviço oferecida.
Captação de Orçamentos: Formulário para potenciais clientes solicitarem orçamento e informações para seus eventos.
Área Logada
A área logada é dividida em diferentes módulos de gestão, cada um com funcionalidades específicas para manipulação dos dados.

## Gestão de Clientes
Módulo para gerenciar clientes cadastrados na plataforma.

### Funcionalidades:
Criar: Permite adicionar novos clientes.
Deletar: Exclui clientes existentes.
Editar: Atualiza informações dos clientes.
Pesquisar: Localiza clientes com base em critérios específicos.
Regras de Validação:
Não é permitido adicionar clientes com o mesmo documento.
Apenas documentos válidos são aceitos (CPF e CNPJ).
Os campos Nome Completo, Documento, CEP e Número são obrigatórios.

## Gestão de Eventos
Módulo para gerenciar eventos cadastrados e organizados pela Zventos.

### Funcionalidades:
Criar: Permite adicionar novos eventos.
Deletar: Exclui eventos existentes.
Editar: Atualiza informações dos eventos.
Pesquisar: Localiza eventos com base em critérios específicos.
Regras de Validação:
Não é permitido adicionar eventos com os mesmos valores para os campos: Título, Cliente, Tipo, CEP, Data de Início e Horário de Início.
Os campos Tipo, Título, Cliente, CEP, Número, Público, Data Inicial, Horário Inicial, Data Final e Horário Final são obrigatórios.

## Gestão de Materiais
Módulo para gerenciar materiais utilizados nos eventos organizados.

### Funcionalidades:
Criar: Permite adicionar novos materiais.
Deletar: Exclui materiais existentes.
Pesquisar: Localiza materiais com base em critérios específicos.
Regras de Validação:
Não é permitido adicionar materiais com o mesmo nome e categoria.
O valor mínimo permitido para um material é R$ 0,01.
Todos os campos são obrigatórios.

## Gestão de Usuários
Módulo para gerenciar usuários da plataforma, destinado a administradores.

### Funcionalidades:
Criar: Permite adicionar novos usuários.
Deletar: Exclui usuários existentes.
Pesquisar: Localiza usuários com base em critérios específicos.
Regras de Validação:
Não é permitido adicionar usuários com o mesmo nome de usuário.
Caso haja apenas um usuário cadastrado, ele não poderá ser excluído.

# Requisitos do Sistema

## Requisitos Funcionais
- O sistema deve permitir a criação, edição, exclusão e busca de clientes, eventos, materiais e usuários.
- O sistema deve validar campos obrigatórios e restrições específicas em cada módulo.
- O sistema deve impedir ações que violem as regras de validação (como criação de clientes duplicados com o mesmo documento).
- A landing page deve estar acessível para apresentação da empresa e captação de orçamentos.

## Requisitos Não Funcionais
- Segurança: O sistema deve garantir que apenas usuários autorizados possam acessar a área logada.
- Usabilidade: A interface do sistema deve ser intuitiva e fácil de usar.
- Desempenho: O sistema deve suportar o gerenciamento de múltiplos registros sem perda significativa de desempenho.
