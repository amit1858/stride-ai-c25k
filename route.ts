generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum PlanStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}

enum WorkoutType {
  EASY_INTERVALS
  CONTINUOUS_RUN
  RECOVERY_WALK
  DELOAD
  TEST_5K
}

enum WorkoutStatus {
  SCHEDULED
  COMPLETED
  SKIPPED
  REPEATED
  CANCELLED
}

enum CoachRole {
  USER
  ASSISTANT
  SYSTEM
}

enum AdaptationDecision {
  PROGRESS
  REPEAT_WORKOUT
  REPEAT_WEEK
  DELOAD
  PAUSE_AND_REFER
}

model User {
  id             String                  @id @default(cuid())
  email          String                  @unique
  name           String?
  createdAt      DateTime                @default(now())
  updatedAt      DateTime                @updatedAt
  profile        RunnerProfile?
  plans          TrainingPlan[]
  runLogs        RunLog[]
  checkIns       CheckIn[]
  coachMessages  CoachMessage[]
  integrations   DeviceIntegration[]
  subscription   Subscription?
  notifications  NotificationPreference?
}

model RunnerProfile {
  id                    String   @id @default(cuid())
  userId                String   @unique
  user                  User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  ageRange              String?
  goal                  String
  experienceLevel       String
  canWalkMinutes        Int
  availableDays         String[]
  sessionsPerWeek       Int      @default(3)
  preferredCoachTone    String   @default("calm")
  preferredRunTime      String?
  treadmillOk           Boolean  @default(true)
  outdoorOk             Boolean  @default(true)
  injuryNotes           String?
  medicalConcern        Boolean  @default(false)
  baselineRpe           Int?
  constraints           Json?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}

model TrainingPlan {
  id             String       @id @default(cuid())
  userId         String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  title          String
  status         PlanStatus   @default(DRAFT)
  durationWeeks  Int
  sessionsPerWeek Int
  startDate      DateTime?
  targetDate     DateTime?
  targetDistanceKm Float      @default(5)
  planJson       Json
  safetyNotes    String[]
  adaptationRules Json
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  workouts       Workout[]
}

model Workout {
  id              String        @id @default(cuid())
  planId          String
  plan            TrainingPlan  @relation(fields: [planId], references: [id], onDelete: Cascade)
  weekNumber      Int
  sessionNumber   Int
  type            WorkoutType
  status          WorkoutStatus @default(SCHEDULED)
  scheduledFor    DateTime?
  title           String
  goal            String
  totalMinutes    Int
  warmupMinutes   Int           @default(5)
  cooldownMinutes Int           @default(5)
  intervals       WorkoutInterval[]
  runLogs         RunLog[]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@unique([planId, weekNumber, sessionNumber])
}

model WorkoutInterval {
  id           String   @id @default(cuid())
  workoutId    String
  workout      Workout  @relation(fields: [workoutId], references: [id], onDelete: Cascade)
  order        Int
  mode         String   // walk | run | recovery | mobility
  durationSec  Int
  cue          String?
}

model RunLog {
  id                    String             @id @default(cuid())
  userId                String
  user                  User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  workoutId             String?
  workout               Workout?           @relation(fields: [workoutId], references: [id], onDelete: SetNull)
  startedAt             DateTime?
  completedAt           DateTime           @default(now())
  completed             Boolean
  durationSec           Int
  distanceMeters        Int?
  avgPaceSecPerKm       Int?
  avgHeartRate          Int?
  maxHeartRate          Int?
  rpe                   Int
  soreness              Int?
  painScore             Int?
  painLocation          String?
  mood                  String?
  notes                 String?
  gpsSummary            Json?
  sensorSummary         Json?
  adaptationDecision    AdaptationDecision?
  adaptationReason      String?
  createdAt             DateTime           @default(now())
}

model CheckIn {
  id                 String   @id @default(cuid())
  userId             String
  user               User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  date               DateTime @default(now())
  sleepQuality       Int?
  energy             Int?
  soreness           Int?
  stress             Int?
  motivation         Int?
  redFlagSymptoms    String[]
  notes              String?
}

model CoachMessage {
  id             String    @id @default(cuid())
  userId         String
  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  role           CoachRole
  content        String
  metadata       Json?
  createdAt      DateTime  @default(now())
}

model DeviceIntegration {
  id             String   @id @default(cuid())
  userId         String
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  provider       String   // garmin | strava | apple_health | google_fit
  providerUserId String?
  accessTokenRef String?  // store reference in secret manager, not raw token
  scopes         String[]
  connectedAt    DateTime @default(now())
  lastSyncAt     DateTime?
  metadata       Json?
}

model Subscription {
  id                   String   @id @default(cuid())
  userId               String   @unique
  user                 User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  stripeCustomerId     String?
  stripeSubscriptionId String?
  plan                 String   @default("free")
  status               String   @default("active")
  currentPeriodEnd     DateTime?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}

model NotificationPreference {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  pushEnabled     Boolean  @default(true)
  emailEnabled    Boolean  @default(false)
  reminderHour    Int      @default(7)
  reminderTimezone String  @default("Asia/Kolkata")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
