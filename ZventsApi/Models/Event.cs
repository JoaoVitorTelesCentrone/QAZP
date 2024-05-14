using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;


namespace ZventsApi.Models
{
    public enum EventType
    {
        Wedding,
        TradeShow,
        Party,
        Festival,
        Workshop,
        Exhibition,
        Launch,
        Championship,
        Convention,
        Ball,
        Seminar,
        Meeting,
        Campaign,
        Ceremony,
        Symposium,
    }
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Type is required")]
        public EventType Type { get; set; }
        [Required(ErrorMessage = "ClientId is required")]
        public Guid ClientId { get; set; }
        [JsonIgnore]
        public Client? Client { get; set; }
        [Required(ErrorMessage = "StartAt is required")]
        public DateTime StartAt { get; set; }
        [Required(ErrorMessage = "EndAt is required")]
        public DateTime EndAt { get; set; }
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
        public int? EstimatedAudience { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public Event()
        {
            IsActive = true;
            CreatedDate = DateTime.Now;
        }

    }
}