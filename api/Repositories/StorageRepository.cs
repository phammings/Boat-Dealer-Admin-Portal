using Amazon.S3;

public class S3StorageRepository : IStorageRepository
{
    private readonly IAmazonS3 _s3;
    private readonly IConfiguration _config;

    public S3StorageRepository(
        IAmazonS3 s3,
        IConfiguration config)
    {
        _s3 = s3;
        _config = config;
    }

    public string GeneratePresignedUrl(string key, string contentType)
    {
        var request = new Amazon.S3.Model.GetPreSignedUrlRequest
        {
            BucketName = _config["AWS:BucketName"],
            Key = key,
            Verb = HttpVerb.PUT,
            Expires = DateTime.UtcNow.AddMinutes(5),
            ContentType = contentType
        };

        return _s3.GetPreSignedURL(request);
    }
}
