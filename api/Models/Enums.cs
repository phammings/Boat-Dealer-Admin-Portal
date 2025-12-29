namespace BoatAdminApi.Enums
{
    public enum ListingType
    {
        Dealer,
        Broker,
        Concessionnaire,
        Private
    }

    public enum BoatStatus
    {
        InStock = 1,
        ComingSoon,
        DealPending,
        Incoming,
        IncomingDealPending,
        OnOrder,
        OutOfStock,
        Sold,
        Unavailable,
        UnderDeposit
    }

    public enum Condition
    {
        New,
        Used
    }

    public enum DriveType
    {
        NoEngine,
        InboardOutboard,
        Inboard,
        Outboard,
        Jet,
        VDrive,
        Other
    }

    public enum FuelType
    {
        None,
        Gas,
        Diesel,
        Electric
    }
}
