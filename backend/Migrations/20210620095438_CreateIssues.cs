using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class CreateIssues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RepoModelId",
                table: "Repos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isPublic",
                table: "Repos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Issues",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RepoIdId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Issues", x => x.id);
                    table.ForeignKey(
                        name: "FK_Issues_Repos_RepoIdId",
                        column: x => x.RepoIdId,
                        principalTable: "Repos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Repos_RepoModelId",
                table: "Repos",
                column: "RepoModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Issues_RepoIdId",
                table: "Issues",
                column: "RepoIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Repos_Repos_RepoModelId",
                table: "Repos",
                column: "RepoModelId",
                principalTable: "Repos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Repos_Repos_RepoModelId",
                table: "Repos");

            migrationBuilder.DropTable(
                name: "Issues");

            migrationBuilder.DropIndex(
                name: "IX_Repos_RepoModelId",
                table: "Repos");

            migrationBuilder.DropColumn(
                name: "RepoModelId",
                table: "Repos");

            migrationBuilder.DropColumn(
                name: "isPublic",
                table: "Repos");
        }
    }
}
