namespace ZventsApi.DTOs.User
{
    public class CreateUserResult
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Message { get; set; } = null!;
    }
}
