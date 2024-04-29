﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZventsApi.Migrations
{
    /// <inheritdoc />
    public partial class MaterialSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                 table: "Materials",
                 columns: ["Id", "Name", "Category", "Value", "CreatedDate", "IsActive"],
                 values: new object[,]
                 {
                     //Food
                    { Guid.NewGuid(), "Bolos de diversos sabores", 0, 50, DateTime.Now, true },
                    { Guid.NewGuid(), "Tortas doces", 0, 70, DateTime.Now, true },
                    { Guid.NewGuid(), "Tortas salgadas", 0, 80, DateTime.Now, true },
                    { Guid.NewGuid(), "Salgados sortidos (coxinha, empada, quibe, etc.)", 0, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Mini sanduíches", 0, 40, DateTime.Now, true },
                    { Guid.NewGuid(), "Cupcakes decorados", 0, 60, DateTime.Now, true },
                    { Guid.NewGuid(), "Brigadeiros gourmet", 0, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Beijinhos", 0, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Docinhos de festa variados", 0, 25, DateTime.Now, true },
                    { Guid.NewGuid(), "Bombons sortidos", 0, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Brownies", 0, 40, DateTime.Now, true },
                    { Guid.NewGuid(), "Biscoitos decorados", 0, 25, DateTime.Now, true },
                    { Guid.NewGuid(), "Bolachas recheadas", 0, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Cookies de diferentes sabores", 0, 25, DateTime.Now, true },
                    { Guid.NewGuid(), "Gelatinas coloridas", 0, 15, DateTime.Now, true },
                    { Guid.NewGuid(), "Mousses de frutas", 0, 35, DateTime.Now, true },
                    { Guid.NewGuid(), "Pavês de chocolate", 0, 45, DateTime.Now, true },
                    { Guid.NewGuid(), "Queijos diversos", 0, 40, DateTime.Now, true },
                    { Guid.NewGuid(), "Frios (presunto, peito de peru, salame, queijo prato, etc.)", 0, 40, DateTime.Now, true },
                    { Guid.NewGuid(), "Pães variados (francês, integral, de forma, etc.)", 0, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Patês e pastas (patê de atum, pasta de ricota, etc.)", 0, 25, DateTime.Now, true },
                    { Guid.NewGuid(), "Cuscuz paulista", 0, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Saladas de frutas", 0, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Doces em compota (figo, abóbora, etc.)", 0, 25, DateTime.Now, true },
                    { Guid.NewGuid(), "Geleias artesanais (morango, framboesa, etc.)", 0, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Bolinhos de bacalhau", 0, 50, DateTime.Now, true },
                    { Guid.NewGuid(), "Quiches", 0, 60, DateTime.Now, true },
                    { Guid.NewGuid(), "Empadões", 0, 70, DateTime.Now, true },
                    { Guid.NewGuid(), "Esfihas", 0, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Pizzas variadas", 0, 50, DateTime.Now, true },

                    //Decoration
                    { Guid.NewGuid(), "Arranjos de flores", 1, 80, DateTime.Now, true },
                    { Guid.NewGuid(), "Velas decorativas", 1, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Porta-retratos", 1, 15, DateTime.Now, true },
                    { Guid.NewGuid(), "Espelhos decorativos", 1, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Almofadas", 1, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Tapetes", 1, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Cortinas", 1, 80, DateTime.Now, true },
                    { Guid.NewGuid(), "Vasos decorativos", 1, 50, DateTime.Now, true },
                    { Guid.NewGuid(), "Estátuas e esculturas", 1, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Quadros decorativos", 1, 70, DateTime.Now, true },
                    { Guid.NewGuid(), "Molduras", 1, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Relógios de parede", 1, 40, DateTime.Now, true },
                    { Guid.NewGuid(), "Enfeites de mesa", 1, 25, DateTime.Now, true },
                    { Guid.NewGuid(), "Fitas decorativas", 1, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Lanternas", 1, 40, DateTime.Now, true },
                    { Guid.NewGuid(), "Banners decorativos", 1, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Placas de sinalização", 1, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Balões decorativos", 1, 15, DateTime.Now, true },
                    { Guid.NewGuid(), "Guirlandas", 1, 25, DateTime.Now, true },
                    { Guid.NewGuid(), "Cortinas de luzes", 1, 50, DateTime.Now, true },
                    { Guid.NewGuid(), "Letras luminosas", 1, 80, DateTime.Now, true },
                    { Guid.NewGuid(), "Adesivos de parede", 1, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Tecidos para decoração", 1, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Luminárias", 1, 60, DateTime.Now, true },
                    { Guid.NewGuid(), "Candelabros", 1, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Plantas decorativas", 1, 40, DateTime.Now, true },
                    { Guid.NewGuid(), "Móveis auxiliares", 1, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Cortinas de tecido", 1, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Cobertores", 1, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Cúpulas para luminárias", 1, 20, DateTime.Now, true },

                    //Utensils
                    { Guid.NewGuid(), "Rechaud", 2, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Bandeja para Servir", 2, 50, DateTime.Now, true },
                    { Guid.NewGuid(), "Cubas para Buffet", 2, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Travessa de Porcelana", 2, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Guardanapos de Pano", 2, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Porta Guardanapos", 2, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Pratos Descartáveis", 2, 2, DateTime.Now, true },
                    { Guid.NewGuid(), "Suporte para Guardanapos", 2, 15, DateTime.Now, true },
                    { Guid.NewGuid(), "Carrinho para Transporte de Alimentos", 2, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Cesto de Pães", 2, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Panelas de Alumínio", 2, 50, DateTime.Now, true },
                    { Guid.NewGuid(), "Frigideiras Antiaderentes", 2, 40, DateTime.Now, true },
                    { Guid.NewGuid(), "Espátulas de Silicone", 2, 8, DateTime.Now, true },
                    { Guid.NewGuid(), "Conjunto de Facas", 2, 80, DateTime.Now, true },
                    { Guid.NewGuid(), "Tábua de Corte", 2, 15, DateTime.Now, true },
                    { Guid.NewGuid(), "Formas para Bolos", 2, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Ralador de Queijo", 2, 7, DateTime.Now, true },
                    { Guid.NewGuid(), "Abridor de Latas", 2, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Espremedor de Frutas", 2, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Peneira de Cozinha", 2, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Descascador de Frutas", 2, 3, DateTime.Now, true },
                    { Guid.NewGuid(), "Coador de Café", 2, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Pegador de Massas", 2, 4, DateTime.Now, true },
                    { Guid.NewGuid(), "Rolo de Massa", 2, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Conjunto de Medidores", 2, 8, DateTime.Now, true },
                    { Guid.NewGuid(), "Escumadeira", 2, 6, DateTime.Now, true },
                    { Guid.NewGuid(), "Espremedor de Alho", 2, 4, DateTime.Now, true },
                    { Guid.NewGuid(), "Descaroçador de Azeitonas", 2, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Balança de Cozinha", 2, 15, DateTime.Now, true },
                    { Guid.NewGuid(), "Jarra Medidora", 2, 7, DateTime.Now, true },
                    { Guid.NewGuid(), "Canetas Esferográficas", 2, 2, DateTime.Now, true },
                    { Guid.NewGuid(), "Bloco de Notas", 2, 3, DateTime.Now, true },
                    { Guid.NewGuid(), "Clips Metálicos", 2, 1, DateTime.Now, true },
                    { Guid.NewGuid(), "Grampeador de Mesa", 2, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Caixa de Arquivo Morto", 2, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Suporte para Canetas", 2, 3, DateTime.Now, true },
                    { Guid.NewGuid(), "Agenda de Compromissos", 2, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Calculadora Básica", 2, 15, DateTime.Now, true },
                    { Guid.NewGuid(), "Fichário A4", 2, 8, DateTime.Now, true },
                    { Guid.NewGuid(), "Tesoura de Uso Geral", 2, 7, DateTime.Now, true },
                    { Guid.NewGuid(), "Grampeador de Parede", 2, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Apontador de Lápis", 2, 2, DateTime.Now, true },
                    { Guid.NewGuid(), "Organizador de Mesa", 2, 8, DateTime.Now, true },
                    { Guid.NewGuid(), "Alicate de Grampos", 2, 12, DateTime.Now, true },
                    { Guid.NewGuid(), "Caixa de Clipes", 2, 3, DateTime.Now, true },
                    { Guid.NewGuid(), "Bloco de Rascunho", 2, 4, DateTime.Now, true },
                    { Guid.NewGuid(), "Perfurador de Papel", 2, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Tesoura de Ponta Fina", 2, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Organizador de Cabos", 2, 7, DateTime.Now, true },
                    { Guid.NewGuid(), "Protetor de Tomadas", 2, 3, DateTime.Now, true },

                    //Furniture
                    { Guid.NewGuid(), "Mesas", 4, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Cadeiras", 4, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Sofás", 4, 800, DateTime.Now, true },
                    { Guid.NewGuid(), "Poltronas", 4, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Estantes", 4, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Armários", 4, 600, DateTime.Now, true },
                    { Guid.NewGuid(), "Prateleiras", 4, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Cômodas", 4, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Camas", 4, 1000, DateTime.Now, true },
                    { Guid.NewGuid(), "Mesa de centro", 4, 250, DateTime.Now, true },
                    { Guid.NewGuid(), "Racks", 4, 350, DateTime.Now, true },
                    { Guid.NewGuid(), "Mesa de jantar", 4, 600, DateTime.Now, true },
                    { Guid.NewGuid(), "Bancadas de trabalho", 4, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Aparadores", 4, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Biombos", 4, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Bancos", 4, 80, DateTime.Now, true },
                    { Guid.NewGuid(), "Cadeiras de escritório", 4, 120, DateTime.Now, true },
                    { Guid.NewGuid(), "Mesa lateral", 4, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Puffs", 4, 70, DateTime.Now, true },
                    { Guid.NewGuid(), "Bancadas de bar", 4, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Bancos altos", 4, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Balcões", 4, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Mesa de estudo", 4, 180, DateTime.Now, true },
                    { Guid.NewGuid(), "Bancadas de cozinha", 4, 250, DateTime.Now, true },
                    { Guid.NewGuid(), "Mesa de centro elevável", 4, 350, DateTime.Now, true },
                    { Guid.NewGuid(), "Escrivaninhas", 4, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Mesa de cabeceira", 4, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Mesa de canto", 4, 120, DateTime.Now, true },
                    { Guid.NewGuid(), "Mesa de bar", 4, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Bancadas de estudo", 4, 200, DateTime.Now, true },

                    //HumanResources
                    { Guid.NewGuid(), "Apresentador", 5, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Segurança", 5, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Cozinheiro", 5, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Recepcionista", 5, 350, DateTime.Now, true },
                    { Guid.NewGuid(), "Motorista", 5, 250, DateTime.Now, true },
                    { Guid.NewGuid(), "Auxiliar de Limpeza", 5, 180, DateTime.Now, true },
                    { Guid.NewGuid(), "Assistente Administrativo", 5, 350, DateTime.Now, true },
                    { Guid.NewGuid(), "Técnico de Informática", 5, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Assistente de Recursos Humanos", 5, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Analista de Marketing", 5, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Assistente Financeiro", 5, 350, DateTime.Now, true },
                    { Guid.NewGuid(), "Entregador", 5, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Garçom", 5, 250, DateTime.Now, true },
                    { Guid.NewGuid(), "Bartender", 5, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Chefe de Cozinha", 5, 600, DateTime.Now, true },
                    { Guid.NewGuid(), "Promotor de Eventos", 5, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Fotógrafo", 5, 350, DateTime.Now, true },
                    { Guid.NewGuid(), "Segurança Eletrônica", 5, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Auxiliar de Produção", 5, 250, DateTime.Now, true },
                    { Guid.NewGuid(), "Atendente de Bar", 5, 180, DateTime.Now, true },
                    { Guid.NewGuid(), "Maquiador", 5, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Bombeiro", 5, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Recepcionista de Eventos", 5, 350, DateTime.Now, true },
                    { Guid.NewGuid(), "Copeiro", 5, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Cozinheiro Industrial", 5, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Assistente de Produção", 5, 350, DateTime.Now, true },
                    { Guid.NewGuid(), "Designer Gráfico", 5, 450, DateTime.Now, true },
                    { Guid.NewGuid(), "Auxiliar de Almoxarifado", 5, 250, DateTime.Now, true },
                    { Guid.NewGuid(), "Segurança Patrimonial", 5, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Auxiliar de Eventos", 5, 180, DateTime.Now, true },
                    { Guid.NewGuid(), "Supervisor de Eventos", 5, 600, DateTime.Now, true },

                     //RealEstate
                    { Guid.NewGuid(), "Salão de Festas", 6, 5000, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa de Eventos", 6, 7000, DateTime.Now, true },
                    { Guid.NewGuid(), "Espaço para Eventos", 6, 6000, DateTime.Now, true },
                    { Guid.NewGuid(), "Sítio para Festas", 6, 8000, DateTime.Now, true },
                    { Guid.NewGuid(), "Chácara para Eventos", 6, 9000, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa de Campo para Festas", 6, 7500, DateTime.Now, true },
                    { Guid.NewGuid(), "Fazenda para Eventos", 6, 10000, DateTime.Now, true },
                    { Guid.NewGuid(), "Mansão para Festas", 6, 12000, DateTime.Now, true },
                    { Guid.NewGuid(), "Casarão para Eventos", 6, 10000, DateTime.Now, true },
                    { Guid.NewGuid(), "Galpão de Eventos", 6, 5000, DateTime.Now, true },
                    { Guid.NewGuid(), "Espaço Gourmet", 6, 4000, DateTime.Now, true },
                    { Guid.NewGuid(), "Lounge para Eventos", 6, 3000, DateTime.Now, true },
                    { Guid.NewGuid(), "Terraço para Eventos", 6, 3500, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa de Praia para Festas", 6, 9000, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa de Sítio para Eventos", 6, 8500, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa de Campo para Casamentos", 6, 10000, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa de Praia para Casamentos", 6, 11000, DateTime.Now, true },
                    { Guid.NewGuid(), "Espaço para Cerimônias", 6, 8000, DateTime.Now, true },
                    { Guid.NewGuid(), "Quintal para Eventos", 6, 2000, DateTime.Now, true },
                    { Guid.NewGuid(), "Salão de Festas com Piscina", 6, 6000, DateTime.Now, true },
                    { Guid.NewGuid(), "Chácara com Área de Churrasco", 6, 7000, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa de Campo com Piscina", 6, 9000, DateTime.Now, true },
                    { Guid.NewGuid(), "Espaço com Jardim para Eventos", 6, 5500, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa de Fazenda para Festas", 6, 11000, DateTime.Now, true },
                    { Guid.NewGuid(), "Mansão com Vista Panorâmica", 6, 15000, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa Colonial para Eventos", 6, 8000, DateTime.Now, true },
                    { Guid.NewGuid(), "Casa Moderna para Festas", 6, 10000, DateTime.Now, true },
                    { Guid.NewGuid(), "Loft para Eventos", 6, 4500, DateTime.Now, true },
                    { Guid.NewGuid(), "Castelo para Festas", 6, 20000, DateTime.Now, true },

                    //Entertainment
                    { Guid.NewGuid(), "Iluminação de palco", 7, 800, DateTime.Now, true },
                    { Guid.NewGuid(), "Equipamento de som", 7, 1500, DateTime.Now, true },
                    { Guid.NewGuid(), "Equipamento de vídeo", 7, 2000, DateTime.Now, true },
                    { Guid.NewGuid(), "Microfones", 7, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Caixas de som", 7, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Telões", 7, 1200, DateTime.Now, true },
                    { Guid.NewGuid(), "Projetores", 7, 1000, DateTime.Now, true },
                    { Guid.NewGuid(), "Painéis de LED", 7, 3000, DateTime.Now, true },
                    { Guid.NewGuid(), "Máquinas de fumaça", 7, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Equipamentos de karaokê", 7, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Equipamentos de DJ", 7, 1500, DateTime.Now, true },
                    { Guid.NewGuid(), "Tendas para eventos", 7, 1500, DateTime.Now, true },
                    { Guid.NewGuid(), "Pisos para eventos", 7, 1000, DateTime.Now, true },
                    { Guid.NewGuid(), "Barras de LED", 7, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Plataformas para shows", 7, 2000, DateTime.Now, true },
                    { Guid.NewGuid(), "Palcos móveis", 7, 3000, DateTime.Now, true },
                    { Guid.NewGuid(), "Atrações artísticas", 7, 5000, DateTime.Now, true },
                    { Guid.NewGuid(), "Máquinas de neve", 7, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Máquinas de bolhas", 7, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Máquinas de confete", 7, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Máquinas de CO2", 7, 800, DateTime.Now, true },
                    { Guid.NewGuid(), "Geradores de efeitos especiais", 7, 2000, DateTime.Now, true },
                    { Guid.NewGuid(), "Máquinas de luz negra", 7, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Carpetes vermelhos", 7, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Placas de sinalização de eventos", 7, 50, DateTime.Now, true },
                    { Guid.NewGuid(), "Pulseiras de identificação", 7, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Tendas de brinquedos", 7, 1000, DateTime.Now, true },
                    { Guid.NewGuid(), "Balões de hélio", 7, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Pulseiras de LED", 7, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Pinturas faciais", 7, 200, DateTime.Now, true },

                    //Marketing
                    { Guid.NewGuid(), "Banners promocionais", 8, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Cartazes", 8, 50, DateTime.Now, true },
                    { Guid.NewGuid(), "Panfletos", 8, 20, DateTime.Now, true },
                    { Guid.NewGuid(), "Folders", 8, 30, DateTime.Now, true },
                    { Guid.NewGuid(), "Brindes promocionais", 8, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Camisetas promocionais", 8, 150, DateTime.Now, true },
                    { Guid.NewGuid(), "Canetas personalizadas", 8, 5, DateTime.Now, true },
                    { Guid.NewGuid(), "Crachás personalizados", 8, 8, DateTime.Now, true },
                    { Guid.NewGuid(), "Adesivos promocionais", 8, 10, DateTime.Now, true },
                    { Guid.NewGuid(), "Banner eletrônico", 8, 1000, DateTime.Now, true },
                    { Guid.NewGuid(), "Carros de som", 8, 500, DateTime.Now, true },
                    { Guid.NewGuid(), "Materiais impressos", 8, 100, DateTime.Now, true },
                    { Guid.NewGuid(), "Anúncios em jornais", 8, 200, DateTime.Now, true },
                    { Guid.NewGuid(), "Anúncios em revistas", 8, 300, DateTime.Now, true },
                    { Guid.NewGuid(), "Anúncios em rádio", 8, 400, DateTime.Now, true },
                    { Guid.NewGuid(), "Anúncios em televisão", 8, 1000, DateTime.Now, true },
                    { Guid.NewGuid(), "Anúncios online", 8, 500, DateTime.Now, true },
                 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
