USE [master]
GO 

/*--Run from master to here to drop db--*/
/* DROP DATABASE [DrivingLicense] */

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
GO

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
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Member](
  [memberID] INT IDENTITY(1,1),
  [dob] DATE NOT NULL,
  [gender] CHAR(6) NOT NULL,
  [nationality] VARCHAR(50) NOT NULL,
  [residenceAddress] VARCHAR(255) NOT NULL,
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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

CREATE TABLE [dbo].[Course](
  [courseID] VARCHAR(10) NOT NULL,
  [name] NVARCHAR(500) NOT NULL,
  [startDate] DATE NOT NULL,
  [endDate] DATE NOT NULL,
  [numberOfStudents] INT NULL,
  [limitStudent] INT NOT NULL,
  [courseMonth] INT NOT NULL,
  CONSTRAINT [PK_Course] PRIMARY KEY CLUSTERED 
  (
    [courseID] ASC
  )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
)ON [PRIMARY]
GO

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
SET IDENTITY_INSERT [dbo].[User] OFF
GO

