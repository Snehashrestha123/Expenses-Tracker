// import { DollarSign, X } from 'lucide-react';
// import React from 'react'

// const categories = [
//     "Food",
//     "Transportation",
//     "Entertainment",
//     "Shopping",
//     "Bills",
//     "Healthcare",
//     "Other",
// ];

// useEffect(() => {
//     setFormData(initialData || empty);
// }, [initialData]);

// if (!isOpen) return null;

// const handleSubmit = () => {
//     if (!formData.description || !formData.amount) {
//         alert("please fill required fields");
//         return;
//     }

//     onSubmit({ ...formData, amount: parseFloat(formData.amount) });
// };

// function Model({ isOpen, onClose, onSubmit, initialData }) {
//     const empty = {
//         description: "",
//         amount: "",
//         category: "Food",
//         date: new Date().toISOString().split("T")[0],
//         notes: "",
//     };

//     const [formData, setFormData] = useState(initialData || empty);


//     return (
//         <div className="fixed inset-0 bg-opacity-30 backdrop-blur-lg z-50 flex items-center justify-center p-4">

//             <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl">

//                 <div className="flex items-center justify-between mb-4">
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-900">Add Expense</h2>
//                         <p className="text-sm text-gray-500 mt-1">Track your spending</p>
//                     </div>

//                     <button className="p-2 hover:bg-gray-100 rounded-full transition">
//                         <X className="w-5 h-5" />
//                     </button>
//                 </div>

//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-bold text-gray-700 mb-2">
//                             What did you buy?
//                         </label>

//                         <input
//                             type="text"
//                             placeholder="Enter description"
//                             className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">
//                                 Amount
//                             </label>

//                             <div className="relative">
//                                 <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
//                                 <input
//                                     type="number"
//                                     placeholder="0.00"
//                                     className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">
//                                 Date
//                             </label>

//                             <div className="relative">
//                                 <input
//                                     type="date"
//                                     placeholder="0.00"
//                                     className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
//                                 />
//                             </div>
//                         </div>


//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">
//                                 Category
//                             </label>

//                             <div className="grid grid-cols-4 gap-2">
//                                 {/* I will use map method */}

//                                 <button
//                                     className={"p-3 py-2.5 rounded-xl text-xs font-bold transition-all"}
//                                 >
//                                     Category Category Category
//                                 </button>
//                             </div>
//                         </div>

//                     </div>


//                     <div>
//                         <label className="block text-sm font-bold text-gray-700 mb-2">
//                             Note (optional)
//                         </label>

//                         <div className="relative">
//                             <textarea
//                                 type="date"
//                                 placeholder="Add Notes.."
//                                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
//                             />
//                         </div>


//                         <div className="flex gap-3">
//                             <button className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-bold">
//                                 Add Expense
//                             </button>

//                             <button className="px-4 py-3 rounded-xl border font-semibold">
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Model






import React, { useState, useEffect } from "react";
import { DollarSign, X } from "lucide-react";

const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Bills",
    "Healthcare",
    "Other",
];

function Model({ isOpen, onClose, onSubmit, initialData }) {
    const empty = {
        description: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
        notes: "",
    };

    const [formData, setFormData] = useState(initialData || empty);

    // Update formData if initialData changes (for editing)
    useEffect(() => {
        setFormData(initialData || empty);
    }, [initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.description || !formData.amount) {
            alert("Please fill required fields");
            return;
        }

        onSubmit({ ...formData, amount: parseFloat(formData.amount) });
        setFormData(empty);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {initialData ? "Edit Expense" : "Add Expense"}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Track your spending</p>
                    </div>
                    <button
                        type="submit"
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            What did you buy?
                        </label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    {/* Amount & Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Amount
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="0.00"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        setFormData({ ...formData, amount: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Category
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {categories.map((cat) => (
                                <button
                                    type="button"
                                    key={cat}
                                    onClick={() => setFormData({ ...formData, category: cat })}
                                    className={`p-3 py-2 rounded-xl text-xs font-bold transition-all ${formData.category === cat
                                        ? "bg-indigo-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Note (optional)
                        </label>
                        <textarea
                            name="notes"
                            placeholder="Add Notes.."
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                            rows={2}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-indigo-500 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition" onClick={handleSubmit}
                        >
                            {initialData ? "Save Changes" : "Add Expense"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-3 rounded-xl border font-semibold hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Model;