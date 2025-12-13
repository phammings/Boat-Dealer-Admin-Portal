public interface IStorageRepository
{
    string GeneratePresignedUrl(string key, string contentType); // for upload
    string GeneratePresignedGetUrl(string key);                 // for viewing
    Task DeleteAsync(string key);                               // delete object
}
