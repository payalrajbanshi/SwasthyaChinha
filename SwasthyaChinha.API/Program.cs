// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// }

// app.UseHttpsRedirection();

// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast");

// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models;
// using System.Text;
// using AutoMapper;
// using SwasthyaChinha.API.Services;
// using SwasthyaChinha.API.Services.Interfaces;
// //using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
// //using AutoMapper.Extensions.Microsoft.DependencyInjection;


// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.

// // Add DbContext
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// // builder.Services.AddDbContext<ApplicationDbContext>(options =>
// //     options.UseMySql(
// //         builder.Configuration.GetConnectionString("DefaultConnection"),
// //         new MySqlServerVersion(new Version(8, 0, 36)), // Replace with your MySQL/MariaDB version
// //         mySqlOptions => mySqlOptions.EnableRetryOnFailure()
// //     )
// // );


// // Add Identity
// builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
// {
//     options.Password.RequireDigit = true;
//     options.Password.RequiredLength = 6;
//     options.Password.RequireNonAlphanumeric = false;
//     options.SignIn.RequireConfirmedEmail = false;
// })
// .AddEntityFrameworkStores<ApplicationDbContext>()
// .AddDefaultTokenProviders();

// // Configure JWT Authentication
// var jwtSettings = builder.Configuration.GetSection("Jwt");
// var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// })
// .AddJwtBearer(options =>
// {
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuer = true,
//         ValidateAudience = true,
//         ValidateLifetime = true,
//         ValidateIssuerSigningKey = true,

//         ValidIssuer = jwtSettings["Issuer"],
//         ValidAudience = jwtSettings["Audience"],
//         IssuerSigningKey = new SymmetricSecurityKey(key)
//     };
// });

// // Add Authorization
// builder.Services.AddAuthorization();

// // Add Controllers
// builder.Services.AddControllers();

// // Add Swagger
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("ReactPolicy", policy =>
//     {
//         policy.WithOrigins("http://localhost:3000")               //🟢 Use your React dev server port here
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });
// // Add AutoMapper
// builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// // Register your services
// builder.Services.AddScoped<IPatientService, PatientService>();
// builder.Services.AddScoped<IAuthService, AuthService>();
// builder.Services.AddScoped<IHospitalService, HospitalService>();
// builder.Services.AddScoped<IPharmacistService, PharmacistService>();
// builder.Services.AddScoped<IDoctorService, DoctorService>();
// builder.Services.AddScoped<IPrescriptionService, PrescriptionService>();


// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
// // 2️⃣ Use CORS policy
// app.UseCors("ReactPolicy");

// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();

// app.Run();


// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.OpenApi.Models;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Services;
// using SwasthyaChinha.API.Services.Interfaces;
// using System.Text;
// using AutoMapper;

// var builder = WebApplication.CreateBuilder(args);

// // 🔹 1. Configure DbContext (SQL Server or MySQL)
// // Uncomment ONE of these depending on your DB

// // ✅ For SQL Server:
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// // // ✅ For MySQL (comment above line if using this):
// // builder.Services.AddDbContext<ApplicationDbContext>(options =>
// //     options.UseMySql(
// //         builder.Configuration.GetConnectionString("DefaultConnection"),
// //         new MySqlServerVersion(new Version(8, 0, 36))
// //     )
// // );

// // 🔹 2. Identity Configuration
// builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
// {
//     options.Password.RequireDigit = true;
//     options.Password.RequiredLength = 6;
//     options.Password.RequireNonAlphanumeric = false;
//     options.SignIn.RequireConfirmedEmail = false;
// })
// .AddEntityFrameworkStores<ApplicationDbContext>()
// .AddDefaultTokenProviders();

// // 🔹 3. JWT Authentication
// var jwtSettings = builder.Configuration.GetSection("Jwt");
// var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// })
// .AddJwtBearer(options =>
// {
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuer = true,
//         ValidateAudience = true,
//         ValidateLifetime = true,
//         ValidateIssuerSigningKey = true,
//         ValidIssuer = jwtSettings["Issuer"],
//         ValidAudience = jwtSettings["Audience"],
//         IssuerSigningKey = new SymmetricSecurityKey(key)
//     };
// });

// builder.Services.AddAuthorization();

// // 🔹 4. Swagger Configuration (Enable JWT Token UI)
// builder.Services.AddSwaggerGen(options =>
// {
//     options.SwaggerDoc("v1", new OpenApiInfo { Title = "SwasthyaChinha API", Version = "v1" });

//     options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//     {
//         Name = "Authorization",
//         Type = SecuritySchemeType.ApiKey,
//         Scheme = "Bearer",
//         BearerFormat = "JWT",
//         In = ParameterLocation.Header,
//         Description = "Enter 'Bearer' followed by a space and your token.\n\nExample: Bearer abc123..."
//     });

//     options.AddSecurityRequirement(new OpenApiSecurityRequirement
//     {
//         {
//             new OpenApiSecurityScheme
//             {
//                 Reference = new OpenApiReference
//                 {
//                     Id = "Bearer",
//                     Type = ReferenceType.SecurityScheme
//                 }
//             },
//             Array.Empty<string>()
//         }
//     });
// });

// // 🔹 5. CORS for React or external apps
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("ReactPolicy", policy =>
//     {
//         policy.WithOrigins("http://localhost:5173")
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });

// // 🔹 6. Add Services
// builder.Services.AddScoped<IPatientService, PatientService>();
// builder.Services.AddScoped<IAuthService, AuthService>();
// builder.Services.AddScoped<IHospitalService, HospitalService>();
// builder.Services.AddScoped<IPharmacistService, PharmacistService>();
// builder.Services.AddScoped<IDoctorService, DoctorService>();
// builder.Services.AddScoped<IPrescriptionService, PrescriptionService>();

// // 🔹 7. AutoMapper and Controllers
// builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// builder.Services.AddControllers();

// var app = builder.Build();

// // ✅ Middleware pipeline
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
// app.UseCors("ReactPolicy");

// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();

// app.Run();

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Services;
using SwasthyaChinha.API.Services.Interfaces;
using System.Text;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// 🔹 1. Configure DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🔹 2. JWT Authentication (only)
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key),
        
    };
});

builder.Services.AddAuthorization();

// 🔹 3. Swagger (with JWT support)
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "SwasthyaChinha API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' followed by a space and your token.\nExample: Bearer abc123..."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            Array.Empty<string>()
        }
    });
});

// 🔹 4. CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173","http://localhost:5099" )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 🔹 5. Custom Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IHospitalService, HospitalService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
//builder.Services.AddScoped<IPharmacistService, PharmacistService>();
builder.Services.AddScoped<IPrescriptionService, PrescriptionService>();

// 🔹 6. AutoMapper and MVC Controllers
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddControllers();

var app = builder.Build();
// ✅ Warm up EF Core & apply migrations before handling requests
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    // Apply migrations automatically
    db.Database.Migrate();

    // Force a DB connection to warm up EF
    db.Database.CanConnect();
}

// ✅ Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// In Program.cs or Startup.cs
app.UseDeveloperExceptionPage();

//app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("ReactPolicy");

app.UseAuthentication();
app.UseAuthorization();

// app.UseEndpoints(endpoints =>
// {
//     endpoints.MapControllers();
// });
app.MapControllers();

app.Run();
