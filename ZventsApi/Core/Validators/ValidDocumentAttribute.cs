using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace ZventsApi.Application.Validators
{
    public class ValidDocumentAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is not string document)
                return new ValidationResult("DocumentId is invalid");

            if (!Regex.IsMatch(document, @"^\d{11}$|^\d{14}$"))
                return new ValidationResult("DocumentId must have 11 or 14 digits");

            return ValidationResult.Success;
        }
    }
}
