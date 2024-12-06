import { useEffect } from "react";

export function useMount(callback) {
  useEffect(callback, []);
}