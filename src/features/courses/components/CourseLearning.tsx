"use client";
import { useState, useEffect } from "react";
import type { Section, CourseMaterial } from "../type/CourseDetail";
import Breadcrumb from "@/components/common/Breadcrumb";
import { ROUTES } from "@/config/routes";
import VideoPlayer from "@/components/common/VideoPlayer";

interface CourseLearningProps {
  sections: Section[];
  courseName?: string;
}

export default function CourseLearning({
  sections,
  courseName,
}: CourseLearningProps) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([sections[0]?.sectionId])
  );
  const [selectedMaterial, setSelectedMaterial] = useState<{
    section: Section;
    material: CourseMaterial | null;
  } | null>(null);

  // Auto-select first material when sections are loaded
  useEffect(() => {
    if (sections.length > 0 && !selectedMaterial) {
      const firstSection = sections[0];
      if (
        firstSection.courseMaterials &&
        firstSection.courseMaterials.length > 0
      ) {
        const firstMaterial = firstSection.courseMaterials[0];
        // console.log("Auto-selecting first material:", firstMaterial);
        setSelectedMaterial({
          section: firstSection,
          material: firstMaterial,
        });
      } else {
        setSelectedMaterial({
          section: firstSection,
          material: null,
        });
      }
    }
  }, [sections, selectedMaterial]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const selectMaterial = (
    section: Section,
    material: CourseMaterial | null
  ) => {
    console.log("selectMaterial", section, material);
    setSelectedMaterial({ section, material });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTotalDuration = (materials: CourseMaterial[]) => {
    const total = materials.reduce(
      (sum, m) => sum + (m.expectDuration || 0),
      0
    );
    return formatDuration(total);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Course Sections */}
      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600">
          <h1 className="text-xl font-bold text-white mb-2">
            {courseName || "Course Content"}
          </h1>
          <p className="text-orange-100 text-sm">
            {sections.length} sections •{" "}
            {sections.reduce((sum, s) => sum + s.courseMaterials.length, 0)}{" "}
            materials
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {sections.map((section, index) => {
            const isExpanded = expandedSections.has(section.sectionId);
            const isSelected =
              selectedMaterial?.section.sectionId === section.sectionId;

            return (
              <div
                key={section.sectionId}
                className={`${isSelected ? "bg-orange-50" : ""}`}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.sectionId)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {section.sectionName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {section.courseMaterials.length} materials •{" "}
                        {getTotalDuration(section.courseMaterials)}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="px-6 pb-2">
                    {/* Video */}
                    {section.videoUrl && (
                      <button
                        onClick={() => selectMaterial(section, null)}
                        className={`w-full mb-2 p-3 rounded-lg text-left transition-colors ${
                          selectedMaterial?.section.sectionId ===
                            section.sectionId && !selectedMaterial.material
                            ? "bg-orange-100 border-orange-300"
                            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                        } border`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              Section Video
                            </p>
                            <p className="text-xs text-gray-500">
                              Watch main video
                            </p>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Materials */}
                    {section.courseMaterials.map((material, idx) => (
                      <button
                        key={material.courseMaterialId}
                        onClick={() => selectMaterial(section, material)}
                        className={`w-full mb-2 p-3 rounded-lg text-left transition-colors ${
                          selectedMaterial?.material?.courseMaterialId ===
                          material.courseMaterialId
                            ? "bg-orange-100 border-orange-300"
                            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                        } border`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                              material.materialType === "VIDEO"
                                ? "bg-red-100"
                                : material.materialType === "PDF"
                                  ? "bg-blue-100"
                                  : material.materialType === "DOCUMENT"
                                    ? "bg-green-100"
                                    : "bg-purple-100"
                            }`}
                          >
                            {material.materialType === "VIDEO" && (
                              <svg
                                className="w-4 h-4 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                              </svg>
                            )}
                            {material.materialType === "PDF" && (
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            {material.materialType === "DOCUMENT" && (
                              <svg
                                className="w-4 h-4 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            {!["VIDEO", "PDF", "DOCUMENT"].includes(
                              material.materialType
                            ) && (
                              <svg
                                className="w-4 h-4 text-purple-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {material.title || material.materialName}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <span className="capitalize">
                                {material.materialType.toLowerCase()}
                              </span>
                              {material.expectDuration > 0 && (
                                <>
                                  <span>•</span>
                                  <span>
                                    {formatDuration(material.expectDuration)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {selectedMaterial ? (
          <div className="max-w-5xl mx-auto p-8">
            <Breadcrumb
              items={[
                { label: "Profile", href: ROUTES.profile.index },
                { label: courseName || "Course Content" },
              ]}
            />
            {/* Content Header */}
            <div className="my-6 ">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>{selectedMaterial.section.sectionName}</span>
                {selectedMaterial.material && (
                  <>
                    <span>›</span>
                    <span>{selectedMaterial.material.materialName}</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedMaterial.material?.title ||
                  selectedMaterial.section.sectionName}
              </h1>
            </div>

            {/* Video Player or Content Display */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              {selectedMaterial.material ? (
                // Material Content
                <div>
                  {selectedMaterial.material.materialType === "VIDEO" && (
                    <div className="aspect-video bg-black w-full">
                      <VideoPlayer
                        url={selectedMaterial.material.materialUrl}
                        controls
                        width="100%"
                        height="100%"
                      />
                    </div>
                  )}
                  {selectedMaterial.material.materialType === "PDF" && (
                    <div className="h-screen">
                      <iframe
                        src={selectedMaterial.material.materialUrl}
                        className="w-full h-full"
                        title={selectedMaterial.material.materialName}
                      />
                    </div>
                  )}
                  {!["VIDEO", "PDF"].includes(
                    selectedMaterial.material.materialType
                  ) && (
                    <div className="p-8 text-center">
                      <div className="mb-4">
                        <svg
                          className="w-16 h-16 mx-auto text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {selectedMaterial.material.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Type: {selectedMaterial.material.materialType}
                      </p>
                      <a
                        href={selectedMaterial.material.materialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download Material
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                // Section Video
                <div className="aspect-video bg-black">
                  <VideoPlayer
                    url={selectedMaterial.section.videoUrl || ""}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
            </div>

            {/* Material Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About this content
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {selectedMaterial.material && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Material Type
                      </p>
                      <p className="text-base font-medium text-gray-900 capitalize">
                        {selectedMaterial.material.materialType.toLowerCase()}
                      </p>
                    </div>
                    {selectedMaterial.material.expectDuration > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                        <p className="text-base font-medium text-gray-900">
                          {formatDuration(
                            selectedMaterial.material.expectDuration
                          )}
                        </p>
                      </div>
                    )}
                  </>
                )}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Section</p>
                  <p className="text-base font-medium text-gray-900">
                    {selectedMaterial.section.sectionName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Materials in Section
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {selectedMaterial.section.courseMaterials.length} items
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select a material to start learning
              </h3>
              <p className="text-gray-600">
                Choose from the course content on the left
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
