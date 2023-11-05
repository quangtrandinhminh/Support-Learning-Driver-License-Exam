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

/* Added data */
CREATE TABLE [dbo].[CourseDetails](
	[courseDetailsID] INT IDENTITY(1,1) NOT NULL,
	[courseContent] NVARCHAR(MAX) NULL, 
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

CREATE TABLE [dbo].[Lesson](
  [lessonID] INT IDENTITY(1,1) NOT NULL,
  [classStudentID] INT NOT NULL,
  [title] NVARCHAR(500) NULL,
  [date] DATE NULL,
  [location] NVARCHAR(500) NULL,
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
		VALUES('0101B2', '236B2', '2023-01-06', '2024-04-06', '0', '25', 
				'2023-10-06', '01', '2024', 1)
				
GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('0102B2', '237B2', '2023-01-16', '2024-04-16', '0', '25', 
				'2023-10-06', '01', '2024', 1)
				
GO
INSERT [dbo].[Course] ([courseID], [name], [startDate], [endDate], 
			[numberOfStudents], [limitStudent],[createTime], [courseMonth], [courseYear], [status])
		VALUES('0103B2', '238B2', '2023-01-26', '2024-04-26', '0', '25', 
				'2023-10-06', '01', '2024', 1)
GO

/*-- Add data: CourseDetails --*/
SET IDENTITY_INSERT [dbo].[CourseDetails] ON
                                /*T: 11*/
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('1', 'Dao Tao Ly Thuyet', '2023-11-06', '2023-11-20', '1101B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('2', 'Thuc Hanh Sa Hinh', '2023-11-21', '2023-12-25', '1101B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('3', 'Thuc Hanh Tren Cabin', '2023-12-25', '2024-01-01', '1101B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('4', 'Thuc Hanh Tren Duong', '2024-01-02', '2024-02-01', '1101B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('5', 'Thuc Hanh Tren Xe Tu Dong', '2024-01-02', '2024-02-01', '1101B2' , 1)		

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('6', 'Thuc Hanh Tong Hop Sa Hinh', '2024-02-01', '2024-02-06', '1101B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('7', 'Dao Tao Ly Thuyet', '2023-11-16', '2023-11-30', '1102B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('8', 'Thuc Hanh Sa Hinh', '2023-12-01', '2024-01-01', '1102B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('9', 'Thuc Hanh Tren Cabin', '2024-01-02', '2024-01-12', '1102B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('10', 'Thuc Hanh Tren Duong', '2024-01-13', '2024-02-11', '1102B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('11', 'Thuc Hanh Tren Xe Tu Dong', '2024-01-13', '2024-02-11', '1102B2' , 1)	

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('12', 'Thuc Hanh Tong Hop Sa Hinh', '2024-02-12', '2024-02-16', '1102B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('13', 'Dao Tao Ly Thuyet', '2023-11-26', '2023-12-05', '1103B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('14', 'Thuc Hanh Sa Hinh', '2023-12-06', '2024-01-11', '1103B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('15', 'Thuc Hanh Tren Cabin', '2024-01-12', '2024-01-22', '1103B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('16', 'Thuc Hanh Tren Duong', '2024-01-23', '2024-02-21', '1103B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('17', 'Thuc Hanh Tren Xe Tu Dong', '2024-01-23', '2024-02-21', '1103B2' , 1)	

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('18', 'Thuc Hanh Tong Hop Sa Hinh', '2024-02-22', '2024-02-26', '1103B2' , 1)

                                 /*T: 12*/
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('19', 'Dao Tao Ly Thuyet', '2023-12-06', '2023-12-20', '1201B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('20', 'Thuc Hanh Sa Hinh', '2023-12-21', '2024-01-25', '1201B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('21', 'Thuc Hanh Tren Cabin', '2024-01-25', '2024-02-01', '1201B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('22', 'Thuc Hanh Tren Duong', '2024-02-02', '2024-03-01', '1201B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('23', 'Thuc Hanh Tren Xe Tu Dong', '2024-02-02', '2024-03-01', '1201B2' , 1)		

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('24', 'Thuc Hanh Tong Hop Sa Hinh', '2024-03-01', '2024-03-06', '1201B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('25', 'Dao Tao Ly Thuyet', '2023-12-16', '2023-12-30', '1202B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('26', 'Thuc Hanh Sa Hinh', '2024-01-01', '2024-02-01', '1202B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('27', 'Thuc Hanh Tren Cabin', '2024-02-02', '2024-02-12', '1202B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('28', 'Thuc Hanh Tren Duong', '2024-02-13', '2024-03-11', '1202B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('29', 'Thuc Hanh Tren Xe Tu Dong', '2024-02-13', '2024-03-11', '1202B2' , 1)	

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('30', 'Thuc Hanh Tong Hop Sa Hinh', '2024-03-12', '2024-03-16', '1202B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('31', 'Dao Tao Ly Thuyet', '2023-12-26', '2024-02-05', '1203B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('32', 'Thuc Hanh Sa Hinh', '2024-02-06', '2024-02-11', '1203B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('33', 'Thuc Hanh Tren Cabin', '2024-02-12', '2024-02-22', '1203B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('34', 'Thuc Hanh Tren Duong', '2024-02-23', '2024-03-21', '1203B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('35', 'Thuc Hanh Tren Xe Tu Dong', '2024-02-23', '2024-03-21', '1203B2' , 1)	

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('36', 'Thuc Hanh Tong Hop Sa Hinh', '2024-03-22', '2024-03-26', '1203B2' , 1)
                                 /*T: 1*/
GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('37', 'Dao Tao Ly Thuyet', '2024-01-06', '2024-01-20', '0101B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('38', 'Thuc Hanh Sa Hinh', '2023-01-21', '2024-02-25', '0101B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('39', 'Thuc Hanh Tren Cabin', '2024-02-25', '2024-03-01', '0101B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('40', 'Thuc Hanh Tren Duong', '2024-03-02', '2024-04-01', '0101B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('41', 'Thuc Hanh Tren Xe Tu Dong', '2024-03-02', '2024-04-01', '0101B2' , 1)		

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('42', 'Thuc Hanh Tong Hop Sa Hinh', '2024-04-01', '2024-04-06', '0101B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('43', 'Dao Tao Ly Thuyet', '2024-01-16', '2024-01-30', '0102B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('44', 'Thuc Hanh Sa Hinh', '2024-02-01', '2024-03-01', '0102B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('45', 'Thuc Hanh Tren Cabin', '2024-03-02', '2024-03-12', '0102B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('46', 'Thuc Hanh Tren Duong', '2024-03-13', '2024-04-11', '0102B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('47', 'Thuc Hanh Tren Xe Tu Dong', '2024-03-13', '2024-04-11', '0102B2' , 1)	

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('48', 'Thuc Hanh Tong Hop Sa Hinh', '2024-04-12', '2024-04-16', '0102B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('49', 'Dao Tao Ly Thuyet', '2024-01-26', '2024-03-05', '0103B2', 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('50', 'Thuc Hanh Sa Hinh', '2024-03-06', '2024-04-11', '0103B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('51', 'Thuc Hanh Tren Cabin', '2024-04-12', '2024-04-22', '0103B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('52', 'Thuc Hanh Tren Duong', '2024-04-23', '2024-05-21', '0103B2' , 1)

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('53', 'Thuc Hanh Tren Xe Tu Dong', '2024-04-23', '2024-05-21', '0103B2' , 1)	

GO
INSERT [dbo].[CourseDetails]([courseDetailsID], [courseContent], 
		[courseTimeStart], [courseTimeEnd], [courseID], [status])
		VALUES('54', 'Thuc Hanh Tong Hop Sa Hinh', '2024-05-22', '2024-05-26', '0103B2' , 1)
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
		VALUES('1', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001235', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '2')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('2', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001236', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '3')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('3', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001237', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '4')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('4', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001238', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1102B2', '5')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('5', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001239', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1102B2', '6')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('6', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001240', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1102B2', '7')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('7', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001241', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1103B2', '8')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('8', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001242', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1103B2', '9')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('9', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001243', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1103B2', ' 10')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('10', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001244', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1201B2', '11')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('11', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001245', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1201B2', '12')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('12', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001220', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1201B2', '13')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('13', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001246', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1202B2', '14')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('14', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001247', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1202B2', '15')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('15', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001248', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1202B2', '16')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('16', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001249', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1203B2', '17')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('17', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001250', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1203B2', '18')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('18', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001251', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1203B2', '19')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('19', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001252', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0101B2', '20')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('20', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001253', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0101B2', '21')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('21', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001254', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0101B2', '22')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('22', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001255', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0102B2', '23')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('23', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001256', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0102B2', '24')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('24', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001257', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0102B2', '25')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('25', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001258', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0103B2', '26')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('26', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001259', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0103B2', '27')

GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('27', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001260', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '0103B2', '36')
GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('28', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001261', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
							'B2', 2, 2, '', '2023-10-22', 1, '1101B2', '37')
GO
INSERT [dbo].[Member] ([memberID],  [dob], [gender], [nationality], [nation], [temporaryAddress], [residenceAddress], [identityCardNumber], 
							[passport], [cardProvidedDate], [cardProvidedLocation], [drivingLicenseNumber], [drivingLicenseTier], 
								[drivingLicenseProvider], [drivingLicenseProvidedDate], [drivingTestTier],[integratedDrivingLicense],
									[revokedDrivingLicense], [relatedDocument], [registrationDate], [isPaid], [courseID], [userID])
		VALUES('29', '2003-08-06', 'Nam', N'VietNam', '', '',  '6th street, Tan Phong Ward, district 7, Ho Chi Minh city', 
					'079302001262', '', '2022-10-22', 'Cong An Phuong', '', 'A1', 'Cong An Thanh Pho', '2023-8-22', 
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

/* Add data: Question */
SET IDENTITY_INSERT [dbo].[Question] ON
GO
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(1, N'Lý Thuyết', 'https://i.ibb.co/d7z3zmN/600-cau-hoi1.jpg', 0, '2', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(2, N'Lý Thuyết', 'https://i.ibb.co/HqQtfdP/600-cau-hoi2.jpg', 0, '2', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(3, N'Lý Thuyết', 'https://i.ibb.co/GkHgLSK/600-cau-hoi3.jpg', 0, '1', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(5, N'Lý Thuyết', 'https://i.ibb.co/TKJ3kht/600-cau-hoi5.jpg', 0, '1', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(6, N'Lý Thuyết', 'https://i.ibb.co/qM1ZvpV/600-cau-hoi6.jpg', 0, '1', '1', 1)
/*INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(7, N'Lý Thuyết', 'https://i.ibb.co/0JbcfRL/600-cau-hoi7.jpg', 0, '4', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/QbV2qNC/600-cau-hoi8.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)
INSERT [dbo].[Question] ([questionID], [content], [image], [keyQuestion], [correctAnswer], [staffID], [status])
	VALUES(4, N'Lý Thuyết', 'https://i.ibb.co/1XNShjk/600-cau-hoi4.jpg', 0, '3', '1', 1)*/

GO
SET IDENTITY_INSERT [dbo].[Question] OFF

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
SET IDENTITY_INSERT [dbo].[FeedBack] OFF
GO

/* Add data: Exam */
SET IDENTITY_INSERT [dbo].[Exam] ON
GO
INSERT [dbo].[Exam] ([examID], [courseID], [staffID], [examName], [examTime], [description], [duration], [limitQuestion], [limitKeyQuestion], [minimumCorrectAnswer], [status])
	VALUES (1, '1101B2', '1', N'Kì thi thử lý thuyết', '2023-11-05T08:00:00', N'Kì thi này ....', 60, 35, 5, 32, 0)
GO
INSERT [dbo].[Exam] ([examID], [courseID], [staffID], [examName], [examTime], [description], [duration], [limitQuestion], [limitKeyQuestion], [minimumCorrectAnswer], [status])
	VALUES (2, '1101B2', '1', N'Kì thi thử lý thuyết', '2023-11-06T08:00:00', N'Kì thi này ....', 60, 35, 5, 32, 0)
GO
SET IDENTITY_INSERT [dbo].[Exam] OFF

/* Add data: Lesson */
DECLARE @classStudentID INT = 1;
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
