namespace BoatAdminApi.Helpers
{
    public static class DealerHelper
    {
        // Reads the dealer ID from a mock "Authorization" header
        public static int GetDealerId(Microsoft.AspNetCore.Http.HttpRequest request)
        {
            if (!request.Headers.TryGetValue("Authorization", out var token))
                return 0;

            // Example: token = "Bearer 12345"
            var tokenValue = token.ToString().Replace("Bearer ", "").Trim();

            if (int.TryParse(tokenValue, out int dealerId))
                return dealerId;

            return 0; // invalid token
        }
    }
}
