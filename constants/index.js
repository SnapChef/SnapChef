export async function fetchRecipe(recipeId) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/fetchRecipe?id=${recipeId}`,
      {
        next: {
          revalidate: 0, // use 0 to opt out of using cache
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipe");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    return null; // Return null in case of error
  }
}

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

export async function fetchFavRecipes(username) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/fetchFavRecipes?username=${username}`,
      {
        next: {
          revalidate: 0, // use 0 to opt out of using cache
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile!");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return null; // Return null in case of error
  }
}

export async function fetchComments(recipeId) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/fetchComments?recipe_id=${recipeId}`,
      {
        next: {
          revalidate: 0, // use 0 to opt out of using cache
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipe");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    return null; // Return null in case of error
  }
}

export async function getHomePageRecipes() {
  const res = await fetch(`${process.env.URL}/api/homeRecipes`, {
    next: { revalidate: 0, cache: "no-store" },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
