using ZventsApi.Application.Interfaces.Repositories;

namespace ZventsApi.Infrastructure.BackgroundJobs
{
    // Sessions abandoned without a logout stay in the table until they expire; this sweeps
    // them out on startup and then periodically, so the table doesn't grow forever.
    public class SessionCleanupService(IServiceScopeFactory scopeFactory, ILogger<SessionCleanupService> logger)
        : BackgroundService
    {
        private static readonly TimeSpan Interval = TimeSpan.FromHours(6);

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var timer = new PeriodicTimer(Interval);
            do
            {
                try
                {
                    using var scope = scopeFactory.CreateScope();
                    var sessions = scope.ServiceProvider.GetRequiredService<IUserSessionRepository>();
                    var removed = await sessions.DeleteExpiredAsync();
                    if (removed > 0)
                    {
                        logger.LogInformation("Sessões expiradas removidas: {Count}", removed);
                    }
                }
                catch (Exception ex) when (ex is not OperationCanceledException)
                {
                    // Never take the API down over housekeeping (e.g. migrations not applied yet).
                    logger.LogError(ex, "Falha ao remover sessões expiradas");
                }
            }
            while (await timer.WaitForNextTickAsync(stoppingToken));
        }
    }
}
