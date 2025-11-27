namespace ZventsApi.Models
{
    public class EventMaterial
    {
        public Guid EventId { get; set; }
        public required Event Event { get; set; }

        public Guid MaterialId { get; set; }
        public required Material Material { get; set; }

        public int Quantity { get; set; }
        public required string MaterialName { get; set; }
        public decimal MaterialPrice {get ; set; }
    }
}
