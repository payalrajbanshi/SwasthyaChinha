using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SwasthyaChinha.API.Migrations
{
    /// <inheritdoc />
    public partial class AddSignatureUrlToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SignatureUrl",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SignatureUrl",
                table: "Users");
        }
    }
}
