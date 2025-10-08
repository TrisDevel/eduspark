export interface Class {
  id: number;
  name: string;
  description: string;
  teacher: {
    name: string;
    avatar: string;
  };
  students: number;
  maxStudents: number;
  schedule: {
    day: string;
    time: string;
    duration: string;
  };
  level: 'beginner' | 'intermediate' | 'advanced';
  price: string;
  image: string;
  requirements: string[];
  status: 'active' | 'upcoming' | 'completed';
  startDate: string;
  endDate: string;
  category: string;
}

export const mockClasses: Class[] = [
  {
    id: 1,
    name: "Lập trình Scratch cho trẻ em",
    description: "Khóa học lập trình cơ bản giúp trẻ em từ 6-12 tuổi làm quen với tư duy lập trình thông qua Scratch",
    teacher: {
      name: "Nguyễn Văn An",
      avatar: "/images/user-profile/Ảnh chụp màn hình 2024-08-20 170122.png"
    },
    students: 25,
    maxStudents: 30,
    schedule: {
      day: "Thứ 2, 4, 6",
      time: "19:00 - 20:30",
      duration: "90 phút"
    },
    level: "beginner",
    price: "2,500,000 VNĐ",
    image: "/images/Course/ScratchCat.jpg",
    requirements: [
      "Máy tính có kết nối internet",
      "Trẻ từ 6-12 tuổi",
      "Có kiến thức cơ bản về máy tính"
    ],
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    category: "Lập trình"
  },
  {
    id: 2,
    name: "Python cho người mới bắt đầu",
    description: "Học Python từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu học lập trình",
    teacher: {
      name: "Trần Thị Bình",
      avatar: "/images/user-profile/Ảnh chụp màn hình 2024-08-20 170122.png"
    },
    students: 18,
    maxStudents: 25,
    schedule: {
      day: "Thứ 3, 5, 7",
      time: "18:30 - 20:00",
      duration: "90 phút"
    },
    level: "beginner",
    price: "3,200,000 VNĐ",
    image: "/images/Course/hero-section.png",
    requirements: [
      "Máy tính cá nhân",
      "Kiến thức toán cơ bản",
      "Thời gian học ít nhất 2h/ngày"
    ],
    status: "upcoming",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    category: "Lập trình"
  },
  {
    id: 3,
    name: "Web Development với React",
    description: "Xây dựng ứng dụng web hiện đại với React, JavaScript và các công nghệ frontend",
    teacher: {
      name: "Lê Minh Cường",
      avatar: "/images/user-profile/Ảnh chụp màn hình 2024-08-20 170122.png"
    },
    students: 22,
    maxStudents: 30,
    schedule: {
      day: "Thứ 2, 4, 6",
      time: "19:30 - 21:00",
      duration: "90 phút"
    },
    level: "intermediate",
    price: "4,500,000 VNĐ",
    image: "/images/Course/scratch.png",
    requirements: [
      "Kiến thức HTML, CSS, JavaScript cơ bản",
      "Máy tính có cài đặt Node.js",
      "Kinh nghiệm lập trình ít nhất 6 tháng"
    ],
    status: "active",
    startDate: "2024-01-20",
    endDate: "2024-04-20",
    category: "Web Development"
  },
  {
    id: 4,
    name: "Data Science với Python",
    description: "Phân tích dữ liệu và machine learning với Python, pandas, numpy và scikit-learn",
    teacher: {
      name: "Phạm Thị Dung",
      avatar: "/images/user-profile/Ảnh chụp màn hình 2024-08-20 170122.png"
    },
    students: 15,
    maxStudents: 20,
    schedule: {
      day: "Thứ 7, Chủ nhật",
      time: "14:00 - 17:00",
      duration: "180 phút"
    },
    level: "advanced",
    price: "5,800,000 VNĐ",
    image: "/images/Course/ScratchCat.jpg",
    requirements: [
      "Kiến thức Python cơ bản",
      "Kiến thức toán thống kê",
      "Máy tính có RAM tối thiểu 8GB"
    ],
    status: "upcoming",
    startDate: "2024-02-15",
    endDate: "2024-05-15",
    category: "Data Science"
  },
  {
    id: 5,
    name: "Mobile App với Flutter",
    description: "Phát triển ứng dụng di động đa nền tảng với Flutter và Dart",
    teacher: {
      name: "Hoàng Văn Em",
      avatar: "/images/user-profile/Ảnh chụp màn hình 2024-08-20 170122.png"
    },
    students: 20,
    maxStudents: 25,
    schedule: {
      day: "Thứ 3, 5",
      time: "19:00 - 21:30",
      duration: "150 phút"
    },
    level: "intermediate",
    price: "4,200,000 VNĐ",
    image: "/images/Course/hero-section.png",
    requirements: [
      "Kiến thức lập trình cơ bản",
      "Máy tính có Android Studio",
      "Kinh nghiệm với OOP"
    ],
    status: "active",
    startDate: "2024-01-25",
    endDate: "2024-04-25",
    category: "Mobile Development"
  },
  {
    id: 6,
    name: "UI/UX Design cơ bản",
    description: "Thiết kế giao diện người dùng và trải nghiệm người dùng với Figma và Adobe XD",
    teacher: {
      name: "Vũ Thị Phương",
      avatar: "/images/user-profile/Ảnh chụp màn hình 2024-08-20 170122.png"
    },
    students: 28,
    maxStudents: 30,
    schedule: {
      day: "Thứ 2, 4, 6",
      time: "18:00 - 19:30",
      duration: "90 phút"
    },
    level: "beginner",
    price: "3,000,000 VNĐ",
    image: "/images/Course/scratch.png",
    requirements: [
      "Máy tính có cài đặt Figma",
      "Khiếu thẩm mỹ tốt",
      "Kiến thức cơ bản về design"
    ],
    status: "upcoming",
    startDate: "2024-02-10",
    endDate: "2024-04-10",
    category: "Design"
  }
];

