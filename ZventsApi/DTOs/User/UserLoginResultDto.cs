namespace ZventsApi.DTOs.User
{
    public class UserLoginResult
    {
        public string Token { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
