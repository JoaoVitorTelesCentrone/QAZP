using System.ComponentModel.DataAnnotations;

namespace ZventsApi.Controllers
{
    public class ValidDocumentAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var document = (string)value;

            if (!IsValidCPF(document) && !IsValidCNPJ(document))
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }

        private static bool IsValidCPF(string cpf)
        {
            cpf = cpf.Trim().Replace(".", "").Replace("-", "");

            if (cpf.Length != 11 || !cpf.All(char.IsDigit))
                return false;

            int[] numbers = cpf.Select(c => int.Parse(c.ToString())).ToArray();

            int sum = 0;
            for (int i = 0; i < 9; i++)
                sum += numbers[i] * (10 - i);

            int remainder = sum % 11;
            int digit1 = remainder < 2 ? 0 : 11 - remainder;

            if (numbers[9] != digit1)
                return false;

            sum = 0;
            for (int i = 0; i < 10; i++)
                sum += numbers[i] * (11 - i);

            remainder = sum % 11;
            int digit2 = remainder < 2 ? 0 : 11 - remainder;

            return numbers[10] == digit2;
        }

        private static bool IsValidCNPJ(string cnpj)
        {
            cnpj = cnpj.Trim().Replace(".", "").Replace("-", "").Replace("/", "");

            if (cnpj.Length != 14 || !cnpj.All(char.IsDigit))
                return false;

            int[] numbers = cnpj.Select(c => int.Parse(c.ToString())).ToArray();

            int[] firstMultiplier = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            int[] secondMultiplier = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

            int sum = 0;
            for (int i = 0; i < 12; i++)
                sum += numbers[i] * firstMultiplier[i];

            int remainder = sum % 11;
            int digit1 = remainder < 2 ? 0 : 11 - remainder;

            if (numbers[12] != digit1)
                return false;

            sum = 0;
            for (int i = 0; i < 13; i++)
                sum += numbers[i] * secondMultiplier[i];

            remainder = sum % 11;
            int digit2 = remainder < 2 ? 0 : 11 - remainder;

            return numbers[13] == digit2;
        }
    }
}