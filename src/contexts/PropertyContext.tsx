import { createContext, useContext, useState, ReactNode } from "react";

interface PropertyContextType {
  currentProduct: any | null;
  setCurrentProduct: (product: any | null) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [currentProduct, setCurrentProduct] = useState<any | null>(null);

  return (
    <PropertyContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};
