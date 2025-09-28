import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AllCourses from "@/features/courses/components/AllCourses";

export const dynamic = "force-static";

export default function CoursesPage() {
  return (
    <div className="bg-white">
      
      <AllCourses />
    </div>
  );
}
