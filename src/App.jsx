import { useEffect, useState } from "react";
import "./App.css";

function App() {
  ////////create
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(data);

    const todo = {
      title: data.title,
      description: data.description,
    };

    const existingTodo = JSON.parse(localStorage.getItem("todos")) || [];
    existingTodo.push(todo);

    localStorage.setItem("todos", JSON.stringify(existingTodo));

    setReadData(existingTodo);

    //empty fields
    setData({ title: "", description: "" });
  };

  ////////Read useEffect

  const [readData, setReadData] = useState([]);

  useEffect(() => {
    const existingTodo = JSON.parse(localStorage.getItem("todos")) || [];
    setReadData(existingTodo);
  }, []);

  //for consoling
  // useEffect(()=>{console.log(readData)},[readData])

  //////////Delete

  const handleDelete = (index) => {
    const existingTodo = JSON.parse(localStorage.getItem("todos")) || [];

    existingTodo.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(existingTodo));

    setReadData(existingTodo);
  };

  ///////////Edit

  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    const existingTodo = JSON.parse(localStorage.getItem("todos")) || [];
    const selectedTodo = existingTodo[index];

    setEditData({
      title: selectedTodo.title,
      description: selectedTodo.description,
    });

    setEditIndex(index);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const existingTodo = JSON.parse(localStorage.getItem("todos")) || [];
    existingTodo[editIndex] = {
      title: editData.title,
      description: editData.description,
    };

    localStorage.setItem("todos", JSON.stringify(existingTodo));

    setReadData(existingTodo);

    //empty fields
    setEditData({ title: "", description: "" });

    setEditIndex(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        {/* Container */}
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Todo Manager</h1>

            <p className="text-gray-500 mt-2">
              Manage your todos using React and LocalStorage
            </p>
          </div>

          {/* Add Todo Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Add Todo
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Todo Title
                </label>

                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder="Enter todo title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  placeholder="Enter todo description"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
              >
                Add Todo
              </button>
            </form>
          </div>

          {/* Edit Todo Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Edit Todo
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Todo Title
                </label>

                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  placeholder="Enter updated todo title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  placeholder="Enter updated todo description"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg transition"
              >
                Update Todo
              </button>
            </form>
          </div>

          {/* Todo List */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-800">My Todos</h2>
            </div>

            {/* Todo Card */}
            <div className="space-y-4">
              {readData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      helllllloooooo
    </>
  );
}

export default App;
