"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react";
import { Class } from "@/mocks/fixtures/classes";
import { useEnrollInClass } from "../hooks/useClasses";
import { toast } from "sonner";

interface ClassCardProps {
  classData: Class;
  index: number;
}

const levelColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800", 
  advanced: "bg-red-100 text-red-800",
};

const statusColors = {
  active: "bg-orange-100 text-orange-800",
  upcoming: "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-800",
};

export const ClassCard = ({ classData, index }: ClassCardProps) => {
  const { enroll, loading: enrollLoading } = useEnrollInClass();

  const handleEnroll = async () => {
    try {
      await enroll(classData.id);
      toast.success("Đăng ký thành công!");
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  const isFull = classData.students >= classData.maxStudents;
  const canEnroll = classData.status === "active" && !isFull;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-100"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={classData.image}
          alt={classData.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[classData.level]}`}>
            {classData.level === "beginner" ? "Cơ bản" : 
             classData.level === "intermediate" ? "Trung bình" : "Nâng cao"}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[classData.status]}`}>
            {classData.status === "active" ? "Đang mở" : 
             classData.status === "upcoming" ? "Sắp mở" : "Đã kết thúc"}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-orange-600 font-bold text-sm">{classData.price}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {classData.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {classData.description}
          </p>
        </div>

        {/* Teacher Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={classData.teacher.avatar}
            alt={classData.teacher.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900 text-sm">Giảng viên</p>
            <p className="text-gray-600 text-sm">{classData.teacher.name}</p>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{classData.schedule.day}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{classData.schedule.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-orange-500" />
            <span className="text-sm">
              {classData.students}/{classData.maxStudents} học viên
            </span>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-900">Yêu cầu</span>
          </div>
          <div className="space-y-1">
            {classData.requirements.slice(0, 2).map((req, idx) => (
              <p key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                <span className="text-orange-500 mt-1">•</span>
                {req}
              </p>
            ))}
            {classData.requirements.length > 2 && (
              <p className="text-xs text-orange-600 font-medium">
                +{classData.requirements.length - 2} yêu cầu khác
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleEnroll}
          disabled={!canEnroll || enrollLoading}
          whileHover={canEnroll ? { scale: 1.02 } : {}}
          whileTap={canEnroll ? { scale: 0.98 } : {}}
          className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            canEnroll
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {enrollLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : isFull ? (
            "Lớp đã đầy"
          ) : classData.status === "upcoming" ? (
            "Sắp mở đăng ký"
          ) : classData.status === "completed" ? (
            "Đã kết thúc"
          ) : (
            <>
              Đăng ký ngay
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
