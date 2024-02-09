import { create } from 'zustand'

const useSearchStore = create((set:any, get:any) => ({
  searchInput: '',
  startDate: new Date(),
  endDate: new Date(),
  guests: 1,
  
  setSearchStoreState: (name:string, val:any) => set((s:any) => ({
    ...s,
    [name]: val,
  })),

  cancelSearch: () => set((s:any) => ({...s, searchInput: ''})),
  cleanDateAndGuests: () => set((s:any) => ({
    ...s, 
    startDate: new Date(),
    endDate: new Date(),
    guests: 1,
  })),
}));

const unsub = useSearchStore.subscribe((state:any) => {
  console.log('useSearch updated---', state);
});

export default useSearchStore