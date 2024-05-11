export default function Loader() {
  return (
    // Dot loader
    // <div class="flex space-x-1 justify-center items-center h-screen">
    //   <span class="sr-only">Loading...</span>
    //   <div class="h-5 w-5 bg-custom-main-dark rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    //   <div class="h-5 w-5 bg-custom-main-dark rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    //   <div class="h-5 w-5 bg-custom-main-dark rounded-full animate-bounce"></div>
    //   <p>Loading...</p>
    // </div>
    // Circle loader
    <div class="flex justify-center items-center h-screen">
      <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-custom-main-dark" />
      <span class="sr-only">Loading...</span>
    </div>
  );
}
