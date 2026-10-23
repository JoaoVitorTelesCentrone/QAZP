namespace ZventsApi.Application.Exceptions
{
    /// <summary>
    /// The request clashes with existing data (e.g. a duplicate document); returned as a 409.
    /// </summary>
    public class ConflictException(string message) : Exception(message)
    {
    }
}
