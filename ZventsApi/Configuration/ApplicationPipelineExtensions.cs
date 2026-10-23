using Microsoft.AspNetCore.Builder;
using ZventsApi.Middleware;

namespace ZventsApi.Configuration
{
    public static class ApplicationPipelineExtensions
    {
        public static void UseZventsPipeline(this WebApplication app)
        {
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            if (!app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }
            app.UseCors(CorsConfig.PolicyName);
            // After CORS so a 429 still carries the CORS headers and the browser can read it.
            app.UseRateLimiter();
            app.UseAuthentication();
            app.UseAuthorization();
        }
    }
}
