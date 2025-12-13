using Amazon.S3;
using Amazon.S3.Model;

public class S3StorageRepository : IStorageRepository
{
    private readonly IAmazonS3 _s3;
    private readonly IConfiguration _config;

    public S3StorageRepository(IAmazonS3 s3, IConfiguration config)
    {
        _s3 = s3;
        _config = config;
    }

    // ----------------------------
    // Pre-signed PUT URL for upload
    // ----------------------------
    public string GeneratePresignedUrl(string key, string contentType)
    {
        var request = new GetPreSignedUrlRequest
        {
            BucketName = _config["AWS:BucketName"],
            Key = key,
            Verb = HttpVerb.PUT,
            Expires = DateTime.UtcNow.AddMinutes(5),
            ContentType = contentType
        };

        return _s3.GetPreSignedURL(request);
    }

    // ----------------------------
    // Pre-signed GET URL for viewing
    // ----------------------------
    public string GeneratePresignedGetUrl(string key)
    {
        var request = new GetPreSignedUrlRequest
        {
            BucketName = _config["AWS:BucketName"],
            Key = key,
            Verb = HttpVerb.GET,
            Expires = DateTime.UtcNow.AddMinutes(10)
        };

        return _s3.GetPreSignedURL(request);
    }

    // ----------------------------
    // Delete object from S3
    // ----------------------------
    public async Task DeleteAsync(string key)
    {
        var request = new DeleteObjectRequest
        {
            BucketName = _config["AWS:BucketName"],
            Key = key
        };

        await _s3.DeleteObjectAsync(request);
    }
}
