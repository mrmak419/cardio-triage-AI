import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

async def test_connection():
    uri = os.getenv("MONGO_URI")
    print(f"🔹 Testing Connection to: {uri.split('@')[-1]}") # Prints just the host part
    
    try:
        # Create client
        client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=5000)
        
        # Try to get server info (this triggers the actual connection)
        info = await client.server_info()
        print("✅ SUCCESS! Connected to Azure Cosmos DB.")
        print(f"Version: {info.get('version')}")
        
    except Exception as e:
        print("\n❌ CONNECTION FAILED")
        print(f"Error Detail: {e}")
        print("\nSUGGESTION: Try connecting to a different WiFi (like mobile hotspot) or change your DNS to 8.8.8.8.")

if __name__ == "__main__":
    asyncio.run(test_connection())