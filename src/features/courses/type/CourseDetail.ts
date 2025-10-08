import { Course } from "./Course";
import { User } from "@/contexts/types/UserDto";

export interface Topic {
    topicId : string;
    topicName : string;
}

export interface Tag {
    tagId : string;
    tagName : string;
    topic : Topic;
}

export interface Section {
    sectionId : string;
    sectionName : string;
    orderNumer: number;
    courseMaterials : CourseMaterial[];
}

export interface CourseMaterial {
    courseMaterialId : string;
    materialType: string;
    materialName: string;
    materialUrl: string;
    orderNum: number;
    title: string;
    expectDuration: number;
    wordCount: number;
}

export interface CourseDetail {
    course: Course;
    user: User| null;
    tags : Tag[];
    sections : Section[];
}