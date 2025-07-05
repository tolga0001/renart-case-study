import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

# CORS to grant permissions to UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
API_KEY = "DOXMGOFMADFGS9R88I6K307R88I6K"


# Altın fiyatını getir
async def get_gold_price():
    try:
        url = "https://api.metals.dev/v1/latest"
        params = {
            "api_key": API_KEY,
            "currency": "USD",
            "unit": "g"
        }
        async with httpx.AsyncClient() as client:
            #response = await client.get(url, params=params)
            #data = response.json()
            #107 approx
            return 107
    except Exception as e:
        print("Gold API error:", e)
        return 70.0  # fallback


@app.get("/products")
async def get_products():
    with open("products.json", "r") as f:
        products = json.load(f)

    gold_price = await get_gold_price()
    print(f"gold price is {gold_price}")
    for product in products:
        price = (product["popularityScore"] + 1) * product["weight"] * gold_price
        print(f"{product['name']}->{price}")
        product["price"] = round(price,2)

    return products
