using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProcrastinatrAPI.Models;

public class TaskItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string TaskTitle { get; set; } = string.Empty;
    public bool IsDone { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
