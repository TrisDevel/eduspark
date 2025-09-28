"use client";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Ronald Richards",
    role: "Học viên",
    avatar: "https://i.pravatar.cc/80?img=12",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Wade Warren",
    role: "Học viên",
    avatar: "https://i.pravatar.cc/80?img=5",
    content:
      "Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Jacob Jones",
    role: "Học viên",
    avatar: "https://i.pravatar.cc/80?img=3",
    content:
      "Esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Học viên nói gì về EduSpark
          </h2>
          <p className="text-gray-500 mt-2">Bình luận tiêu biểu</p>
        </div>

        <div className="relative rounded-3xl bg-white/70 ring-1 ring-gray-200 p-6 sm:p-8 lg:p-10 shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-6">{t.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
