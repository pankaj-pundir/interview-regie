import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,Logger
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';
@Controller('student')
export class StudentController {
  private readonly logger = new Logger(StudentController.name);

  constructor(private readonly studentService: StudentService) {}


  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const newStudent = await this.studentService.createStudent(
        createStudentDto,
      );
      // Log success message
      this.logger.log(`Student created successfully: ${JSON.stringify(newStudent)}`);
      
      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudent,
      });
    } catch (err) {
      this.logger.log(`Student created successfully: ${err}`);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const existingStudent = await this.studentService.updateStudent(
        studentId,
        updateStudentDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Student has been successfully updated',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getStudents(@Res() response) {
    try {
      const studentData = await this.studentService.getAllStudents();
      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        studentData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const existingStudent = await this.studentService.getStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const deletedStudent = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deletedStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}


// sample payload
// {"name":"pankaj","roleNumber":18,"class":10,"gender":"male","marks":80}