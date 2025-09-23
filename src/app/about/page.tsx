import Image from "next/image";

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			{/* Hero Section */}
			<section className="bg-gray-50 dark:bg-gray-800 py-20">
				<div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
							Nâng cao kỹ năng lập trình của bạn
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
							Tại EduSpark, sứ mệnh của chúng tôi là giúp các kỹ sư phần mềm cải thiện kỹ năng, mở rộng kiến thức và chuẩn bị cho các cuộc phỏng vấn tại các công ty hàng đầu trên thế giới.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<button className="bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-hover)] text-white font-semibold py-3 px-8 rounded-lg transition-colors">
								Bắt đầu ngay
							</button>
							<button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
								Tìm hiểu thêm
							</button>
						</div>
					</div>
					<div className="flex justify-center">
						<Image
							src="/logo.png"
							alt="EduSpark Logo"
							width={300}
							height={300}
							className="opacity-80"
						/>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
						Được tin tưởng bởi hàng triệu lập trình viên
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="text-4xl font-bold text-[color:var(--color-primary)] mb-2">
								12,000+
							</div>
							<div className="text-gray-600 dark:text-gray-400">Học viên</div>
						</div>
						<div className="text-center">
							<div className="text-4xl font-bold text-[color:var(--color-primary)] mb-2">
								350+
							</div>
							<div className="text-gray-600 dark:text-gray-400">Giảng viên</div>
						</div>
						<div className="text-center">
							<div className="text-4xl font-bold text-[color:var(--color-primary)] mb-2">
								120+
							</div>
							<div className="text-gray-600 dark:text-gray-400">Khóa học</div>
						</div>
					</div>
				</div>
			</section>

			{/* Companies Section */}
			<section className="bg-gray-50 dark:bg-gray-800 py-16">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-8">
						Được sử dụng bởi các kỹ sư tại
					</h3>
					<div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
						<Image src="/next.svg" alt="Next.js" width={80} height={32} />
						<Image src="/vercel.svg" alt="Vercel" width={80} height={32} />
						<Image src="/logo.png" alt="EduSpark" width={40} height={40} />
					</div>
				</div>
			</section>
		</div>
	);
}