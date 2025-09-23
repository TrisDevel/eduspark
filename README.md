# 📂 Project Structure

```plaintext
.
├─ public/
│  └─ assets/                          # ảnh, font, icon tĩnh
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx                   # landing (SEO)
│  │  ├─ (auth)/
│  │  │  ├─ layout.tsx
│  │  │  ├─ sign-in/page.tsx
│  │  │  └─ sign-up/page.tsx
│  │  ├─ (dashboard)/
│  │  │  ├─ layout.tsx                 # header/sidebar sau đăng nhập
│  │  │  ├─ page.tsx                   # /dashboard (tiến độ học viên)
│  │  │  ├─ courses/page.tsx           # /dashboard/courses
│  │  │  └─ submissions/page.tsx       # lịch sử submit
│  │  ├─ (play)/                       # khu trải nghiệm code/đề bài
│  │  │  ├─ layout.tsx
│  │  │  ├─ exercises/[id]/page.tsx    # trang làm bài (Monaco)
│  │  │  └─ courses/[slug]/page.tsx    # chi tiết khóa + danh sách bài
│  │  ├─ (admin)/
│  │  │  ├─ layout.tsx
│  │  │  ├─ problems/page.tsx          # CRUD bài tập
│  │  │  └─ testcases/page.tsx
│  │  ├─ (errors)/error.tsx
│  │  ├─ (errors)/not-found.tsx
│  │  ├─ layout.tsx                    # root: Theme/Providers
│  │  └─ sitemap.ts
│  │
│  ├─ components/                      # design system & domain components
│  │  ├─ ui/                           # Button/Input/Modal...
│  │  ├─ layout/                       # Navbar/Sidebar/Footer
│  │  ├─ course/                       # CourseCard/LessonAccordion...
│  │  ├─ practice/                     # CodeEditor/AIReviewBox...
│  │  ├─ quiz/                         # QuestionBlock/Timer/SubmitModal
│  │  ├─ dashboard/                    # StatBox/ProgressBar
│  │  └─ admin/                        # Table/StatusBadge/ActionDropdown
│  │
│  ├─ features/                        # TẬP TRUNG THEO TÍNH NĂNG
│  │  ├─ auth/
│  │  │  ├─ components/                # AuthForm, OAuthButtons...
│  │  │  ├─ hooks/                     # useAuth(), useSession()
│  │  │  └─ api.ts                     # login/register/refresh-token
│  │  ├─ courses/
│  │  │  ├─ components/                # CourseCard, ChapterList
│  │  │  ├─ hooks/                     # useCourses(), useCourseDetail()
│  │  │  └─ api.ts                     # list/detail/track-progress
│  │  ├─ exercises/
│  │  │  ├─ components/                # ProblemStatement, Tags, Timer
│  │  │  ├─ editor/                    # Monaco wrappers
│  │  │  │  └─ CodeEditor.tsx
│  │  │  ├─ hooks/                     # useExercise(), useRunCode()
│  │  │  └─ api.ts                     # getExercise/run/submit
│  │  ├─ submissions/
│  │  │  ├─ components/                # SubmissionList, VerdictBadge
│  │  │  ├─ hooks/                     # useSubmissions()
│  │  │  └─ api.ts
│  │  └─ admin/
│  │     ├─ components/                # ProblemForm, TestcaseTable
│  │     ├─ hooks/
│  │     └─ api.ts                     # CRUD problems/testcases
│  │
│  ├─ contexts/                        # hoặc đổi tên providers/
│  │  ├─ AuthProvider.tsx              # nếu không dùng next-auth
│  │  └─ QueryProvider.tsx             # React Query client
│  ├─ hooks/                           # cross-feature hooks (useMediaQuery…)
│  ├─ lib/
│  │  ├─ fetcher.ts                    # wrapper gọi BE (REST)
│  │  ├─ env.ts                        # zod-validate env
│  │  ├─ logger.ts
│  │  └─ monaco.ts                     # loader/config Monaco (client-only)
│  ├─ services/                        # (tuỳ chọn) domain dùng chung nhiều feature
│  │  └─ upload.service.ts             # ví dụ: upload file chung
│  ├─ constants/                       # hằng số tĩnh (business domain)
│  │  ├─ app.ts                        # APP_NAME, APP_VERSION
│  │  ├─ roles.ts                      # USER, ADMIN, TEACHER
│  │  ├─ verdicts.ts                   # ACCEPTED, WA, TLE...
│  │  └─ messages.ts                   # error/success messages
│  ├─ config/                          # cấu hình app (meta, route map)
│  │  ├─ routes.ts                     # route map typed
│  │  └─ site.ts                       # nav, meta, social
│  ├─ styles/
│  │  └─ globals.css
│  ├─ mocks/                           # MSW cho dev/test FE-only
│  ├─ types/
│  │  ├─ auth.ts
│  │  ├─ course.ts
│  │  ├─ exercise.ts
│  │  └─ submission.ts
│  └─ tests/                           # vitest + testing-library / e2e
├─ .env.example
├─ middleware.ts                        # bảo vệ /dashboard, /admin (redirect)
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ eslint.config.mjs




# 📦 Components Structure

components/
├── ui/                               # Thành phần UI cơ bản (design system)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── ...
├── layout/                           # Thành phần layout chung
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── course/                           # Thành phần liên quan đến khóa học
│   ├── CourseCard.tsx
│   ├── LessonAccordion.tsx
│   └── CourseOverview.tsx
├── practice/                         # Thành phần khu vực luyện tập
│   ├── CodeEditor.tsx
│   ├── AIReviewBox.tsx
│   └── ExerciseCard.tsx
├── quiz/                             # Thành phần quiz/trắc nghiệm
│   ├── QuestionBlock.tsx
│   ├── Timer.tsx
│   └── SubmitModal.tsx
├── dashboard/                        # Thành phần cho dashboard người dùng
│   ├── StatBox.tsx
│   └── ProgressBar.tsx
└── admin/                            # Thành phần dành cho trang quản trị
    ├── Table.tsx
    ├── StatusBadge.tsx
    └── ActionDropdown.tsx
