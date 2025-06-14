using ProcrastinatrAPI.Models;
using ProcrastinatrAPI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddUserSecrets<Program>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<TaskService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/api/tasks", async (TaskService service) =>
{
    var tasks = await service.GetAsync();
    return Results.Ok(tasks);
    });

app.MapGet("/api/tasks/{id}", async (string id, TaskService service) =>
{
    var task = await service.GetAsync(id);
    return task is not null ? Results.Ok(task) : Results.NotFound("Inga uppgifter med det Id:t hittades");
});

app.MapPost("/api/tasks", async (TaskItem task, TaskService service) =>
{
    await service.CreateAsync(task);
    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.MapPut("/api/tasks/{id}", async (string id, TaskItem updatedTask, TaskService service) =>
{
    var task = await service.GetAsync(id);
    if (task is null) return Results.NotFound("Uppgiften hittades inte");

    updatedTask.Id = id;
    await service.UpdateAsync(id, updatedTask);
    return Results.NoContent();
});

app.MapDelete("/api/tasks/{id}", async (string id, TaskService service) =>
{
    var task = await service.GetAsync(id);
    if (task is null) return Results.NotFound("Ingen med det Id:t uppgift hittades");

    await service.DeleteAsync(id);
    return Results.NoContent();
});

app.Run();
