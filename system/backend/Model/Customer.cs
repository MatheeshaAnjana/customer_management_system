using System.ComponentModel.DataAnnotations;

namespace backend.Model;

public class Customer
{
	public int Id { get; set; }

	[Required]
	[MaxLength(150)]
	public string Name { get; set; } = string.Empty;

	[Required]
	[EmailAddress]
	[MaxLength(255)]
	public string Email { get; set; } = string.Empty;

	[Required]
	[MaxLength(30)]
	[RegularExpression("^[0-9]+$", ErrorMessage = "Phone must contain numbers only.")]
	public string Phone { get; set; } = string.Empty;

	[Required]
	[MaxLength(500)]
	public string Address { get; set; } = string.Empty;

	[Required]
	[RegularExpression("^(active|inactive)$", ErrorMessage = "Status must be active or inactive.")]
	[MaxLength(8)]
	public string Status { get; set; } = "active";

	public DateTime CreatedDate { get; set; }
}
