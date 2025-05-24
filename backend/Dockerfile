FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ./ ./
RUN dotnet restore ./WebAPI/WebAPI.csproj
RUN dotnet build ./WebAPI/WebAPI.csproj -c Release -o /app/build
RUN dotnet publish ./WebAPI/WebAPI.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WebAPI.dll"]
