<form action="/favourites/remove" method="POST" class="mt-6">
  <button
    type="submit"
    class="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow transition duration-200"
  >
    <span class="text-xl mr-2">❌</span>
    Remove from favourites
  </button>
  <input type="hidden" name="id" value="<%= home._id %>" />
</form>
