import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    
  <input 
    type="text" 
    className="form-control w-full max-w-lg border border-blue-500 rounded-md px-4 py-2 focus:outline-none focus:border-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-white transition duration-300 hover:border-blue-700 hover:shadow-md" 
    placeholder="Enter new Category" 
    value={value}
    onChange={(e) => setValue(e.target.value)}
/>

    
  </div>
  
  <button type="submit" className="btn text-center font-bold text-lg mt-2 bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-full dark:hover:bg-gray-800 transition duration-30">Submit</button>
</form>

      
    </>
  )
}

export default CategoryForm
