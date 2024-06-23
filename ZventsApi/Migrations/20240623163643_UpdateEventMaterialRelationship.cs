using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZventsApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEventMaterialRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Materials",
                newName: "Price");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalAmount",
                table: "Events",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EventMaterials",
                columns: table => new
                {
                    EventId = table.Column<Guid>(type: "TEXT", nullable: false),
                    MaterialId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventMaterials", x => new { x.EventId, x.MaterialId });
                    table.ForeignKey(
                        name: "FK_EventMaterials_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventMaterials_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventMaterials_MaterialId",
                table: "EventMaterials",
                column: "MaterialId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventMaterials");

            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Materials",
                newName: "Value");
        }
    }
}
