import { IsString, IsEmail, IsArray, IsOptional, IsEnum } from 'class-validator'

export class OnboardUserDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  password?: string

  @IsString()
  phone: string

  @IsString()
  bvn: string

  @IsEnum(['find_jobs', 'hire_services'])
  @IsOptional()
  role?: 'find_jobs' | 'hire_services'

  @IsString()
  @IsOptional()
  brandName?: string

  @IsString()
  location: string

  @IsArray()
  languages: string[]

  @IsArray()
  skills: string[]

  @IsEnum(['beginner', 'intermediate', 'expert'])
  @IsOptional()
  experience?: string

  @IsEnum(['one_time', 'full_time', 'contract', 'flexible'])
  @IsOptional()
  jobType?: string

  @IsEnum(['remote', 'onsite', 'hybrid'])
  @IsOptional()
  workType?: string

  @IsString()
  @IsOptional()
  workDistance?: string
}
