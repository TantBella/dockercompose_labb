using MongoDB.Driver;
using ProcrastinatrAPI.Models;

namespace ProcrastinatrAPI.Services;

public class TaskService
{
    private readonly IMongoCollection<TaskItem> _taskCollection;

    public TaskService(IConfiguration config)
    {
        var client = new MongoClient(config.GetConnectionString("MongoDb"));
        var database = client.GetDatabase("ProcrastinatrDB");
        _taskCollection = database.GetCollection<TaskItem>("Tasks");
    }

    public async Task<List<TaskItem>> GetAsync() =>
        await _taskCollection.Find(_ => true).ToListAsync();

    public async Task<TaskItem?> GetAsync(string id) =>
        await _taskCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(TaskItem task) =>
        await _taskCollection.InsertOneAsync(task);

    public async Task UpdateAsync(string id, TaskItem updatedTask) =>
        await _taskCollection.ReplaceOneAsync(x => x.Id == id, updatedTask);

    public async Task DeleteAsync(string id) =>
        await _taskCollection.DeleteOneAsync(x => x.Id == id);
}
