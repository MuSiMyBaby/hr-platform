// File: graphql/resume.graphql.ts
import { gql } from 'graphql-tag';

export const resumeTypeDefs = gql`
  enum LanguageLevel {
    BASIC
    INTERMEDIATECompany
    UPPER_INTERMEDIATE
    ADVANCED
    OTHER
  }

  enum EducationStatus {
    ENROLLED
    SUSPENDED
    GRADUATED
    DROPPED_OUT
    OTHER
  }

  type Resume {
    id: Int!
    userId: Int!
    title: String
    firstName: String!
    lastName: String!
    englishName: String
    nickname: String
    phoneNumber: String
    email: String
    profilePicture: String
    isPrimary: Boolean
    createdAt: String!
    updatedAt: String!

    languages: [Language!]!
    educations: [Education!]!
    experiences: [Experience!]!
    skills: [Skill!]!
    certificates: [Certificate!]!
  }

  type Language {
    id: Int!
    name: String!
    level: LanguageLevel!
    levelOther: String
  }

  type Education {
    id: Int!
    school: String!
    department: String!
    status: EducationStatus!
    statusOther: String
    startDate: String!
    endDate: String!
  }

  type Experience {
    id: Int!
    company: String!
    title: String!
    startDate: String!
    endDate: String!
    description: String!
  }

  type Skill {
    id: Int!
    name: String!
  }

  type Certificate {
    id: Int!
    name: String!
    expiry: String
  }

  input CreateResumeInput {
    title: String
    firstName: String!
    lastName: String!
    englishName: String
    nickname: String
    phoneNumber: String
    email: String
    profilePicture: String
    isPrimary: Boolean
  }

  input UpdateResumeInput {
    id: Int!
    title: String
    firstName: String
    lastName: String
    englishName: String
    nickname: String
    phoneNumber: String
    email: String
    profilePicture: String
    isPrimary: Boolean
  }

  type Query {
    myResumes: [Resume!]!
    resume(id: Int!): Resume
  }

  type Mutation {
    createResume(input: CreateResumeInput!): Resume!
    updateResume(input: UpdateResumeInput!): Resume!
    deleteResume(id: Int!): Boolean!
  }
`;

export default resumeTypeDefs;
