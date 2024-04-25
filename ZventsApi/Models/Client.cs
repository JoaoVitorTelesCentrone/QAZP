﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace ZventsApi.Models

{
    public class Client
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "LastName is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "DocumentId is required")]
        [RegularExpression(@"^\d{11}$|^\d{14}$", ErrorMessage = "Invalid DocumentId")]
        [ValidDocument(ErrorMessage = "Invalid DocumentId")]
        public string DocumentId { get; set; }
        [Required(ErrorMessage = "UserName is required")]
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        [Required(ErrorMessage = "ZipCode is required")]
        public string ZipCode { get; set; }
        [Required(ErrorMessage = "AddressName is required")]
        public string AddressName { get; set; }
        [Required(ErrorMessage = "AddressNumber is required")]
        public string AddressNumber { get; set; }
        public string? AddressComplement { get; set; }
        [Required(ErrorMessage = "District is required")]
        public string District { get; set; }
        [Required(ErrorMessage = "State is required")]
        public string State { get; set; }
        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public Client()
        {
            IsActive = true;
            CreatedDate = DateTime.Now;
        }
    }
}
