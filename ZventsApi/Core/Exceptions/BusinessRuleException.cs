namespace ZventsApi.Application.Exceptions
{
    /// <summary>
    /// A violated business rule whose message is safe to return to the client as a 400.
    /// </summary>
    public class BusinessRuleException(string message) : Exception(message)
    {
    }
}
