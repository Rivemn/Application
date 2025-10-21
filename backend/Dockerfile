# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy the solution file and project files first to leverage caching
COPY backend.sln .
COPY ["WebAPI/WebAPI.csproj", "WebAPI/"]
COPY ["BusinessLogicLayer/BusinessLogicLayer.csproj", "BusinessLogicLayer/"]
COPY ["DataAccessLayer/DataAccessLayer.csproj", "DataAccessLayer/"]

# Restore dependencies for all projects in the solution
RUN dotnet restore "backend.sln"

# Copy the rest of the source code
COPY . .

# Set the working directory to the main project before building
WORKDIR "/src/WebAPI"
ARG CONFIGURATION=Release
RUN dotnet build "WebAPI.csproj" -c $CONFIGURATION -o /app/build

# Stage 2: Publish the application
FROM build AS publish
ARG CONFIGURATION=Release
RUN dotnet publish "WebAPI.csproj" -c $CONFIGURATION -o /app/publish /p:UseAppHost=false

# Stage 3: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app
COPY --from=publish /app/publish .

# The entry point should be the DLL of your main project
ENTRYPOINT ["dotnet", "WebAPI.dll"]