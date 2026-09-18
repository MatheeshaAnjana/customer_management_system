using backend.Data;
using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class CustomerController(CustomerDbContext dbContext) : ControllerBase
{
	[HttpGet]
	public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
	{
		return Ok(await dbContext.Customers.AsNoTracking().OrderBy(customer => customer.Id).ToListAsync());
	}

	[HttpGet("{id:int}")]
	public async Task<ActionResult<Customer>> GetCustomer(int id)
	{
		var customer = await dbContext.Customers.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
		return customer is null ? NotFound() : Ok(customer);
	}

	[HttpPost]
	public async Task<ActionResult<Customer>> CreateCustomer(Customer customer)
	{
		customer.Id = 0;
		customer.Status = customer.Status.ToLowerInvariant();
		customer.CreatedDate = DateTime.Now;

		dbContext.Customers.Add(customer);
		await dbContext.SaveChangesAsync();

		return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
	}

	[HttpPut("{id:int}")]
	public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
	{
		if (id != customer.Id)
		{
			return BadRequest("The route id and customer id must match.");
		}

		var existingCustomer = await dbContext.Customers.FindAsync(id);
		if (existingCustomer is null)
		{
			return NotFound();
		}

		existingCustomer.Name = customer.Name;
		existingCustomer.Email = customer.Email;
		existingCustomer.Phone = customer.Phone;
		existingCustomer.Address = customer.Address;
		existingCustomer.Status = customer.Status.ToLowerInvariant();

		await dbContext.SaveChangesAsync();
		return NoContent();
	}

	[HttpDelete("{id:int}")]
	public async Task<IActionResult> DeleteCustomer(int id)
	{
		var customer = await dbContext.Customers.FindAsync(id);
		if (customer is null)
		{
			return NotFound();
		}

		dbContext.Customers.Remove(customer);
		await dbContext.SaveChangesAsync();
		return NoContent();
	}
}
