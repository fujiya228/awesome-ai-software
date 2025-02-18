export interface Software {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  imageUrl?: string;
  tags: string[];
  isPaid: boolean;
  price?: string;
}