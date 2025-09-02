

// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.OpenApi.Models;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Services;
// using SwasthyaChinha.API.Services.Interfaces;
// using System.Text;
// using AutoMapper;

// var builder = WebApplication.CreateBuilder(args);

// // 🔹 1. Configure DbContext
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// // 🔹 2. JWT Authentication (only)
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
//         IssuerSigningKey = new SymmetricSecurityKey(key),
        
//     };
// });

// builder.Services.AddAuthorization();

// // 🔹 3. Swagger (with JWT support)
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
//         Description = "Enter 'Bearer' followed by a space and your token.\nExample: Bearer abc123..."
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

// // 🔹 4. CORS for frontend
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("ReactPolicy", policy =>
//     {
//         //policy.WithOrigins("http://localhost:5173", "http://localhost:5099")
//         policy.WithOrigins("http://localhost:5173")
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//               //.AllowCredentials();
//     });
// });
// // 🔹 4. CORS for frontend + Cloudflare tunnel
// // builder.Services.AddCors(options =>
// // {
// //     options.AddPolicy("ReactPolicy", policy =>
// //     {
// //         policy.WithOrigins(
// //             "http://localhost:5173",                  // Local React
// //             "https://architects-list-connections-verbal.trycloudflare.com"      // Cloudflared tunnel frontend
// //         )
// //         .AllowAnyHeader()
// //         .AllowAnyMethod()
// //         .AllowCredentials();
// //     });
// // });


// // 🔹 5. Custom Services
// builder.Services.AddScoped<IAuthService, AuthService>();
// builder.Services.AddScoped<IHospitalService, HospitalService>();
// builder.Services.AddScoped<IPatientService, PatientService>();
// builder.Services.AddScoped<IDoctorService, DoctorService>();
// builder.Services.AddScoped<IPharmacistService, PharmacistService>();
// builder.Services.AddScoped<IPrescriptionService, PrescriptionService>();

// // 🔹 6. AutoMapper and MVC Controllers
// builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// builder.Services.AddControllers();

// var app = builder.Build();
// // ✅ Warm up EF Core & apply migrations before handling requests
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

//     // Apply migrations automatically
//     db.Database.Migrate();

//     // Force a DB connection to warm up EF
//     db.Database.CanConnect();
// }

// // ✅ Middleware Pipeline
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
// // In Program.cs or Startup.cs
// app.UseDeveloperExceptionPage();

// //app.UseHttpsRedirection();
// app.UseRouting();
// app.UseCors("ReactPolicy");
// //app.UseCors("AllowFrontend");

// app.UseAuthentication();
// app.UseAuthorization();

// // app.UseEndpoints(endpoints =>
// // {
// //     endpoints.MapControllers();
// // });
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

// 🔹 2. JWT Authentication
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
        policy.WithOrigins("http://localhost:5173") // React frontend
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 🔹 5. Custom Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IHospitalService, HospitalService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IPharmacistService, PharmacistService>();
builder.Services.AddScoped<IPrescriptionService, PrescriptionService>();

// 🔹 6. AutoMapper and MVC Controllers
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddControllers();

var app = builder.Build();

// ✅ Warm up EF Core & apply migrations before handling requests
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
    db.Database.CanConnect();
}

// ✅ Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

// ✅ Only one CORS policy applied
app.UseCors("ReactPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
