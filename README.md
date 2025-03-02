# 🐶 Fetch Dogs - Adopt Your New Best Friend!

Welcome to **Fetch Dogs**, a web application that helps dog lovers find and adopt shelter dogs! This project allows users to search for available dogs based on breed, location, and age.

## 🚀 Features

✅ **User Authentication** - Login with Name & Email  
✅ **Search for Dogs** - Filter by Breed, Age, and Zip Code  
✅ **Pagination & Sorting** - Browse large datasets efficiently  
✅ **Favorite Dogs** - Select and save favorite dogs  
✅ **Find My Match** - Get matched with a dog based on preferences  
✅ **Responsive UI** - Fully optimized for desktop and mobile  
✅ **Fast & Scalable** - Uses **React, Material-UI, and TypeScript**

---

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Material-UI
- **State Management:** React Hooks, Context API
- **Backend API:** Fetch API
- **Styling:** Material-UI

---

## 🔧 Setup & Installation

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/sriramreddy42@gmail.com/fetch-dogs.git
cd fetch-dogs
2️⃣ Install Dependencies
sh
Copy
Edit
npm install  # or yarn install
3️⃣ Run the Development Server
sh
Copy
Edit
npm run dev  # or yarn dev
🚀 The app will be available at http://localhost:5173 (if using Vite).

🔑 Authentication
Before using the API, users must log in to obtain an authentication cookie.

Endpoint: POST /auth/login
Body:
json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com"
}
Response: The server sets an authentication cookie (fetch-access-token).
💡 Note: The cookie is HttpOnly, so it cannot be accessed in JavaScript. The browser automatically includes it in API requests.

🐶 Searching for Dogs
Endpoint: GET /dogs/search
Query Parameters:
name - Search By Only With Dog Name
breeds - Filter by dog breed
zipCodes - Filter by location
ageMin / ageMax - Set age range
sort - Sort by breed, name, or age
size - Number of results per page
Example Request:

sh
Copy
Edit
GET /dogs/search?breeds=Golden%20Retriever&zipCodes=10001&ageMin=1&ageMax=5&sort=breed:asc&size=10
Response:

json
Copy
Edit
{
  "resultIds": ["dog123", "dog456"],
  "total": 200,
  "next": "...",
  "prev": "..."
}
❤️ Favorite Dogs
Users can favorite dogs and later generate a match.

To fetch dog details:
Endpoint: POST /dogs
Body: ["dog123", "dog456"]

To match with a dog:
Endpoint: POST /dogs/match
Body: ["dog123", "dog456", "dog789"]

Response:

json
Copy
Edit
{
  "match": "dog123"
}
✨ The API selects a random dog from the provided list.

👨‍💻 Author
[Sriram Reddy Bandari]
📧 Email: sbandari@careerattainment.com
🔗 GitHub: https://github.com/sriramreddy42

```
