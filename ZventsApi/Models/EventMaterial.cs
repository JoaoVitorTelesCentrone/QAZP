namespace ZventsApi.Models
{
    public class EventMaterial
    {
        public Guid EventId { get; set; }
        public Event Event { get; set; }

        public Guid MaterialId { get; set; }
        public Material Material { get; set; }

        public int Quantity { get; set; }
    }
}
