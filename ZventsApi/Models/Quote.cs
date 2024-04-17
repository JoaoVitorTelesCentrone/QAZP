﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ZventsApi.Models
{
    public class Quote
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        [Required(ErrorMessage = "Event type is required")]
        public string EventType { get; set; }
        [Required(ErrorMessage = "Estimated audience is required")]
        public int EstimatedAudience { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
