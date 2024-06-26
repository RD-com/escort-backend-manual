const {
  Users,
  UserPackage,
  EscortAboutMeLocalization,
  EscortAccountVerificationDocs,
  EscortAdditionalInformation,
  EscortAvailability,
  EscortContactDetails,
  EscortCityTour,
  EscortGallery,
  EscortGalleryMedia,
  EscortLanguage,
  EscortPhysicalFeature,
  EscortService,
  EscortSocialMedia,
  EscortStories,
  EscortWorkingCity,
  EscortWorkingHour,
  Escort,
  Limitation,
  ApprovalStatus,
} = require("../models");

const mockProfileData = async (req, res) => {
  try {
    await Users.bulkCreate([
      {
        email: "test01@gmail.com",
        username: "escort1",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test02@gmail.com",
        username: "escort2",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test03@gmail.com",
        username: "escort3",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test04@gmail.com",
        username: "escort4",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test05@gmail.com",
        username: "escort5",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test06@gmail.com",
        username: "escort6",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test07@gmail.com",
        username: "escort7",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test08@gmail.com",
        username: "escort8",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test09@gmail.com",
        username: "escort9",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
      {
        email: "test010@gmail.com",
        username: "escort10",
        password_hash:
          "$2b$12$ya9N016iPo19IAQki.qc4es0KfT7Fh/PO4LR.R0u2cY.K5Q7KQEW.",
        account_type_id: 2,
        is_email_verified: "1",
        is_account_verified: "1",
        current_step: "/escort/dashboard",
      },
    ]);
    await ApprovalStatus.bulkCreate([
      {
        user_id: 1,
      },
      {
        user_id: 2,
      },
      {
        user_id: 3,
      },
      {
        user_id: 4,
      },
      {
        user_id: 5,
      },
      {
        user_id: 6,
      },
      {
        user_id: 7,
      },
      {
        user_id: 8,
      },
      {
        user_id: 9,
      },
      {
        user_id: 10,
      },
    ]);
    await Escort.bulkCreate([
      {
        user_id: 1,
        name: "Michael Smith",
        age: 30,
        gender_combination_id: 1,
        country_short_code: "IT",
        city: "Rome",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 2,
        name: "Emily Martinez",
        age: 30,
        gender_combination_id: 2,
        country_short_code: "IT",
        city: "Milan",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 3,
        name: "Riley Parker",
        age: 30,
        gender_combination_id: 3,
        country_short_code: "IT",
        city: "Naples",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 4,
        name: "David Johnson",
        age: 30,
        gender_combination_id: 1,
        country_short_code: "IT",
        city: "Tirin",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 5,
        name: "Emma Rodriguez",
        age: 30,
        gender_combination_id: 2,
        country_short_code: "IT",
        city: "Palermo",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 6,
        name: "Alex Campbell",
        age: 30,
        gender_combination_id: 3,
        country_short_code: "IT",
        city: "Genoa",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 7,
        name: "Christopher Brown",
        age: 30,
        gender_combination_id: 1,
        country_short_code: "IT",
        city: "Bari",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 8,
        name: "Olivia Garcia",
        age: 30,
        gender_combination_id: 2,
        country_short_code: "IT",
        city: "Verona",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 9,
        name: "Taylor Cooper",
        age: 30,
        gender_combination_id: 3,
        country_short_code: "IT",
        city: "Milan",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
      {
        user_id: 10,
        name: "Ava Hernandez",
        age: 30,
        gender_combination_id: 2,
        country_short_code: "IT",
        city: "Milan",
        nationality_id: 1,
        sexual_orientation_id: 1,
      },
    ]);
    await UserPackage.bulkCreate([
      {
        user_id: 1,
        package_id: 1,
      },
      {
        user_id: 2,
        package_id: 1,
      },
      {
        user_id: 3,
        package_id: 1,
      },
      {
        user_id: 4,
        package_id: 2,
      },
      {
        user_id: 5,
        package_id: 2,
      },
      {
        user_id: 6,
        package_id: 2,
      },
      {
        user_id: 7,
        package_id: 3,
      },
      {
        user_id: 8,
        package_id: 3,
      },
      {
        user_id: 9,
        package_id: 3,
      },
      {
        user_id: 10,
        package_id: 3,
      },
    ]);
    await Limitation.bulkCreate([
      {
        user_id: 1,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 2,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 3,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 4,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 5,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 6,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 7,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 8,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 9,
        type: "1",
        is_exceeded: "0",
      },
      {
        user_id: 10,
        type: "1",
        is_exceeded: "0",
      },
    ]);
    await EscortAboutMeLocalization.bulkCreate([
      {
        user_id: 1,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 1,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 1,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 1,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 1,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 2,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 2,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 2,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 2,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 2,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 3,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 3,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 3,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 3,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 3,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 4,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 4,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 4,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 4,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 4,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 5,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 5,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 5,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 5,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 5,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 6,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 6,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 6,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 6,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 6,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 7,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 7,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 7,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 7,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 7,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 8,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 8,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 8,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 8,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 8,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 9,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 9,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 9,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 9,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 9,
        language_code: "FR",
        content: "Description in French",
      },
      {
        user_id: 10,
        language_code: "EN",
        content: "Description Eng",
      },
      {
        user_id: 10,
        language_code: "IT",
        content: "Description Italian",
      },
      {
        user_id: 10,
        language_code: "NL",
        content: "Description Dutch",
      },
      {
        user_id: 10,
        language_code: "ES",
        content: "Description in Spanish",
      },
      {
        user_id: 10,
        language_code: "FR",
        content: "Description in French",
      },
    ]);
    await EscortAccountVerificationDocs.bulkCreate([
      {
        user_id: 1,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 1,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 1,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 2,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 2,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 2,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 3,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 3,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 3,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 4,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 4,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 4,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 5,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 5,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 5,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 7,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 7,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 7,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 8,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 8,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 8,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 9,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/9/569767bb0bc158abaf29e1671a1de65549a524f2ab61570e8f10b4ec25e4c595",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 9,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 9,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
      {
        user_id: 10,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/4d0f9f34ce1f88b08f332f5483a37ffd3ee9118d9cb73f1a317da80a887fdfc4",
        combination_id: 1,
        is_approved: "0",
      },
      {
        user_id: 10,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/6be8c843790a4c681e161e640371e41b4befe72434259295f794467d44c9aa6a",
        combination_id: 2,
        is_approved: "0",
      },
      {
        user_id: 10,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/f61b26ffcad226229ebc225c05921ac31a295de5a1f9690968956ebfe2f22bc9",
        combination_id: 3,
        is_approved: "0",
      },
    ]);
    await EscortAdditionalInformation.bulkCreate([
      {
        user_id: 1,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 2,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 3,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 4,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 5,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 6,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 7,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 8,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 9,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
      {
        user_id: 10,
        is_smoking: 0,
        is_drinking: 1,
        is_tatoos: 0,
        is_piercing: 0,
        special_characteristics: "char",
      },
    ]);
    await EscortAvailability.bulkCreate([
      {
        user_id: 1,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 2,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 3,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 4,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 5,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 6,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 7,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 8,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 9,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
      {
        user_id: 10,
        incall_combination_id: 1,
        outcall_combination_id: 2,
      },
    ]);
    await EscortContactDetails.bulkCreate([
      {
        user_id: 1,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 2,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 3,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 4,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 5,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 6,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 7,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 8,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 9,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
      {
        user_id: 10,
        contact_number: "+9321212121212121",
        combination_id: 1,
        address_club_name: "club name",
        address_street: "backers st",
        address_nr: "22",
      },
    ]);
    await EscortCityTour.bulkCreate([
      {
        user_id: 1,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 2,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 3,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 4,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 5,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 6,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 7,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 8,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 9,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
      {
        user_id: 10,
        combination_id: 1,
        from: "2024-03-05 18:30:00+00",
        to: "2024-03-29 18:30:00+00",
        contact_number: "+9321212121212121",
        contact_email: "alessandra@mail.com",
      },
    ]);
    await EscortGallery.bulkCreate([
      {
        user_id: 1,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 1,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 2,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 2,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 3,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 3,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 4,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 4,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 5,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 5,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 6,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 6,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 7,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 7,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 8,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 8,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 9,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 9,
        name: "Favourite",
        price: 50,
        type: "1",
      },
      {
        user_id: 10,
        name: "main",
        price: 0,
        type: "2",
      },
      {
        user_id: 10,
        name: "Favourite",
        price: 50,
        type: "1",
      },
    ]);
    await EscortGalleryMedia.bulkCreate([
      {
        gallery_id: 1,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/c01f1c1f78ac5d06507bc574138bc4de2ad6f94cb4e100835c67d3286c06cf3d",
      },
      {
        gallery_id: 1,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/232f39041adf0c6b467323d46a14d4809c86db2fe07f350f148bf4dbc7cf91ad",
      },
      {
        gallery_id: 1,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/cc8db7fa20e611dc86ec495a3d20b8936f45eb959c32d3d8ed0c4e2f5f4fe2e3",
      },
      {
        gallery_id: 2,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/12d252bbdba2c0da0fff5f7f1fe73558c42f53e1071e2605822b773fb0bf56b7",
      },
      {
        gallery_id: 2,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/3d190234ddd48cfdc1bbaceae3d5b44b2cee90dc6ea9f1a3f64524f17cea8017",
      },
      {
        gallery_id: 2,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/f759e6c9b004b3d298e71178e7ddd95c033de3334eb06d9de5f87e01ef5e6c97",
      },
      {
        gallery_id: 3,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/670e9cc5012c494f9c2a92623ab59ea1577d5740564b6650111836cc6b1e8c4b",
      },
      {
        gallery_id: 3,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/fe2303e7f671414f8de4a07ec2cb08ea4f13ac58d7e49ec91747eba8cf5a3b6a",
      },
      {
        gallery_id: 3,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/335e5db5f38c812d7ac33b3ca9b8926df16f73ca66994d3dfc726bbfc115196c",
      },
      {
        gallery_id: 4,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/c7a57f637869668e9799a90147d593880268b22caafdaa20cb5fce7e3dc92d5d",
      },
      {
        gallery_id: 4,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/0b0cbf2a3339c9bf3bd227137776422a288bd90aedae7eec6b53fe822f5cce19",
      },
      {
        gallery_id: 4,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/ad6917aa79c5adc98df718c0d8532350b6e6ba4214d100b707fe8c6e3e12648b",
      },
      {
        gallery_id: 5,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/5/60a3495f005b8ecf9e38ad5e81039d895c3f6ff2d9acd2c42add566fbcd65112",
      },
      {
        gallery_id: 5,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/5/0e6f43e00f652a5f5621cb524ba5c6c380417dc4a84e87a53d880fc8be662cc2",
      },
      {
        gallery_id: 5,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/5/df77add220247db7dbc915c4ea8087262d0e44f344e348884894b759c55f7238",
      },
      {
        gallery_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/6/4785fd1f1df44b79ecc3d69e0f1f744e23196726aeddbdea89c83e38e99e2fc6",
      },
      {
        gallery_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/6/36874113048045031069f5fc0f6ec7d762896d65932be441fb5f46e1a05c9280",
      },
      {
        gallery_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/6/0f0c683c76e9b86ce2f911632330851f10113dd26f1d8495cc6d42d511265737",
      },
      {
        gallery_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/6/d4f1d8af6c277523383dbc8eb248697beb4562ef9791b78eecf34a0df9314227",
      },
      {
        gallery_id: 7,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/7/f010a2f50d95201801b7ce1a9b972e1d09c414434590f9da105e3fad97a36eae",
      },
      {
        gallery_id: 7,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/7/8ffca9142b8cd0eed1fadda89f500aa390f71b942ce41595980f78d551032e4d",
      },
      {
        gallery_id: 7,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/7/334c0a42b4f1d390294c7a6e1ac65530546c6496181ff3a7035d925f51a6c09c",
      },
      {
        gallery_id: 8,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/8/8725a319c10927e9b3f099204b5acaac929b3cbea5c080d48b14ea38015a872e",
      },
      {
        gallery_id: 8,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/8/b8515833ae2354cf5fe2eb43c21ea2cfa73b8977a425d4155ac34304e27797c0",
      },
      {
        gallery_id: 8,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/8/35ca26b31554cb0dd6cdabf1f90df77519284e5f5013850001e33b40bf7f1ca3",
      },
      {
        gallery_id: 9,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/9/569767bb0bc158abaf29e1671a1de65549a524f2ab61570e8f10b4ec25e4c595",
      },
      {
        gallery_id: 9,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/9/de8871f94fc6138092e45d914c292efd3ab30c0a37d2b25877df461ebaaea018",
      },
      {
        gallery_id: 9,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/9/7c1e77becc224e79977bdb0724f8012125ee4bf973f4e50f28ece02361a35ff4",
      },
      {
        gallery_id: 10,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/10/1a9570241b11b711590066da4fee3cc42fc0468117e54f9e15327d8cecae8e40",
      },
      {
        gallery_id: 10,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/10/4c31a19c4a602c18334e7a3ee28bb3984f20117a03e59c55d510fb458ce21466",
      },
      {
        gallery_id: 10,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/10/66d864dd53b2788244adf175d257fadb156435e8bb13e539abaadaaec40029c4",
      },
      {
        gallery_id: 11,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/11/15bafa59a8dd0dd66a77650dddb9002cce33a3d07d601ae16f5b2eb854ffc84b",
      },
      {
        gallery_id: 11,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/11/c43f1b5284f85130e6f52d5c6ac19416f3c05e0cf5b64070e6473c69686de6ca",
      },
      {
        gallery_id: 11,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/11/e1e00599f2907392399df8c9c996a15b5313b27007b39fc4a4b4905a107ea24b",
      },
      {
        gallery_id: 12,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/12/f87e5dae9f337a0d9b14a44d6592e23ff26f23e1261ee36115392d4dd57f285b",
      },
      {
        gallery_id: 12,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/12/c4762ded8fc521ffb1a3f176ec11eff2deb2ebb8f2ddea4cde822a3a470a1eb0",
      },
      {
        gallery_id: 12,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/12/776a0d8cc55b50d4b78258f8f91993461d1f7d768926ebafc828ca823fe8b35c",
      },
      {
        gallery_id: 13,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/670e9cc5012c494f9c2a92623ab59ea1577d5740564b6650111836cc6b1e8c4b",
      },
      {
        gallery_id: 13,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/fe2303e7f671414f8de4a07ec2cb08ea4f13ac58d7e49ec91747eba8cf5a3b6a",
      },
      {
        gallery_id: 13,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/335e5db5f38c812d7ac33b3ca9b8926df16f73ca66994d3dfc726bbfc115196c",
      },
      {
        gallery_id: 14,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/c7a57f637869668e9799a90147d593880268b22caafdaa20cb5fce7e3dc92d5d",
      },
      {
        gallery_id: 14,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/0b0cbf2a3339c9bf3bd227137776422a288bd90aedae7eec6b53fe822f5cce19",
      },
      {
        gallery_id: 14,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/ad6917aa79c5adc98df718c0d8532350b6e6ba4214d100b707fe8c6e3e12648b",
      },
      {
        gallery_id: 15,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/670e9cc5012c494f9c2a92623ab59ea1577d5740564b6650111836cc6b1e8c4b",
      },
      {
        gallery_id: 15,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/fe2303e7f671414f8de4a07ec2cb08ea4f13ac58d7e49ec91747eba8cf5a3b6a",
      },
      {
        gallery_id: 15,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/335e5db5f38c812d7ac33b3ca9b8926df16f73ca66994d3dfc726bbfc115196c",
      },
      {
        gallery_id: 16,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/c7a57f637869668e9799a90147d593880268b22caafdaa20cb5fce7e3dc92d5d",
      },
      {
        gallery_id: 16,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/0b0cbf2a3339c9bf3bd227137776422a288bd90aedae7eec6b53fe822f5cce19",
      },
      {
        gallery_id: 16,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/ad6917aa79c5adc98df718c0d8532350b6e6ba4214d100b707fe8c6e3e12648b",
      },
      {
        gallery_id: 17,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/670e9cc5012c494f9c2a92623ab59ea1577d5740564b6650111836cc6b1e8c4b",
      },
      {
        gallery_id: 17,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/fe2303e7f671414f8de4a07ec2cb08ea4f13ac58d7e49ec91747eba8cf5a3b6a",
      },
      {
        gallery_id: 17,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/335e5db5f38c812d7ac33b3ca9b8926df16f73ca66994d3dfc726bbfc115196c",
      },
      {
        gallery_id: 18,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/c7a57f637869668e9799a90147d593880268b22caafdaa20cb5fce7e3dc92d5d",
      },
      {
        gallery_id: 18,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/0b0cbf2a3339c9bf3bd227137776422a288bd90aedae7eec6b53fe822f5cce19",
      },
      {
        gallery_id: 18,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/ad6917aa79c5adc98df718c0d8532350b6e6ba4214d100b707fe8c6e3e12648b",
      },
      {
        gallery_id: 19,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/670e9cc5012c494f9c2a92623ab59ea1577d5740564b6650111836cc6b1e8c4b",
      },
      {
        gallery_id: 19,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/fe2303e7f671414f8de4a07ec2cb08ea4f13ac58d7e49ec91747eba8cf5a3b6a",
      },
      {
        gallery_id: 19,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/1/335e5db5f38c812d7ac33b3ca9b8926df16f73ca66994d3dfc726bbfc115196c",
      },
      {
        gallery_id: 20,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/c7a57f637869668e9799a90147d593880268b22caafdaa20cb5fce7e3dc92d5d",
      },
      {
        gallery_id: 20,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/0b0cbf2a3339c9bf3bd227137776422a288bd90aedae7eec6b53fe822f5cce19",
      },
      {
        gallery_id: 20,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/2/ad6917aa79c5adc98df718c0d8532350b6e6ba4214d100b707fe8c6e3e12648b",
      },
    ]);
    await EscortLanguage.bulkCreate([
      {
        user_id: 1,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 2,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 3,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 4,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 5,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 6,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 7,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 8,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 9,
        language_code: "EN",
        proficiency_id: 2,
      },
      {
        user_id: 10,
        language_code: "EN",
        proficiency_id: 2,
      },
    ]);
    await EscortPhysicalFeature.bulkCreate([
      {
        user_id: 1,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 2,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 3,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 4,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 5,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 6,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 7,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 8,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 9,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
      {
        user_id: 10,
        eye_color_id: 1,
        hair_color_id: 1,
        hair_length_id: 2,
        height: 150,
        weight: 42,
        dress_size: "M",
        shoe_size: 40,
        bust: 100,
        waist: 50,
        hip: 100,
        cup_size: "C",
        breast_id: 1,
        public_hair_id: 3,
      },
    ]);
    await EscortService.bulkCreate([
      {
        user_id: 1,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 1,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 1,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 2,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 2,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 2,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 3,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 3,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 3,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 4,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 4,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 4,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 5,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 5,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 5,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 6,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 6,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 6,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 7,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 7,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 7,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 8,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 8,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 8,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 9,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 9,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 9,
        combination_id: 6,
        rate: 120,
      },
      {
        user_id: 10,
        combination_id: 2,
        rate: 100,
      },
      {
        user_id: 10,
        combination_id: 4,
        rate: 150,
      },
      {
        user_id: 10,
        combination_id: 6,
        rate: 120,
      },
    ]);
    await EscortSocialMedia.bulkCreate([
      {
        user_id: 1,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 1,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 2,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 2,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 3,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 3,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 4,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 4,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 5,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 5,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 6,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 6,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 7,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 7,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 8,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 8,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 9,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 9,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
      {
        user_id: 10,
        social_media_id: 1,
        social_media_username: "alessandra",
      },
      {
        user_id: 10,
        social_media_id: 2,
        social_media_username: "aless_andra",
      },
    ]);
    await EscortStories.bulkCreate([
      {
        user_id: 1,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/62abb20435713e57f0daaa068cabd859a76efce662e5ad3f6e844b8a25a3ecec",
      },
      {
        user_id: 1,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/c600efe871487431a254c8c4a3b33a037ca7367602b57107bba974c12cd0ded8",
      },
      {
        user_id: 2,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/6acc875e262a7735de09a34c8dd4fdd6ccf53f18a2fee0e27998cd5a14b93c1c",
      },
      {
        user_id: 2,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/87b2d147c6b15e9bdbfcce8b0e399a41ef4ad55b1da2bb05f4c229353a0fdd1d",
      },
      {
        user_id: 3,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/bc9259ccbb1b3133fd1bb14d11f43d80f1109bc33fa6d7d8b501b77af6dac48d",
      },
      {
        user_id: 3,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/212ddf5fdfeb8bd88616e2e37477d5da0be6d4f37f37bb03302f34e1b3f5d9a8",
      },
      {
        user_id: 4,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/00042bf0b91c98cd496d8b474a19f0e117c0244f8db67547881557f20c15358a",
      },
      {
        user_id: 4,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/88ec29115e3b8eb127c4e252be3dda4db3df15f43482a10831b87da9adb23cf6",
      },
      {
        user_id: 5,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/a7a7df27fc40257649ebe44d785d01b046193a7fe58d897636cb2f2309512d9c",
      },
      {
        user_id: 5,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/aaf0f490c62f439bee23e8a40f7826769583142ef67753d13905f623bc0a9a3f",
      },
      {
        user_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/10a5f0d33de33605bfe6ec33bfb390ebc8722e4724440f4024b20601687d64a5",
      },
      {
        user_id: 6,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/080b31380b131f70347d0d3477dd4f097234308aa926a643785cf34140b762e8",
      },
      {
        user_id: 7,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/6acc875e262a7735de09a34c8dd4fdd6ccf53f18a2fee0e27998cd5a14b93c1c",
      },
      {
        user_id: 7,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/87b2d147c6b15e9bdbfcce8b0e399a41ef4ad55b1da2bb05f4c229353a0fdd1d",
      },
      {
        user_id: 8,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/6acc875e262a7735de09a34c8dd4fdd6ccf53f18a2fee0e27998cd5a14b93c1c",
      },
      {
        user_id: 8,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/87b2d147c6b15e9bdbfcce8b0e399a41ef4ad55b1da2bb05f4c229353a0fdd1d",
      },
      {
        user_id: 9,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/6acc875e262a7735de09a34c8dd4fdd6ccf53f18a2fee0e27998cd5a14b93c1c",
      },
      {
        user_id: 9,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/87b2d147c6b15e9bdbfcce8b0e399a41ef4ad55b1da2bb05f4c229353a0fdd1d",
      },
      {
        user_id: 10,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/6acc875e262a7735de09a34c8dd4fdd6ccf53f18a2fee0e27998cd5a14b93c1c",
      },
      {
        user_id: 10,
        url: "https://escort-near-you-storage-dev.s3.eu-north-1.amazonaws.com/stories/87b2d147c6b15e9bdbfcce8b0e399a41ef4ad55b1da2bb05f4c229353a0fdd1d",
      },
    ]);
    await EscortWorkingCity.bulkCreate([
      {
        user_id: 1,
        combination_id: 1,
      },
      {
        user_id: 1,
        combination_id: 2,
      },
      {
        user_id: 1,
        combination_id: 3,
      },
      {
        user_id: 1,
        combination_id: 4,
      },
      {
        user_id: 2,
        combination_id: 1,
      },
      {
        user_id: 2,
        combination_id: 2,
      },
      {
        user_id: 2,
        combination_id: 3,
      },
      {
        user_id: 2,
        combination_id: 4,
      },
      {
        user_id: 3,
        combination_id: 1,
      },
      {
        user_id: 3,
        combination_id: 2,
      },
      {
        user_id: 3,
        combination_id: 3,
      },
      {
        user_id: 3,
        combination_id: 4,
      },
      {
        user_id: 4,
        combination_id: 1,
      },
      {
        user_id: 4,
        combination_id: 2,
      },
      {
        user_id: 4,
        combination_id: 3,
      },
      {
        user_id: 4,
        combination_id: 4,
      },
      {
        user_id: 5,
        combination_id: 1,
      },
      {
        user_id: 5,
        combination_id: 2,
      },
      {
        user_id: 5,
        combination_id: 3,
      },
      {
        user_id: 5,
        combination_id: 4,
      },
      {
        user_id: 6,
        combination_id: 1,
      },
      {
        user_id: 6,
        combination_id: 2,
      },
      {
        user_id: 6,
        combination_id: 3,
      },
      {
        user_id: 6,
        combination_id: 4,
      },
      {
        user_id: 7,
        combination_id: 1,
      },
      {
        user_id: 7,
        combination_id: 2,
      },
      {
        user_id: 7,
        combination_id: 3,
      },
      {
        user_id: 7,
        combination_id: 4,
      },
      {
        user_id: 8,
        combination_id: 1,
      },
      {
        user_id: 8,
        combination_id: 2,
      },
      {
        user_id: 8,
        combination_id: 3,
      },
      {
        user_id: 8,
        combination_id: 4,
      },
      {
        user_id: 9,
        combination_id: 1,
      },
      {
        user_id: 9,
        combination_id: 2,
      },
      {
        user_id: 9,
        combination_id: 3,
      },
      {
        user_id: 9,
        combination_id: 4,
      },
      {
        user_id: 10,
        combination_id: 1,
      },
      {
        user_id: 10,
        combination_id: 2,
      },
      {
        user_id: 10,
        combination_id: 3,
      },
      {
        user_id: 10,
        combination_id: 4,
      },
    ]);
    await EscortWorkingHour.bulkCreate([
      {
        user_id: 1,
        combination_id: 8,
      },
      {
        user_id: 2,
        combination_id: 8,
      },
      {
        user_id: 3,
        combination_id: 8,
      },
      {
        user_id: 4,
        combination_id: 8,
      },
      {
        user_id: 5,
        combination_id: 8,
      },
      {
        user_id: 6,
        combination_id: 8,
      },
      {
        user_id: 7,
        combination_id: 8,
      },
      {
        user_id: 8,
        combination_id: 8,
      },
      {
        user_id: 9,
        combination_id: 8,
      },
      {
        user_id: 10,
        combination_id: 8,
      },
    ]);

    return res
      .status(201)
      .json({ success: true, msg: "Mock Profile Data created successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = {
  mockProfileData,
};
