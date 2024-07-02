using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using ZventsApi.Models;

#nullable disable

namespace ZventsApi.Migrations
{
    /// <inheritdoc />
    public partial class InicialSeed : Migration
    {
        public static class MigrationHelper
        {
            public static Guid GetMaterialId(string materialName)
            {
                var optionsBuilder = new DbContextOptionsBuilder<ZventsDbContext>();
                optionsBuilder.UseSqlite("Data Source=Zvents.db");

                using var context = new ZventsDbContext(optionsBuilder.Options);
                return context.Materials
                              .Where(m => m.Name == materialName)
                              .Select(m => m.Id)
                              .FirstOrDefault();
            }
        }


        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var clienteIdKauê = Guid.NewGuid();
            var clienteIdLuan = Guid.NewGuid();
            var clienteIdFrancisca = Guid.NewGuid();
            var clienteIdEdson = Guid.NewGuid();

            var eventid = Guid.NewGuid();

            migrationBuilder.InsertData(
                 table: "Users",
                 columns: ["Id", "Name", "Password", "Role", "UserName", "CreatedDate"],
                 values: new object[,]
                 {
                     { Guid.NewGuid(), "Administrador", "123", 0, "admin", DateTime.Now },
                 });

            migrationBuilder.InsertData(
                 table: "Clients",
                 columns: ["Id", "AddressComplement", "AddressName", "AddressNumber", "City", "CreatedDate", "District", "DocumentId", "Email", "FullName", "IsActive", "PhoneNumber", "State", "ZipCode"],
                 values: new object[,]
                 {
                     { clienteIdLuan, "CASA 10", "Rua Cândido Mendes", "386", "Macapá", DateTime.Now, "Central", "58588829193", "luan.marcos.dapaz@grupoamericaville.com.br", "Luan Marcos Vinicius Oliver da Paz", true, "96985185615", "AP", "68900100" },
                     { clienteIdFrancisca, "CASA 2", "Rua Santa Rita", "1236", "Manaus", DateTime.Now, "Colônia Santo Antônio", "12015127437", "francisca_isabelly_baptista@estevao.ind.br", "Francisca Isabelly Josefa Baptista", true, "92985834490", "AM", "69093286" },
                     { clienteIdEdson, "CASA 23", "Avenida José Jatahy", "465", "Fortaleza", DateTime.Now, "Benfica", "90949848140", "edson.juan.moura@gconsult.com.br", "Edson Juan Moura", true, "85997914576", "CE", "60020295" },
                     { clienteIdKauê, "2 º ANDAR AP 24", "Parque Senhor do Bonfim", "339", "Salvador", DateTime.Now, "Barragem de Ipitanga", "27726584734", "kaue_vitor_teixeira@padrejuliano.com", "Kauê Vitor Teixeira", true, "71986030621", "BA", "41410280" },
                 });

            migrationBuilder.InsertData(
                table: "Events",
                columns: ["Id", "Name", "Type", "ClientId", "StartAt", "EndAt", "ZipCode", "AddressName", "AddressNumber", "AddressComplement", "District", "State", "City", "EstimatedAudience", "CreatedDate", "IsActive", "TotalAmount"],
                values: new object[,]
                {
                    { eventid, "Festival de música independente", 3, clienteIdFrancisca, DateTime.Now, DateTime.Now.AddDays(1), "69307745", "Rua Leonel Luis de Oliveira", "290", "Casa de show", "Caçari", "RR", "Boa Vista", 5000, DateTime.Now, true, 10000000 }
                });

            var iluminacaoMaterialId = MigrationHelper.GetMaterialId("Iluminação de palco");
            var equipamentoMaterialId = MigrationHelper.GetMaterialId("Equipamento de som");
            var microfonesMaterialId = MigrationHelper.GetMaterialId("Microfones");
            var caixasMaterialId = MigrationHelper.GetMaterialId("Caixas de som");
            var dDJMaquinasMaterialId = MigrationHelper.GetMaterialId("Equipamentos de DJ");
            var palcosMaterialId = MigrationHelper.GetMaterialId("Palcos móveis");
            var atracoesMaterialId = MigrationHelper.GetMaterialId("Atrações artísticas");
            var bannersMaterialId = MigrationHelper.GetMaterialId("Banners promocionais");
            var cartazesMaterialId = MigrationHelper.GetMaterialId("Cartazes");
            var camisetasMaterialId = MigrationHelper.GetMaterialId("Camisetas promocionais");
            var casaMaterialId = MigrationHelper.GetMaterialId("Casa de Eventos");
            var apresentadorMaterialId = MigrationHelper.GetMaterialId("Apresentador");
            var SegurancasMaterialId = MigrationHelper.GetMaterialId("Segurança");

            Console.WriteLine(iluminacaoMaterialId);

            migrationBuilder.InsertData(
                table: "EventMaterials",
                columns: ["EventId", "MaterialId", "Quantity"],
                values: new object[,]
                {
                    { eventid, iluminacaoMaterialId, 1 },
                    { eventid, equipamentoMaterialId, 1 },
                    { eventid, microfonesMaterialId, 3 },
                    { eventid, caixasMaterialId, 4 },
                    { eventid, dDJMaquinasMaterialId, 1 },
                    { eventid, palcosMaterialId, 1 },
                    { eventid, atracoesMaterialId, 4 },
                    { eventid, bannersMaterialId, 100 },
                    { eventid, cartazesMaterialId, 100 },
                    { eventid, camisetasMaterialId, 50 },
                    { eventid, casaMaterialId, 1 },
                    { eventid, apresentadorMaterialId, 1 },
                    { eventid, SegurancasMaterialId, 100 },

               });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
