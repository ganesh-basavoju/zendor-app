"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, Users, Wrench } from "lucide-react";


// Update features data
const features = [
	{
		Icon: Truck,
		title: "Fast Delivery",
		description:
			"Quick and reliable delivery service for all your custom furniture needs",
	},
	{
		Icon: Users,
		title: "Expert Consultation",
		description:
			"Professional guidance from our experienced design consultants",
	},
	{
		Icon: Wrench,
		title: "Bespoke Craftsmanship",
		description:
			"Handcrafted furniture pieces tailored to your specific requirements",
	},
];

// Update testimonials data
const testimonials = [
	{
		name: "Contemporary Wall Design",
		image: "https://cdn.pixabay.com/photo/2021/04/22/18/50/frames-6199828_960_720.jpg",
		text: "The custom wall units and frames fit perfectly in my space.",
	},
	{
		name: "Minimalist Interior",
		image: "https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_960_720.jpg",
		text: "Clean lines and perfect execution - exactly what I wanted.",
	},
	{
		name: "Cozy Home Setup",
		image: "https://cdn.pixabay.com/photo/2020/10/19/11/43/home-5667529_1280.jpg",
		text: "The custom furniture pieces transformed my home completely.",
	},
];

export default function CustomDesign() {
	return (
		<div className="flex flex-col w-full px-10">
			{/* Hero Section */}
			<section className="relative w-full min-h-[600px]">
				<div className="absolute inset-0 z-0">
					<Image
						src="https://www.lifecoreflooring.com/wp-content/uploads/2019/04/Kitchen-Hardwood-Flooring-Options.png"
						alt="Modern Kitchen Interior"
						fill
						priority
						className="object-cover"
						quality={100}
					/>
					{/* Dark overlay */}
					<div className="absolute inset-0 bg-black/50" />
				</div>

				<div className="container mx-auto px-4 py-32 md:py-40 flex flex-col items-center justify-center min-h-[600px] relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center max-w-4xl"
					>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
						>
							Craft Your Perfect Space
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-white text-lg md:text-xl mb-10 max-w-2xl mx-auto"
						>
							Transform your home with custom-made furniture designed exclusively
							for you. Experience craftsmanship that brings your vision to life.
						</motion.p>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="flex flex-col sm:flex-row gap-4 justify-center items-center"
						>
							<Link href="#contact">
								<button className="bg-[#f5b142] hover:bg-[#e09e2c] text-white font-medium py-4 px-8 rounded-full transition-all duration-300 w-full sm:w-auto text-lg">
									Start Your Design Journey
								</button>
							</Link>
							<Link href="/portfolio">
								<button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-medium py-4 px-8 rounded-full transition-all duration-300 w-full sm:w-auto text-lg">
									View Our Portfolio
								</button>
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-24 bg-gradient-to-b from-white to-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-4xl font-bold mb-4 text-gray-900"
						>
							Why Choose Us?
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-lg text-gray-600"
						>
							Experience excellence in custom furniture design and craftsmanship
						</motion.p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								viewport={{ once: true }}
								className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
							>
								<div className="mb-6 inline-block bg-[#f5b142]/10 p-4 rounded-xl">
									<feature.Icon
									size={32}
										className="text-[#f5b142]"
									/>
								</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900">
									{feature.title}
								</h3>
								<p className="text-gray-600">
									{feature.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-4xl font-bold mb-4 text-gray-900"
						>
							Testimonials
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-lg text-gray-600"
						>
							What our clients say about our custom furniture solutions
						</motion.p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								viewport={{ once: true }}
								className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
							>
								<div className="relative h-56 w-full">
									<Image
										src={testimonial.image}
										alt={testimonial.name}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
									/>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
									<p className="text-gray-600">
										{testimonial.text}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Connect With Our Team Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-3xl font-bold mb-8"
					>
						Connect With Our Team
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-xl mb-8"
					>
						Ready to start your design journey?
					</motion.p>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						viewport={{ once: true }}
						className="inline-block"
					>
						<a
							href="https://wa.me/918433900692"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-message-circle"
							>
								<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
							</svg>
							Chat on WhatsApp
						</a>
					</motion.div>
				</div>
			</section>
		</div>
	);
}