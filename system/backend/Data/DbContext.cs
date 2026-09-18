using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class CustomerDbContext(DbContextOptions<CustomerDbContext> options) : Microsoft.EntityFrameworkCore.DbContext(options)
{
	public DbSet<Customer> Customers => Set<Customer>();

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Customer>(entity =>
		{
			entity.ToTable("Customers", table => table.HasCheckConstraint("CK_Customers_Status", "[Status] IN ('active', 'inactive')"));
			entity.HasKey(customer => customer.Id);
			entity.Property(customer => customer.Name).HasMaxLength(150).IsRequired();
			entity.Property(customer => customer.Email).HasMaxLength(255).IsRequired();
			entity.Property(customer => customer.Phone).HasMaxLength(30).IsRequired();
			entity.Property(customer => customer.Address).HasMaxLength(500).IsRequired();
			entity.Property(customer => customer.Status).HasMaxLength(8).HasDefaultValue("active").IsRequired();
			entity.Property(customer => customer.CreatedDate).HasDefaultValueSql("GETDATE()").IsRequired();
		});
	}
}
