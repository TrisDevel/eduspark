export interface Course {
    id: number;
    title: string;
    description?: string;
    students: number;
    duration: string;
    price: string;
    image: {
      src: string;
    };
}
