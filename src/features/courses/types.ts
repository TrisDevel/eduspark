export type Lesson = {
  id: string;
  title: string;
  durationMinutes: number;
};

export type Chapter = {
  id: string;
  title: string;
  lessons: Lesson[];
};


