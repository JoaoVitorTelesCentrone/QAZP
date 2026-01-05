namespace ZventsApi.DTOs.User
{
    public class UserListDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
