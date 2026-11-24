export type HomeCategory = {
    id: string;
    name: string;
    icon: string;
};

export type HomeProduct = {
    id: string;
    name: string;
    description: string;
    price: string;
    oldPrice: string;
    image: string;
    images: string[];
    background: string;
    discountLabel: string;
    category: string;
};

export type CategorySectionProps = {
  categories: HomeCategory[];
};

export type FeaturedProductsProps = {
  products: HomeProduct[];
};

export type ProductCardProps = {
  product: HomeProduct;
};

export type HomeDeal = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  background: string;
};

export type DealCardProps = {
  deal: HomeDeal;
};

export type DealsSectionProps = {
  deals: HomeDeal[];
};