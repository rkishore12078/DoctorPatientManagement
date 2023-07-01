using DoctorPatientAPI.Adapters;
using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("ReactCors", policy =>
    {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
    });
});

builder.Services.AddDbContext<Context>
               (options => options.UseSqlServer(builder.Configuration.GetConnectionString("myConn")));

builder.Services.AddScoped<IManageDoctor,DoctorService>();
builder.Services.AddScoped<IManagePatient, PatientService>();
builder.Services.AddScoped<IManageUser, UserService>();
builder.Services.AddScoped<IRepo<User,int>,UserRepo>();
builder.Services.AddScoped<IRepo<Doctor,int>,DoctorRepo>();
builder.Services.AddScoped<IRepo<Patient,int>,PatientRepo>();
builder.Services.AddScoped<IPasswordGenerate,PasswordService>();
builder.Services.AddScoped<IAdapterDTO,AdapterDTO>();
builder.Services.AddScoped<ITokenService,TokenService>();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                       ValidateIssuer = false,
                       ValidateAudience = false
                   };
               });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ReactCors");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
