using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using ZventsApi.Models;

#nullable disable

namespace ZventsApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialSeed : Migration
    {
        public static class MigrationHelper { }

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var clienteIdKauê = Guid.NewGuid();
            var clienteIdLuan = Guid.NewGuid();
            var clienteIdFrancisca = Guid.NewGuid();
            var clienteIdEdson = Guid.NewGuid();

            var eventid = Guid.NewGuid();

            migrationBuilder.InsertData(
                table: "Users",
                columns:
                [
                    "Id",
                    "Name",
                    "Password",
                    "Role",
                    "UserName",
                    "CreatedDate",
                    "UserStatus",
                    "IsDeleted"
                ],
                values: new object[,]
                {
                    { Guid.NewGuid(), "Administrador", "123", 0, "admin", DateTime.Now, 0, false },
                }
            );

            migrationBuilder.InsertData(
                table: "Clients",
                columns:
                [
                    "Id",
                    "AddressComplement",
                    "AddressName",
                    "AddressNumber",
                    "City",
                    "CreatedDate",
                    "District",
                    "DocumentId",
                    "Email",
                    "FullName",
                    "IsDeleted",
                    "PhoneNumber",
                    "State",
                    "ZipCode"
                ],
                values: new object[,]
                {
                    {
                        clienteIdLuan,
                        "CASA 10",
                        "Rua Cândido Mendes",
                        "386",
                        "Macapá",
                        DateTime.Now,
                        "Central",
                        "58588829193",
                        "luan.marcos.dapaz@grupoamericaville.com.br",
                        "Luan Marcos Vinicius Oliver da Paz",
                        false,
                        "96985185615",
                        "AP",
                        "68900100"
                    },
                    {
                        clienteIdFrancisca,
                        "CASA 2",
                        "Rua Santa Rita",
                        "1236",
                        "Manaus",
                        DateTime.Now,
                        "Colônia Santo Antônio",
                        "12015127437",
                        "francisca_isabelly_baptista@estevao.ind.br",
                        "Francisca Isabelly Josefa Baptista",
                        false,
                        "92985834490",
                        "AM",
                        "69093286"
                    },
                    {
                        clienteIdEdson,
                        "CASA 23",
                        "Avenida José Jatahy",
                        "465",
                        "Fortaleza",
                        DateTime.Now,
                        "Benfica",
                        "90949848140",
                        "edson.juan.moura@gconsult.com.br",
                        "Edson Juan Moura",
                        false,
                        "85997914576",
                        "CE",
                        "60020295"
                    },
                    {
                        clienteIdKauê,
                        "2 º ANDAR AP 24",
                        "Parque Senhor do Bonfim",
                        "339",
                        "Salvador",
                        DateTime.Now,
                        "Barragem de Ipitanga",
                        "27726584734",
                        "kaue_vitor_teixeira@padrejuliano.com",
                        "Kauê Vitor Teixeira",
                        false,
                        "71986030621",
                        "BA",
                        "41410280"
                    },
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) { }
    }
}
