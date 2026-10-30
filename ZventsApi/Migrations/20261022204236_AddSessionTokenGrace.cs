using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZventsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddSessionTokenGrace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PreviousRefreshTokenHash",
                table: "UserSessions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RotatedAt",
                table: "UserSessions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserSessions_PreviousRefreshTokenHash",
                table: "UserSessions",
                column: "PreviousRefreshTokenHash");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserSessions_PreviousRefreshTokenHash",
                table: "UserSessions");

            migrationBuilder.DropColumn(
                name: "PreviousRefreshTokenHash",
                table: "UserSessions");

            migrationBuilder.DropColumn(
                name: "RotatedAt",
                table: "UserSessions");
        }
    }
}
