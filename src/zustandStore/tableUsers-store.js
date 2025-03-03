import { create } from "zustand";

export const useTableUsersStore = create((set) => ({
  items: [
    { id: 1, status:false, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, status:false, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, status:false, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, status:false, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, status:false, name: "Headphones", category: "Accessories", price: 199.99 },
  ],
  setItems: (item) => set(() => ({ items: item })),
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateUser: (id, updatedUser) =>
    set((state) => ({
      tableUsers: state.tableUsers.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),
    chek : (id)=>
        set ((state)=> ({
            items : state.items.map((item)=>
            item.id===id? {...item,status:!item.status}:item)
        })),
    editItem : (selectedItem)=> 
        set ((state)=>({
            items: state.items.map((item)=>
            item.id==selectedItem.id?
            {
                ...state.items, 
                name :selectedItem.name,
                category: selectedItem.category,
                price: selectedItem.price,
                id: item.id,
                status : item.status
            }:item)
        }))    
}));
