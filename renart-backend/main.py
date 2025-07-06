import json
from fastapi import FastAPI, Query
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
async def get_products(minPrice: float = None, maxPrice: float = None, minScore: float = None):
    with open("products.json", "r") as f:
        products = json.load(f)

    gold_price = await get_gold_price()
    print(f"gold price is {gold_price}")
    filteredProducts = []
    for product in products:
        price = (product["popularityScore"] + 1) * product["weight"] * gold_price
        print(f"{product['name']}->{price}")
        product["price"] = round(price,2)
        score_out_of_5 = product["popularityScore"] * 5
        print(f"minPrice is {minPrice}")
        print(f"maxPrice is {maxPrice}")
        print(f"minScore is {minScore}")
        #apply filtering
        if minPrice is not None and product["price"]<minPrice:
            continue
        if maxPrice is not None and product["price"]>maxPrice:
            continue
        if minScore is not None and score_out_of_5<minScore:
            continue
        print("is adding...")
        filteredProducts.append(product)
        print("------------------------------------\n")
    return filteredProducts
