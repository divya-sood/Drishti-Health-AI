import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# --- MONGODB CONNECTION ---
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    db = client["DrishtiHealth_V1"] 
    users_collection = db["users"]
    
    # Check connection
    client.server_info()
    
    # Try to create unique indices. This will only work if the data is clean!
    try:
        users_collection.create_index("login_name", unique=True)
        users_collection.create_index("email", unique=True, sparse=True)
        users_collection.create_index("phone", unique=True, sparse=True)
        print("✅ Unique constraints established.")
    except Exception as e:
        print(f"⚠️ Warning: Could not create indices. You likely have duplicates in your DB. {e}")

    print("✅ Connected to MongoDB on 27017")
except Exception as e:
    print(f"❌ Connection Failed: {e}")

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    login_name = data.get('loginName')
    identifier = data.get('identifier')
    password = data.get('password')

    if not login_name or not identifier or not password:
        return jsonify({"message": "Please fill all fields!"}), 400

    # Manual check for existing username
    if users_collection.find_one({"login_name": login_name}):
        return jsonify({"message": "Username already taken!"}), 400

    is_email = "@" in identifier
    email = identifier if is_email else None
    phone = identifier if not is_email else None

    # Manual check for existing email/phone
    if email and users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already in use!"}), 400
    
    if phone and users_collection.find_one({"phone": phone}):
        return jsonify({"message": "Phone number already in use!"}), 400

    new_user = {
        "login_name": login_name,
        "email": email,
        "phone": phone,
        "password": password 
    }
    
    try:
        users_collection.insert_one(new_user)
        return jsonify({"message": "Account created successfully!"}), 201
    except Exception:
        return jsonify({"message": "Error: This account already exists."}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    login_name = data.get('loginName')
    password = data.get('password')

    user = users_collection.find_one({"login_name": login_name})
    
    if not user:
        return jsonify({"message": "User not found!"}), 404

    if user['password'] == password:
        return jsonify({"message": f"Welcome back, {login_name}!", "status": "success"}), 200
    else:
        return jsonify({"message": "Incorrect password!"}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)