FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"

COPY . .
ARG CONFIGURATION=Release
RUN dotnet build "backend.csproj" -c $CONFIGURATION -o /app/build

FROM build AS publish
ARG CONFIGURATION=Release
RUN dotnet publish "backend.csproj" -c $CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 5000
ENTRYPOINT ["dotnet", "backend.dll"]