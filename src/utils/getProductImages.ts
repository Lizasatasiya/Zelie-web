export const getProductImages = (folder: string): string[] => {
    const modules: Record<string, { default: string }> = import.meta.glob(
      '/src/assets/products/**/*.{jpg,jpeg,png}',
      { eager: true }
    ) as Record<string, { default: string }>;
  
    return Object.entries(modules)
      .filter(([path]) => path.includes(`/products/${folder}/`))
      .map(([_, mod]) => mod.default);
  };
  