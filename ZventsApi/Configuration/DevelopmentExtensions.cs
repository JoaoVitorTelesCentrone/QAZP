using Microsoft.AspNetCore.Builder;

namespace ZventsApi.Configuration
{
    public static class DevelopmentExtensions
    {
        public static void UseDevelopmentSwagger(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Zvents V1");
                });
            }
        }
    }
}