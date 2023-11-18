USE [master]
GO 

/*--Run from master to here to drop db--*/
DROP DATABASE [DrivingLicense]

USE [master]
GO 
CREATE DATABASE [DrivingLicense] 

GO
USE [DrivingLicense]
GO

/* Added data */
CREATE TABLE [dbo].[Role](
  [roleID] INT IDENTITY(1,1) NOT NULL,
  [roleName] NVARCHAR(50) NULL,
  CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
  (
    [roleID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
)ON [PRIMARY]
GO

/* Added data */
CREATE TABLE [dbo].[User](
  [userID] INT IDENTITY(1,1) NOT NULL,
  [username] NVARCHAR(50) NULL,
  [fullName] NVARCHAR(50) NULL,
  [password] NVARCHAR(50) NULL,
  [phone] NVARCHAR(10) NULL,
  [email] NVARCHAR(50) NULL,
  [createTime] DATETIME NULL,
  [status] BIT NULL,
  [roleID] INT NOT NULL,
  CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
  (
    [userID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_User_Role] FOREIGN KEY ([roleID]) REFERENCES [dbo].[Role] ([roleID])
)ON [PRIMARY]
GO

/* Added data */
CREATE TABLE [dbo].[Course](
  [courseID] NVARCHAR(10) NOT NULL,
  [name] NVARCHAR(500) NULL,
  [startDate] DATE NULL,
  [endDate] DATE NULL,
  [numberOfStudents] INT NULL,
  [limitStudent] INT NULL,
  [courseFee] DECIMAL(10,2) DEFAULT 22500000.00 NULL,
  [PassTheoryLs] DECIMAL(5,2) DEFAULT 80.00 NULL,
  [PassKm] INT DEFAULT 810 NULL,
  [createTime] DATETIME NULL,
  [courseMonth] INT NULL,
  [courseYear] INT NULL,
  [status] BIT NULL,
  CONSTRAINT [PK_Course] PRIMARY KEY CLUSTERED 
  (
    [courseID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
)ON [PRIMARY]
GO


CREATE TABLE [dbo].[CourseContent](
	[courseContentId] INT IDENTITY(1,1) NOT NULL,
	[courseContent] NVARCHAR(MAX) NOT NULL,
	[status] BIT NULL,
	CONSTRAINT [PK_CourseContent] PRIMARY KEY CLUSTERED 
  (
    [courseContentId] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
)ON [PRIMARY]
GO

/* Added data */
CREATE TABLE [dbo].[CourseDetails](
	[courseDetailsID] INT IDENTITY(1,1) NOT NULL,
	[courseContent] NVARCHAR(500) NULL, 
	[courseTimeStart] DATETIME NULL,
	[courseTimeEnd] DATETIME NULL,
	[courseID] NVARCHAR(10) NOT NULL,
	[status] BIT NULL,
	CONSTRAINT [PK_CourseDetails] PRIMARY KEY CLUSTERED 
  (
    [courseDetailsID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
		CONSTRAINT [FK_CourseDetails_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course] ([courseID])
)ON [PRIMARY]
GO

/* Added data */
CREATE TABLE [dbo].[Member](
  [memberID] INT IDENTITY(1,1) NOT NULL,
  [dob] DATE NULL,
  [gender] NVARCHAR(6) NULL,
  [nationality] NVARCHAR(50) NULL,
  [nation] NVARCHAR(50) NULL,
  [temporaryAddress] NVARCHAR(50) NULL,
  [residenceAddress] NVARCHAR(255) NULL,
  [identityCardNumber] NVARCHAR(20) NULL,
  [passport] NVARCHAR(20) NULL,
  [cardProvidedDate] DATE NULL,
  [cardProvidedLocation] NVARCHAR(255) NULL,
  [drivingLicenseNumber] NVARCHAR(20) NULL,
  [drivingLicenseTier] NVARCHAR(50) NULL,
  [drivingLicenseProvider] NVARCHAR(255) NULL,
  [drivingLicenseProvidedDate] DATE NULL,
  [drivingTestTier] NVARCHAR(5) NULL,
  [integratedDrivingLicense] BIT NULL,
  [revokedDrivingLicense] BIT NULL,
  [relatedDocument] NVARCHAR(255) NULL,
  [registrationDate] DATE NULL,
  [isPaid] BIT NULL,
  [courseID] NVARCHAR(10) NULL,
  [userID] INT NOT NULL
  CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED 
  (
    [memberID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Member_User] FOREIGN KEY ([userID]) REFERENCES [dbo].[User] ([userID]),
  CONSTRAINT [UC_Member_User] UNIQUE ([userID]),
  CONSTRAINT [UC_IdentityCardNumber] UNIQUE ([IdentityCardNumber]),
  CONSTRAINT [FK_Member_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course]([courseID]),
)ON [PRIMARY]
GO

/* Added data */
CREATE TABLE [dbo].[Mentor](
  [mentorID] INT IDENTITY(1,1) NOT NULL,
  [userID] INT NOT NULL,
  [residenceAddress] NVARCHAR(255) NULL,
  [isTeachingTheory] BIT NULL,
  [isTeachingPractice] BIT NULL
  CONSTRAINT [PK_Mentor] PRIMARY KEY CLUSTERED 
  (
    [mentorID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Mentor_User] FOREIGN KEY ([userID]) REFERENCES [dbo].[User] ([userID]),
  CONSTRAINT [UC_Mentor_User] UNIQUE ([userID]),
)ON [PRIMARY]
GO

/* Added data */
CREATE TABLE [dbo].[Staff](
  [staffID] INT IDENTITY(1,1) NOT NULL,
  [userID] INT NOT NULL
  CONSTRAINT [PK_Staff] PRIMARY KEY CLUSTERED 
  (
    [staffID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Staff_User] FOREIGN KEY ([userID]) REFERENCES [dbo].[User] ([userID]),
  CONSTRAINT [UC_Staff_User] UNIQUE ([userID]),
)ON [PRIMARY]
GO

/* Added data */
CREATE TABLE [dbo].[News](
  [newsID] INT IDENTITY(1,1) NOT NULL,
  [title] NVARCHAR(500) NULL,
  [description] NVARCHAR(500) NULL,
  [content] NVARCHAR(MAX) NULL,
  [createdTime] DATETIME NULL,
  [status] BIT NULL,
  [staffID] INT NOT NULL,
  CONSTRAINT [PK_News] PRIMARY KEY CLUSTERED 
  (
    [newsID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_News_Staff] FOREIGN KEY ([staffID]) REFERENCES [dbo].[Staff] ([staffID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Student](
  [studentID] VARCHAR(10) NOT NULL,
  [memberID] INT NOT NULL,
  [courseID] NVARCHAR(10) NOT NULL,
  [totalKm] INT NULL,
  [totalHour] INT NULL,
  [pass] BIT NULL
  CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
  (
    [studentID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Student_Member] FOREIGN KEY ([memberID]) REFERENCES [dbo].[Member] ([memberID]),
  CONSTRAINT [FK_Student_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course] ([courseID])
)ON [PRIMARY]
GO

/* Theory type 0, Practice type 1*/
CREATE TABLE [dbo].[Class](
  [classID] INT IDENTITY(1,1) NOT NULL,
  [mentorID] INT NULL,
  [courseID] NVARCHAR(10) NOT NULL,
  [isTheoryClass] BIT NULL,
  [dayOfWeek] INT NULL,
  [limitStudent] INT NULL,
  [shift] NVARCHAR(MAX) NULL,
  [status] BIT NULL
  CONSTRAINT [PK_Class] PRIMARY KEY CLUSTERED 
  (
    [classID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Class_Mentor] FOREIGN KEY ([mentorID]) REFERENCES [dbo].[Mentor] ([mentorID]),
  CONSTRAINT [FK_Class_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course] ([courseID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Image](
  [imageID] INT IDENTITY(1,1) NOT NULL,
  [name] NVARCHAR(255) NULL,
  [description] NVARCHAR(MAX) NULL,
  [studentID] VARCHAR(10) NOT NULL,
  CONSTRAINT [PK_Image] PRIMARY KEY CLUSTERED 
  (
    [imageID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Image_Student] FOREIGN KEY ([studentID]) REFERENCES [dbo].[Student] ([studentID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Question](
  [questionID] INT IDENTITY(1,1) NOT NULL,
  [content] NVARCHAR(MAX) NULL,
  [image] VARCHAR(MAX) NULL,
  [keyQuestion] BIT NULL,
  [correctAnswer] INT NULL,
  [staffID] INT NOT NULL,
  [status] BIT NULL,
  CONSTRAINT [PK_Question] PRIMARY KEY CLUSTERED 
  (
    [questionID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Question_Staff] FOREIGN KEY ([staffID]) REFERENCES [dbo].[Staff] ([staffID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Exam](
  [examID] INT IDENTITY(1,1) NOT NULL,
  [staffID] INT NOT NULL,
  [courseID] NVARCHAR(10) NOT NULL,
  [examName] NVARCHAR(MAX) NULL,
  [examTime] DATETIME NULL,
  [description] NVARCHAR(MAX) NULL,
  [duration] INT NULL,
  [limitQuestion] INT NULL,
  [limitKeyQuestion] INT NULL,
  [minimumCorrectAnswer] SMALLINT NULL,
  [createdTime] DATETIME NULL,
  [status] BIT NULL
  CONSTRAINT [PK_Exam] PRIMARY KEY CLUSTERED 
  (
    [examID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Exam_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course] ([courseID]),
  CONSTRAINT [FK_Exam_Staff] FOREIGN KEY ([staffID]) REFERENCES [dbo].[Staff] ([staffID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[ClassStudent](
  [classStudentID] INT IDENTITY(1,1) NOT NULL,
  [classID] INT NOT NULL,
  [studentID] VARCHAR(10) NOT NULL,
  [status] BIT NULL
  CONSTRAINT [PK_ClassStudent] PRIMARY KEY CLUSTERED 
  (
    [classStudentID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_ClassStudent_Class] FOREIGN KEY ([classID]) REFERENCES [dbo].[Class] ([classID]),
  CONSTRAINT [FK_ClassStudent_Student] FOREIGN KEY ([studentID]) REFERENCES [dbo].[Student] ([studentID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[FeedBack](
	[feedBackId] INT IDENTITY(1,1) NOT NULL, 
	[classStudentID] INT NOT NULL,
	[comment] NVARCHAR(255) NULL,
	[feedBackTime] DATE NULL,
	[status] BIT NOT NULL
	CONSTRAINT [PK_FeedBack] PRIMARY KEY CLUSTERED 
   (
   [feedBackId] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_FeedBack_ClassStudent] FOREIGN KEY ([classStudentID]) REFERENCES [dbo].[ClassStudent] ([classStudentID])
)ON [PRIMARY]


CREATE TABLE [dbo].[Curriculum](
  [curriculumID] INT IDENTITY(1,1) NOT NULL,
  [content] NVARCHAR(MAX) NULL,
  [createTime] DATE NULL,
  [isTheory] BIT NULL
  CONSTRAINT [PK_Curriculum] PRIMARY KEY CLUSTERED 
  (
    [curriculumID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Lesson](
  [lessonID] INT IDENTITY(1,1) NOT NULL,
  [classStudentID] INT NOT NULL,
  [lessonContent] NVARCHAR(500) NULL,
  [date] DATE NULL,
  [location] NVARCHAR(255) NULL,
  [isNight] BIT NULL,
  [hours] FLOAT NULL,
  [kilometers] FLOAT NULL,
  [attendance] BIT NULL,
  CONSTRAINT [PK_Lesson] PRIMARY KEY CLUSTERED 
  (
    [lessonID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Lesson_ClassStudent] FOREIGN KEY ([classStudentID]) REFERENCES [dbo].[ClassStudent] ([classStudentID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Test](
  [testID] INT IDENTITY(1,1) NOT NULL,
  [studentID] VARCHAR(10) NOT NULL,
  [examID] INT NOT NULL,
  [score] SMALLINT NULL,
  [pass] BIT NULL,
  [createTime] DATETIME NULL,
  CONSTRAINT [PK_Test] PRIMARY KEY CLUSTERED 
  (
    [testID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Test_Student] FOREIGN KEY ([studentID]) REFERENCES [dbo].[Student] ([studentID]),
  CONSTRAINT [FK_Test_Exam] FOREIGN KEY ([examID]) REFERENCES [dbo].[Exam] ([examID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[StudentAnswer](
  [studentAnswerID] INT IDENTITY(1,1) NOT NULL,
  [testID] INT NOT NULL,
  [questionID] INT NOT NULL,
  [optionID] TINYINT NULL,
  [isCorrect] BIT NULL
  CONSTRAINT [PK_StudentAnswer] PRIMARY KEY CLUSTERED 
  (
    [studentAnswerID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_StudentAnswer_Test] FOREIGN KEY ([testID]) REFERENCES [dbo].[Test] ([testID]),
  CONSTRAINT [FK_StudentAnswer_Question] FOREIGN KEY ([questionID]) REFERENCES [dbo].[Question] ([questionID])
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Invoice](
  [invoiceID] INT IDENTITY(1,1) NOT NULL,
  [staffID] INT NOT NULL,
  [memberID] INT NOT NULL,
  [courseID] NVARCHAR(10) NOT NULL,
  [invoiceTime] DATETIME NULL,
  [amountPaid] DECIMAL(10,2) DEFAULT 22500000.00 NULL,
  [amountInWords] NVARCHAR(255) NULL
  CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED 
  (
    [invoiceID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
  CONSTRAINT [FK_Invoice_Staff] FOREIGN KEY ([staffID]) REFERENCES [dbo].[Staff] ([staffID]),
  CONSTRAINT [FK_Invoice_Member] FOREIGN KEY ([memberID]) REFERENCES [dbo].[Member] ([memberID]),
  CONSTRAINT [FK_Invoice_Course] FOREIGN KEY ([courseID]) REFERENCES [dbo].[Course] ([courseID]),
)ON [PRIMARY]
GO

/*-- Add data: Role -- 16/10/2023/ ---*/
SET IDENTITY_INSERT [dbo].[Role] ON 
GO
INSERT [dbo].[Role] ([roleID], [roleName]) VALUES (1, 'Administrator');
GO
INSERT [dbo].[Role] ([roleID], [roleName]) VALUES (2, 'Staff');
GO
INSERT [dbo].[Role] ([roleID], [roleName]) VALUES (3, 'Mentor');
GO
INSERT [dbo].[Role] ([roleID], [roleName]) VALUES (4, 'Member');
GO
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
/*-- Add data: User -- 16/10/2023/ ---*/
SET IDENTITY_INSERT [dbo].[User] ON
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (1 , N'NguyenVanA', N'NguyenVanA', N'12345', N'nguyenvana@gmail.com', '090212345', '2023-10-16', 1, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (2 , N'NguyenVanB', N'NguyenVanB', N'12345', N'nguyenvanb@gmail.com', '090212346', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (3 , N'NguyenVanC', N'NguyenVanC', N'12345', N'nguyenvanc@gmail.com', '090212347', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (4 , N'NguyenVanD', N'NguyenVanD', N'12345', N'nguyenvand@gmail.com', '090212348', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (5 , N'NguyenVanE', N'NguyenVanE', N'12345', N'nguyenvane@gmail.com', '090212349', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (6 , N'NguyenVanF', N'NguyenVanF', N'12345', N'nguyenvanf@gmail.com', '090212351', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (7 , N'NguyenVanG', N'NguyenVanG', N'12345', N'nguyenvang@gmail.com', '090212352', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (8 , N'NguyenVanH', N'NguyenVanH', N'12345', N'nguyenvanh@gmail.com', '090212353', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (9 , N'NguyenVanI', N'NguyenVanI', N'12345', N'nguyenvani@gmail.com', '090212354', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (10 , N'NguyenVanJ', N'NguyenVanJ', N'12345', N'nguyenvanj@gmail.com', '090212355', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (11 , N'NguyenVanK', N'NguyenVanK', N'12345', N'nguyenvank@gmail.com', '090212356', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (12 , N'NguyenVanL', N'NguyenVanL', N'12345', N'nguyenvanl@gmail.com', '090212357', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (13 , N'NguyenVanM', N'NguyenVanM', N'12345', N'nguyenvanm@gmail.com', '090212358', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (14 , N'NguyenVanN', N'NguyenVanN', N'12345', N'nguyenvann@gmail.com', '090212359', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (15 , N'NguyenVanO', N'NguyenVanO', N'12345', N'nguyenvano@gmail.com', '090212360', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (16 , N'NguyenVanP', N'NguyenVanP', N'12345', N'nguyenvanP@gmail.com', '090212361', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (17 , N'NguyenVanQ', N'NguyenVanQ', N'12345', N'nguyenvanq@gmail.com', '090212362', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (18 , N'NguyenVanR', N'NguyenVanR', N'12345', N'nguyenvanr@gmail.com', '090212363', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (19 , N'NguyenVanS', N'NguyenVanS', N'12345', N'nguyenvans@gmail.com', '090212364', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (20 , N'NguyenVanT', N'NguyenVanT', N'12345', N'nguyenvant@gmail.com', '090212365', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (21 , N'NguyenVanU', N'NguyenVanU', N'12345', N'nguyenvanu@gmail.com', '090212366', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (22 , N'NguyenVanV', N'NguyenVanV', N'12345', N'nguyenvanv@gmail.com', '090212367', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (23 , N'NguyenVanW', N'NguyenVanW', N'12345', N'nguyenvanw@gmail.com', '090212368', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (24 , N'NguyenVanX', N'NguyenVanX', N'12345', N'nguyenvanx@gmail.com', '090212369', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (25 , N'NguyenVanY', N'NguyenVanY', N'12345', N'nguyenvany@gmail.com', '090212370', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (26 , N'NguyenVanZ', N'NguyenVanZ', N'12345', N'nguyenvanz@gmail.com', '090212371', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (27 , N'NguyenVanAA', N'NguyenVanAA', N'12345', N'nguyenvanaa@gmail.com', '090212372', '2023-10-16', 3, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (28 , N'NguyenVanBB', N'NguyenVanBB', N'12345', N'nguyenvanbb@gmail.com', '090212373', '2023-10-16', 3, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (29 , N'NguyenVanCC', N'NguyenVanCC', N'12345', N'nguyenvancc@gmail.com', '090212374', '2023-10-16', 3, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (30 , N'NguyenVanDD', N'NguyenVanDD', N'12345', N'nguyenvandd@gmail.com', '090212375', '2023-10-16', 3, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (31 , N'NguyenVanEE', N'NguyenVanEE', N'12345', N'nguyenvanee@gmail.com', '090212376', '2023-10-16', 3, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (32 , N'NguyenVanFF', N'NguyenVanFF', N'12345', N'nguyenvanff@gmail.com', '090212377', '2023-10-16', 2, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (33 , N'NguyenVanGG', N'NguyenVanGG', N'12345', N'nguyenvangg@gmail.com', '090212378', '2023-10-16', 2, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (34 , N'NguyenVanHH', N'NguyenVanHH', N'12345', N'nguyenvanhh@gmail.com', '090212379', '2023-10-16', 2, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (35 , N'NguyenVanII', N'NguyenVanII', N'12345', N'nguyenvanii@gmail.com', '090212380', '2023-10-16', 2, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (36 , N'NguyenVanJJ', N'NguyenVanJJ', N'12345', N'nguyenvanjj@gmail.com', '090212381', '2023-10-16', 2, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (37 , N'NguyenVanKK', N'NguyenVanKK', N'12345', N'nguyenvankk@gmail.com', '090212382', '2023-10-16', 4, 1)
GO
INSERT [dbo].[User] ([userID], [userName], [fullName], [password], [email], [phone], [createTime], [roleID], [status]) 
	VALUES (38 , N'NguyenVanLL', N'NguyenVanLL', N'12345', N'nguyenvanll@gmail.com', '090212383', '2023-10-16', 4, 1)
GO
SET IDENTITY_INSERT [dbo].[User] OFF

/*-- Add data: Course --*/
GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('1101B2', '230B2', '2023-11-06', '2024-02-06', '5', '25', 
				'2023-10-06', '11', '2023', 1)

GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('1102B2', '231B2', '2023-11-16', '2024-02-16', '0', '25', 
				'2023-10-06', '11', '2023', 1)

GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('1103B2', '232B2', '2023-11-26', '2024-02-26', '0', '25', 
				'2023-10-06', '11', '2023', 1)

GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('1201B2', '233B2', '2023-12-06', '2024-03-06', '0', '25', 
				'2023-10-06', '12', '2023', 1)

GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('1202B2', '234B2', '2023-12-16', '2024-03-06', '0', '25', 
				'2023-10-06', '12', '2023', 1)

GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('1203B2', '235B2', '2023-12-26', '2024-03-26', '0', '25', 
				'2023-10-06', '12', '2023', 1)
				
GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('0101B2', '236B2', '2024-01-06', '2024-04-06', '0', '25', 
				'2024-10-06', '01', '2024', 1)
				
GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('0102B2', '237B2', '2024-01-16', '2024-04-16', '0', '25', 
				'2024-10-06', '01', '2024', 1)
				
GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('0103B2', '238B2', '2024-01-26', '2024-04-26', '0', '25', 
				'2024-10-06', '01', '2024', 1)
GO

/*-- Add data: CourseContent -- */
SET IDENTITY_INSERT [dbo].[CourseContent] ON

GO
INSERT [dbo].[CourseContent] ([courseContentId], [courseContent], [status])
	VALUES('1', N'Đào Tạo Lý Thuyết', 1)

GO
INSERT [dbo].[CourseContent] ([courseContentId], [courseContent], [status])
	VALUES('2', N'Thực Hành Sa Hình', 1)

GO
INSERT [dbo].[CourseContent] ([courseContentId], [courseContent], [status])
	VALUES('3', N'Thực Hành Trên Cabin', 1)

GO
INSERT [dbo].[CourseContent] ([courseContentId], [courseContent], [status])
	VALUES('4', N'Thực Hành Trên Đường', 1)

GO
INSERT [dbo].[CourseContent] ([courseContentId], [courseContent], [status])
	VALUES('5', N'Thực Hành Trên Xe Tự Động ', 1)

GO
INSERT [dbo].[CourseContent] ([courseContentId], [courseContent], [status])
	VALUES('6',N'Thực Hành Tổng Hợp Sa Hình', 1)

SET IDENTITY_INSERT [dbo].[CourseContent] OFF

/*-- Add data: CourseDetails --*/
SET IDENTITY_INSERT [dbo].[CourseDetails] ON
                                /*T: 11*/
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('1', N'Đào Tạo Lý Thuyết', '2023-11-06', '2023-11-20', '1101B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('2', N'Thực Hành Sa Hình', '2023-11-21', '2023-12-25', '1101B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('3', N'Thực Hành Trên Cabin', '2023-12-25', '2024-01-01', '1101B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('4', N'Thực Hành Trên Đường', '2024-01-02', '2024-02-01', '1101B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('5', N'Thực Hành Trên Xe Tự Động ', '2024-01-02', '2024-02-01', '1101B2' , 1)		
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('6', N'Thực Hành Tổng Hợp Sa Hình', '2024-02-01', '2024-02-06', '1101B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('7', N'Đào Tạo Lý Thuyết', '2023-11-16', '2023-11-30', '1102B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('8', N'Thực Hành Sa Hình', '2023-12-01', '2024-01-01', '1102B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('9', N'Thực Hành Trên Cabin', '2024-01-02', '2024-01-12', '1102B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('10', N'Thực Hành Trên Đường', '2024-01-13', '2024-02-11', '1102B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('11', N'Thực Hành Trên Xe Tự Động ', '2024-01-13', '2024-02-11', '1102B2' , 1)	
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('12', N'Thực Hành Tổng Hợp Sa Hình', '2024-02-12', '2024-02-16', '1102B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('13', N'Đào Tạo Lý Thuyết', '2023-11-26', '2023-12-05', '1103B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('14', N'Thực Hành Sa Hình', '2023-12-06', '2024-01-11', '1103B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('15', N'Thực Hành Trên Cabin', '2024-01-12', '2024-01-22', '1103B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('16', N'Thực Hành Trên Đường', '2024-01-23', '2024-02-21', '1103B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('17', N'Thực Hành Trên Xe Tự Động ', '2024-01-23', '2024-02-21', '1103B2' , 1)	
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('18', N'Thực Hành Tổng Hợp Sa Hình', '2024-02-22', '2024-02-26', '1103B2' , 1)
                                 /*T: 12*/
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('19', N'Đào Tạo Lý Thuyết', '2023-12-06', '2023-12-20', '1201B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('20', N'Thực Hành Sa Hình', '2023-12-21', '2024-01-25', '1201B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('21', N'Thực Hành Trên Cabin', '2024-01-25', '2024-02-01', '1201B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('22', N'Thực Hành Trên Đường', '2024-02-02', '2024-03-01', '1201B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('23', N'Thực Hành Trên Xe Tự Động ', '2024-02-02', '2024-03-01', '1201B2' , 1)		
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('24', N'Thực Hành Tổng Hợp Sa Hình', '2024-03-01', '2024-03-06', '1201B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('25', N'Đào Tạo Lý Thuyết', '2023-12-16', '2023-12-30', '1202B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('26', N'Thực Hành Sa Hình', '2024-01-01', '2024-02-01', '1202B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('27', N'Thực Hành Trên Cabin', '2024-02-02', '2024-02-12', '1202B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('28', N'Thực Hành Trên Đường', '2024-02-13', '2024-03-11', '1202B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('29', N'Thực Hành Trên Xe Tự Động ', '2024-02-13', '2024-03-11', '1202B2' , 1)	
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('30', N'Thực Hành Tổng Hợp Sa Hình', '2024-03-12', '2024-03-16', '1202B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('31', N'Đào Tạo Lý Thuyết', '2023-12-26', '2024-02-05', '1203B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('32', N'Thực Hành Sa Hình', '2024-02-06', '2024-02-11', '1203B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('33', N'Thực Hành Trên Cabin', '2024-02-12', '2024-02-22', '1203B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('34', N'Thực Hành Trên Đường', '2024-02-23', '2024-03-21', '1203B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('35', N'Thực Hành Trên Xe Tự Động ', '2024-02-23', '2024-03-21', '1203B2' , 1)	
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('36', N'Thực Hành Tổng Hợp Sa Hình', '2024-03-22', '2024-03-26', '1203B2' , 1)
                                 /*T: 1*/
                                 
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('37', N'Đào Tạo Lý Thuyết', '2024-01-06', '2024-01-20', '0101B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('38', N'Thực Hành Sa Hình', '2024-01-21', '2024-02-25', '0101B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('39', N'Thực Hành Trên Cabin', '2024-02-25', '2024-03-01', '0101B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('40', N'Thực Hành Trên Đường', '2024-03-02', '2024-04-01', '0101B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('41', N'Thực Hành Trên Xe Tự Động ', '2024-03-02', '2024-04-01', '0101B2' , 1)		
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('42', N'Thực Hành Tổng Hợp Sa Hình', '2024-04-01', '2024-04-06', '0101B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('43', N'Đào Tạo Lý Thuyết', '2024-01-16', '2024-01-30', '0102B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('44', N'Thực Hành Sa Hình', '2024-02-01', '2024-03-01', '0102B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('45', N'Thực Hành Trên Cabin', '2024-03-02', '2024-03-12', '0102B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('46', N'Thực Hành Trên Đường', '2024-03-13', '2024-04-11', '0102B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('47', N'Thực Hành Trên Xe Tự Động ', '2024-03-13', '2024-04-11', '0102B2' , 1)	
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('48', N'Thực Hành Tổng Hợp Sa Hình', '2024-04-12', '2024-04-16', '0102B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('49', N'Đào Tạo Lý Thuyết', '2024-01-26', '2024-03-05', '0103B2', 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('50', N'Thực Hành Sa Hình', '2024-03-06', '2024-04-11', '0103B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('51', N'Thực Hành Trên Cabin', '2024-04-12', '2024-04-22', '0103B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('52', N'Thực Hành Trên Đường', '2024-04-23', '2024-05-21', '0103B2' , 1)
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('53', N'Thực Hành Trên Xe Tự Động ', '2024-04-23', '2024-05-21', '0103B2' , 1)	
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('54', N'Thực Hành Tổng Hợp Sa Hình', '2024-05-22', '2024-05-26', '0103B2' , 1)
GO 
SET IDENTITY_INSERT [dbo].[CourseDetails] OFF

/*-- Add data: Member --*/
GO
SET IDENTITY_INSERT [dbo].[Member] ON 

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress],  [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('1', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001235', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '2')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('2', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001236', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '3')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('3', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001237', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '4')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('4', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001238', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1102B2', '5')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('5', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001239', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1102B2', '6')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('6', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001240', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1102B2', '7')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('7', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001241', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1103B2', '8')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('8', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001242', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1103B2', '9')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('9', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001243', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1103B2', ' 10')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('10', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001244', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1201B2', '11')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('11', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001245', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1201B2', '12')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('12', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001220', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1201B2', '13')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('13', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001246', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1202B2', '14')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('14', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001247', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1202B2', '15')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('15', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001248', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1202B2', '16')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('16', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001249', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1203B2', '17')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('17', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001250', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1203B2', '18')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('18', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001251', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '1203B2', '19')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('19', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001252', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0101B2', '20')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('20', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001253', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0101B2', '21')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('21', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001254', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0101B2', '22')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('22', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001255', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0102B2', '23')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('23', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001256', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0102B2', '24')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('24', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001257', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0102B2', '25')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('25', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001258', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0103B2', '26')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('26', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001259', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0103B2', '27')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('27', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001260', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 0, '0103B2', '36')
GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('28', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001261', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '37')
GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('29', '2003-08-06', 'Nam', N'Việt Nam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001262', '', '2022-10-22', 'Công An Phường', '', 'A1', 'Công An Thành Phố', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '38')
GO
SET IDENTITY_INSERT [dbo].[Member] OFF

/* Add data: Student */
GO
INSERT [dbo].[Student] ([studentID], [memberID], [courseID], [totalKm], [totalHour],  [pass])
	VALUES ('1101B2.01', '1', '1101B2', '', '', '')
GO
INSERT [dbo].[Student] ([studentID], [memberID], [courseID], [totalKm], [totalHour],  [pass])
	VALUES ('1101B2.02', '2', '1101B2', '', '', '')
GO
INSERT [dbo].[Student] ([studentID], [memberID], [courseID], [totalKm], [totalHour],  [pass])
	VALUES ('1101B2.03', '3', '1101B2', '', '', '')
GO
INSERT [dbo].[Student] ([studentID], [memberID], [courseID], [totalKm], [totalHour],  [pass])
	VALUES ('1101B2.28', '28', '1101B2', '', '', '')
GO
INSERT [dbo].[Student] ([studentID], [memberID], [courseID], [totalKm], [totalHour],  [pass])
	VALUES ('1101B2.29', '29', '1101B2', '', '', '')

GO
/* Add data: Staff */
SET IDENTITY_INSERT [dbo].[Staff] ON
GO
INSERT [dbo].[Staff] ([staffID], [userID]) VALUES(1, 32)
GO
INSERT [dbo].[Staff] ([staffID], [userID]) VALUES(2, 33)
GO
INSERT [dbo].[Staff] ([staffID], [userID]) VALUES(3, 34)
GO
INSERT [dbo].[Staff] ([staffID], [userID]) VALUES(4, 35)
GO
INSERT [dbo].[Staff] ([staffID], [userID]) VALUES(5, 36)
GO
SET IDENTITY_INSERT [dbo].[Staff] OFF
GO

/* Add data: News */
SET IDENTITY_INSERT [dbo].[News] ON
GO
INSERT [dbo].[News] ([newsID], [title], [content], [createdTime], [status], [staffID]) 
	VALUES(1, N'Hướng dẫn đăng kí khóa học trên hệ thống', N'Bước 1:, Bước 2: Bước 3:, Bước 4:', '2023-10-22', 1, 1)
GO
SET IDENTITY_INSERT [dbo].[News] OFF

/* Add data: Mentor */
SET IDENTITY_INSERT [dbo].[Mentor] ON
GO
INSERT [dbo].[Mentor] ([mentorID], [residenceAddress], [userID], [isTeachingPractice], [isTeachingTheory])
	VALUES (1, N'6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 27, 1, 1)
GO
INSERT [dbo].[Mentor] ([mentorID], [residenceAddress], [userID], [isTeachingPractice], [isTeachingTheory])
	VALUES (2, N'6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 28, 1, 0)
GO
INSERT [dbo].[Mentor] ([mentorID], [residenceAddress], [userID], [isTeachingPractice], [isTeachingTheory])
	VALUES (3, N'6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 29, 1, 0)
GO
INSERT [dbo].[Mentor] ([mentorID], [residenceAddress], [userID], [isTeachingPractice], [isTeachingTheory])
	VALUES (4, N'6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 30, 0, 1)
GO
INSERT [dbo].[Mentor] ([mentorID], [residenceAddress], [userID], [isTeachingPractice], [isTeachingTheory])
	VALUES (5, N'6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 31, 1, 1)
GO
SET IDENTITY_INSERT [dbo].[Mentor] OFF
GO

/* Add data: Class */
SET IDENTITY_INSERT [dbo].[Class] ON 
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('1', '1', '1101B2', 1, '', '', N'Chiều', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('2', '1', '1101B2', 0, '2', 3, N'Chiều', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('3', '1', '1101B2', 0, '3', 3, N'Sáng', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('4', '2', '1101B2', 0, '3', 3, N'Chiều', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('5', '2', '1101B2', 0, '4', 3, N'Sáng', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('6', '3', '1101B2', 0, '4', 3, N'Chiều', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('7', '3', '1101B2', 0, '5', 3, N'Sáng', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('8', '4', '1101B2', 0, '5', 3, N'Chiều', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('9', '4', '1101B2', 0, '6', 3, N'Sáng', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('10', '5', '1101B2', 0, '6', 3, N'Chiều', 1)
GO
INSERT [dbo].[Class] ([classID], [mentorID], [courseID], [isTheoryClass], [dayOfWeek], [limitStudent], [shift], [status])
	VALUES ('11', '5', '1101B2', 0, '2', 3, N'Sáng', 1)
SET IDENTITY_INSERT [dbo].[Class] OFF

/* Add data: ClassStudent */
SET IDENTITY_INSERT [dbo].[ClassStudent] ON 
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('1', '1', '1101B2.01', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('2', '1', '1101B2.02', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('3', '1', '1101B2.03', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('4', '1', '1101B2.28', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('5', '1', '1101B2.29', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('6', '2', '1101B2.01', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('7', '3', '1101B2.02', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('8', '5', '1101B2.03', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('9', '7', '1101B2.28', 1)
GO
INSERT [dbo].[ClassStudent]([classStudentID], [classID], [studentID],  
	 [status])
	VALUES ('10', '9', '1101B2.29', 1)

SET IDENTITY_INSERT [dbo].[ClassStudent] OFF 

SET IDENTITY_INSERT [dbo].[FeedBack] ON
GO
INSERT [dbo].[FeedBack] ([feedBackId], [classStudentID], [comment], [feedBackTime], [status])
	VALUES ('1', '1', '10 điểm', '2023-11-04', 1)
GO
INSERT [dbo].[FeedBack] ([feedBackId], [classStudentID], [comment], [feedBackTime], [status])
	VALUES ('2', '2', 'Thầy tuyệt quá', '2023-11-04', 1)
GO
INSERT [dbo].[FeedBack] ([feedBackId], [classStudentID], [comment], [feedBackTime], [status])
	VALUES ('3', '3', 'Thầy là nhất', '2023-11-04', 1)	
GO
INSERT [dbo].[FeedBack] ([feedBackId], [classStudentID], [comment], [feedBackTime], [status])
	VALUES ('4', '4', 'Thầy là số 1', '2023-11-04', 1)	
SET IDENTITY_INSERT [dbo].[FeedBack] OFF
GO

/* Add data: Exam */
SET IDENTITY_INSERT [dbo].[Exam] ON
GO
INSERT [dbo].[Exam] ([examID], [courseID], [staffID], [examName], [examTime], [description], [duration], [limitQuestion], [limitKeyQuestion], [minimumCorrectAnswer], [status])
	VALUES (1, '1101B2', '1', N'Kì thi thử lý thuyết', '2023-11-05T08:00:00', N'Kì thi này ....', 30, 35, 3, 32, 1)
GO
INSERT [dbo].[Exam] ([examID], [courseID], [staffID], [examName], [examTime], [description], [duration], [limitQuestion], [limitKeyQuestion], [minimumCorrectAnswer], [status])
	VALUES (2, '1102B2', '1', N'Kì thi thử lý thuyết', '2023-11-06T08:00:00', N'Kì thi này ....', 30, 35, 3, 32, 1)
GO
SET IDENTITY_INSERT [dbo].[Exam] OFF

/* Add data: Lesson */
/*DECLARE @classStudentID INT = 1;
DECLARE @date DATE = '2023-11-06';
DECLARE @attendance INT;

WHILE @classStudentID <= 5
BEGIN
    IF @classStudentID < 4
        SET @attendance = 1;
    ELSE
        SET @attendance = 0;

    WHILE @date <= '2023-11-18'
    BEGIN
        INSERT INTO [dbo].[Lesson] 
        ([classStudentID], [title], [date], [location], [isNight], [hours], [kilometers], [attendance])
        VALUES (@classStudentID, N'Đào tạo lý thuyết', @date, 'P12', 0, 0, 0, @attendance);

        SET @date = DATEADD(DAY, 1, @date);
    END

    SET @classStudentID = @classStudentID + 1;
    SET @date = '2023-11-06';
END

SET @classStudentID = 6;
DECLARE @preferredDayOfWeek INT;
DECLARE @title NVARCHAR(255);

WHILE @classStudentID <= 10
BEGIN
	IF @classStudentID < 9
        SET @attendance = 1;
    ELSE
        SET @attendance = 0;

    -- Retrieve the preferred day of week for the current student from the associated class
    SELECT @preferredDayOfWeek = DayOfWeek
    FROM Class
    INNER JOIN ClassStudent ON Class.ClassId = ClassStudent.ClassId
    WHERE ClassStudentId = @classStudentID;

    -- Set the initial date based on the preferred day of week
    SET @date = CASE 
                  WHEN @preferredDayOfWeek >= DATEPART(WEEKDAY, '2023-12-25') THEN DATEADD(DAY, @preferredDayOfWeek - DATEPART(WEEKDAY, '2023-12-25'), '2023-12-25')
                  ELSE DATEADD(DAY, 7 - (DATEPART(WEEKDAY, '2023-12-25') - @preferredDayOfWeek), '2023-12-25')
                END

    WHILE @date <= '2024-02-06'
    BEGIN
        -- Assign titles based on the date range
        SET @title = CASE 
                       WHEN @date BETWEEN '2023-12-25' AND '2024-01-01' THEN N'Thực hành trên cabin'
                       WHEN @date BETWEEN '2024-01-02' AND '2024-02-01' THEN N'Thực hành trên đường'
                       WHEN @date BETWEEN '2024-02-01' AND '2024-02-06' THEN N'Thực hành tổng hợp sa hình'
                       ELSE @title -- Keep the previous title if the date doesn't match any range
                     END

        -- Insert the lesson
        INSERT INTO [dbo].[Lesson] 
        ([classStudentID], [title], [date], [location], [isNight], [hours], [kilometers], [attendance])
        VALUES (@classStudentID, @title, @date, N'', 0, CASE WHEN @attendance = 1 THEN 4 ELSE 0 END, 
		CASE WHEN @attendance = 1 THEN 90 ELSE 0 END, @attendance);

		IF @date BETWEEN '2024-01-15' AND '2024-01-28'
		INSERT INTO [dbo].[Lesson] 
        ([classStudentID], [title], [date], [location], [isNight], [hours], [kilometers], [attendance])
        VALUES (@classStudentID, @title, @date, N'', 0, CASE WHEN @attendance = 1 THEN 4 ELSE 0 END, 
		CASE WHEN @attendance = 1 THEN 90 ELSE 0 END, @attendance);

        -- Calculate the next date for the same day of the week
        SET @date = DATEADD(DAY, 7, @date);
    END

    -- Move to the next student
    SET @classStudentID = @classStudentID + 1;
END

-- Calculate the sum of kilometers and hours for each student
BEGIN
WITH LessonTotals AS (
    SELECT 
        cs.studentID, 
        SUM(l.kilometers) AS TotalKilometers, 
        SUM(l.hours) AS TotalHours
    FROM 
        dbo.Lesson l
        INNER JOIN dbo.ClassStudent cs ON l.classStudentID = cs.classStudentID
    GROUP BY 
        cs.studentID
)

-- Update the Student table with the calculated totals
UPDATE 
    s
SET 
    s.totalKm = lt.TotalKilometers,
    s.totalHour = lt.TotalHours,
    s.pass = CASE WHEN lt.TotalKilometers >= 810  THEN 1 ELSE 0 END
FROM 
    dbo.Student s
    INNER JOIN LessonTotals lt ON s.studentID = lt.studentID
END*/

/* Add data: question*/
GO
SET IDENTITY_INSERT [dbo].[Question] ON
GO
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (1, N'Lý thuyết','https://i.ibb.co/0cZM8Z8/600-cau-hoi1.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (2, N'Lý thuyết','https://i.ibb.co/sK1JDrb/600-cau-hoi2.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (3, N'Lý thuyết','https://i.ibb.co/X5PPWng/600-cau-hoi3.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (4, N'Lý thuyết','https://i.ibb.co/K5M5k4L/600-cau-hoi4.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (5, N'Lý thuyết','https://i.ibb.co/z5znv6k/600-cau-hoi5.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (6, N'Lý thuyết','https://i.ibb.co/HVs18vz/600-cau-hoi6.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (7, N'Lý thuyết','https://i.ibb.co/BtCFFwn/600-cau-hoi7.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (8, N'Lý thuyết','https://i.ibb.co/Qp3jjs0/600-cau-hoi8.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (9, N'Lý thuyết','https://i.ibb.co/txHP0Jm/600-cau-hoi9.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (10, N'Lý thuyết','https://i.ibb.co/NLqZf26/600-cau-hoi10.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (11, N'Lý thuyết','https://i.ibb.co/Y0v97X5/600-cau-hoi11.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (12, N'Lý thuyết','https://i.ibb.co/2ypGbHz/600-cau-hoi12.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (13, N'Lý thuyết','https://i.ibb.co/PzGqFLz/600-cau-hoi13.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (14, N'Lý thuyết','https://i.ibb.co/FzC1J1L/600-cau-hoi14.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (15, N'Lý thuyết','https://i.ibb.co/ggzqpq7/600-cau-hoi15.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (16, N'Lý thuyết','https://i.ibb.co/tx1yFxx/600-cau-hoi16.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (17, N'Lý thuyết','https://i.ibb.co/DzhTbDR/600-cau-hoi17.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (18, N'Lý thuyết','https://i.ibb.co/nsnMyTM/600-cau-hoi18.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (19, N'Lý thuyết','https://i.ibb.co/kJ01Lgg/600-cau-hoi19.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (20, N'Lý thuyết','https://i.ibb.co/ZSyB0ZJ/600-cau-hoi20.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (21, N'Lý thuyết','https://i.ibb.co/31csqxG/600-cau-hoi21.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (22, N'Lý thuyết','https://i.ibb.co/3TbffHj/600-cau-hoi22.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (23, N'Lý thuyết','https://i.ibb.co/kx33PtV/600-cau-hoi23.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (24, N'Lý thuyết','https://i.ibb.co/WtShQQK/600-cau-hoi24.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (25, N'Lý thuyết','https://i.ibb.co/vVbzZQs/600-cau-hoi25.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (26, N'Lý thuyết','https://i.ibb.co/hV0swrT/600-cau-hoi26.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (27, N'Lý thuyết','https://i.ibb.co/Pjh9YbP/600-cau-hoi27.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (28, N'Lý thuyết','https://i.ibb.co/8s4QsFv/600-cau-hoi28.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (29, N'Lý thuyết','https://i.ibb.co/3Chtpyc/600-cau-hoi29.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (30, N'Lý thuyết','https://i.ibb.co/fShvBxs/600-cau-hoi30.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (31, N'Lý thuyết','https://i.ibb.co/7zr2gYD/600-cau-hoi31.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (32, N'Lý thuyết','https://i.ibb.co/p4rkTQ7/600-cau-hoi32.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (33, N'Lý thuyết','https://i.ibb.co/Sds6brt/600-cau-hoi33.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (34, N'Lý thuyết','https://i.ibb.co/NrxmDjS/600-cau-hoi34.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (35, N'Lý thuyết','https://i.ibb.co/PtDwzVz/600-cau-hoi35.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (36, N'Lý thuyết','https://i.ibb.co/TPrFJns/600-cau-hoi36.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (37, N'Lý thuyết','https://i.ibb.co/47nbmG6/600-cau-hoi37.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (38, N'Lý thuyết','https://i.ibb.co/3ddC3TD/600-cau-hoi38.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (39, N'Lý thuyết','https://i.ibb.co/PrDB1PN/600-cau-hoi39.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (40, N'Lý thuyết','https://i.ibb.co/3BVhkSc/600-cau-hoi40.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (41, N'Lý thuyết','https://i.ibb.co/WpW6tZ5/600-cau-hoi41.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (42, N'Lý thuyết','https://i.ibb.co/m4tgkZ8/600-cau-hoi42.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (43, N'Lý thuyết','https://i.ibb.co/6nc311D/600-cau-hoi43.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (44, N'Lý thuyết','https://i.ibb.co/GV6XbWR/600-cau-hoi44.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (45, N'Lý thuyết','https://i.ibb.co/y0HG2jH/600-cau-hoi45.jpg', 4, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (46, N'Lý thuyết','https://i.ibb.co/VmwYmRv/600-cau-hoi46.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (47, N'Lý thuyết','https://i.ibb.co/R9Stm8K/600-cau-hoi47.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (48, N'Lý thuyết','https://i.ibb.co/zRPYCvB/600-cau-hoi48.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (49, N'Lý thuyết','https://i.ibb.co/6FxjQYv/600-cau-hoi49.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (50, N'Lý thuyết','https://i.ibb.co/1vCKnTH/600-cau-hoi50.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (51, N'Lý thuyết','https://i.ibb.co/4P64qh1/600-cau-hoi51.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (52, N'Lý thuyết','https://i.ibb.co/ZM55T1j/600-cau-hoi52.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (53, N'Lý thuyết','https://i.ibb.co/NjCN6pS/600-cau-hoi53.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (54, N'Lý thuyết','https://i.ibb.co/SQzr3pF/600-cau-hoi54.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (55, N'Lý thuyết','https://i.ibb.co/H2Pt9YN/600-cau-hoi55.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (56, N'Lý thuyết','https://i.ibb.co/BB5kmsv/600-cau-hoi56.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (57, N'Lý thuyết','https://i.ibb.co/vJYg68T/600-cau-hoi57.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (58, N'Lý thuyết','https://i.ibb.co/68Twg9z/600-cau-hoi58.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (59, N'Lý thuyết','https://i.ibb.co/WGcPtcG/600-cau-hoi59.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (60, N'Lý thuyết','https://i.ibb.co/X38N3V2/600-cau-hoi60.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (61, N'Lý thuyết','https://i.ibb.co/k9q5XGB/600-cau-hoi61.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (62, N'Lý thuyết','https://i.ibb.co/7n1f1Zy/600-cau-hoi62.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (63, N'Lý thuyết','https://i.ibb.co/6HMQ1vf/600-cau-hoi63.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (64, N'Lý thuyết','https://i.ibb.co/R9NKmWk/600-cau-hoi64.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (65, N'Lý thuyết','https://i.ibb.co/PttSM9j/600-cau-hoi65.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (66, N'Lý thuyết','https://i.ibb.co/ZYqF984/600-cau-hoi66.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (67, N'Lý thuyết','https://i.ibb.co/J3hspXN/600-cau-hoi67.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (68, N'Lý thuyết','https://i.ibb.co/gVqWgHc/600-cau-hoi68.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (69, N'Lý thuyết','https://i.ibb.co/W5QQhSc/600-cau-hoi69.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (70, N'Lý thuyết','https://i.ibb.co/jw5hvvw/600-cau-hoi70.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (71, N'Lý thuyết','https://i.ibb.co/s3f41Ln/600-cau-hoi71.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (72, N'Lý thuyết','https://i.ibb.co/93mGCND/600-cau-hoi72.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (73, N'Lý thuyết','https://i.ibb.co/dDKWqkn/600-cau-hoi73.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (74, N'Lý thuyết','https://i.ibb.co/hWbpgvg/600-cau-hoi74.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (75, N'Lý thuyết','https://i.ibb.co/h7zvDK3/600-cau-hoi75.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (76, N'Lý thuyết','https://i.ibb.co/jwKHH6W/600-cau-hoi76.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (77, N'Lý thuyết','https://i.ibb.co/y6DBBWZ/600-cau-hoi77.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (78, N'Lý thuyết','https://i.ibb.co/zQ39fRS/600-cau-hoi78.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (79, N'Lý thuyết','https://i.ibb.co/bJbshH6/600-cau-hoi79.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (80, N'Lý thuyết','https://i.ibb.co/tZYJN9G/600-cau-hoi80.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (81, N'Lý thuyết','https://i.ibb.co/8P1VgR2/600-cau-hoi81.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (82, N'Lý thuyết','https://i.ibb.co/ZBBF3fZ/600-cau-hoi82.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (83, N'Lý thuyết','https://i.ibb.co/NCBDWp1/600-cau-hoi83.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (84, N'Lý thuyết','https://i.ibb.co/pQCw8pv/600-cau-hoi84.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (85, N'Lý thuyết','https://i.ibb.co/gM5Hjy9/600-cau-hoi85.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (86, N'Lý thuyết','https://i.ibb.co/bRx1W3T/600-cau-hoi86.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (87, N'Lý thuyết','https://i.ibb.co/MSzW2Hy/600-cau-hoi87.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (88, N'Lý thuyết','https://i.ibb.co/1q7BQpF/600-cau-hoi88.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (89, N'Lý thuyết','https://i.ibb.co/ZXvp46g/600-cau-hoi89.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (90, N'Lý thuyết','https://i.ibb.co/tcsgVFm/600-cau-hoi90.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (91, N'Lý thuyết','https://i.ibb.co/02MgsNY/600-cau-hoi91.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (92, N'Lý thuyết','https://i.ibb.co/CbpwFWx/600-cau-hoi92.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (93, N'Lý thuyết','https://i.ibb.co/T0xh6SC/600-cau-hoi93.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (94, N'Lý thuyết','https://i.ibb.co/cC6DxDw/600-cau-hoi94.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (95, N'Lý thuyết','https://i.ibb.co/RShtzwp/600-cau-hoi95.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (96, N'Lý thuyết','https://i.ibb.co/vXSTV49/600-cau-hoi96.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (97, N'Lý thuyết','https://i.ibb.co/YQtJ9hh/600-cau-hoi97.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (98, N'Lý thuyết','https://i.ibb.co/F7kxZRp/600-cau-hoi98.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (99, N'Lý thuyết','https://i.ibb.co/TTs61Bc/600-cau-hoi99.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (100, N'Lý thuyết','https://i.ibb.co/X5xbb76/600-cau-hoi100.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (101, N'Lý thuyết','https://i.ibb.co/7bshR5J/600-cau-hoi101.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (102, N'Lý thuyết','https://i.ibb.co/qy39fBj/600-cau-hoi102.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (103, N'Lý thuyết','https://i.ibb.co/fkCy4Kw/600-cau-hoi103.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (104, N'Lý thuyết','https://i.ibb.co/SycB513/600-cau-hoi104.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (105, N'Lý thuyết','https://i.ibb.co/23vz3hc/600-cau-hoi105.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (106, N'Lý thuyết','https://i.ibb.co/0FLWFrW/600-cau-hoi106.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (107, N'Lý thuyết','https://i.ibb.co/4jZ6BpG/600-cau-hoi107.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (108, N'Lý thuyết','https://i.ibb.co/nmt5kqs/600-cau-hoi108.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (109, N'Lý thuyết','https://i.ibb.co/r2MdwBx/600-cau-hoi109.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (110, N'Lý thuyết','https://i.ibb.co/NL5rKTN/600-cau-hoi110.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (111, N'Lý thuyết','https://i.ibb.co/mcHkWXT/600-cau-hoi111.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (112, N'Lý thuyết','https://i.ibb.co/P577Knd/600-cau-hoi112.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (113, N'Lý thuyết','https://i.ibb.co/b22NpZQ/600-cau-hoi113.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (114, N'Lý thuyết','https://i.ibb.co/vYGPZr2/600-cau-hoi114.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (115, N'Lý thuyết','https://i.ibb.co/fHZ3T1r/600-cau-hoi115.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (116, N'Lý thuyết','https://i.ibb.co/fnQxg91/600-cau-hoi116.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (117, N'Lý thuyết','https://i.ibb.co/DpFHDN4/600-cau-hoi117.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (118, N'Lý thuyết','https://i.ibb.co/W58qdVR/600-cau-hoi118.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (119, N'Lý thuyết','https://i.ibb.co/ygKhbzS/600-cau-hoi119.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (120, N'Lý thuyết','https://i.ibb.co/KDtDkFT/600-cau-hoi120.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (121, N'Lý thuyết','https://i.ibb.co/jL6F028/600-cau-hoi121.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (122, N'Lý thuyết','https://i.ibb.co/tMCN2SR/600-cau-hoi122.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (123, N'Lý thuyết','https://i.ibb.co/QYBdsc8/600-cau-hoi123.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (124, N'Lý thuyết','https://i.ibb.co/pjDwGXX/600-cau-hoi124.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (125, N'Lý thuyết','https://i.ibb.co/mTvrdrw/600-cau-hoi125.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (126, N'Lý thuyết','https://i.ibb.co/bzVfySR/600-cau-hoi126.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (127, N'Lý thuyết','https://i.ibb.co/GdszVsJ/600-cau-hoi127.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (128, N'Lý thuyết','https://i.ibb.co/CHc8TC6/600-cau-hoi128.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (129, N'Lý thuyết','https://i.ibb.co/4WtGgVT/600-cau-hoi129.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (130, N'Lý thuyết','https://i.ibb.co/Rjmd8V4/600-cau-hoi130.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (131, N'Lý thuyết','https://i.ibb.co/4g9tNZj/600-cau-hoi131.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (132, N'Lý thuyết','https://i.ibb.co/0YD6ww5/600-cau-hoi132.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (133, N'Lý thuyết','https://i.ibb.co/S3TVxDN/600-cau-hoi133.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (134, N'Lý thuyết','https://i.ibb.co/HpRvyW8/600-cau-hoi134.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (135, N'Lý thuyết','https://i.ibb.co/G2Hksw8/600-cau-hoi135.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (136, N'Lý thuyết','https://i.ibb.co/rxDp8SH/600-cau-hoi136.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (137, N'Lý thuyết','https://i.ibb.co/S0ZYKrv/600-cau-hoi137.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (138, N'Lý thuyết','https://i.ibb.co/kH18dV8/600-cau-hoi138.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (139, N'Lý thuyết','https://i.ibb.co/j8w780p/600-cau-hoi139.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (140, N'Lý thuyết','https://i.ibb.co/YkLKPpw/600-cau-hoi140.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (141, N'Lý thuyết','https://i.ibb.co/872jMB0/600-cau-hoi141.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (142, N'Lý thuyết','https://i.ibb.co/BcznG6D/600-cau-hoi142.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (143, N'Lý thuyết','https://i.ibb.co/Tgdf2Df/600-cau-hoi143.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (144, N'Lý thuyết','https://i.ibb.co/VtX16Y6/600-cau-hoi144.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (145, N'Lý thuyết','https://i.ibb.co/vYQCC8M/600-cau-hoi145.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (146, N'Lý thuyết','https://i.ibb.co/bs2fc9z/600-cau-hoi146.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (147, N'Lý thuyết','https://i.ibb.co/HqFS23m/600-cau-hoi147.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (148, N'Lý thuyết','https://i.ibb.co/vBnYH6v/600-cau-hoi148.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (149, N'Lý thuyết','https://i.ibb.co/0Xd8zKx/600-cau-hoi149.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (150, N'Lý thuyết','https://i.ibb.co/CvHDFVS/600-cau-hoi150.jpg', 4, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (151, N'Lý thuyết','https://i.ibb.co/SttVRJN/600-cau-hoi151.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (152, N'Lý thuyết','https://i.ibb.co/LJjdtW4/600-cau-hoi152.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (153, N'Lý thuyết','https://i.ibb.co/qdw3Wsy/600-cau-hoi153.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (154, N'Lý thuyết','https://i.ibb.co/f4cVK2k/600-cau-hoi154.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (155, N'Lý thuyết','https://i.ibb.co/Fq8Ft82/600-cau-hoi155.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (156, N'Lý thuyết','https://i.ibb.co/rpQFWpx/600-cau-hoi156.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (157, N'Lý thuyết','https://i.ibb.co/vJhCbS5/600-cau-hoi157.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (158, N'Lý thuyết','https://i.ibb.co/j3KcN82/600-cau-hoi158.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (159, N'Lý thuyết','https://i.ibb.co/61s6TQs/600-cau-hoi159.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (160, N'Lý thuyết','https://i.ibb.co/pr9CYGb/600-cau-hoi160.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (161, N'Lý thuyết','https://i.ibb.co/YywLkVg/600-cau-hoi161.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (162, N'Lý thuyết','https://i.ibb.co/n0khc0T/600-cau-hoi162.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (163, N'Lý thuyết','https://i.ibb.co/r7hpKgP/600-cau-hoi163.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (164, N'Lý thuyết','https://i.ibb.co/M5TDqG0/600-cau-hoi164.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (165, N'Lý thuyết','https://i.ibb.co/xhVffwx/600-cau-hoi165.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (166, N'Lý thuyết','https://i.ibb.co/ByTpqW8/600-cau-hoi166.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (167, N'Lý thuyết','https://i.ibb.co/ZHcjTdz/600-cau-hoi167.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (168, N'Lý thuyết','https://i.ibb.co/bPTwDHq/600-cau-hoi168.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (169, N'Lý thuyết','https://i.ibb.co/VjVmkDT/600-cau-hoi169.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (170, N'Lý thuyết','https://i.ibb.co/bQzVGfd/600-cau-hoi170.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (171, N'Lý thuyết','https://i.ibb.co/F6YmMHK/600-cau-hoi171.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (172, N'Lý thuyết','https://i.ibb.co/W6VvR4J/600-cau-hoi172.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (173, N'Lý thuyết','https://i.ibb.co/82kKJHk/600-cau-hoi173.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (174, N'Lý thuyết','https://i.ibb.co/26N3tg4/600-cau-hoi174.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (175, N'Lý thuyết','https://i.ibb.co/BK00g3F/600-cau-hoi175.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (176, N'Lý thuyết','https://i.ibb.co/GkKNWLM/600-cau-hoi176.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (177, N'Lý thuyết','https://i.ibb.co/dJqfnmV/600-cau-hoi177.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (178, N'Lý thuyết','https://i.ibb.co/DpmjSNr/600-cau-hoi178.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (179, N'Lý thuyết','https://i.ibb.co/pbFMYnn/600-cau-hoi179.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (180, N'Lý thuyết','https://i.ibb.co/bHhbGgF/600-cau-hoi180.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (181, N'Lý thuyết','https://i.ibb.co/g4d1tnh/600-cau-hoi181.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (182, N'Lý thuyết','https://i.ibb.co/GnBsKjy/600-cau-hoi182.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (183, N'Lý thuyết','https://i.ibb.co/KGSVryc/600-cau-hoi183.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (184, N'Lý thuyết','https://i.ibb.co/MszKByz/600-cau-hoi184.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (185, N'Lý thuyết','https://i.ibb.co/ZhzxFBL/600-cau-hoi185.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (186, N'Lý thuyết','https://i.ibb.co/D41wjRw/600-cau-hoi186.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (187, N'Lý thuyết','https://i.ibb.co/x6tjshq/600-cau-hoi187.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (188, N'Lý thuyết','https://i.ibb.co/k4B0gYK/600-cau-hoi188.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (189, N'Lý thuyết','https://i.ibb.co/3pq46xT/600-cau-hoi189.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (190, N'Lý thuyết','https://i.ibb.co/KGqQfV9/600-cau-hoi190.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (191, N'Lý thuyết','https://i.ibb.co/KsbzXQV/600-cau-hoi191.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (192, N'Lý thuyết','https://i.ibb.co/bdLR4qm/600-cau-hoi192.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (193, N'Lý thuyết','https://i.ibb.co/RQ43GDh/600-cau-hoi193.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (194, N'Lý thuyết','https://i.ibb.co/cXHNvMz/600-cau-hoi194.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (195, N'Lý thuyết','https://i.ibb.co/qrQkGJz/600-cau-hoi195.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (196, N'Lý thuyết','https://i.ibb.co/SmW3ynw/600-cau-hoi196.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (197, N'Lý thuyết','https://i.ibb.co/n6YWF0s/600-cau-hoi197.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (198, N'Lý thuyết','https://i.ibb.co/7nwx1dc/600-cau-hoi198.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (199, N'Lý thuyết','https://i.ibb.co/XVm1XYj/600-cau-hoi199.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (200, N'Lý thuyết','https://i.ibb.co/MD7qXvC/600-cau-hoi200.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (201, N'Lý thuyết','https://i.ibb.co/BwjpGNk/600-cau-hoi201.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (202, N'Lý thuyết','https://i.ibb.co/8KyMs54/600-cau-hoi202.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (203, N'Lý thuyết','https://i.ibb.co/H487T7k/600-cau-hoi203.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (204, N'Lý thuyết','https://i.ibb.co/ZJx03km/600-cau-hoi204.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (205, N'Lý thuyết','https://i.ibb.co/mH89S30/600-cau-hoi205.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (206, N'Lý thuyết','https://i.ibb.co/brnN2sC/600-cau-hoi206.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (207, N'Lý thuyết','https://i.ibb.co/n3xpgzX/600-cau-hoi207.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (208, N'Lý thuyết','https://i.ibb.co/vByzPyr/600-cau-hoi208.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (209, N'Lý thuyết','https://i.ibb.co/zmCX44r/600-cau-hoi209.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (210, N'Lý thuyết','https://i.ibb.co/yVwzB2y/600-cau-hoi210.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (211, N'Lý thuyết','https://i.ibb.co/XZLg68T/600-cau-hoi211.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (212, N'Lý thuyết','https://i.ibb.co/NSQLFdL/600-cau-hoi212.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (213, N'Lý thuyết','https://i.ibb.co/qL6vp49/600-cau-hoi213.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (214, N'Lý thuyết','https://i.ibb.co/jWp1ZRC/600-cau-hoi214.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (215, N'Lý thuyết','https://i.ibb.co/Vw9pr2R/600-cau-hoi215.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (216, N'Lý thuyết','https://i.ibb.co/Htw6r5z/600-cau-hoi216.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (217, N'Lý thuyết','https://i.ibb.co/GMMYH31/600-cau-hoi217.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (218, N'Lý thuyết','https://i.ibb.co/ZH45yLb/600-cau-hoi218.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (219, N'Lý thuyết','https://i.ibb.co/RCMvkgr/600-cau-hoi219.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (220, N'Lý thuyết','https://i.ibb.co/RCktg5p/600-cau-hoi220.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (221, N'Lý thuyết','https://i.ibb.co/M9qqWKn/600-cau-hoi221.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (222, N'Lý thuyết','https://i.ibb.co/71NWN4h/600-cau-hoi222.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (223, N'Lý thuyết','https://i.ibb.co/WvLXqgb/600-cau-hoi223.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (224, N'Lý thuyết','https://i.ibb.co/CHBZzB7/600-cau-hoi224.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (225, N'Lý thuyết','https://i.ibb.co/WFH857j/600-cau-hoi225.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (226, N'Lý thuyết','https://i.ibb.co/k2v20F5/600-cau-hoi226.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (227, N'Lý thuyết','https://i.ibb.co/KzFRb0g/600-cau-hoi227.jpg', 3, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (228, N'Lý thuyết','https://i.ibb.co/gPTKq18/600-cau-hoi228.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (229, N'Lý thuyết','https://i.ibb.co/pQMfYhm/600-cau-hoi229.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (230, N'Lý thuyết','https://i.ibb.co/YD8LSMf/600-cau-hoi230.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (231, N'Lý thuyết','https://i.ibb.co/HP5qPy4/600-cau-hoi231.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (232, N'Lý thuyết','https://i.ibb.co/0m2DFxy/600-cau-hoi232.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (233, N'Lý thuyết','https://i.ibb.co/H4zBk3c/600-cau-hoi233.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (234, N'Lý thuyết','https://i.ibb.co/BNHjXCz/600-cau-hoi234.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (235, N'Lý thuyết','https://i.ibb.co/c6SHJPr/600-cau-hoi235.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (236, N'Lý thuyết','https://i.ibb.co/Nx5kQ1g/600-cau-hoi236.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (237, N'Lý thuyết','https://i.ibb.co/xYq4L9n/600-cau-hoi237.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (238, N'Lý thuyết','https://i.ibb.co/f0KNs3Y/600-cau-hoi238.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (239, N'Lý thuyết','https://i.ibb.co/VvXwr3y/600-cau-hoi239.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (240, N'Lý thuyết','https://i.ibb.co/VjJQRsZ/600-cau-hoi240.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (241, N'Lý thuyết','https://i.ibb.co/D8YsRfS/600-cau-hoi241.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (242, N'Lý thuyết','https://i.ibb.co/27kRh8H/600-cau-hoi242.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (243, N'Lý thuyết','https://i.ibb.co/hd18cyw/600-cau-hoi243.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (244, N'Lý thuyết','https://i.ibb.co/zGd8n60/600-cau-hoi244.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (245, N'Lý thuyết','https://i.ibb.co/0rPCxF4/600-cau-hoi245.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (246, N'Lý thuyết','https://i.ibb.co/mtbydHs/600-cau-hoi246.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (247, N'Lý thuyết','https://i.ibb.co/ZV91Zhc/600-cau-hoi247.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (248, N'Lý thuyết','https://i.ibb.co/QCgz8qQ/600-cau-hoi248.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (249, N'Lý thuyết','https://i.ibb.co/VYfB5Lz/600-cau-hoi249.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (250, N'Lý thuyết','https://i.ibb.co/Kz4vFyt/600-cau-hoi250.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (251, N'Lý thuyết','https://i.ibb.co/Fw35m7W/600-cau-hoi251.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (252, N'Lý thuyết','https://i.ibb.co/XYNNkB1/600-cau-hoi252.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (253, N'Lý thuyết','https://i.ibb.co/g72HhLC/600-cau-hoi253.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (254, N'Lý thuyết','https://i.ibb.co/0nLB0Bx/600-cau-hoi254.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (255, N'Lý thuyết','https://i.ibb.co/9HC6y52/600-cau-hoi255.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (256, N'Lý thuyết','https://i.ibb.co/QjGyVw5/600-cau-hoi256.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (257, N'Lý thuyết','https://i.ibb.co/2hmf7mG/600-cau-hoi257.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (258, N'Lý thuyết','https://i.ibb.co/mcx2KJS/600-cau-hoi258.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (259, N'Lý thuyết','https://i.ibb.co/tPd0qgK/600-cau-hoi259.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (260, N'Lý thuyết','https://i.ibb.co/hs1PFK3/600-cau-hoi260.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (261, N'Lý thuyết','https://i.ibb.co/txZ2jC8/600-cau-hoi261.jpg', 1, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (262, N'Lý thuyết','https://i.ibb.co/tDBxjv5/600-cau-hoi262.jpg', 2, 1, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (263, N'Lý thuyết','https://i.ibb.co/2WGmZRR/600-cau-hoi263.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (264, N'Lý thuyết','https://i.ibb.co/FKGzP5j/600-cau-hoi264.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (265, N'Lý thuyết','https://i.ibb.co/zxS5gRj/600-cau-hoi265.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (266, N'Lý thuyết','https://i.ibb.co/CvqSqMW/600-cau-hoi266.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (267, N'Lý thuyết','https://i.ibb.co/G22Vnd0/600-cau-hoi267.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (268, N'Lý thuyết','https://i.ibb.co/mGYTkf6/600-cau-hoi268.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (269, N'Lý thuyết','https://i.ibb.co/d2JXL6b/600-cau-hoi269.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (270, N'Lý thuyết','https://i.ibb.co/n1dgmQq/600-cau-hoi270.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (271, N'Lý thuyết','https://i.ibb.co/7QgWnkt/600-cau-hoi271.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (272, N'Lý thuyết','https://i.ibb.co/ySgjmC5/600-cau-hoi272.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (273, N'Lý thuyết','https://i.ibb.co/Y2PqkQy/600-cau-hoi273.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (274, N'Lý thuyết','https://i.ibb.co/hc8spgc/600-cau-hoi274.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (275, N'Lý thuyết','https://i.ibb.co/Q6vgXvq/600-cau-hoi275.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (276, N'Lý thuyết','https://i.ibb.co/L6DjSpP/600-cau-hoi276.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (277, N'Lý thuyết','https://i.ibb.co/tMX7W28/600-cau-hoi277.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (278, N'Lý thuyết','https://i.ibb.co/r3z0h4m/600-cau-hoi278.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (279, N'Lý thuyết','https://i.ibb.co/NFQgJbz/600-cau-hoi279.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (280, N'Lý thuyết','https://i.ibb.co/cNY5gwb/600-cau-hoi280.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (281, N'Lý thuyết','https://i.ibb.co/VN7PFjQ/600-cau-hoi281.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (282, N'Lý thuyết','https://i.ibb.co/LCVX15k/600-cau-hoi282.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (283, N'Lý thuyết','https://i.ibb.co/6BKG2vy/600-cau-hoi283.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (284, N'Lý thuyết','https://i.ibb.co/v3ffymH/600-cau-hoi284.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (285, N'Lý thuyết','https://i.ibb.co/TKJjByV/600-cau-hoi285.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (286, N'Lý thuyết','https://i.ibb.co/6WFVdnK/600-cau-hoi286.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (287, N'Lý thuyết','https://i.ibb.co/WF5BmTn/600-cau-hoi287.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (288, N'Lý thuyết','https://i.ibb.co/NWTVNTw/600-cau-hoi288.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (289, N'Lý thuyết','https://i.ibb.co/LrQpfbF/600-cau-hoi289.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (290, N'Lý thuyết','https://i.ibb.co/k8QGXbh/600-cau-hoi290.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (291, N'Lý thuyết','https://i.ibb.co/3F2qz8C/600-cau-hoi291.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (292, N'Lý thuyết','https://i.ibb.co/1LcqWqb/600-cau-hoi292.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (293, N'Lý thuyết','https://i.ibb.co/wsS9ydg/600-cau-hoi293.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (294, N'Lý thuyết','https://i.ibb.co/Ht5DMS1/600-cau-hoi294.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (295, N'Lý thuyết','https://i.ibb.co/3SqrpDw/600-cau-hoi295.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (296, N'Lý thuyết','https://i.ibb.co/tDkZ312/600-cau-hoi296.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (297, N'Lý thuyết','https://i.ibb.co/KyXHWNp/600-cau-hoi297.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (298, N'Lý thuyết','https://i.ibb.co/mTBFbQN/600-cau-hoi298.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (299, N'Lý thuyết','https://i.ibb.co/3TGfW5L/600-cau-hoi299.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (300, N'Lý thuyết','https://i.ibb.co/qnKB99G/600-cau-hoi300.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (301, N'Lý thuyết','https://i.ibb.co/cQq7fqG/600-cau-hoi301.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (302, N'Lý thuyết','https://i.ibb.co/jgn6qqF/600-cau-hoi302.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (303, N'Lý thuyết','https://i.ibb.co/cxGcspJ/600-cau-hoi303.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (304, N'Lý thuyết','https://i.ibb.co/DKzfKcr/600-cau-hoi304.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (305, N'Lý thuyết','https://i.ibb.co/DfBFw3P/600-cau-hoi305.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (306, N'Lý thuyết','https://i.ibb.co/NKx8Cj9/600-cau-hoi306.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (307, N'Lý thuyết','https://i.ibb.co/tLLbJwB/600-cau-hoi307.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (308, N'Lý thuyết','https://i.ibb.co/yhGkT49/600-cau-hoi308.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (309, N'Lý thuyết','https://i.ibb.co/7zX32F6/600-cau-hoi309.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (310, N'Lý thuyết','https://i.ibb.co/tQQtgq0/600-cau-hoi310.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (311, N'Lý thuyết','https://i.ibb.co/r2JMVkR/600-cau-hoi311.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (312, N'Lý thuyết','https://i.ibb.co/3BxkpsS/600-cau-hoi312.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (313, N'Lý thuyết','https://i.ibb.co/b6sHjcn/600-cau-hoi313.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (314, N'Lý thuyết','https://i.ibb.co/dG20Y6j/600-cau-hoi314.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (315, N'Lý thuyết','https://i.ibb.co/Dw92HZF/600-cau-hoi315.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (316, N'Lý thuyết','https://i.ibb.co/RPsGhPn/600-cau-hoi316.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (317, N'Lý thuyết','https://i.ibb.co/hLMgjc7/600-cau-hoi317.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (318, N'Lý thuyết','https://i.ibb.co/mSVMBqm/600-cau-hoi318.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (319, N'Lý thuyết','https://i.ibb.co/X8pSNGR/600-cau-hoi319.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (320, N'Lý thuyết','https://i.ibb.co/zhSW7yL/600-cau-hoi320.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (321, N'Lý thuyết','https://i.ibb.co/xM3mQ4n/600-cau-hoi321.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (322, N'Lý thuyết','https://i.ibb.co/stSRkyL/600-cau-hoi322.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (323, N'Lý thuyết','https://i.ibb.co/CtBZ42R/600-cau-hoi323.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (324, N'Lý thuyết','https://i.ibb.co/52NrYWZ/600-cau-hoi324.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (325, N'Lý thuyết','https://i.ibb.co/H7vgf3T/600-cau-hoi325.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (326, N'Lý thuyết','https://i.ibb.co/WNCWybn/600-cau-hoi326.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (327, N'Lý thuyết','https://i.ibb.co/Z6q89s6/600-cau-hoi327.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (328, N'Lý thuyết','https://i.ibb.co/x70ddNm/600-cau-hoi328.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (329, N'Lý thuyết','https://i.ibb.co/PmM4mQf/600-cau-hoi329.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (330, N'Lý thuyết','https://i.ibb.co/GJpQYWT/600-cau-hoi330.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (331, N'Lý thuyết','https://i.ibb.co/kgWvCvr/600-cau-hoi331.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (332, N'Lý thuyết','https://i.ibb.co/tLzcNyV/600-cau-hoi332.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (333, N'Lý thuyết','https://i.ibb.co/cNp52hf/600-cau-hoi333.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (334, N'Lý thuyết','https://i.ibb.co/WVHNMK0/600-cau-hoi334.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (335, N'Lý thuyết','https://i.ibb.co/SQJxSfr/600-cau-hoi335.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (336, N'Lý thuyết','https://i.ibb.co/qmZP7zn/600-cau-hoi336.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (337, N'Lý thuyết','https://i.ibb.co/5njp9FX/600-cau-hoi337.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (338, N'Lý thuyết','https://i.ibb.co/vzJvPXM/600-cau-hoi338.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (339, N'Lý thuyết','https://i.ibb.co/PDY1t44/600-cau-hoi339.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (340, N'Lý thuyết','https://i.ibb.co/cvM2p77/600-cau-hoi340.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (341, N'Lý thuyết','https://i.ibb.co/yBDSH42/600-cau-hoi341.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (342, N'Lý thuyết','https://i.ibb.co/YcqnSWQ/600-cau-hoi342.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (343, N'Lý thuyết','https://i.ibb.co/Xjw9hCs/600-cau-hoi343.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (344, N'Lý thuyết','https://i.ibb.co/b53GpQR/600-cau-hoi344.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (345, N'Lý thuyết','https://i.ibb.co/CVB6D3Z/600-cau-hoi345.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (346, N'Lý thuyết','https://i.ibb.co/Qkjn0YW/600-cau-hoi346.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (347, N'Lý thuyết','https://i.ibb.co/m64XN6F/600-cau-hoi347.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (348, N'Lý thuyết','https://i.ibb.co/Dp8Pqr8/600-cau-hoi348.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (349, N'Lý thuyết','https://i.ibb.co/kcDdpk3/600-cau-hoi349.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (350, N'Lý thuyết','https://i.ibb.co/84yjGW5/600-cau-hoi350.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (351, N'Lý thuyết','https://i.ibb.co/wCP47R8/600-cau-hoi351.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (352, N'Lý thuyết','https://i.ibb.co/LS0N0VH/600-cau-hoi352.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (353, N'Lý thuyết','https://i.ibb.co/jfQDjYY/600-cau-hoi353.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (354, N'Lý thuyết','https://i.ibb.co/ct8cn7z/600-cau-hoi354.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (355, N'Lý thuyết','https://i.ibb.co/p3n4Ypk/600-cau-hoi355.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (356, N'Lý thuyết','https://i.ibb.co/yhdb7HL/600-cau-hoi356.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (357, N'Lý thuyết','https://i.ibb.co/SwWwqLF/600-cau-hoi357.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (358, N'Lý thuyết','https://i.ibb.co/mtXvNXt/600-cau-hoi358.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (359, N'Lý thuyết','https://i.ibb.co/NywjtgS/600-cau-hoi359.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (360, N'Lý thuyết','https://i.ibb.co/SrjL5F4/600-cau-hoi360.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (361, N'Lý thuyết','https://i.ibb.co/xY8WDnN/600-cau-hoi361.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (362, N'Lý thuyết','https://i.ibb.co/F42kdnZ/600-cau-hoi362.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (363, N'Lý thuyết','https://i.ibb.co/XZjdhxp/600-cau-hoi363.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (364, N'Lý thuyết','https://i.ibb.co/6n86WZr/600-cau-hoi364.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (365, N'Lý thuyết','https://i.ibb.co/9czmxFz/600-cau-hoi365.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (366, N'Lý thuyết','https://i.ibb.co/c8vG04y/600-cau-hoi366.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (367, N'Lý thuyết','https://i.ibb.co/fv7gJbv/600-cau-hoi367.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (368, N'Lý thuyết','https://i.ibb.co/fprQ2vN/600-cau-hoi368.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (369, N'Lý thuyết','https://i.ibb.co/wdXMYhT/600-cau-hoi369.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (370, N'Lý thuyết','https://i.ibb.co/WVzGSTT/600-cau-hoi370.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (371, N'Lý thuyết','https://i.ibb.co/0C2FmHj/600-cau-hoi371.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (372, N'Lý thuyết','https://i.ibb.co/6vw1Gny/600-cau-hoi372.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (373, N'Lý thuyết','https://i.ibb.co/g6Wrjjb/600-cau-hoi373.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (374, N'Lý thuyết','https://i.ibb.co/xS3Wmsx/600-cau-hoi374.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (375, N'Lý thuyết','https://i.ibb.co/SvLR7sP/600-cau-hoi375.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (376, N'Lý thuyết','https://i.ibb.co/mS5smSS/600-cau-hoi376.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (377, N'Lý thuyết','https://i.ibb.co/GWNJvF6/600-cau-hoi377.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (378, N'Lý thuyết','https://i.ibb.co/HxXjKpY/600-cau-hoi378.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (379, N'Lý thuyết','https://i.ibb.co/M1tK2SN/600-cau-hoi379.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (380, N'Lý thuyết','https://i.ibb.co/WzJMTQB/600-cau-hoi380.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (381, N'Lý thuyết','https://i.ibb.co/BnmL9XW/600-cau-hoi381.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (382, N'Lý thuyết','https://i.ibb.co/q5Xx619/600-cau-hoi382.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (383, N'Lý thuyết','https://i.ibb.co/DV0fGmR/600-cau-hoi383.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (384, N'Lý thuyết','https://i.ibb.co/0Jd77NG/600-cau-hoi384.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (385, N'Lý thuyết','https://i.ibb.co/WyCtY3K/600-cau-hoi385.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (386, N'Lý thuyết','https://i.ibb.co/Zfhkf17/600-cau-hoi386.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (387, N'Lý thuyết','https://i.ibb.co/4M1ywJf/600-cau-hoi387.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (388, N'Lý thuyết','https://i.ibb.co/PtNqKGs/600-cau-hoi388.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (389, N'Lý thuyết','https://i.ibb.co/fGVgshf/600-cau-hoi389.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (390, N'Lý thuyết','https://i.ibb.co/m5m6jsq/600-cau-hoi390.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (391, N'Lý thuyết','https://i.ibb.co/1vNQTyp/600-cau-hoi391.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (392, N'Lý thuyết','https://i.ibb.co/Jq3c3Q1/600-cau-hoi392.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (393, N'Lý thuyết','https://i.ibb.co/PNzS8Lc/600-cau-hoi393.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (394, N'Lý thuyết','https://i.ibb.co/5k7L1zD/600-cau-hoi394.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (395, N'Lý thuyết','https://i.ibb.co/ggCRpWt/600-cau-hoi395.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (396, N'Lý thuyết','https://i.ibb.co/BPYN8CW/600-cau-hoi396.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (397, N'Lý thuyết','https://i.ibb.co/c8jVMdb/600-cau-hoi397.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (398, N'Lý thuyết','https://i.ibb.co/zNjXtS6/600-cau-hoi398.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (399, N'Lý thuyết','https://i.ibb.co/XyDDhGD/600-cau-hoi399.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (400, N'Lý thuyết','https://i.ibb.co/BGCnRqd/600-cau-hoi400.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (401, N'Lý thuyết','https://i.ibb.co/6yZyGbY/600-cau-hoi401.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (402, N'Lý thuyết','https://i.ibb.co/w0T7nfd/600-cau-hoi402.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (403, N'Lý thuyết','https://i.ibb.co/4WYMjqh/600-cau-hoi403.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (404, N'Lý thuyết','https://i.ibb.co/BGv2Jbv/600-cau-hoi404.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (405, N'Lý thuyết','https://i.ibb.co/rpKQvTW/600-cau-hoi405.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (406, N'Lý thuyết','https://i.ibb.co/FY1dS1t/600-cau-hoi406.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (407, N'Lý thuyết','https://i.ibb.co/GWJ5TJb/600-cau-hoi407.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (408, N'Lý thuyết','https://i.ibb.co/RhSD5qR/600-cau-hoi408.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (409, N'Lý thuyết','https://i.ibb.co/3spZXc7/600-cau-hoi409.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (410, N'Lý thuyết','https://i.ibb.co/0XKXX67/600-cau-hoi410.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (411, N'Lý thuyết','https://i.ibb.co/S7XwBf0/600-cau-hoi411.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (412, N'Lý thuyết','https://i.ibb.co/QbVzwX6/600-cau-hoi412.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (413, N'Lý thuyết','https://i.ibb.co/vz5cH3b/600-cau-hoi413.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (414, N'Lý thuyết','https://i.ibb.co/7kx1M1F/600-cau-hoi414.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (415, N'Lý thuyết','https://i.ibb.co/568V2B9/600-cau-hoi415.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (416, N'Lý thuyết','https://i.ibb.co/5vHT52B/600-cau-hoi416.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (417, N'Lý thuyết','https://i.ibb.co/1QwTcFf/600-cau-hoi417.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (418, N'Lý thuyết','https://i.ibb.co/bJdBt6Y/600-cau-hoi418.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (419, N'Lý thuyết','https://i.ibb.co/sRNZCVH/600-cau-hoi419.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (420, N'Lý thuyết','https://i.ibb.co/NmjzqRw/600-cau-hoi420.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (421, N'Lý thuyết','https://i.ibb.co/7QZNxgF/600-cau-hoi421.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (422, N'Lý thuyết','https://i.ibb.co/JmNqgdR/600-cau-hoi422.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (423, N'Lý thuyết','https://i.ibb.co/vwD32rw/600-cau-hoi423.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (424, N'Lý thuyết','https://i.ibb.co/sFtfFtt/600-cau-hoi424.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (425, N'Lý thuyết','https://i.ibb.co/XjLkG9r/600-cau-hoi425.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (426, N'Lý thuyết','https://i.ibb.co/JrRJY2d/600-cau-hoi426.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (427, N'Lý thuyết','https://i.ibb.co/jgzsVKV/600-cau-hoi427.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (428, N'Lý thuyết','https://i.ibb.co/Cbcvw4S/600-cau-hoi428.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (429, N'Lý thuyết','https://i.ibb.co/1vkW5gj/600-cau-hoi429.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (430, N'Lý thuyết','https://i.ibb.co/kqZjTqF/600-cau-hoi430.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (431, N'Lý thuyết','https://i.ibb.co/mJSqzc3/600-cau-hoi431.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (432, N'Lý thuyết','https://i.ibb.co/z6zgFZk/600-cau-hoi432.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (433, N'Lý thuyết','https://i.ibb.co/RcqzvG1/600-cau-hoi433.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (434, N'Lý thuyết','https://i.ibb.co/SvZbn9r/600-cau-hoi434.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (435, N'Lý thuyết','https://i.ibb.co/CKkLS1N/600-cau-hoi435.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (436, N'Lý thuyết','https://i.ibb.co/xjWHFC6/600-cau-hoi436.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (437, N'Lý thuyết','https://i.ibb.co/Hdr7qQt/600-cau-hoi437.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (438, N'Lý thuyết','https://i.ibb.co/rH7KhxN/600-cau-hoi438.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (439, N'Lý thuyết','https://i.ibb.co/Jpy0VTq/600-cau-hoi439.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (440, N'Lý thuyết','https://i.ibb.co/1Rv3Mwc/600-cau-hoi440.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (441, N'Lý thuyết','https://i.ibb.co/wCdVByQ/600-cau-hoi441.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (442, N'Lý thuyết','https://i.ibb.co/ccfdGWJ/600-cau-hoi442.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (443, N'Lý thuyết','https://i.ibb.co/r0L9r9H/600-cau-hoi443.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (444, N'Lý thuyết','https://i.ibb.co/CKwfxBJ/600-cau-hoi444.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (445, N'Lý thuyết','https://i.ibb.co/LxW2pZM/600-cau-hoi445.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (446, N'Lý thuyết','https://i.ibb.co/sKgdB8y/600-cau-hoi446.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (447, N'Lý thuyết','https://i.ibb.co/WvvnHDj/600-cau-hoi447.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (448, N'Lý thuyết','https://i.ibb.co/gmg5w8r/600-cau-hoi448.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (449, N'Lý thuyết','https://i.ibb.co/7SM7cDV/600-cau-hoi449.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (450, N'Lý thuyết','https://i.ibb.co/7xh30yg/600-cau-hoi450.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (451, N'Lý thuyết','https://i.ibb.co/gms1nJb/600-cau-hoi451.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (452, N'Lý thuyết','https://i.ibb.co/VBG3Q23/600-cau-hoi452.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (453, N'Lý thuyết','https://i.ibb.co/y5gw0xr/600-cau-hoi453.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (454, N'Lý thuyết','https://i.ibb.co/gS1HX3J/600-cau-hoi454.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (455, N'Lý thuyết','https://i.ibb.co/vLDLgCq/600-cau-hoi455.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (456, N'Lý thuyết','https://i.ibb.co/Krxxf4m/600-cau-hoi456.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (457, N'Lý thuyết','https://i.ibb.co/J58ynTR/600-cau-hoi457.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (458, N'Lý thuyết','https://i.ibb.co/tBVC0Jc/600-cau-hoi458.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (459, N'Lý thuyết','https://i.ibb.co/HNnjJqD/600-cau-hoi459.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (460, N'Lý thuyết','https://i.ibb.co/Ct3x9vW/600-cau-hoi460.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (461, N'Lý thuyết','https://i.ibb.co/vYq3gmF/600-cau-hoi461.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (462, N'Lý thuyết','https://i.ibb.co/8sZdwsD/600-cau-hoi462.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (463, N'Lý thuyết','https://i.ibb.co/4Wr7zCY/600-cau-hoi463.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (464, N'Lý thuyết','https://i.ibb.co/mJrPz5K/600-cau-hoi464.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (465, N'Lý thuyết','https://i.ibb.co/7YPTQzv/600-cau-hoi465.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (466, N'Lý thuyết','https://i.ibb.co/6bVfB9Z/600-cau-hoi466.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (467, N'Lý thuyết','https://i.ibb.co/F0gt3RN/600-cau-hoi467.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (468, N'Lý thuyết','https://i.ibb.co/wcMZkB9/600-cau-hoi468.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (469, N'Lý thuyết','https://i.ibb.co/xLqK8Rv/600-cau-hoi469.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (470, N'Lý thuyết','https://i.ibb.co/9Yh7qjg/600-cau-hoi470.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (471, N'Lý thuyết','https://i.ibb.co/qnk85Kt/600-cau-hoi471.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (472, N'Lý thuyết','https://i.ibb.co/3N9vjKV/600-cau-hoi472.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (473, N'Lý thuyết','https://i.ibb.co/TKDxCqK/600-cau-hoi473.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (474, N'Lý thuyết','https://i.ibb.co/TT5Qh3s/600-cau-hoi474.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (475, N'Lý thuyết','https://i.ibb.co/KqsZRjC/600-cau-hoi475.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (476, N'Lý thuyết','https://i.ibb.co/9rrmd2q/600-cau-hoi476.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (477, N'Lý thuyết','https://i.ibb.co/J3h3HmK/600-cau-hoi477.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (478, N'Lý thuyết','https://i.ibb.co/9nyxRKb/600-cau-hoi478.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (479, N'Lý thuyết','https://i.ibb.co/B4rz1x9/600-cau-hoi479.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (480, N'Lý thuyết','https://i.ibb.co/6sGDxXb/600-cau-hoi480.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (481, N'Lý thuyết','https://i.ibb.co/z273zq3/600-cau-hoi481.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (482, N'Lý thuyết','https://i.ibb.co/sySB4Zk/600-cau-hoi482.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (483, N'Lý thuyết','https://i.ibb.co/dpyPstC/600-cau-hoi483.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (484, N'Lý thuyết','https://i.ibb.co/gV974LG/600-cau-hoi484.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (485, N'Lý thuyết','https://i.ibb.co/TBckqTK/600-cau-hoi485.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (486, N'Lý thuyết','https://i.ibb.co/QHYVt85/600-cau-hoi486.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (487, N'Lý thuyết','https://i.ibb.co/LPbDcNz/600-cau-hoi487.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (488, N'Lý thuyết','https://i.ibb.co/94MGMf2/600-cau-hoi488.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (489, N'Lý thuyết','https://i.ibb.co/R4hy9g5/600-cau-hoi489.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (490, N'Lý thuyết','https://i.ibb.co/1f3PwrB/600-cau-hoi490.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (491, N'Lý thuyết','https://i.ibb.co/WKx2vvv/600-cau-hoi491.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (492, N'Lý thuyết','https://i.ibb.co/LtY68D6/600-cau-hoi492.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (493, N'Lý thuyết','https://i.ibb.co/bHCw498/600-cau-hoi493.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (494, N'Lý thuyết','https://i.ibb.co/FDJLX0t/600-cau-hoi494.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (495, N'Lý thuyết','https://i.ibb.co/djPS2LW/600-cau-hoi495.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (496, N'Lý thuyết','https://i.ibb.co/VwtYkqP/600-cau-hoi496.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (497, N'Lý thuyết','https://i.ibb.co/pxZt0PT/600-cau-hoi497.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (498, N'Lý thuyết','https://i.ibb.co/HVb9yY6/600-cau-hoi498.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (499, N'Lý thuyết','https://i.ibb.co/4TysKzx/600-cau-hoi499.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (500, N'Lý thuyết','https://i.ibb.co/8jfTNky/600-cau-hoi500.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (501, N'Lý thuyết','https://i.ibb.co/0V0RjGS/600-cau-hoi501.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (502, N'Lý thuyết','https://i.ibb.co/XYgWNkY/600-cau-hoi502.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (503, N'Lý thuyết','https://i.ibb.co/LYbTQpm/600-cau-hoi503.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (504, N'Lý thuyết','https://i.ibb.co/23vbFys/600-cau-hoi504.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (505, N'Lý thuyết','https://i.ibb.co/F6mtZVk/600-cau-hoi505.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (506, N'Lý thuyết','https://i.ibb.co/5hbq8Cs/600-cau-hoi506.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (507, N'Lý thuyết','https://i.ibb.co/DCq1dmL/600-cau-hoi507.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (508, N'Lý thuyết','https://i.ibb.co/RggCt0j/600-cau-hoi508.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (509, N'Lý thuyết','https://i.ibb.co/J5N5p4W/600-cau-hoi509.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (510, N'Lý thuyết','https://i.ibb.co/TrDf4n0/600-cau-hoi510.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (511, N'Lý thuyết','https://i.ibb.co/k9jK7Wc/600-cau-hoi511.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (512, N'Lý thuyết','https://i.ibb.co/7tTd1jd/600-cau-hoi512.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (513, N'Lý thuyết','https://i.ibb.co/LZ8z8z7/600-cau-hoi513.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (514, N'Lý thuyết','https://i.ibb.co/41y8sHq/600-cau-hoi514.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (515, N'Lý thuyết','https://i.ibb.co/Yd81s1Q/600-cau-hoi515.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (516, N'Lý thuyết','https://i.ibb.co/9vnSCgs/600-cau-hoi516.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (517, N'Lý thuyết','https://i.ibb.co/80Y3RNW/600-cau-hoi517.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (518, N'Lý thuyết','https://i.ibb.co/fpqfG7d/600-cau-hoi518.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (519, N'Lý thuyết','https://i.ibb.co/2KKnPh9/600-cau-hoi519.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (520, N'Lý thuyết','https://i.ibb.co/K7z1bp7/600-cau-hoi520.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (521, N'Lý thuyết','https://i.ibb.co/Hty4M9x/600-cau-hoi521.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (522, N'Lý thuyết','https://i.ibb.co/1vz0RnD/600-cau-hoi522.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (523, N'Lý thuyết','https://i.ibb.co/xHK0rkj/600-cau-hoi523.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (524, N'Lý thuyết','https://i.ibb.co/tPyFfCz/600-cau-hoi524.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (525, N'Lý thuyết','https://i.ibb.co/QkcVJFC/600-cau-hoi525.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (526, N'Lý thuyết','https://i.ibb.co/T1yP7dD/600-cau-hoi526.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (527, N'Lý thuyết','https://i.ibb.co/swpYdqX/600-cau-hoi527.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (528, N'Lý thuyết','https://i.ibb.co/NNgBjzP/600-cau-hoi528.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (529, N'Lý thuyết','https://i.ibb.co/z446Fnc/600-cau-hoi529.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (530, N'Lý thuyết','https://i.ibb.co/KqxsLpj/600-cau-hoi530.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (531, N'Lý thuyết','https://i.ibb.co/pzVzwh2/600-cau-hoi531.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (532, N'Lý thuyết','https://i.ibb.co/WvcRBnF/600-cau-hoi532.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (533, N'Lý thuyết','https://i.ibb.co/S71pgNL/600-cau-hoi533.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (534, N'Lý thuyết','https://i.ibb.co/ChshDvr/600-cau-hoi534.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (535, N'Lý thuyết','https://i.ibb.co/j4tWDBM/600-cau-hoi535.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (536, N'Lý thuyết','https://i.ibb.co/bvzKLk7/600-cau-hoi536.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (537, N'Lý thuyết','https://i.ibb.co/8xc4d8P/600-cau-hoi537.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (538, N'Lý thuyết','https://i.ibb.co/2vTL79V/600-cau-hoi538.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (539, N'Lý thuyết','https://i.ibb.co/hgHkBQk/600-cau-hoi539.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (540, N'Lý thuyết','https://i.ibb.co/D8dpwFg/600-cau-hoi540.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (541, N'Lý thuyết','https://i.ibb.co/k5QXSrP/600-cau-hoi541.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (542, N'Lý thuyết','https://i.ibb.co/gVmq5Rs/600-cau-hoi542.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (543, N'Lý thuyết','https://i.ibb.co/ZGNZ5f6/600-cau-hoi543.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (544, N'Lý thuyết','https://i.ibb.co/b3TQ0T6/600-cau-hoi544.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (545, N'Lý thuyết','https://i.ibb.co/JtFZxTS/600-cau-hoi545.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (546, N'Lý thuyết','https://i.ibb.co/tHRN3Nk/600-cau-hoi546.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (547, N'Lý thuyết','https://i.ibb.co/mGDYY1Z/600-cau-hoi547.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (548, N'Lý thuyết','https://i.ibb.co/pKs2b6T/600-cau-hoi548.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (549, N'Lý thuyết','https://i.ibb.co/xYwx9Xd/600-cau-hoi549.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (550, N'Lý thuyết','https://i.ibb.co/L199xLd/600-cau-hoi550.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (551, N'Lý thuyết','https://i.ibb.co/bP8vWnZ/600-cau-hoi551.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (552, N'Lý thuyết','https://i.ibb.co/hWFyG2N/600-cau-hoi552.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (553, N'Lý thuyết','https://i.ibb.co/rwHDb63/600-cau-hoi553.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (554, N'Lý thuyết','https://i.ibb.co/QrWXJqX/600-cau-hoi554.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (555, N'Lý thuyết','https://i.ibb.co/DG4N4z3/600-cau-hoi555.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (556, N'Lý thuyết','https://i.ibb.co/YNcDp7Z/600-cau-hoi556.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (557, N'Lý thuyết','https://i.ibb.co/Wz8FtvV/600-cau-hoi557.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (558, N'Lý thuyết','https://i.ibb.co/mzptWJD/600-cau-hoi558.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (559, N'Lý thuyết','https://i.ibb.co/ZNPht29/600-cau-hoi559.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (560, N'Lý thuyết','https://i.ibb.co/27MLdzC/600-cau-hoi560.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (561, N'Lý thuyết','https://i.ibb.co/q97TB1G/600-cau-hoi561.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (562, N'Lý thuyết','https://i.ibb.co/M2kNPMq/600-cau-hoi562.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (563, N'Lý thuyết','https://i.ibb.co/dktprFw/600-cau-hoi563.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (564, N'Lý thuyết','https://i.ibb.co/tL11ZsQ/600-cau-hoi564.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (565, N'Lý thuyết','https://i.ibb.co/9W1QmDw/600-cau-hoi565.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (566, N'Lý thuyết','https://i.ibb.co/Jj4ryWQ/600-cau-hoi566.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (567, N'Lý thuyết','https://i.ibb.co/mFS0037/600-cau-hoi567.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (568, N'Lý thuyết','https://i.ibb.co/vqFk5tp/600-cau-hoi568.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (569, N'Lý thuyết','https://i.ibb.co/85tHncg/600-cau-hoi569.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (570, N'Lý thuyết','https://i.ibb.co/Zf6jCNd/600-cau-hoi570.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (571, N'Lý thuyết','https://i.ibb.co/hMZhnZ3/600-cau-hoi571.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (572, N'Lý thuyết','https://i.ibb.co/yXPnx4Y/600-cau-hoi572.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (573, N'Lý thuyết','https://i.ibb.co/MG8FMjM/600-cau-hoi573.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (574, N'Lý thuyết','https://i.ibb.co/SwxPn4k/600-cau-hoi574.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (575, N'Lý thuyết','https://i.ibb.co/Nx89G5B/600-cau-hoi575.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (576, N'Lý thuyết','https://i.ibb.co/D142WtX/600-cau-hoi576.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (577, N'Lý thuyết','https://i.ibb.co/sVGzcNG/600-cau-hoi577.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (578, N'Lý thuyết','https://i.ibb.co/KhH822n/600-cau-hoi578.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (579, N'Lý thuyết','https://i.ibb.co/py22xhH/600-cau-hoi579.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (580, N'Lý thuyết','https://i.ibb.co/1bShdmC/600-cau-hoi580.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (581, N'Lý thuyết','https://i.ibb.co/hsSXZRv/600-cau-hoi581.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (582, N'Lý thuyết','https://i.ibb.co/VmmN7kn/600-cau-hoi582.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (583, N'Lý thuyết','https://i.ibb.co/qkXjGrq/600-cau-hoi583.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (584, N'Lý thuyết','https://i.ibb.co/vd1ZhCQ/600-cau-hoi584.jpg', 4, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (585, N'Lý thuyết','https://i.ibb.co/41X2mX0/600-cau-hoi585.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (586, N'Lý thuyết','https://i.ibb.co/Npwghwd/600-cau-hoi586.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (587, N'Lý thuyết','https://i.ibb.co/JknXBGg/600-cau-hoi587.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (588, N'Lý thuyết','https://i.ibb.co/7V5yzCG/600-cau-hoi588.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (589, N'Lý thuyết','https://i.ibb.co/4jk6sYM/600-cau-hoi589.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (590, N'Lý thuyết','https://i.ibb.co/mBP2c6Q/600-cau-hoi590.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (591, N'Lý thuyết','https://i.ibb.co/RcgWCzc/600-cau-hoi591.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (592, N'Lý thuyết','https://i.ibb.co/MBKf5Np/600-cau-hoi592.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (593, N'Lý thuyết','https://i.ibb.co/1QtBjXs/600-cau-hoi593.jpg', 3, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (594, N'Lý thuyết','https://i.ibb.co/vBvPBT4/600-cau-hoi594.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (595, N'Lý thuyết','https://i.ibb.co/ySdT3ps/600-cau-hoi595.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (596, N'Lý thuyết','https://i.ibb.co/p1K8JPb/600-cau-hoi596.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (597, N'Lý thuyết','https://i.ibb.co/L9gdLBc/600-cau-hoi597.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (598, N'Lý thuyết','https://i.ibb.co/Jc7HkWV/600-cau-hoi598.jpg', 2, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (599, N'Lý thuyết','https://i.ibb.co/XJMVpvR/600-cau-hoi599.jpg', 1, 0, 1,1);
INSERT INTO [dbo].[Question] ([questionId], [content], [image], [correctAnswer], [KeyQuestion], [staffID], [status]) VALUES (600, N'Lý thuyết','https://i.ibb.co/S7849jz/600-cau-hoi600.jpg', 2, 0, 1,1);
GO
SET IDENTITY_INSERT [dbo].[Question] OFF
GO

/*-- Add db Curriculum--*/
SET IDENTITY_INSERT [dbo].[Curriculum] ON

GO 
INSERT [dbo].[Curriculum] ([curriculumID], [content], [createTime], [isTheory])
	VALUES (1, N'Hướng dẫn lý thuyết Luật GTĐB, Hỗ trợ học viên cách điểm danh, quét Thẻ và phản hồi thông tin, thời gian', '2023-11-18', 1)	

GO 
INSERT [dbo].[Curriculum] ([curriculumID], [content], [createTime], [isTheory])
	VALUES (2, N'Hướng dẫn học viên học lý thuyết Phần Quy Tắc chung Luật GTĐB, Phần biển báo hiệu đường bộ, Ôn Luyện', '2023-11-18', 1)
	
GO 
INSERT [dbo].[Curriculum] ([curriculumID], [content], [createTime], [isTheory])
	VALUES (3, N'Hướng dẫn học viên học lý thuyết Phần Nghiệp vụ vận tải, Phần Đạo đức người lái xe, Ôn luyện', '2023-11-18', 1)

GO 
INSERT [dbo].[Curriculum] ([curriculumID], [content], [createTime], [isTheory])
	VALUES (4, N'Hướng dẫn học viên học lý thuyết Phần Cấu tạo, sửa chữa thông thường, Ôn luyện', '2023-11-18', 1)

GO 
INSERT [dbo].[Curriculum] ([curriculumID], [content], [createTime], [isTheory])
	VALUES (5, N'Hướng dẫn học viên học lý thuyết, ôn phần mềm mô phỏng, Ôn luyện', '2023-11-18', 1)

GO 
INSERT [dbo].[Curriculum] ([curriculumID], [content], [createTime], [isTheory])
	VALUES (6, N'Hướng dẫn học viên học lý thuyết, phần giải quyết các tình huống sa hình, Ôn luyện', '2023-11-18', 1)

GO 
INSERT [dbo].[Curriculum] ([curriculumID], [content], [createTime], [isTheory])
	VALUES (7, N'Hướng dẫn học viên học lý thuyết, ôn luyện phần mềm mô phỏng, tập cabin, Ôn luyện', '2023-11-18', 1)

SET IDENTITY_INSERT [dbo].[Curriculum] OFF