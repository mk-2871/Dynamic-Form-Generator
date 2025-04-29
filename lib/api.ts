// API service for making requests to the backend

export async function createUser(rollNumber: string, name: string) {
  const response = await fetch("https://dynamic-form-generator-9rl7.onrender.com/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rollNumber, name }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Failed to create user")
  }

  return await response.json()
}

export async function getForm(rollNumber: string) {
  const response = await fetch(`https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Failed to fetch form")
  }

  return await response.json()
}
