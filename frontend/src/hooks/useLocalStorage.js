import { useEffect, useState } from "react";

export default function useLocalStorage(key, initiaState) {
  const [value, setvalue] = useState(() => {
    try {
      const storage = localStorage.getItem(key);
      return storage ? JSON.parse(storage) : initiaState;
    } catch {
      return initiaState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key]);
  return [value , setvalue]
}