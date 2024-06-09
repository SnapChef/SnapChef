export async function fetchSearchTerm(term) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/fetchSearchTerm?term=${term}`,
      {
        next: {
          revalidate: 0, // use 0 to opt out of using cache
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipe(s)");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching recipe(s):", error.message);
    return null; // Return null in case of error
  }
}

export async function fetchRecipeNames(searchTerm) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/fetchRecipeNames?searchTerm=${searchTerm}`,
      {
        next: {
          revalidate: 0, // use 0 to opt out of using cache
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipe names");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching recipe names:", error.message);
    return null; // Return null in case of error
  }
}

export async function fetchFilteredList(option) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/fetchFilteredList?option=${option}`,
      {
        next: {
          revalidate: 0, // use 0 to opt out of using cache
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipe names");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching recipe names:", error.message);
    return null; // Return null in case of error
  }
}
