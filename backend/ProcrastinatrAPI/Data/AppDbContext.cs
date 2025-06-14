using Microsoft.EntityFrameworkCore;
using ProcrastinatrAPI.Models;
using System.Collections.Generic;

namespace ProcrastinatrAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<TaskItem> TaskItems { get; set; } = default!;
    }
}
