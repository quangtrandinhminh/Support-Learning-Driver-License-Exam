using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    courseID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    name = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    startDate = table.Column<DateTime>(type: "date", nullable: false),
                    endDate = table.Column<DateTime>(type: "date", nullable: false),
                    numberOfStudents = table.Column<int>(type: "int", nullable: true),
                    limitStudent = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.courseID);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    roleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    roleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.roleID);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    userID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    fullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    phone = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    createTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    roleID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.userID);
                    table.ForeignKey(
                        name: "FK_User_Role",
                        column: x => x.roleID,
                        principalTable: "Role",
                        principalColumn: "roleID");
                });

            migrationBuilder.CreateTable(
                name: "Member",
                columns: table => new
                {
                    memberID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dob = table.Column<DateTime>(type: "date", nullable: false),
                    gender = table.Column<string>(type: "char(6)", unicode: false, fixedLength: true, maxLength: 6, nullable: false),
                    nationality = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    residenceAddress_ = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    cardProvidedDate = table.Column<DateTime>(type: "date", nullable: false),
                    cardProvidedLocation = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    drivingLicenseNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    drivingLicenseTier = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    drivingLicenseProvider = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    drivingLicenseProvidedDate = table.Column<DateTime>(type: "date", nullable: true),
                    drivingTestTier = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    integratedDrivingLicense = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    revokedDrivingLicense = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    relatedDocument = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    registrationDate = table.Column<DateTime>(type: "date", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    userID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Member", x => x.memberID);
                    table.ForeignKey(
                        name: "FK_Member_User",
                        column: x => x.userID,
                        principalTable: "User",
                        principalColumn: "userID");
                });

            migrationBuilder.CreateTable(
                name: "Mentor",
                columns: table => new
                {
                    mentorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    phone = table.Column<string>(type: "char(10)", unicode: false, fixedLength: true, maxLength: 10, nullable: false),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    residenceAddress = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    userID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mentor", x => x.mentorID);
                    table.ForeignKey(
                        name: "FK_Mentor_User",
                        column: x => x.userID,
                        principalTable: "User",
                        principalColumn: "userID");
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    staffID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    isAdmin = table.Column<bool>(type: "bit", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    userID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.staffID);
                    table.ForeignKey(
                        name: "FK_Staff_User",
                        column: x => x.userID,
                        principalTable: "User",
                        principalColumn: "userID");
                });

            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    studentID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    memberID = table.Column<int>(type: "int", nullable: false),
                    courseID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.studentID);
                    table.ForeignKey(
                        name: "FK_Student_Course",
                        column: x => x.courseID,
                        principalTable: "Course",
                        principalColumn: "courseID");
                    table.ForeignKey(
                        name: "FK_Student_Member",
                        column: x => x.memberID,
                        principalTable: "Member",
                        principalColumn: "memberID");
                });

            migrationBuilder.CreateTable(
                name: "Class",
                columns: table => new
                {
                    classID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    classType = table.Column<bool>(type: "bit", nullable: false),
                    mentorID = table.Column<int>(type: "int", nullable: false),
                    courseID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Class", x => x.classID);
                    table.ForeignKey(
                        name: "FK_Class_Course",
                        column: x => x.courseID,
                        principalTable: "Course",
                        principalColumn: "courseID");
                    table.ForeignKey(
                        name: "FK_Class_Mentor",
                        column: x => x.mentorID,
                        principalTable: "Mentor",
                        principalColumn: "mentorID");
                });

            migrationBuilder.CreateTable(
                name: "Exam",
                columns: table => new
                {
                    examID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    limitQuestion = table.Column<int>(type: "int", nullable: false),
                    limitKeyQuestion = table.Column<int>(type: "int", nullable: false),
                    createdTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    courseID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    staffID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exam", x => x.examID);
                    table.ForeignKey(
                        name: "FK_Exam_Course",
                        column: x => x.courseID,
                        principalTable: "Course",
                        principalColumn: "courseID");
                    table.ForeignKey(
                        name: "FK_Exam_Staff",
                        column: x => x.staffID,
                        principalTable: "Staff",
                        principalColumn: "staffID");
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    newsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    createdTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    staffID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.newsID);
                    table.ForeignKey(
                        name: "FK_News_Staff",
                        column: x => x.staffID,
                        principalTable: "Staff",
                        principalColumn: "staffID");
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    questionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    keyQuestion = table.Column<bool>(type: "bit", nullable: false),
                    correctAnswer = table.Column<bool>(type: "bit", nullable: false),
                    staffID = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.questionID);
                    table.ForeignKey(
                        name: "FK_Question_Staff",
                        column: x => x.staffID,
                        principalTable: "Staff",
                        principalColumn: "staffID");
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    imageID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    studentID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.imageID);
                    table.ForeignKey(
                        name: "FK_Image_Student",
                        column: x => x.studentID,
                        principalTable: "Student",
                        principalColumn: "studentID");
                });

            migrationBuilder.CreateTable(
                name: "ClassStudent",
                columns: table => new
                {
                    classID = table.Column<int>(type: "int", nullable: false),
                    studentID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassStudent", x => new { x.classID, x.studentID });
                    table.ForeignKey(
                        name: "FK_ClassStudent_Class",
                        column: x => x.classID,
                        principalTable: "Class",
                        principalColumn: "classID");
                    table.ForeignKey(
                        name: "FK_ClassStudent_Student",
                        column: x => x.studentID,
                        principalTable: "Student",
                        principalColumn: "studentID");
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    feedbackID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    createdStudentID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    classID = table.Column<int>(type: "int", nullable: false),
                    comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    rating = table.Column<int>(type: "int", nullable: false),
                    createdTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.feedbackID);
                    table.ForeignKey(
                        name: "FK_Feedback_Class",
                        column: x => x.classID,
                        principalTable: "Class",
                        principalColumn: "classID");
                    table.ForeignKey(
                        name: "FK_Feedback_Student",
                        column: x => x.createdStudentID,
                        principalTable: "Student",
                        principalColumn: "studentID");
                });

            migrationBuilder.CreateTable(
                name: "Lesson",
                columns: table => new
                {
                    lessonID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    classID = table.Column<int>(type: "int", nullable: false),
                    startTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    endTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    hours = table.Column<double>(type: "float", nullable: true),
                    kilometers = table.Column<double>(type: "float", nullable: true),
                    studentID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    attendance = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lesson", x => x.lessonID);
                    table.ForeignKey(
                        name: "FK_Lesson_Class",
                        column: x => x.classID,
                        principalTable: "Class",
                        principalColumn: "classID");
                    table.ForeignKey(
                        name: "FK_Lesson_Student",
                        column: x => x.studentID,
                        principalTable: "Student",
                        principalColumn: "studentID");
                });

            migrationBuilder.CreateTable(
                name: "Test",
                columns: table => new
                {
                    testID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    testName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    score = table.Column<int>(type: "int", nullable: true),
                    pass = table.Column<bool>(type: "bit", nullable: true),
                    testTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    studentID = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    examID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Test", x => x.testID);
                    table.ForeignKey(
                        name: "FK_Test_Exam",
                        column: x => x.examID,
                        principalTable: "Exam",
                        principalColumn: "examID");
                    table.ForeignKey(
                        name: "FK_Test_Student",
                        column: x => x.studentID,
                        principalTable: "Student",
                        principalColumn: "studentID");
                });

            migrationBuilder.CreateTable(
                name: "StudentAnswer",
                columns: table => new
                {
                    studentAnswerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    optionID = table.Column<int>(type: "int", nullable: true),
                    isCorrect = table.Column<bool>(type: "bit", nullable: true),
                    testID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentAnswer", x => x.studentAnswerID);
                    table.ForeignKey(
                        name: "FK_StudentAnswer_Test",
                        column: x => x.testID,
                        principalTable: "Test",
                        principalColumn: "testID");
                });

            migrationBuilder.CreateTable(
                name: "TestQuestion",
                columns: table => new
                {
                    questionID = table.Column<int>(type: "int", nullable: false),
                    testID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestQuestion", x => new { x.questionID, x.testID });
                    table.ForeignKey(
                        name: "FK_TestQuestion_Question",
                        column: x => x.questionID,
                        principalTable: "Question",
                        principalColumn: "questionID");
                    table.ForeignKey(
                        name: "FK_TestQuestion_Test",
                        column: x => x.testID,
                        principalTable: "Test",
                        principalColumn: "testID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Class_courseID",
                table: "Class",
                column: "courseID");

            migrationBuilder.CreateIndex(
                name: "IX_Class_mentorID",
                table: "Class",
                column: "mentorID");

            migrationBuilder.CreateIndex(
                name: "IX_ClassStudent_studentID",
                table: "ClassStudent",
                column: "studentID");

            migrationBuilder.CreateIndex(
                name: "IX_Exam_courseID",
                table: "Exam",
                column: "courseID");

            migrationBuilder.CreateIndex(
                name: "IX_Exam_staffID",
                table: "Exam",
                column: "staffID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_classID",
                table: "Feedback",
                column: "classID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_createdStudentID",
                table: "Feedback",
                column: "createdStudentID");

            migrationBuilder.CreateIndex(
                name: "IX_Image_studentID",
                table: "Image",
                column: "studentID");

            migrationBuilder.CreateIndex(
                name: "IX_Lesson_classID",
                table: "Lesson",
                column: "classID");

            migrationBuilder.CreateIndex(
                name: "IX_Lesson_studentID",
                table: "Lesson",
                column: "studentID");

            migrationBuilder.CreateIndex(
                name: "UC_DrivingLicenseNumber",
                table: "Member",
                column: "drivingLicenseNumber",
                unique: true,
                filter: "[drivingLicenseNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UC_DrivingLicenseTier",
                table: "Member",
                column: "drivingLicenseTier",
                unique: true,
                filter: "[drivingLicenseTier] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UC_DrivingTestTier",
                table: "Member",
                column: "drivingTestTier",
                unique: true,
                filter: "[drivingTestTier] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UC_IntegratedDrivingLicense",
                table: "Member",
                column: "integratedDrivingLicense",
                unique: true,
                filter: "[integratedDrivingLicense] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UC_Member_User",
                table: "Member",
                column: "userID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UC_RevokedDrivingLicense",
                table: "Member",
                column: "revokedDrivingLicense",
                unique: true,
                filter: "[revokedDrivingLicense] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UC_Mentor_User",
                table: "Mentor",
                column: "userID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UC_MentorEmail",
                table: "Mentor",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UC_MentorPhone",
                table: "Mentor",
                column: "phone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_News_staffID",
                table: "News",
                column: "staffID");

            migrationBuilder.CreateIndex(
                name: "IX_Question_staffID",
                table: "Question",
                column: "staffID");

            migrationBuilder.CreateIndex(
                name: "UC_Staff_User",
                table: "Staff",
                column: "userID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UC_StaffEmail",
                table: "Staff",
                column: "email",
                unique: true,
                filter: "[email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Student_courseID",
                table: "Student",
                column: "courseID");

            migrationBuilder.CreateIndex(
                name: "IX_Student_memberID",
                table: "Student",
                column: "memberID");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAnswer_testID",
                table: "StudentAnswer",
                column: "testID");

            migrationBuilder.CreateIndex(
                name: "IX_Test_examID",
                table: "Test",
                column: "examID");

            migrationBuilder.CreateIndex(
                name: "IX_Test_studentID",
                table: "Test",
                column: "studentID");

            migrationBuilder.CreateIndex(
                name: "IX_TestQuestion_testID",
                table: "TestQuestion",
                column: "testID");

            migrationBuilder.CreateIndex(
                name: "IX_User_roleID",
                table: "User",
                column: "roleID");

            migrationBuilder.CreateIndex(
                name: "UC_Email",
                table: "User",
                column: "email",
                unique: true,
                filter: "[email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UC_Phone",
                table: "User",
                column: "phone",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassStudent");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "Lesson");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "StudentAnswer");

            migrationBuilder.DropTable(
                name: "TestQuestion");

            migrationBuilder.DropTable(
                name: "Class");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "Test");

            migrationBuilder.DropTable(
                name: "Mentor");

            migrationBuilder.DropTable(
                name: "Exam");

            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropTable(
                name: "Course");

            migrationBuilder.DropTable(
                name: "Member");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
