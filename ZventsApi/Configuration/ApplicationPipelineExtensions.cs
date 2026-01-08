using Microsoft.AspNetCore.Builder;

namespace ZventsApi.Configuration
{
    public static class ApplicationPipelineExtensions
    {
        public static void UseZventsPipeline(this WebApplication app)
        {
            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseAuthorization();
        }
    }
}