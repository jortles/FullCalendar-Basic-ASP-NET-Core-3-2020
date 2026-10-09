# FullCalendar-Basic-ASP-NET-Core-3-2020

The purpose of this project is to show how to set up FullCalendar with ASP.NET Core on .NET 10. 

# Features

The main feature is being able to Create, Edit and Delete events on your calendar using MSSQL Developer Edition.

# Running

1. Install the [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0).
2. In the `FullCalendar-Basic` folder, store the `AppData` connection string with user secrets. For a local SQL Server (for example Developer Edition) include `TrustServerCertificate=True`, because current SQL Server client libraries encrypt connections by default:

   ```
   dotnet user-secrets set "ConnectionStrings:AppData" "Server=localhost;Database=FullCalendarBasic;Trusted_Connection=True;TrustServerCertificate=True"
   ```

   Use `User Id=...;Password=...` instead of `Trusted_Connection=True` if your server uses SQL logins. If you already have an `AppData` secret from the ASP.NET Core 3.1 version, add `TrustServerCertificate=True` to it.
3. Create the database: install the EF Core tools once (`dotnet tool install --global dotnet-ef --version "10.*"`), then run `dotnet ef database update`.
4. Start the app with `dotnet run` and open the URL it prints.
