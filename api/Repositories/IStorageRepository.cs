public interface IStorageRepository
{
    string GeneratePresignedUrl(string key, string contentType);
}
