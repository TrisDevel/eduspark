export interface Course {
    id: number;
    name: string;
    code: string;
    description: string;
    durationInWeeks: number;
    language: string;
    level: string;
    price: number;
    discount: number;
    published: boolean; 
    image: string;
    quizzes?: any[]; // Add quiz type when structure is known
    discountedPrice?: number;
}

