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
    sectionId: number;
    sectionName: string;
    orderNumber: number;
    videoUrl: string | null;
    previewable: string | null;
    courseMaterials: CourseMaterial[];
}

export interface CourseMaterial {
    courseMaterialId: string;
    title: string;
    materialUrl: string;
    materialType: string;
    materialName: string;
    orderNum: number;
    expectDuration: number; // in minutes
}

export interface CourseDetail {
    course: Course;
    user: User| null;
    tags : Tag[];
    sections : Section[];
}