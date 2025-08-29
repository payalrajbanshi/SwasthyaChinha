using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SwasthyaChinha.API.Migrations
{
    public partial class AddDiagnosisToPrescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add the new Diagnosis column
            migrationBuilder.AddColumn<string>(
                name: "Diagnosis",
                table: "Prescriptions",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the Diagnosis column if migration is rolled back
            migrationBuilder.DropColumn(
                name: "Diagnosis",
                table: "Prescriptions");
        }
    }
}
