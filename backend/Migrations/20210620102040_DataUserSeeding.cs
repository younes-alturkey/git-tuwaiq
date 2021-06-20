using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class DataUserSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "ImgUrl", "Name", "Password", "UserName" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 6, 20, 13, 20, 39, 850, DateTimeKind.Local).AddTicks(1916), "Mansoviic@gmail.com", "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs", "Mansovic", "P@assWord123", "Mansovic" },
                    { 2, new DateTime(2021, 6, 20, 13, 20, 39, 851, DateTimeKind.Local).AddTicks(7715), "Abdulmajeed@gmail.com", "https://i.picsum.photos/id/24/200/300.jpg?blur=5&hmac=TXkpvcSKinZ53tqovqHo05FiiHPU9ZDzZH2wcoyxuHI", "Abdulmajeed", "P@assWord123", "Abdulmajeed" },
                    { 3, new DateTime(2021, 6, 20, 13, 20, 39, 851, DateTimeKind.Local).AddTicks(7813), "Riyadh@gmail.com", "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2021/01/28/2448851-2106814390.jpg?itok=vbM4D77f", "Riyadh", "P@assWord123", "Riyadh" },
                    { 4, new DateTime(2021, 6, 20, 13, 20, 39, 851, DateTimeKind.Local).AddTicks(7830), "Fos@gmail.com", "https://i.guim.co.uk/img/media/327e46c3ab049358fad80575146be9e0e65686e7/0_0_1023_742/master/1023.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=331a1bc4f5d7a96a6131f4f142065662", "Fos", "P@assWord123", "Fos" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
