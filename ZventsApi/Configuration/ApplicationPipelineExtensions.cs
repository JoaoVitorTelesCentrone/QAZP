using Microsoft.AspNetCore.Builder;
using ZventsApi.Middleware;

namespace ZventsApi.Configuration
{
    public static class ApplicationPipelineExtensions
    {
        public static void UseZventsPipeline(this WebApplication app)
        {
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            app.UseHttpsRedirection();
            app.UseCors(CorsConfig.PolicyName);
            app.UseAuthentication();
            app.UseAuthorization();
        }
    }
}
