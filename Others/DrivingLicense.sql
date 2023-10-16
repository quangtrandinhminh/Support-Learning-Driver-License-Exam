USE [master]
GO 

CREATE DATABASE [DrivingLicense] 

GO
USE [DrivingLicense]
GO

GO 
CREATE TABLE [dbo].[Role](
  [roleID] INT IDENTITY(1,1),
  [roleName] NVARCHAR(50) NOT NULL,
  CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
  (
    [roleID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
)ON [PRIMARY]
INSERT [dbo].[Role] ([roleName]) VALUES ('Administrator');
INSERT [dbo].[Role] ([roleName]) VALUES ('Staff');
INSERT [dbo].[Role] ([roleName]) VALUES ('Mentor');
INSERT [dbo].[Role] ([roleName]) VALUES ('Member');

CREATE TABLE [dbo].[User](
  [userID] INT IDENTITY(1,1),
  [username] VARCHAR(50) NOT NULL,
  [fullName] NVARCHAR(50) NOT NULL,
  [password] VARCHAR(50) NOT NULL,
  [phone] CHAR(10) NOT NULL,
  [email] VARCHAR(50) NULL,
  [createTime] DATETIME NOT NULL,
  [status] BIT NOT NULL,
  [roleID] INT NOT NULL,
  CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
  (
    [userID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_User_Role] FOREIGN KEY ([roleID]) REFERENCES [dbo].[Role] ([roleID]),
  CONSTRAINT [UC_Phone] UNIQUE ([phone]),
  CONSTRAINT [UC_Email] UNIQUE ([email])
);

CREATE TABLE [dbo].[Member](
  [memberID] INT IDENTITY(1,1),
  [dob] DATE NOT NULL,
  [gender] CHAR(6) NOT NULL,
  [nationality] VARCHAR(50) NOT NULL,
  [residenceAddress_] VARCHAR(255) NOT NULL,
  [cardProvidedDate] DATE NOT NULL,
  [cardProvidedLocation] VARCHAR(255) NOT NULL,
  [drivingLicenseNumber] VARCHAR(20) NULL,
  [drivingLicenseTier] VARCHAR(50) NULL,
  [drivingLicenseProvider] VARCHAR(255) NULL,
  [drivingLicenseProvidedDate] DATE NULL,
  [drivingTestTier] VARCHAR(5) NULL,
  [integratedDrivingLicense] VARCHAR(5) NULL,
  [revokedDrivingLicense] VARCHAR(20) NULL,
  [relatedDocument] VARCHAR(255) NULL,
  [registrationDate] DATE NOT NULL,
  [status] BIT NOT NULL,
  [userID] INT NOT NULL
  CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED 
  (
    [memberID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Member_User] FOREIGN KEY ([userID]) REFERENCES [dbo].[User] ([userID]),
  CONSTRAINT [UC_Member_User] UNIQUE ([userID]),
  CONSTRAINT [UC_DrivingLicenseNumber] UNIQUE ([drivingLicenseNumber]),
  CONSTRAINT [UC_DrivingLicenseTier] UNIQUE ([drivingLicenseTier]),
  CONSTRAINT [UC_DrivingTestTier] UNIQUE ([drivingTestTier]),
  CONSTRAINT [UC_IntegratedDrivingLicense] UNIQUE ([integratedDrivingLicense]),
  CONSTRAINT [UC_RevokedDrivingLicense] UNIQUE ([revokedDrivingLicense])
);

CREATE TABLE [dbo].[Mentor](
  [mentorID] INT IDENTITY(1,1),
  [name] NVARCHAR(50) NOT NULL,
  [phone] CHAR(10) NOT NULL,
  [email] VARCHAR(50) NOT NULL,
  [password] VARCHAR(50) NOT NULL,
  [residenceAddress] NVARCHAR(255) NOT NULL,
  [status] BIT NOT NULL,
  [userID] INT NOT NULL
  CONSTRAINT [PK_Mentor] PRIMARY KEY CLUSTERED 
  (
    [mentorID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Mentor_User] FOREIGN KEY ([userID]) REFERENCES [dbo].[User] ([userID]),
  CONSTRAINT [UC_Mentor_User] UNIQUE ([userID]),
  CONSTRAINT [UC_MentorPhone] UNIQUE ([phone]),
  CONSTRAINT [UC_MentorEmail] UNIQUE ([email])
);

CREATE TABLE [dbo].[Course](
  [courseID] VARCHAR(10) NOT NULL,
  [name] NVARCHAR(500) NOT NULL,
  [startDate] DATE NOT NULL,
  [endDate] DATE NOT NULL,
  [numberOfStudents] INT NULL,
  [limitStudent] INT NOT NULL,
  CONSTRAINT [PK_Course] PRIMARY KEY CLUSTERED 
  (
    [courseID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
);

CREATE TABLE [dbo].[Staff](
  [staffID] INT IDENTITY(1,1),
  [name] NVARCHAR(50) NOT NULL,
  [email] VARCHAR(50) NULL,
  [password] VARCHAR(50) NOT NULL,
  [isAdmin] BIT NOT NULL,
  [status] INT NOT NULL,
  [userID] INT NOT NULL
  CONSTRAINT [PK_Staff] PRIMARY KEY CLUSTERED 
  (
    [staffID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Staff_User] FOREIGN KEY ([userID]) REFERENCES [dbo].[User] ([userID]),
  CONSTRAINT [UC_Staff_User] UNIQUE ([userID]),
  CONSTRAINT [UC_StaffEmail] UNIQUE ([email])
);

CREATE TABLE [dbo].[News](
  [newsID] INT IDENTITY(1,1),
  [title] NVARCHAR(500) NOT NULL,
  [content] NVARCHAR(MAX) NOT NULL,
  [createdTime] DATETIME NOT NULL,
  [status] BIT NOT NULL,
  [staffID] INT NOT NULL,
  CONSTRAINT [PK_News] PRIMARY KEY CLUSTERED 
  (
    [newsID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_News_Staff] FOREIGN KEY ([staffID]) REFERENCES [dbo].[Staff] ([staffID])
);

CREATE TABLE [dbo].[Student](
  [studentID] VARCHAR(10) NOT NULL,
  [memberID] INT NOT NULL,
  [courseID] VARCHAR(10) NOT NULL,
  CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
  (
    [studentID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Student_Member] FOREIGN KEY ([memberID]) REFERENCES [dbo].[Member] ([memberID]),
  CONSTRAINT [FK_Student_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course] ([courseID])
);

CREATE TABLE [dbo].[Class](
  [classID] INT IDENTITY(1,1),
  [classType] BIT NOT NULL,
  [mentorID] INT NOT NULL,
  [courseID] VARCHAR(10) NOT NULL,
  CONSTRAINT [PK_Class] PRIMARY KEY CLUSTERED 
  (
    [classID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Class_Mentor] FOREIGN KEY ([mentorID]) REFERENCES [dbo].[Mentor] ([mentorID]),
  CONSTRAINT [FK_Class_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course] ([courseID])
);

CREATE TABLE [dbo].[Feedback](
  [feedbackID] INT IDENTITY(1,1),
  [createdStudentID] VARCHAR(10) NOT NULL,
  [classID] INT NOT NULL,
  [comment] NVARCHAR(MAX) NULL,
  [rating] INT NOT NULL,
  [createdTime] DATETIME NOT NULL,
  [status] BIT NOT NULL,
  CONSTRAINT [PK_Feedback] PRIMARY KEY CLUSTERED 
  (
    [feedbackID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Feedback_Student] FOREIGN KEY ([createdStudentID]) REFERENCES [dbo].[Student] ([studentID]),
  CONSTRAINT [FK_Feedback_Class] FOREIGN KEY ([classID]) REFERENCES [dbo].[Class] ([classID])
);

CREATE TABLE [dbo].[Image](
  [imageID] INT IDENTITY(1,1),
  [name] NVARCHAR(255) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [studentID] VARCHAR(10) NOT NULL,
  CONSTRAINT [PK_Image] PRIMARY KEY CLUSTERED 
  (
    [imageID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Image_Student] FOREIGN KEY ([studentID]) REFERENCES [dbo].[Student] ([studentID])
);

CREATE TABLE [dbo].[Question](
  [questionID] INT IDENTITY(1,1),
  [content] NVARCHAR(MAX) NOT NULL,
  [image] VARCHAR(MAX) NOT NULL,
  [keyQuestion] BIT NOT NULL,
  [correctAnswer] BIT NOT NULL,
  [staffID] INT NOT NULL,
  [status] BIT NOT NULL,
  CONSTRAINT [PK_Question] PRIMARY KEY CLUSTERED 
  (
    [questionID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Question_Staff] FOREIGN KEY ([staffID]) REFERENCES [dbo].[Staff] ([staffID])
);

CREATE TABLE [dbo].[Exam](
  [examID] INT IDENTITY(1,1),
  [description] NVARCHAR(MAX) NOT NULL,
  [limitQuestion] INT NOT NULL,
  [limitKeyQuestion] INT NOT NULL,
  [createdTime] DATETIME NOT NULL,
  [courseID] VARCHAR(10) NOT NULL,
  [staffID] INT NOT NULL,
  CONSTRAINT [PK_Exam] PRIMARY KEY CLUSTERED 
  (
    [examID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Exam_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course] ([courseID]),
  CONSTRAINT [FK_Exam_Staff] FOREIGN KEY ([staffID]) REFERENCES [dbo].[Staff] ([staffID])
);

CREATE TABLE [dbo].[ClassStudent](
  [classID] INT IDENTITY(1,1),
  [studentID] VARCHAR(10) NOT NULL,
  CONSTRAINT [PK_ClassStudent] PRIMARY KEY CLUSTERED 
  (
    [classID] ASC,
    [studentID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_ClassStudent_Class] FOREIGN KEY ([classID]) REFERENCES [dbo].[Class] ([classID]),
  CONSTRAINT [FK_ClassStudent_Student] FOREIGN KEY ([studentID]) REFERENCES [dbo].[Student] ([studentID])
);

CREATE TABLE [dbo].[Lesson](
  [lessonID] INT IDENTITY(1,1),
  [classID] INT NOT NULL,
  [startTime] DATETIME NOT NULL,
  [endTime] DATETIME NOT NULL,
  [title] NVARCHAR(MAX) NOT NULL,
  [hours] FLOAT NULL,
  [kilometers] FLOAT NULL,
  [studentID] VARCHAR(10) NOT NULL,
  [attendance] BIT NULL,
  CONSTRAINT [PK_Lesson] PRIMARY KEY CLUSTERED 
  (
    [lessonID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Lesson_Student] FOREIGN KEY ([studentID]) REFERENCES [dbo].[Student] ([studentID]),
  CONSTRAINT [FK_Lesson_Class] FOREIGN KEY ([classID]) REFERENCES [dbo].[Class] ([classID])
);

CREATE TABLE [dbo].[Test](
  [testID] INT IDENTITY(1,1),
  [testName] NVARCHAR(MAX) NOT NULL,
  [score] INT NULL,
  [pass] BIT NULL,
  [testTime] DATETIME NOT NULL,
  [studentID] VARCHAR(10) NOT NULL,
  [examID] INT NOT NULL,
  CONSTRAINT [PK_Test] PRIMARY KEY CLUSTERED 
  (
    [testID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Test_Student] FOREIGN KEY ([studentID]) REFERENCES [dbo].[Student] ([studentID]),
  CONSTRAINT [FK_Test_Exam] FOREIGN KEY ([examID]) REFERENCES [dbo].[Exam] ([examID])
);

CREATE TABLE [dbo].[StudentAnswer](
  [studentAnswerID] INT IDENTITY(1,1),
  [optionID] INT NULL,
  [isCorrect] BIT NULL,
  [testID] INT NOT NULL,
  CONSTRAINT [PK_StudentAnswer] PRIMARY KEY CLUSTERED 
  (
    [studentAnswerID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_StudentAnswer_Test] FOREIGN KEY ([testID]) REFERENCES [dbo].[Test] ([testID])
);

CREATE TABLE [dbo].[TestQuestion](
  [questionID] INT NOT NULL,
  [testID] INT NOT NULL,
  CONSTRAINT [PK_TestQuestion] PRIMARY KEY CLUSTERED 
  (
    [questionID] ASC,
    [testID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_TestQuestion_Question] FOREIGN KEY ([questionID]) REFERENCES [dbo].[Question] ([questionID]),
  CONSTRAINT [FK_TestQuestion_Test] FOREIGN KEY ([testID]) REFERENCES [dbo].[Test] ([testID])
);
