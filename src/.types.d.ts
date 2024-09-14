/**
type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

interface GuitarI {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

type GuitarProps = {
  content: Guitar;
  addToCart: (item: Guitar) => void;
};

No recomendado*/