# Базовый образ для запуска
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

# Этап сборки
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["WebAPI/WebAPI.csproj", "WebAPI/"]
COPY ["BusinessLogicLayer/Application.csproj", "BusinessLogicLayer/"]
COPY ["DataAccessLayer/Persistence.csproj", "DataAccessLayer/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]

RUN dotnet restore "WebAPI/WebAPI.csproj"

COPY . .
WORKDIR "/src/WebAPI"
RUN dotnet build "WebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Этап публикации
FROM build AS publish
RUN dotnet publish "WebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Финальный образ
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "WebAPI.dll"]
